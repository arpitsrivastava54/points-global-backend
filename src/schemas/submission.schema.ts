import { z } from 'zod';


export const submissionSchema = z.object({
  organizationId: z.string(),
  userId: z.string(),
  studentName: z.string(),
  email: z.string().email(),
  rollNo: z.string(),
  questionPaperType: z.enum(['QP', 'QPA', 'QPM', 'AFR', 'AMO', 'AMP', 'MS']),
  fileUrl: z.string(),
});