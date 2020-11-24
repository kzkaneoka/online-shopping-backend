const mongoose = require('mongoose');
const slugify = require('slugify');

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
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create product slug from the name
ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Product', ProductSchema);
