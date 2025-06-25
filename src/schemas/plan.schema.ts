import { z } from "zod";
import { PlanType } from "../types/enums";


export const planSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  tokens: z.number().min(0),
  type: z.enum([PlanType.Basic,PlanType.Standard,PlanType.Premium]),
});

export type IPlan = z.infer<typeof planSchema>;