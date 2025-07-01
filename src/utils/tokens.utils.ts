import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../configs/config';
import { ApiError } from './api.error';

class TokensUtils {
  generateToken = (payload: any, expiresIn: SignOptions['expiresIn']) => {
    return jwt.sign(payload, config.jwtSecret as string, { expiresIn });
  };

  verifyToken = (token: string) => {
    try {
      return jwt.verify(token, config.jwtSecret as string);
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new ApiError(401, 'Token expired');
      }
      
      throw new ApiError(401, error.message || 'Unauthorized');
    }
  };
}

export const tokensUtils = new TokensUtils();
