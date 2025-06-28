import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { evaluationController } from '../controllers/evaluation.controller';

const router = express.Router();

router.use(authMiddleware);

router
.get("/:submissionId", evaluationController.getEvaluationBySubmissionId)


export default router;