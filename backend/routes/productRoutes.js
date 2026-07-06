const express = require("express");
const moment = require("moment-timezone");
const Product = require("../models/Product");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

const router = express.Router();
const TIMEZONE = process.env.APP_TIMEZONE || "Europe/London";

/**
 * POST /api/products
 * multipart/form-data: photo (file), price (number), name (optional string)
 * Date/time is NEVER taken from the client - it is stamped by the server
 * the instant the request is received, converted to Europe/London.
 */
router.post("/", auth, upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "A product photo is required." });
    }

    const { price, name, currency } = req.body;

    if (price === undefined || isNaN(Number(price)) || Number(price) < 0) {
      return res.status(400).json({ error: "A valid, non-negative price is required." });
    }

    const nowUTC = new Date();
    const nowLondon = moment(nowUTC).tz(TIMEZONE).format("YYYY-MM-DD HH:mm:ss (z)");

    const product = await Product.create({
      user: req.user.id,
      photoUrl: `/uploads/${req.file.filename}`,
      price: Number(price),
      currency: currency || "GBP",
      name: name || "",
      capturedAtUTC: nowUTC,
      capturedAtLondon: nowLondon,
      timezone: TIMEZONE,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save product." });
  }
});

/**
 * GET /api/products
 * Returns all products, newest first.
 */
router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id }).sort({ capturedAtUTC: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products." });
  }
});

/**
 * GET /api/products/:id
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, user: req.user.id });
    if (!product) return res.status(404).json({ error: "Product not found." });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product." });
  }
});

/**
 * DELETE /api/products/:id
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!product) return res.status(404).json({ error: "Product not found." });
    res.json({ message: "Product deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product." });
  }
});

module.exports = router;
