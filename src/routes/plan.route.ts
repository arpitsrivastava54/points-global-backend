import { Router } from "express";
import { planController } from "../controllers/plan.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { zodMiddleware } from "../middlewares/zod.middleware";
import { planSchema } from "../schemas/plan.schema";

const router = Router();

router.use(authMiddleware);

router
.get('/', planController.getAllPlans)
.post('/',zodMiddleware(planSchema), planController.createPlan)


export default router;