/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default function erroHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
