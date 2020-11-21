const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Please add name'],
  },
});

// Cascade delete products when category is deleted
CategorySchema.pre('remove', async function (next) {
  await this.model('Product').deleteMany({ category: this._id });
  next();
});

module.exports = mongoose.model('Category', CategorySchema);
