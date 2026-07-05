# Stock Book — Web Frontend (Next.js)

A browser-based alternative to the React Native app, talking to the same
Node.js/Express/MongoDB backend. Lets the businessman upload a product photo
(camera on mobile browsers, file picker on desktop) and price from any
computer or phone browser — no app install needed.

## Setup

```bash
cd web
npm install
cp .env.local.example .env.local
# Edit .env.local -> NEXT_PUBLIC_API_URL should point at your running backend
npm run dev
```

Open http://localhost:3000

Make sure the backend (`../backend`) is running first — see the root
`README.md` for backend setup.

## Pages

- `/` — **The Ledger**: grid of saved products, styled as hanging price
  tags, each showing the photo, price, and the London timestamp it was
  saved with. Running stock total, search box, and a sort dropdown
  (newest/oldest/price). Loading state shows skeleton tag cards instead of
  a blank screen. Hover a tag to reveal delete, tap once to arm it and
  again to confirm — no jarring browser `confirm()` popups.
- `/add` — **Tag an item**: take/upload a photo, optional name, price. A
  live London clock shows exactly what time will be attached before you
  save — the actual timestamp is still stamped by the server, not the
  browser, so it can't be thrown off by a wrong device clock or timezone.
  Drag-and-drop has a clear "drop it here" state, invalid/too-large files
  are rejected with a toast instead of a silent failure, and the save
  button shows a moving progress bar while the upload is in flight.

## UX & theming

- **Day / night toggle** (top right, ☼ / ☾): flips between a warm
  parchment "Day Ledger" look and a dark "Night Stocktake" look. The
  choice is remembered (`localStorage`) and respects the browser's
  `prefers-color-scheme` on first visit. A small inline script in
  `app/layout.js` applies the saved theme before paint, so there's no
  flash of the wrong theme on load.
- **Toasts** instead of `alert()`: saving, deleting, and errors all surface
  as small dismissing receipt-style notices (`components/ToastProvider.js`).
- **Skeleton loading** for both the product grid and individual photos, so
  the layout doesn't jump once data/images arrive.
- Motion is intentionally restrained (short fades/slides on cards and
  toasts) and fully disabled if the user's OS has "reduce motion" turned on.

## Notes

- Styling is Tailwind CSS with a small custom token set (see
  `tailwind.config.js` and `app/globals.css`) — no extra UI library needed.
- Photo upload uses the browser's native `<input type="file" capture="environment">`,
  which opens the camera directly on most mobile browsers, and falls back to
  a normal file picker (with drag-and-drop) on desktop.
- Swap `NEXT_PUBLIC_API_URL` for your deployed backend URL when you host
  this for real use.
"# stock-book" 
