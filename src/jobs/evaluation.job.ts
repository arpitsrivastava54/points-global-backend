import { Queue } from 'bullmq';
import { config } from '../configs/config';
import IORedis from 'ioredis';

export interface JobData {
  submissionId: string;
  files: string[];
  metadata: { evaluationType: string; organizationId: string };
}

export const redisConnection = new IORedis(config.redisUrl,{
  maxRetriesPerRequest:null
});

const evaluationQueue = new Queue<JobData>('evaluation', { connection: redisConnection });

console.log("Evaluation queue created ...");


export const addEvaluationJob = async (submissionId: string, files: string[], metadata: any): Promise<void> => {
  console.log("Adding evaluation job for submissionId ==> ", submissionId);
  await evaluationQueue.add(`EvaluationType-${metadata.evaluationType}`, { submissionId, files, metadata }, { attempts: 3, delay: 1000 * 60 }); // IT WILL PROCESS THE JOB AFTER 1 MINUTE
};