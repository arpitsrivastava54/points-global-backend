import { Request, Response } from "express";
import { asyncWrapper } from "../utils/trycatch.utils";
import { submissionService } from "../services/submission.service";
import { IEvaluationData } from "../types/types";
import { apiResponse } from "../utils/api.response";
import { ApiError } from "../utils/api.error";

class SubmissionController {

  submitEvaluation = asyncWrapper(
    async (req: Request, res: Response) => {
      const { studentName, email, rollNo, evaluationType, organizationId } = req.body;

      const files = req.files;
      if (!files || files.length === 0) throw new Error('Files are required');

      if(evaluationType.split("_").length !== files.length) throw new ApiError(400, `All Evaluations files ${evaluationType.split("_").join(",")} are required`);

      const submission = await submissionService.submitEvaluation(
        { studentName, email, rollNo, evaluationType, files } as IEvaluationData,
        req.user!.userId,
        organizationId
      );

      apiResponse(res, {
        message: 'Evaluation submitted',
        data: submission,
      });
    }
  )

  getAllSubmissions = asyncWrapper(
    async (req: Request, res: Response) => {
      const submissions = await submissionService.getAllSubmissions();
      apiResponse(res, {
        message: 'Submissions fetched',
        data: submissions,
      });
    }
  )
}

export const submissionController = new SubmissionController();