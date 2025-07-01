// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';

import authService from '../services/auth.service';
import { asyncWrapper } from '../utils/trycatch.utils';
import { ApiError } from '../utils/api.error';
import { apiResponse } from '../utils/api.response';
import { config } from '../configs/config';
import { userService } from '../services/user.service';

class AuthController {

  signup = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role, organizationName, name } = req.body;
    const user = await authService.signup(email, password, role, name, organizationName);


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
    const loginToken = await authService.verifyEmail(token as string);
    res.redirect(`${config.frontendUrl}/api/login-with-token?token=${loginToken}`);
    // apiResponse(res, {
    //   statusCode: 200,
    //   message: 'Email verified successfully',
    // })
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

  getMe = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.getUserById(req?.user?.userId as string);
    apiResponse(res, {
      statusCode: 200,
      message: 'User fetched successfully',
      data: user,
    })
  })

}

const authController = new AuthController();
export default authController;
