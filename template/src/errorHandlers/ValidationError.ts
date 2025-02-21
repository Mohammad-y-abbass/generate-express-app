import AppError from './AppError';
import { ValidationError } from 'express-validator';

export default class CustomValidationError extends AppError {
  constructor(message: string, errors: ValidationError[]) {
    super(message, 400);
    this.errors = errors.map((err: ValidationError) => err.msg);
  }
}
