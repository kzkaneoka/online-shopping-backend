const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Please add name'],
  },
});

module.exports = mongoose.model('Category', CategorySchema);
