// This is a global error handler for the Express.js application.
const globalErrorHandler = (err, req, res, next) => {
  // If the error object already has a `statusCode` property, use that. Otherwise, default to `500`.
  err.statusCode = err.statusCode || 500;

  // If the error object already has a `status` property, use that. Otherwise, default to `'error'`.
  err.status = err.status || 'error';

  // Send a response to the client. Set the HTTP status code to `err.statusCode` and send a JSON response with the error details.
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = globalErrorHandler;
