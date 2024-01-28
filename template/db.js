const mongoose = require('mongoose');

function connectDB(MONGO_URI) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
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
