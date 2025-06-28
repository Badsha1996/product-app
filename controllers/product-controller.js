const getProductError = require("../utils/product-error");
const Product = require("../models/product");

const getProduct = async (req, res) => {
  try {
    const allProducts = await Product.find();
    // const { userId, email, role } = req.userInfo;

    if (allProducts.length <= 0) {
      res.status(201).send({
        message: "There are no products available",
        success: true,
        data: [],
      });
      return;
    }

    res.status(201).send({
      message: "All products fetched",
      success: true,
      data: [...allProducts],
    });
  } catch (e) {
    getProductError(e, res);
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const addedProduct = await Product.create(newProduct);
    // Success Message
    res.status(201).send({
      message: "Product has been added",
      success: true,
      product: addedProduct,
    });
  } catch (e) {
    getProductError(e, res);
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).send({
        message: "There is no such product",
        success: false,
        data: null,
      });
    }
    res.status(201).send({
      message: `Product for ${productId} has been fetched`,
      success: true,
      data: product,
    });
  } catch (e) {
    getProductError(e, res);
  }
};

const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = req.body;
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });
    if (!product) {
      res.status(404).send({
        message: "There is no such product",
        success: false,
        data: null,
      });
    }

    res.status(201).send({
      message: `Product for ${productId} has been updated`,
      success: true,
      data: product,
    });
  } catch (e) {
    getProductError(e, res);
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      res.status(404).send({
        message: "There is no such product",
        success: false,
        data: null,
      });
    }

    res.status(201).send({
      message: `Product for ${productId} has been deleted`,
      success: true,
      data: deletedProduct,
    });
  } catch (e) {
    getProductError(e, res);
  }
};

module.exports = {
  addProduct,
  getProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
