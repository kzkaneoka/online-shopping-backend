const advancedResults = (model, populate, sortedBy, fieldsToExclude) => async (
  req,
  res,
  next
) => {
  const reqQuery = { ...req.query };

  // Exclude some fileds from query
  fieldsToExclude.forEach((param) => delete reqQuery[param]);

  const queryStr = JSON.stringify(reqQuery).replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Prepare query
  let query = model.find(JSON.parse(queryStr));

  // Select fields if necessary
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Soft fields if necessary
  if (req.query.sort) {
    const fields = req.query.sort.split(',').join(' ');
    query = query.sort(fields);
  } else {
    query = query.sort(sortedBy);
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();
  const pagination = { limit };
  if (endIndex < total) {
    pagination.next = page + 1;
  }
  if (startIndex > 0) {
    pagination.prev = page - 1;
  }
  query = query.skip(startIndex).limit(limit);

  // Populate if necessary
  if (populate) {
    query = query.populate(populate);
  }

  // Execute query
  const results = await query;

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
