import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../configs/config';

class TokensUtils {
  generateToken = (payload: any, expiresIn: SignOptions['expiresIn']) => {
    return jwt.sign(payload, config.jwtSecret as string, { expiresIn });
  };

  verifyToken = (token: string) => {
    return jwt.verify(token, config.jwtSecret as string);
  };
}

export const tokensUtils = new TokensUtils();
