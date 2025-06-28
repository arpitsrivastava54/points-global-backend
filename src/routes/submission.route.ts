import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { submissionController } from "../controllers/submission.controller";
import multer from "multer";
import { zodMiddleware } from "../middlewares/zod.middleware";
import { submissionSchema } from "../schemas/submission.schema";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.use(authMiddleware);

router
.post('/', upload.array('files'), zodMiddleware(submissionSchema), submissionController.submitEvaluation)
.get('/', submissionController.getAllSubmissions)
// .get('/:submissionId', submissionController.getSubmissionById);

export default router;