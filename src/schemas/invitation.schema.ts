import { z } from 'zod';

export const invitationSchema = z.object({
  email: z.string().email(),
  organizationId: z.string(),
});