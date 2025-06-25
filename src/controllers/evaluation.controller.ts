// src/controllers/evaluationController.ts
import { Response, Request } from 'express';
import { asyncWrapper } from '../utils/trycatch.utils';
import { apiResponse } from '../utils/api.response';
import { evaluationService } from '../services/evaluation.service';
import { IEvaluationData } from '../types/types';

class EvaluationController {
  submitEvaluation = asyncWrapper(
    async (req: Request, res: Response) => {
      const { studentName, email, rollNo, questionPaperType, organizationId } = req.body;

      const file = req.file;
      if (!file) throw new Error('File is required');

      const submission = await evaluationService.submitEvaluation(
        { studentName, email, rollNo, questionPaperType, file } as IEvaluationData,
        req.user!.userId,
        organizationId
      );

      apiResponse(res, {
        message: 'Evaluation submitted',
        data: submission,
      });
    }
  )

  // getEvaluations = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  //   try {
  //     const { organizationId } = req.params;
  //     const { studentName, rollNo, startDate, endDate } = req.query as any;
  //     const evaluations = await getEvaluations(organizationId, req.user!.userId, {
  //       studentName,
  //       rollNo,
  //       startDate,
  //       endDate,
  //     });
  //     res.json(evaluations);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // getEvaluationDetails = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  //   try {
  //     const { submissionId } = req.params;
  //     const evaluation = await getEvaluationDetails(submissionId, req.user!.userId);
  //     res.json(evaluation);
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export const evaluationController = new EvaluationController();