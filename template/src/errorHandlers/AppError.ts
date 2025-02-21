import { ValidationError } from 'express-validator';

class AppError extends Error {
  public readonly statusCode: number;
  public errors: ValidationError[];

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.errors = [];
  }
}

export default AppError;
