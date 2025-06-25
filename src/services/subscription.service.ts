import { organizationService } from './organization.service';
import { planService } from './plan.service';
import { ApiError } from '../utils/api.error';
import Subscription, { ISubscription } from '../models/subscription.model';
import { PlanDuration, PlanMap, PlanType } from '../types/enums';





class SubscriptionService {
  createSubscription = async (
    organizationId: string,
    planId: string,
  ): Promise<any> => {
    const organization = await organizationService.getOrganizationById(organizationId);
    if (!organization) throw new ApiError(404, 'Unauthorized or organization not found');

    const plan = await planService.getPlanById(planId);
    if (!plan) throw new ApiError(404, 'Invalid plan');

    const planData = PlanMap[plan.type];
    const expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

    const subscription = await Subscription.create({ organizationId, planId, tokens: planData.tokens, expiresAt: expiry });

    return subscription;
    // const price = plan.price * 100;
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: 'inr',
    //         product_data: { name: `${plan.tokens} Tokens` },
    //         unit_amount: plan.price,
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: 'payment',
    //   success_url: 'http://yourapp.com/success',
    //   cancel_url: 'http://yourapp.com/cancel',
    //   metadata: { organizationId, tokens: plan.tokens.toString() },
    // });

    // return session;
  };

  getAllSubscriptions = async (): Promise<ISubscription[]> => {
    const subscriptions = await Subscription.find();
    return subscriptions;
  };

  getSubscriptionsByOrgId = async (organizationId: string): Promise<ISubscription[]> => {
    const subscriptions = await Subscription.find({ organizationId });
    return subscriptions;
  };

  // buyAddOn = async (
  //   organizationId: string,
  //   tokens: number,
  //   userId: string
  // ): Promise<Stripe.Checkout.Session> => {
  //   const organization = await Organization.findOne({ _id: organizationId, ownerId: userId });
  //   if (!organization) throw new Error('Unauthorized or organization not found');

  //   const price = tokens * 1000; // ₹10 per token in paise
  //   const session = await stripe.checkout.sessions.create({
  //     payment_method_types: ['card'],
  //     line_items: [
  //       {
  //         price_data: {
  //           currency: 'inr',
  //           product_data: { name: `${tokens} Add-On Tokens` },
  //           unit_amount: price,
  //         },
  //         quantity: 1,
  //       },
  //     ],
  //     mode: 'payment',
  //     success_url: 'http://yourapp.com/success',
  //     cancel_url: 'http://yourapp.com/cancel',
  //     metadata: { organizationId, tokens: tokens.toString() },
  //   });

  //   return session;
  // };

  // getSubscriptions = async (organizationId: string, userId: string): Promise<ISubscription[]> => {
  //   const organization = await Organization.findOne({ _id: organizationId, ownerId: userId });
  //   if (!organization) throw new Error('Unauthorized or organization not found');
  //   return Subscription.find({ organizationId }).populate('organizationId');
  // };

  // handleStripeWebhook = async (req: Request, res: Response) => {
  //   const event = req.body;
  //   if (event.type === 'checkout.session.completed') {
  //     const { organizationId, tokens } = event.data.object.metadata;
  //     const session = await mongoose.startSession();
  //     session.startTransaction();
  //     try {
  //       await Organization.findByIdAndUpdate(
  //         organizationId,
  //         { $inc: { tokens: Number(tokens) } },
  //         { session }
  //       );
  //       await Subscription.create(
  //         [{
  //           organizationId,
  //           planId: event.data.object.id,
  //           tokens: Number(tokens),
  //           expiresAt: new Date(Date.now() + 30 * 24 * 3600000),
  //         }],
  //         { session }
  //       );
  //       await session.commitTransaction();
  //     } catch (error) {
  //       await session.abortTransaction();
  //       throw error;
  //     } finally {
  //       session.endSession();
  //     }
  //   }
  //   res.json({ received: true });
  // };
}

export const subscriptionService = new SubscriptionService();