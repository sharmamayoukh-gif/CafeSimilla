# La Semilla Bake House — Website

A single-page website for **La Semilla Bake House**, a cafe at Bishal Chowk, Nakhipot Road, Lalitpur. Built with plain HTML, CSS, and vanilla JavaScript on the frontend, plus a small Vercel serverless function backed by Supabase for saving customer bills.

## Live preview

Open `index.html` directly in a browser for the frontend only, or run it via `vercel dev` (see below) to also exercise the `/api/orders` billing endpoint.

## Features

- **Hero, story, and visit sections** built from the cafe's real photos, address, hours, and phone number.
- **Full menu**, organised into the original 12 categories (Hot Beverages, Coffee Alternatives, Mock Tail, Iced Coffee, Refresher, Frappe, Iced Tea, Smoothies & Lassi, Milk Shake, Juice, Dessert, plus an "Also on the Menu" list of unpriced bakery/kitchen items), browsable via tabs.
- **Billing system** — a floating 🧾 button (reachable from anywhere: nav, hero, menu chip, footer, or the button itself) opens a modal bill showing:
  - **Customer name**
  - **The order** — every item added, with quantity controls
  - **Price** per item
  - **Total price**
  
  Tapping **+** on any menu item adds it to the bill. "Save & send bill" saves the bill to Supabase via `/api/orders`, then opens a pre-filled WhatsApp chat to the cafe's number — the WhatsApp handoff always happens, even if the database save fails, so the button never feels unresponsive.
- **Reviews section** summarising the cafe's rating (4.2 / 110 reviews) with individual review cards.
- **Live Google Maps embed** of Bishal Chowk, Nakhipot Road, Lalitpur, plus "Get directions" and "Open in Google Maps" links.
- No external JS libraries on the frontend — just Google Fonts (Fraunces, Sora, IBM Plex Mono) loaded via CDN.

## Project structure

```
.
├── index.html            # Page markup, including the billing modal
├── css/
│   └── style.css          # All styling (design tokens as CSS custom properties)
├── js/
│   └── script.js           # Menu rendering, reviews rendering, billing modal logic
├── api/
│   └── orders.js            # Vercel serverless function: POST /api/orders → saves a bill to Supabase
├── supabase/
│   └── schema.sql            # SQL to create the `orders` table in Supabase
├── images/
│   ├── storefront-night.png
│   ├── interior-day.png
│   ├── shelf-detail.png
│   └── lounge-corner.png
├── package.json           # Declares the @supabase/supabase-js dependency
├── .env.example             # Template for local environment variables
├── .gitignore
└── README.md
```

## Setting up the billing backend (Vercel + Supabase)

### 1. Create the Supabase table

In your Supabase project, open **SQL Editor → New query**, paste the contents of `supabase/schema.sql`, and run it. This creates an `orders` table (`customer_name`, `phone_number`, `items` as jsonb, `total_price`, `created_at`) with Row Level Security enabled and no public policies — the API can still write to it because it authenticates with the `service_role` key, which bypasses RLS.

### 2. Get your Supabase keys

In Supabase: **Project Settings → API**. You'll need:

- **Project URL** → `SUPABASE_URL`
- **`service_role` key** (not the `anon` key) → `SUPABASE_SERVICE_ROLE_KEY`

The `service_role` key has full database access, so it must only ever be set as a server-side environment variable — never exposed in client-side code.

### 3. Set environment variables on Vercel

In your Vercel project: **Settings → Environment Variables**, add:

| Name | Value |
|---|---|
| `SUPABASE_URL` | your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | your Supabase `service_role` key |

Redeploy after adding them (or Vercel will prompt you to).

### 4. Install dependencies & deploy

```bash
npm install
git add .
git commit -m "Add billing system with Supabase-backed API"
git push
```

Vercel automatically detects `api/orders.js` and deploys it as a serverless function at `/api/orders` — no extra config needed.

### Local development

```bash
npm install -g vercel   # if you don't already have the CLI
cp .env.example .env    # then fill in your Supabase values
vercel dev
```

`vercel dev` serves the static site and runs `api/orders.js` locally, reading `.env`.

## Running the frontend only (no backend)

No build tools are required for the static site itself:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then visit `http://localhost:8000`. The billing modal will still open and let you build a bill, but "Save & send bill" will log a "could not reach /api/orders" warning to the console (since there's no server running) and still open WhatsApp — it just won't save to Supabase.

## Customising

- **Colors & type** — all design tokens live at the top of `css/style.css` under `:root`.
- **Menu items & prices** — edit the `MENU` and `OTHERS` objects at the top of `js/script.js`.
- **Reviews** — edit the `REVIEWS` array in `js/script.js`.
- **Map location** — update the three `google.com/maps` URLs in the "Visit" section of `index.html` (search for `visit-map`) if the address changes.
- **WhatsApp order number** — update `CAFE_WHATSAPP_NUMBER` near the bottom of `js/script.js`.

## Notes

- The billing modal is client-side state only (cleared on page refresh) — it's a lightweight bill-builder, not a persistent shopping cart or payment processor. No payment is taken on this page; bills are handed off to the cafe via WhatsApp and logged in Supabase for the counter's records.
- Images are the cafe's own photos, included in `images/`.
