import { Router } from 'express';

import authController from '../controllers/auth.controller';
import { zodMiddleware } from '../middlewares/zod.middleware';
import { forgotPasswordSchema, loginSchema, signupSchema } from '../schemas/auth.schema';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/signup', zodMiddleware(signupSchema), authController.signup);
router.post('/login', zodMiddleware(loginSchema), authController.login);

router.get('/verify', authController.verifyEmail);

router.post('/forgot-password', zodMiddleware(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

router.get('/me', authMiddleware, authController.getMe);

export default router;