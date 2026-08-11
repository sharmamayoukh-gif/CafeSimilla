-- Run this in the Supabase SQL editor (Project -> SQL Editor -> New query)
-- to create the table the /api/orders function writes to.

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone_number text not null,
  items jsonb not null,          -- [{ "name": "Cappuccino", "price": 180, "qty": 2 }, ...]
  total_price numeric(10, 2) not null,
  created_at timestamptz not null default now()
);

-- Row Level Security stays ON, with no public policies.
-- The serverless function connects using the service_role key, which
-- bypasses RLS, so the table is still safe to keep locked down from
-- any client-side (anon key) access.
alter table orders enable row level security;

-- Optional: index for querying recent orders quickly in the dashboard.
create index if not exists orders_created_at_idx on orders (created_at desc);
