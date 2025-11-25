import { Response } from 'express';
import { ApiResponse, ErrorResponse } from '../types';

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  error: string,
  message: string = 'An error occurred',
  statusCode: number = 500
): Response => {
  const response: ErrorResponse = {
    success: false,
    error,
    message
  };
  return res.status(statusCode).json(response);
};