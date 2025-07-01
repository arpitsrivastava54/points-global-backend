// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api.error';
import { tokensUtils } from '../utils/tokens.utils';


declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) throw new ApiError(401, 'No token provided');

    const decoded = tokensUtils.verifyToken(token) as { userId: string; role: string };
    req.user = decoded;

    next();
  } catch (error: any) {
    next(new ApiError(401, error.message || 'Unauthorized'));
  }
};