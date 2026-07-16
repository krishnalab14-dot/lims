import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export interface AppError extends Error {
  status?: number;
  code?: string;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`[${status}] ${message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  res.status(status).json({
    error: message,
    code: err.code,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
