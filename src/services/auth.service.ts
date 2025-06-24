import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/user.model';
import Organization from '../models/organization.model';
import PasswordReset from '../models/passwordreset.model';

import { EmailService } from './email.service';
import { UserRole } from '../types/enums';
import { ApiError } from '../utils/api.error';
import { config } from '../configs/config';
import { IUserDto, toUserDto } from '../dtos/user.dto';
import { organizationService } from './organization.service';
import { userService } from './user.service';
import { tokensUtils } from '../utils/tokens.utils';

class AuthService {
  signup = async (
    email: string,
    password: string,
    role: UserRole,
    name: string = 'User',
    organizationName?: string
  ): Promise<IUserDto> => {

    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) throw new ApiError(400, 'User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser(email, hashedPassword, role, name );

    if (organizationName) {
      organizationService.createOrganization(organizationName, user._id as string);
    }

    // Generate email verification token
    const verificationToken = jwt.sign(
      { userId: user._id },
      config.jwtSecret as string,
      { expiresIn: '24h' }
    );

    // Send email verification
    await EmailService.sendEmailVerification(email, verificationToken);

    return toUserDto(user);
  };

  login = async (email: string, password: string): Promise<{ token: string; user: IUserDto }> => {
    const user = await userService.getUserByEmail(email)

    if (!user || !user.isVerified) throw new ApiError(401, 'User not found or not verified');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    const token = tokensUtils.generateToken({ userId: user._id, role: user.role }, config.jwtExpiration as any);
    return { token, user: toUserDto(user) };
  };

  verifyEmail = async (token: string): Promise<void> => {
    try {
      const { userId } = tokensUtils.verifyToken(token) as { userId: string };

      const user = await userService.getUserById(userId);
      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      if (user.isVerified) {
        throw new ApiError(400, 'Email is already verified');
      }

      await userService.updateUser(userId, { isVerified: true });
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new ApiError(400, 'Invalid or expired verification token');
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new ApiError(400, 'Verification token has expired');
      }
      throw error;
    }
  };

  forgotPassword = async (email: string): Promise<void> => {
    const user = await userService.getUserByEmail(email);
    if (!user) throw new ApiError(404, 'User not found');

    const resetToken = tokensUtils.generateToken({ userId: user._id }, '1h');

    await EmailService.sendPasswordResetEmail(email, resetToken);

  };

  resetPassword = async (token: string, password: string): Promise<void> => {
    const { userId } = tokensUtils.verifyToken(token) as { userId: string };

    const user = await userService.getUserById(userId);
    if (!user) throw new ApiError(404, 'User not found');

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(userId, { password: hashedPassword });
  };

  resendVerificationEmail = async (email: string): Promise<void> => {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    if (user.isVerified) {
      throw new ApiError(400, 'Email is already verified');
    }

    // Generate new verification token
    const verificationToken = tokensUtils.generateToken({ userId: user._id }, '24h');

    // Send email verification
    try {
      await EmailService.sendEmailVerification(email, verificationToken);
    } catch (error) {
      console.error('Failed to send email verification:', error);
      throw new ApiError(500, 'Failed to send verification email');
    }
  };
}

const authService = new AuthService();
export default authService;

