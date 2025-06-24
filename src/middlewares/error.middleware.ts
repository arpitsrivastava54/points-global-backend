// src/middleware/error.ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api.error';

export const errorHandler = (error: ApiError | any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Internal server error' });
};

