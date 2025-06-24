// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';

import authService from '../services/auth.service';
import { asyncWrapper } from '../utils/trycatch.utils';
import { ApiError } from '../utils/api.error';
import { apiResponse } from '../utils/api.response';

class AuthController {

  signup = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role, organizationName } = req.body;
    const user = await authService.signup(email, password, role, organizationName);


    apiResponse(res, {
      statusCode: 201,
      message: 'User created.',
      data: user,
    })
  });

  login = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const { token, user } = await authService.login(email, password);

    apiResponse(res, {
      statusCode: 200,
      message: 'User logged in.',
      data: { token, user },
    })
  });

  verifyEmail = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.query;
    await authService.verifyEmail(token as string);

    apiResponse(res, {
      statusCode: 200,
      message: 'Email verified successfully',
    })
  });

  forgotPassword = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    await authService.forgotPassword(email);
    apiResponse(res, {
      statusCode: 200,
      message: 'Password reset link sent',
    })
  });

  resetPassword = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { token, password } = req.body;
    await authService.resetPassword(token, password);
    
    apiResponse(res, {
      statusCode: 200,
      message: 'Password reset successfully',
    })
  })
}

const authController = new AuthController();
export default authController;
