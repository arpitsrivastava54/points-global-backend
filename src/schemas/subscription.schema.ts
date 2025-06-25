import { z } from "zod";


export const subscriptionSchema = z.object({
  organizationId: z.string(),
  planId: z.string(),
})