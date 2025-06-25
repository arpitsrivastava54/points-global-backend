import express from 'express';
import multer from 'multer';
import { authMiddleware } from '../middlewares/auth.middleware';
import { evaluationController } from '../controllers/evaluation.controller';
import { zodMiddleware } from '../middlewares/zod.middleware';
import { evaluationSchema } from '../schemas/evaluation.schema';
// import { submitEvaluation, getEvaluations, getEvaluationDetails } from '../controllers/evaluationController';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authMiddleware);

router.post('/', upload.single('file'), zodMiddleware(evaluationSchema),evaluationController.submitEvaluation);
// router.get('/:organizationId', authMiddleware, getEvaluations);
// router.get('/details/:submissionId', authMiddleware, getEvaluationDetails);

export default router;