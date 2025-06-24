import { Router } from 'express';

import authRoutes from './auth.route';
import orgRoutes from './organization.route';
import inviteRoutes from './invitation.route';
import subscriptionRoutes from './subscription.route';
import evaluationRoutes from './evaluation.route';
import tokenRoutes from './token.route';
import userOrganizationRoutes from './userorganization.route'

const router = Router();

router.use('/auth', authRoutes);
router.use('/organizations', orgRoutes);
router.use('/userorganizations', userOrganizationRoutes);
router.use('/invitations', inviteRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/evaluations', evaluationRoutes);
router.use('/tokens', tokenRoutes);

export default router;