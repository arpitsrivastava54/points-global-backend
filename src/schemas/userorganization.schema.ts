import { z } from 'zod';


const userOrganizationSchema = z.object({
  userId: z.string(),
  organizationId: z.string(),
});