const express = require('express');
const router = express.Router();

// Connecting routers with controllers
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');

router.route('/').get(getProducts).post(addProduct);

router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
