const express = require("express");
const {
  getProduct,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/product-controller.js");
const authMiddleware = require("../middleware/auth-middleware.js");
const adminMiddleware = require("../middleware/admin-middleware.js");

const router = express.Router();

// These can be normal user features
router.get("/get-product", getProduct);
router.get("/get-product/:id", getProductById);

// These three are admin features
router.post("/add-product", authMiddleware, addProduct);
router.put("/update-product/:id", authMiddleware, updateProductById);

// ADMIN -> onlyu he can delete
router.delete(
  "/delete-product/:id",
  authMiddleware,
  adminMiddleware,
  deleteProductById
);

module.exports = router;
