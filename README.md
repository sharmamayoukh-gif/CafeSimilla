# La Semilla Bake House — Website

A single-page, static website for **La Semilla Bake House**, a cafe at Bishal Chowk, Nakhipot Road, Lalitpur. Built with plain HTML, CSS, and vanilla JavaScript — no build step, no dependencies, no framework.

## Live preview

Open `index.html` directly in a browser, or serve the folder with any static file server (see below).

## Features

- **Hero, story, and visit sections** built from the cafe's real photos, address, hours, and phone number.
- **Full menu**, organised into the original 12 categories (Hot Beverages, Coffee Alternatives, Mock Tail, Iced Coffee, Refresher, Frappe, Iced Tea, Smoothies & Lassi, Milk Shake, Juice, Dessert, plus an "Also on the Menu" list of unpriced bakery/kitchen items), browsable via tabs.
- **Interactive billing / order ticket** — click **+** next to any menu item to add it to a receipt-styled order ticket. Adjust quantities, see a live subtotal/total in NPR, clear the ticket, or send the order straight to the cafe's WhatsApp number with the order pre-filled.
- **Reviews section** summarising the cafe's rating (4.2 / 110 reviews) with individual review cards.
- **Live Google Maps embed** of Bishal Chowk, Nakhipot Road, Lalitpur, plus "Get directions" and "Open in Google Maps" links that open real turn-by-turn directions / the full Maps app.
- Fully responsive, no external JS libraries — just Google Fonts (Fraunces, Sora, IBM Plex Mono) loaded via CDN.

## Project structure

```
.
├── index.html            # Page markup
├── css/
│   └── style.css          # All styling (design tokens as CSS custom properties)
├── js/
│   └── script.js           # Menu rendering, order ticket / billing logic, reviews rendering
├── api/
│   └── orders.js           # Vercel serverless function: POST /api/orders → saves to Supabase
├── supabase/
│   └── schema.sql           # SQL to create the `orders` table in Supabase
├── images/
│   ├── storefront-night.png
│   ├── interior-day.png
│   ├── shelf-detail.png
│   └── lounge-corner.png
├── package.json           # Declares the @supabase/supabase-js dependency
├── .env.example            # Template for local environment variables
├── .gitignore
└── README.md
```

## Order-saving backend (Vercel + Supabase)

When a visitor fills in their name and phone number and taps **Send order**, the site:

1. Attempts to POST the order (`name`, `phone`, `items`, `totalPrice`) to `/api/orders`, which saves it to Supabase.
2. Opens a pre-filled WhatsApp chat to the cafe's number **either way** — even if the Supabase save fails or the API isn't deployed yet, the button still hands the order off via WhatsApp. Open the browser console to see whether the save succeeded (`Order saved`) or not (`Order NOT saved to database`).

This means the button always does something visible when clicked. If WhatsApp doesn't open at all, check the browser console for a `[La Semilla]` log — it will say whether `#btnSend` was found and whether the click handler ran.

### 1. Create the Supabase table

In your Supabase project, open **SQL Editor → New query**, paste the contents of `supabase/schema.sql`, and run it. This creates an `orders` table with Row Level Security enabled and no public policies — the API can still write to it because it authenticates with the `service_role` key, which bypasses RLS.

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
git commit -m "Add Supabase order-saving API"
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

## Running locally

No build tools are required. Any of the following work:

```bash
# Python
python3 -m http.server 8000

# Node (if you have npx)
npx serve .
```

Then visit `http://localhost:8000`.

## Deploying

Since this is fully static, it can be hosted directly from GitHub Pages:

1. Push this repo to GitHub.
2. In the repo settings, enable **Pages** → deploy from the `main` branch, root folder.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.

## Customising

- **Colors & type** — all design tokens live at the top of `css/style.css` under `:root`.
- **Menu items & prices** — edit the `MENU` and `OTHERS` objects at the top of `js/script.js`.
- **Reviews** — edit the `REVIEWS` array in `js/script.js`.
- **WhatsApp order number** — update the phone number inside the `renderTicket()` function in `js/script.js` (search for `wa.me`).
- **Map location** — update the three `google.com/maps` URLs in the "Visit" section of `index.html` (search for `visit-map`) if the address changes. No API key is required since these use the public Maps search/embed/directions URLs, not the JavaScript Maps API.

## Notes

- The order ticket saves to Supabase via `/api/orders`, then opens a pre-filled WhatsApp chat to the cafe's number — there is no separate payment processing.
- Images are the cafe's own photos, included in `images/`.
