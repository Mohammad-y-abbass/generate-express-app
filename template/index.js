// Import necessary modules
const express = require('express'); // Express.js for building the server
const helmet = require('helmet'); // Helmet for setting HTTP headers for security
const morgan = require('morgan'); // Morgan for HTTP request logging
const cors = require('cors'); // CORS for Cross-Origin Resource Sharing
require('dotenv').config(); // Dotenv for loading environment variables from a .env file
const apiError = require('./utils/apiError'); // Custom error class
const globalErrorHandler = require('./middleware/globalErrorHandler'); // Global error handler
const connectDB = require('./config/db'); // Function for connecting to the database

// Initialize an Express application
const app = express();

// Use various middleware
app.use(cors()); // Enable CORS
app.use(helmet()); // Set security HTTP headers
app.use(morgan('dev')); // Log HTTP requests to the console in 'dev' format
app.use(express.json()); // Parse JSON request bodies

// Routes would go here

// Handle all unhandled routes. If a request is made to a route that doesn't exist, create a new `apiError` and pass it to the next middleware.
app.all('*', (req, res, next) => {
  const err = new apiError(`Can't find ${req.originalUrl} on this server`, 404);
  next(err);
});

// Use the global error handler
app.use(globalErrorHandler);

// Connect to the database
connectDB(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
});

// Start the server on the port specified in the environment variables
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
