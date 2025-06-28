import { z } from 'zod';


export const submissionSchema = z.object({
  organizationId: z.string(),
  studentName: z.string(),
  email: z.string().email(),
  rollNo: z.string(),
  evaluationType: z.enum(['QP_AFR', 'QP_AFR_MS', 'QPA', 'QPA_MS', 'QPM', 'QPM_MS', 'QP_AMO', 'QP_AMO_MS', 'QP_AMP', 'QP_AMP_MS']),
});