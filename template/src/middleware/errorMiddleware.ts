import { Request, Response, NextFunction } from 'express';
import AppError from '../errorHandlers/AppError';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ error: err.message, errors: err.errors });
  }

  console.error('Unexpected Error:', err);

  res.status(500).json({ error: 'Internal Server Error' });
  next();
};

export { errorHandler };
