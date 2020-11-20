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

router.route('/').get(getCategories).post(addCategory);

router
  .route('/:id')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
