import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { subscriptionController } from '../controllers/subscription.controller';
import { zodMiddleware } from '../middlewares/zod.middleware';
import { subscriptionSchema } from '../schemas/subscription.schema';

const router = express.Router();

router.use(authMiddleware);

router
.get('/', subscriptionController.getAllSubscriptions)
.post('/',zodMiddleware(subscriptionSchema), subscriptionController.createSubscription);

router.get('/:id', subscriptionController.getSubscriptionsByOrgId)

// router.post('/add-on', roleMiddleware(['Owner']), buyAddOn);
// router.post('/webhook', handleStripeWebhook);

export default router;