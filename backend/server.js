require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();

connectDB();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Serve uploaded photos statically so the app can display them, e.g.
// http://<server-ip>:5000/uploads/1720012345-shirt.jpg
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Product Tracker API is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
