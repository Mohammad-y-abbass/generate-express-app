const mongoose = require('mongoose');

function connectDB(MONGO_URI) {
  return new Promise((resolve, reject) => {
    // Use mongoose to connect to the MongoDB database using the provided URI.
    mongoose
      .connect(MONGO_URI, {
        // The `useNewUrlParser` option is to avoid deprecation warnings from the MongoDB Node.js driver.
        useNewUrlParser: true,
        // The `useUnifiedTopology` option is to use the new Server Discover and Monitoring engine which is more modern and capable.
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Connected to MongoDB');
        resolve();
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB: ', error);
        reject(error);
      });
  });
}

module.exports = connectDB;
