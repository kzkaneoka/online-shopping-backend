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

router
  .route('/')
  .get(
    advancedResults(Product, null, 'price', [
      'select',
      'sort',
      'page',
      'limit',
    ]),
    getProducts
  )
  .post(addProduct);

router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

router.route('/:id/photo').put(uploadPhoto);

module.exports = router;
