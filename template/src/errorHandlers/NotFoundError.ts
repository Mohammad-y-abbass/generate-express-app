import AppError from './AppError';

class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export default NotFoundError;
