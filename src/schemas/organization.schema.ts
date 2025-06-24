import { z } from 'zod';


export const organizationSchema = z.object({
  name: z.string(),
  ownerId: z.string(),
  tokens: z.number().default(0),
});
