import { z } from 'zod';

export const evaluationSchema = z.object({
  studentName: z.string(),
  email: z.string().email(),
  rollNo: z.string(),
  questionPaperType: z.enum(['QP', 'QPA', 'QPM', 'AFR', 'AMO', 'AMP', 'MS']),
  file: z.any(),
  organizationId: z.string(),
})