import { ValidationError } from 'express-validator';

class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly errors?: ValidationError[];

  constructor(message: string, statusCode = 400, errors?: ValidationError[]) {
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export default AppError;
