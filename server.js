const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const colors = require('colors');
const fileuploader = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Environment variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Get port to listen on this server
const PORT = process.env.PORT || 5000;

// Init app server
const app = express();

// Body parser to use req.body in controllers
app.use(express.json());

// Cookie Parser to use coookie in controllers
app.use(cookieParser());

// Middlewares
const morgan = require('morgan'); // loggar middleware

// Use middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploader
app.use(fileuploader());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routers
const products = require('./routes/products');
const categories = require('./routes/categories');
const auth = require('./routes/auth');

// Use routers
app.use('/api/v1/products', products);
app.use('/api/v1/categories', categories);
app.use('/api/v1/auth', auth);

// Error handler for routers
// Needs to be declared after routers
// in order to catch errors after executing routers
app.use(errorHandler);

// Let server to listen PORT
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle UnhandledPromiseRejectionWarning for database connection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
