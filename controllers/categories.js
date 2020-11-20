const Category = require('../models/Category');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all courses
// @route   GET /api/v1/courses
// @access  Public
exports.getCategories = asyncHandler(async (req, res, next) => {
  const reqQuery = { ...req.query };

  // Exclude some fileds from query
  const fieldsToExclude = ['page', 'limit'];
  fieldsToExclude.forEach((param) => delete reqQuery[param]);

  // Prepare query
  let query = Category.find(reqQuery);

  // Sort
  query = query.sort('name');

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Category.countDocuments();
  const pagination = { limit };
  if (endIndex < total) {
    pagination.next = page + 1;
  }
  if (startIndex > 0) {
    pagination.prev = page - 1;
  }
  query = query.skip(startIndex).limit(limit);

  // Execute query
  const categories = await query;

  res.status(200).json({
    success: true,
    count: categories.length,
    pagination,
    data: categories,
  });
});

// @desc    Get category
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: category });
});

// @desc    Add category
// @route   POST /api/v1/categories
// @access  Private
exports.addCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, data: category });
});

// @desc    Update category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: category });
});

// @desc    Delete category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
