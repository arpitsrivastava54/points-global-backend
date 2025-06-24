import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api.error';

export const roleMiddleware = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !roles.includes(req.user.role)) {
    throw new ApiError(403, `Forbidden , you are not authorized to access this resource`);
  }
  next();
};