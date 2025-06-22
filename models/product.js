const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    unique: false,
    minLength: [3, "Product name must be at least 3 characters long"],
    maxLength: [1000, "Product name must be at most 1000 characters long"],
  },
  desc: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
    unique: false,
    maxLength: [
      2000,
      "Product description must be at most 2000 characters long",
    ],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Product price must be a positive number"],
  },
  year: {
    type: Number,
    required: [true, "Product year is required"],
    min: [1900, "Product year must be after 1900"],
    max: [new Date().getFullYear(), "Product year cannot be in the future"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);



