const express = require("express");
const {
  getProduct,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/product-controller.js");
const authMiddleware = require("../middleware/auth-middleware.js");

const router = express.Router();

// These can be normal user features
router.get("/get-product", authMiddleware, getProduct);
router.get("/get-product/:id", getProductById);

// These three are admin features
router.post("/add-product", addProduct);
router.put("/update-product/:id", updateProductById);
router.delete("/delete-product/:id", deleteProductById);

module.exports = router;
