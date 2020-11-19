const express = require("express");
const dotenv = require("dotenv");

// To use environment variables
dotenv.config({ path: "./config/config.env" });

// Init app server
const app = express();

// Get port to listen on this server
const PORT = process.env.PORT || 5000;

// Let server to listen PORT
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
