import { Plan } from "../models/plan.model";

class PlanService {
  getAllPlans = async () => {
    const plans = await Plan.find();
    return plans;
  }

  createPlan = async (plan:any) => {
    const newPlan = await Plan.create(plan);
    return newPlan;
  }

  getPlanById = async (id: string) => {
    const plan = await Plan.findById(id);
    return plan;
  }

  getPlanByName = async (name: string) => {
    const plan = await Plan.findOne({ name });
    return plan;
  }
}

export const planService = new PlanService();