import { Worker } from "bullmq";
import { ISubmission } from "../models/submission.model";
import { ApiError } from "../utils/api.error";
import { EvaluationStatus, EvaluationType } from "../types/enums";
import Organization from "../models/organization.model";
import Subscription from "../models/subscription.model";
import Evaluation from "../models/evaluation.model";
import { JobData, redisConnection } from "../jobs/evaluation.job";
import { submissionService } from "../services/submission.service";
import { connectDB } from "../configs/database";
import mongoose from "mongoose";
import { evaluationWithGemini } from "../utils/gemini.utils";

let worker: Worker;

export const initializeWorker = async () => {
  try {
    worker = new Worker<JobData>("evaluation", async (job) => {
      console.log("Evaluation job started for ==> ", job.data.metadata.evaluationType);
      console.log("Job Data ==> ", job.data);

      const { submissionId, files, metadata } = job.data;

      let submission: ISubmission | null = null;

      try {
        console.log("Submission ID ==> ", submissionId);

        submission = await submissionService.getSubmissionById(submissionId);
        if (!submission) throw new ApiError(400, 'Submission not found');

        console.log("Student Submission ID ==> ", submission.rollNo);

        submission.status = EvaluationStatus.Processing;
        await submission.save();

        console.log("Marked evaluation status as processing ...");

        const organization = await Organization.findById(metadata.organizationId);
        if (!organization) throw new ApiError(400, 'Organization not found');

        const subscription = await Subscription.findById(organization.subscription);
        if (!subscription) throw new ApiError(400, 'Subscription not found');

        // if (subscription.tokens <= 0) throw new ApiError(400, 'Insufficient tokens');

        console.log("Evaluating the answer ...");
        const response = await evaluationWithGemini(metadata.evaluationType as EvaluationType, files);

        if (!response) throw new ApiError(400, 'Failed to evaluate the answer');

        console.log("Evaluation Completed ...");

        console.log("Creating evaluation ...");
        const evaluation = await Evaluation.create({
          submissionId,
          data: response,
        })

        if (!evaluation) throw new ApiError(400, 'Failed to create evaluation');

        console.log("Updating subscription tokens ...");
        subscription.tokens = subscription.tokens - (response as any).metadata.tokensUsed;
        await subscription.save();

        console.log("Updating submission status ...");
        submission.status = EvaluationStatus.Evaluated;
        await submission.save();

        console.log("Evaluation job completed ...");

        return Promise.resolve();
      } catch (error) {

        if (submission) {
          try {
            submission.status = EvaluationStatus.Failed;
            await submission.save();
          } catch (saveError) {
            console.error("Failed to update submission status:", saveError);
          }
        }
        console.error('Evaluation failed:', error);
        return Promise.reject(error);
      }
    }, {
      connection: redisConnection
    });

    worker.on("error", (error) => {
      console.error("Evaluation worker error:", error);
    });

    worker.on("closed", () => {
      console.log("Evaluation worker closed");
    });

    // Handle graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('SIGTERM received, closing worker...');
      await worker.close();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      console.log('SIGINT received, closing worker...');
      await worker.close();
      process.exit(0);
    });

    console.log("Evaluation worker started successfully ...");
  } catch (error) {
    console.error("Failed to initialize worker:", error);
    process.exit(1);
  }
};

// Initialize the worker
// initializeWorker();


