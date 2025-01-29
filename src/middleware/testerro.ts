/* eslint-disable @typescript-eslint/no-unused-vars */
//src/middleware/errorHandler.ts
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import AppError from '@shared/errors/AppError';

export default function erroHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  // Se o erro for de validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Erro de validação',
      errors: errors.array(),
    });
  }
  // Se for um erro conhecido (AppError)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      errors: err.errors ?? [],
    });
  }
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
