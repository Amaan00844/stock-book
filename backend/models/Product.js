const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Path (URL) to the stored photo, e.g. /uploads/1720012345-shirt.jpg
    photoUrl: {
      type: String,
      required: true,
    },
    // Price entered by the businessman
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    // Currency, defaults to GBP since the business is based in London
    currency: {
      type: String,
      default: "GBP",
    },
    // Optional free-text name/note for the product
    name: {
      type: String,
      default: "",
      trim: true,
    },
    // The exact moment the product was captured, stored in UTC (source of truth)
    capturedAtUTC: {
      type: Date,
      required: true,
      default: Date.now,
    },
    // Human-readable date/time already converted to Europe/London for display,
    // saved at write-time so the record always reflects the London time
    // at the moment the photo was taken (correct even across BST/GMT changes).
    capturedAtLondon: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      default: "Europe/London",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
