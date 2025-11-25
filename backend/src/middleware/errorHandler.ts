import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return sendError(res, err.message, 'Validation Error', 400);
  }

  if (err.name === 'CastError') {
    return sendError(res, 'Invalid ID format', 'Bad Request', 400);
  }

  return sendError(
    res,
    err.message || 'Internal Server Error',
    'Server Error',
    500
  );
};

export const notFoundHandler = (
  req: Request,
  res: Response
): Response => {
  return sendError(
    res,
    `Route ${req.originalUrl} not found`,
    'Not Found',
    404
  );
};