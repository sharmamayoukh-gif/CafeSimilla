# La Semilla Bake House — Website

A single-page, static website for **La Semilla Bake House**, a cafe at Bishal Chowk, Nakhipot Road, Lalitpur. Built with plain HTML, CSS, and vanilla JavaScript — no build step, no dependencies, no framework.

## Live preview

Open `index.html` directly in a browser, or serve the folder with any static file server (see below).

## Features

- **Hero, story, and visit sections** built from the cafe's real photos, address, hours, and phone number.
- **Full menu**, organised into the original 12 categories (Hot Beverages, Coffee Alternatives, Mock Tail, Iced Coffee, Refresher, Frappe, Iced Tea, Smoothies & Lassi, Milk Shake, Juice, Dessert, plus an "Also on the Menu" list of unpriced bakery/kitchen items), browsable via tabs.
- **Interactive billing / order ticket** — click **+** next to any menu item to add it to a receipt-styled order ticket. Adjust quantities, see a live subtotal/total in NPR, clear the ticket, or send the order straight to the cafe's WhatsApp number with the order pre-filled.
- **Reviews section** summarising the cafe's rating (4.2 / 110 reviews) with individual review cards.
- Fully responsive, no external JS libraries — just Google Fonts (Fraunces, Sora, IBM Plex Mono) loaded via CDN.

## Project structure

```
.
├── index.html          # Page markup
├── css/
│   └── style.css        # All styling (design tokens as CSS custom properties)
├── js/
│   └── script.js         # Menu rendering, order ticket / billing logic, reviews rendering
├── images/
│   ├── storefront-night.png
│   ├── interior-day.png
│   ├── shelf-detail.png
│   └── lounge-corner.png
└── README.md
```

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

## Notes

- The order ticket is fully client-side — it does not send data anywhere except via the "Send order" WhatsApp link, which opens a pre-filled WhatsApp chat. There is no backend, database, or payment processing.
- Images are the cafe's own photos, included in `images/`.
