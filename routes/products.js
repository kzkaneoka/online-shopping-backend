const express = require('express');
const router = express.Router();

// Connecting routers with controllers
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  uploadPhoto,
} = require('../controllers/products');

// advancedResults middleware
const advancedResults = require('../middleware/advancedResults');
const Product = require('../models/Product');

// protect middleware for private api
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Product, null, ['select', 'sort', 'page', 'limit']),
    getProducts
  )
  .post(protect, authorize('seller', 'admin'), addProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(protect, authorize('seller', 'admin'), updateProduct)
  .delete(protect, authorize('seller', 'admin'), deleteProduct);

router
  .route('/:id/photo')
  .put(protect, authorize('seller', 'admin'), uploadPhoto);

module.exports = router;
