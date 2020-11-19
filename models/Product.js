const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add name'],
    trim: true,
    unique: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  slug: String,
  price: {
    type: Number,
    required: [true, 'Please add price'],
  },
  photo: {
    type: String,
    default: 'no-photo.png',
  },
});

module.exports = mongoose.model('Product', ProductSchema);
