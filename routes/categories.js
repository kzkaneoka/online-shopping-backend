const express = require('express');
const router = express.Router();

// Connecting routers with controllers
const {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');

// advancedResults middleware
const advancedResults = require('../middleware/advancedResults');
const Category = require('../models/Product');

router
  .route('/')
  .get(
    advancedResults(Category, null, 'name', ['page', 'limit']),
    getCategories
  )
  .post(addCategory);

router
  .route('/:id')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
