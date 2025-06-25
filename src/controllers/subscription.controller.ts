// src/controllers/subscriptionController.ts
import { Request, Response, NextFunction } from 'express';
import { asyncWrapper } from '../utils/trycatch.utils';
import { apiResponse } from '../utils/api.response';
import { subscriptionService } from '../services/subscription.service';
import { ISubscription } from '../models/subscription.model';
import { ApiError } from '../utils/api.error';

class SubscriptionController {
  createSubscription = asyncWrapper(
    async (req: Request, res: Response) => {
      const { organizationId, planId } = req.body as ISubscription;
      
      const subscription = await subscriptionService.createSubscription(organizationId.toString(), planId.toString());
      if (!subscription) throw new ApiError(400, 'Subscription creation failed');
      
      apiResponse(res, {
        message: 'Subscription created successfully',
        data: subscription,
      });
    }
  )

  getAllSubscriptions = asyncWrapper(
    async (req: Request, res: Response) => {
      const subscriptions = await subscriptionService.getAllSubscriptions();
      apiResponse(res, {
        message: 'All subscriptions fetched successfully',
        data: subscriptions,
      }); 
    }
  )

  getSubscriptionsByOrgId = asyncWrapper(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      if (!id) throw new ApiError(400, 'Organization ID is required');

      const subscriptions = await subscriptionService.getSubscriptionsByOrgId(id.toString());
      
      apiResponse(res, {
        message: 'Subscriptions fetched successfully',
        data: subscriptions,  
      });
    }
  )

  

  // buyAddOn = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  //   try {
  //     const { organizationId, tokens } = req.body;
  //     const session = await buyAddOn(organizationId, tokens, req.user!.userId);
  //     res.json({ session });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // getSubscriptions = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  //   try {
  //     const { organizationId } = req.params;
  //     const subscriptions = await getSubscriptions(organizationId, req.user!.userId);
  //     res.json(subscriptions);
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export const subscriptionController = new SubscriptionController();