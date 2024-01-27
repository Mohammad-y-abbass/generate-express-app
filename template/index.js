const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

//initialize express app
const app = express();

//middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

//routes goes here

// handle all the unhandled routes
app.all('*', (req, res, next) => {
  const err = new apiError(`Can't find ${req.originalUrl} on this server`, 404);
  next(err);
});

// global error handler
app.use(globalErrorHandler);

//db config

//start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
