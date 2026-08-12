// api/orders.js
//
// Vercel serverless function (Node.js runtime).
// Any file in /api becomes its own endpoint automatically — this one
// handles POST /api/orders and saves a customer's bill to Supabase.
//
// Required environment variables (set these in the Vercel dashboard,
// Project Settings -> Environment Variables — NOT prefixed with NEXT_PUBLIC_
// or VITE_, so they stay server-side only):
//   SUPABASE_URL              - your Supabase project URL
//   SUPABASE_SERVICE_ROLE_KEY - your Supabase service_role key (secret, server-only)

const { createClient } = require('@supabase/supabase-js');

// Created once per cold start and reused across warm invocations.
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async function handler(req, res) {
  // Only POST is supported.
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  // On Vercel, req.body is already parsed for JSON content-types.
  // Fall back to manual parsing just in case it arrives as a string.
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Request body must be valid JSON.' });
    }
  }

  const { name, phone, items, totalPrice } = body || {};

  // ---- Validation ----
  const errors = [];

  const cleanName = typeof name === 'string' ? name.trim() : '';
  if (!cleanName) errors.push('name is required.');

  const cleanPhone = typeof phone === 'string' ? phone.trim() : '';
  if (!cleanPhone) errors.push('phone is required.');
  else if (!/^[0-9+\-()\s]{6,20}$/.test(cleanPhone)) errors.push('phone looks invalid.');

  if (!Array.isArray(items) || items.length === 0) {
    errors.push('items must be a non-empty array.');
  } else {
    items.forEach((it, i) => {
      if (!it || typeof it.name !== 'string' || !it.name.trim()) {
        errors.push(`items[${i}].name is required.`);
      }
      if (typeof it.price !== 'number' || it.price < 0) {
        errors.push(`items[${i}].price must be a non-negative number.`);
      }
      if (typeof it.qty !== 'number' || !Number.isInteger(it.qty) || it.qty < 1) {
        errors.push(`items[${i}].qty must be a positive integer.`);
      }
    });
  }

  const total = Number(totalPrice);
  if (!Number.isFinite(total) || total <= 0) {
    errors.push('totalPrice must be a positive number.');
  }

  if (errors.length) {
    return res.status(400).json({ error: 'Invalid order data.', details: errors });
  }

  // ---- Save to Supabase ----
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: cleanName,     // customer name, from the bill's Name field
          phone_number: cleanPhone,     // customer phone
          items,                        // the order: jsonb [{ name, price, qty }, ...]
          total_price: total,           // total price for the bill
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Could not save the order. Please try again.' });
    }

    return res.status(201).json({ success: true, order: data });
  } catch (err) {
    console.error('Unexpected error saving order:', err);
    return res.status(500).json({ error: 'Something went wrong on our end.' });
  }
};
