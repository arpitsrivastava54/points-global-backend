// src/controllers/evaluationController.ts
import { Response, Request } from 'express';
import { asyncWrapper } from '../utils/trycatch.utils';
import { apiResponse } from '../utils/api.response';
import { evaluationService } from '../services/evaluation.service';
import { IEvaluationData } from '../types/types';
import { ApiError } from '../utils/api.error';

class EvaluationController {
  getEvaluationBySubmissionId = asyncWrapper(
    async (req: Request, res: Response) => {
      const { submissionId } = req.params;
      
      const evaluation = await evaluationService.getEvaluationBySubmissionId(submissionId);
      if (!evaluation) throw new ApiError(404, 'Evaluation not found');

      apiResponse(res, {
        message: 'Evaluation fetched',
        data: evaluation,
      });
    }
  )
}

export const evaluationController = new EvaluationController();