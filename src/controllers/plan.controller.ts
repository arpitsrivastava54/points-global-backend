import { Request, Response } from "express";
import { planService } from "../services/plan.service";
import { ApiError } from "../utils/api.error";
import { apiResponse } from "../utils/api.response";
import { asyncWrapper } from "../utils/trycatch.utils";
import { IPlan } from "../models/plan.model";

class PlanController {
 getAllPlans = asyncWrapper(
  async (req: Request, res: Response) => {
    const plans = await planService.getAllPlans();

    if (!plans) throw new ApiError(404, 'No plans found');

    apiResponse(res, {
      message: 'Plans fetched successfully',
      data: plans,
    });
  }
 )

 createPlan = asyncWrapper(
  async (req: Request, res: Response) => {
    const { name, price, tokens , type } = req.body as IPlan;

    const alreadyExists = await planService.getPlanByName(name);
    if (alreadyExists) throw new ApiError(400, 'Plan already exists');
    
    const plan = await planService.createPlan({ name, price, tokens , type });

    if (!plan) throw new ApiError(400, 'Failed to create plan');

    apiResponse(res, {
      message: 'Plan created successfully',
      data: plan,
    });
  }
 )
}


export const planController = new PlanController();