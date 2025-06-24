// src/models/Submission.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
  organizationId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  studentName: string;
  email?: string;
  rollNo: string;
  questionPaperType: 'QP' | 'QPA' | 'QPM' | 'AFR' | 'AMO' | 'AMP' | 'MS';
  fileUrl: string;
  createdAt: Date;
}

const SubmissionSchema: Schema = new Schema({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  studentName: { type: String, required: true },
  email: { type: String },
  rollNo: { type: String, required: true },
  questionPaperType: { type: String, enum: ['QP', 'QPA', 'QPM', 'AFR', 'AMO', 'AMP', 'MS'], required: true },
  fileUrl: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.model<ISubmission>('Submission', SubmissionSchema);