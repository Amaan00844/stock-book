# Product Tracker — Photo + Price + Auto Date/Time (London)

A simple app for a London-based businessman to photograph a product, enter its
price, and automatically record the date and time (Europe/London), all saved
to MongoDB.

- **Backend:** Node.js + Express + MongoDB (Mongoose) + Multer (photo upload)
- **Frontend:** React Native (Expo) — camera, price entry, product list

The date/time is **stamped by the server**, not the phone, so it can't be
wrong because of a mis-set phone clock or timezone. It's stored in UTC
(`capturedAtUTC`) and also saved pre-formatted in London time
(`capturedAtLondon`), which correctly accounts for BST/GMT switching.

---

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set MONGO_URI to your MongoDB connection string
npm run dev      # or: npm start
```

Requires MongoDB running locally, or a free MongoDB Atlas cluster
(https://www.mongodb.com/cloud/atlas). Put the connection string in
`backend/.env` as `MONGO_URI`.

The server starts on `http://0.0.0.0:5000` by default and exposes:

| Method | Endpoint              | Description                          |
|--------|------------------------|---------------------------------------|
| POST   | `/api/products`         | Upload photo + price → saves product |
| GET    | `/api/products`         | List all products                    |
| GET    | `/api/products/:id`     | Get one product                      |
| DELETE | `/api/products/:id`     | Delete a product                     |

Uploaded photos are served statically at `/uploads/<filename>`.

## 2. Frontend setup

```bash
cd frontend
npm install
```

Before running, open `frontend/src/api/config.js` and set `BASE_URL` to the
address where your backend is reachable from the phone/emulator:

- Physical phone on same Wi-Fi: `http://<your-computer-LAN-IP>:5000`
- Android emulator: `http://10.0.2.2:5000`
- iOS simulator: `http://localhost:5000`

Then start Expo:

```bash
npx expo start
```

Scan the QR code with the Expo Go app (iOS/Android) or run on a simulator.

## 3. How it works

1. Businessman opens the app → taps **"+ Add"**.
2. Taps **"Take Photo"** (or picks from gallery) → photo preview shown.
3. Types the price (and optional product name).
4. Taps **"Save Product"** → app uploads the photo + price to the backend
   as `multipart/form-data`.
5. Backend receives the request, immediately stamps the current server time,
   converts it to Europe/London, and saves everything in MongoDB:
   ```json
   {
     "photoUrl": "/uploads/1720012345-shirt.jpg",
     "price": 24.99,
     "currency": "GBP",
     "name": "Blue cotton shirt",
     "capturedAtUTC": "2026-07-05T13:32:10.000Z",
     "capturedAtLondon": "2026-07-05 14:32:10 (BST)",
     "timezone": "Europe/London"
   }
   ```
6. The product list screen fetches and displays all saved products with
   their photo, price, and London timestamp.

## 4. Notes / next steps

- For production, swap local disk storage (Multer) for cloud storage
  (e.g. AWS S3 / Cloudinary) and store the resulting URL instead.
- Add authentication (e.g. JWT) if multiple staff/businesses will use it.
- Add HTTPS + a real domain when deploying the backend (e.g. Render,
  Railway, or a VPS with Nginx) instead of a raw IP address.
