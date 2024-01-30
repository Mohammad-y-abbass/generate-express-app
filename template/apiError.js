// Define a new class `apiError` that extends the built-in `Error` class.
class apiError extends Error {
  constructor(message, statusCode) {
    // Call the constructor of the `Error` superclass with the `message` argument.
    super(message);

    // Set the `statusCode` property to the `statusCode` argument passed into the constructor.
    this.statusCode = statusCode;

    // Set the `status` property based on the `statusCode`. If the `statusCode` starts with '4', set `status` to 'fail'. Otherwise, set it to 'error'.
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    // Set the `isOperational` property to `true`. This is used to differentiate between operational errors (like a problem with the server) and programming errors.
    this.isOperational = true;
  }
}

module.exports = apiError;
