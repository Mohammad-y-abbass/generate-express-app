import AppError from './AppError';

export default class InvalidCredentialsError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}
