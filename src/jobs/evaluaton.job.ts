// src/jobs/evaluationJob.ts
import Queue from 'bull';
import mongoose from 'mongoose';
import { config } from '../configs/config';
import Organization from '../models/organization.model';

// import { evaluateWithGemini } from '../services/geminiService';
// import { updateTokens } from '../services/tokenService';
// import Organization from '../models/Organization';
// import Evaluation from '../models/Evaluation';
// import EvaluationToken from '../models/EvaluationToken';
// import { downloadFromS3 } from '../utils/fileUpload';
// import { preprocessFile } from '../utils/preprocess';

interface JobData {
  submissionId: string;
  fileUrl: string;
  metadata: { questionPaperType: string; organizationId: string };
}

const evaluationQueue = new Queue<JobData>('evaluation', config.redisUrl);

evaluationQueue.process(async (job) => {
  const { submissionId, fileUrl, metadata } = job.data;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const organization = await Organization.findById(metadata.organizationId).session(session);
    if (!organization || organization.tokens <= 0) throw new Error('Insufficient tokens');

    

    // const fileContent = await downloadFromS3(fileUrl);
    // const processedData = await preprocessFile(fileContent, metadata.questionPaperType);
    // const { score, feedback, inputTokens, outputTokens } = await evaluateWithGemini(
    //   processedData,
    //   metadata.questionPaperType
    // );

    // await Evaluation.create(
    //   [{
    //     submissionId,
    //     score,
    //     feedback,
    //     tokensUsed: inputTokens + outputTokens,
    //   }],
    //   { session }
    // );
    // await EvaluationToken.create(
    //   [{
    //     submissionId,
    //     inputTokens,
    //     outputTokens,
    //   }],
    //   { session }
    // );
    // await updateTokens(metadata.organizationId, inputTokens + outputTokens, session);

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    console.error('Evaluation failed:', error);
    throw error;
  } finally {
    session.endSession();
  }
});

export const addEvaluationJob = async (submissionId: string, fileUrl: string, metadata: any): Promise<void> => {
  await evaluationQueue.add({ submissionId, fileUrl, metadata }, { attempts: 3 });
};