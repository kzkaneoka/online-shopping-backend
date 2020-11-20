const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load enviroment variables
dotenv.config({ path: './config/config.env' });

// Load models
const Category = require('./models/Category');
const Product = require('./models/Product');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/categories.json`, 'utf-8')
);
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Category.create(categories);
    await Product.create(products);
    console.log('Data importing...'.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete from DB
const deleteData = async () => {
  try {
    await Category.deleteMany();
    await Product.deleteMany();
    console.log('Data deleting...'.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
