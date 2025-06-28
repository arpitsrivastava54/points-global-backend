import { addEvaluationJob } from "../jobs/evaluation.job";
import Submission, { ISubmission } from "../models/submission.model";
import { IEvaluationData } from "../types/types";
import { uploadToS3 } from "../utils/fileupload.utils";
import { BaseService } from "./base.service";

class SubmissionService extends BaseService<ISubmission> {

  constructor() {
    super(Submission);
  }

  submitEvaluation = async (
    data: IEvaluationData,
    userId: string,
    organizationId: string
  ): Promise<ISubmission> => {
    const { studentName, email, rollNo, evaluationType, files } = data;

    const uploadedFiles = await Promise.all(files.map(async (file) => {
      return (await uploadToS3(file, `submissions/${organizationId}/${Date.now()}_${file.originalname}`)).Location;
    }));

    const submission = await Submission.create({
      organizationId,
      userId,
      studentName,
      email,
      rollNo,
      evaluationType,
      files: uploadedFiles,
    });

    await addEvaluationJob(submission._id as string, uploadedFiles, { evaluationType, organizationId });

    return submission;
  };

  getAllSubmissions = async () => {
    const submissions = await this.getAll();
    return submissions;
  }

  getSubmissionById = async (submissionId: string) => {
    const submission = await Submission.findById(submissionId);
    return submission;
  }
}

export const submissionService = new SubmissionService();