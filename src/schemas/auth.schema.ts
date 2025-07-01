import { z } from 'zod'
import { UserRole } from '../types/enums';

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
  organizationName: z.string().optional(),
  // role: z.enum([UserRole.Admin,UserRole.User]).default(UserRole.User),
  // isVerified: z.boolean().default(false),
  // isActive: z.boolean().default(true),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
});
