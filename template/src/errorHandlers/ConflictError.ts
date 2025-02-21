import AppError from './AppError';

class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

export default ConflictError;
