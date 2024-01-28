const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const apiError = require('./utils/apiError');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const connectDB = require('./config/db');

//initialize express app
const app = express();

//middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

//routes go here


// handle all the unhandled routes
app.all('*', (req, res, next) => {
  const err = new apiError(`Can't find ${req.originalUrl} on this server`, 404);
  next(err);
});

// global error handler
app.use(globalErrorHandler);

//db config
connectDB(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
});

//start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
