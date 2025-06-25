import Submission, { ISubmission } from '../models/submission.model';
import UserOrganization from '../models/userorganization.model';

import { organizationService } from './organization.service';

import { ApiError } from '../utils/api.error';
import { IEvaluationData } from '../types/types';
import { uploadToS3 } from '../utils/fileupload.utils';
import { addEvaluationJob } from '../jobs/evaluaton.job';

class EvaluationService {
  submitEvaluation = async (
    data: IEvaluationData,
    userId: string,
    organizationId: string
  ): Promise<ISubmission> => {
    const { studentName, email, rollNo, questionPaperType, file } = data;

    const organization = await organizationService.getOrganizationById(organizationId);
    if (!organization) throw new ApiError(404, 'Organization not found');


    const userOrg = await UserOrganization.findOne({ userId, organizationId });
    if (!userOrg && organization.ownerId.toString() !== userId) throw new ApiError(400, 'User Organization not found');

    const fileUrl = await uploadToS3(file, `submissions/${organizationId}/${Date.now()}_${file.originalname}`);
    console.log("fileUrl ==> ",fileUrl);

    const submission = await Submission.create({
      organizationId,
      userId,
      studentName,
      email,
      rollNo,
      questionPaperType,
      fileUrl,
    });

    await addEvaluationJob(submission._id as string, fileUrl, { questionPaperType, organizationId });

    return submission;
  };

  // getEvaluations = async (
  //   organizationId: string,
  //   userId: string,
  //   filters: { studentName?: string; rollNo?: string; startDate?: string; endDate?: string }
  // ): Promise<ISubmission[]> => {
  //   const organization = await Organization.findById(organizationId);
  //   if (!organization) throw new Error('Organization not found');

  //   const userOrg = await UserOrganization.findOne({ userId, organizationId });
  //   if (!userOrg && organization.ownerId.toString() !== userId) throw new Error('Unauthorized');

  //   const query: any = { organizationId };
  //   if (filters.studentName) query.studentName = { $regex: filters.studentName, $options: 'i' };
  //   if (filters.rollNo) query.rollNo = { $regex: filters.rollNo, $options: 'i' };
  //   if (filters.startDate && filters.endDate) {
  //     query.createdAt = { $gte: new Date(filters.startDate), $lte: new Date(filters.endDate) };
  //   }

  //   return Submission.find(query).populate('evaluations');
  // };

  // getEvaluationDetails = async (submissionId: string, userId: string): Promise<ISubmission | null> => {
  //   const submission = await Submission.findById(submissionId).populate('evaluations');
  //   if (!submission) throw new Error('Submission not found');

  //   const userOrg = await UserOrganization.findOne({ userId, organizationId: submission.organizationId });
  //   if (!userOrg && submission.organizationId.ownerId.toString() !== userId) throw new Error('Unauthorized');

  //   return submission;
  // };
}

export const evaluationService = new EvaluationService();