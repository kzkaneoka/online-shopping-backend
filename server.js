const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
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

// Middlewares
const morgan = require('morgan'); // loggar middleware

// Use middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routers
const products = require('./routes/products');

// Use routers
app.use('/api/v1/products', products);

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
