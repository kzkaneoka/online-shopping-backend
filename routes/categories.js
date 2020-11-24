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
const Category = require('../models/Category');

// protect middleware for private api
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(advancedResults(Category, null, ['page', 'limit']), getCategories)
  .post(protect, authorize('seller', 'admin'), addCategory);

router
  .route('/:id')
  .get(getCategory)
  .put(protect, authorize('seller', 'admin'), updateCategory)
  .delete(protect, authorize('seller', 'admin'), deleteCategory);

module.exports = router;
