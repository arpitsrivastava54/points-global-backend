import mongoose, { Schema, Document } from 'mongoose';
import { EvaluationStatus, EvaluationType, QuestionPaperType } from '../types/enums';

export interface ISubmission extends Document {
  organizationId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  studentName: string;
  email?: string;
  rollNo: string;
  fileUrl: string;
  status: EvaluationStatus;
  evaluationType: EvaluationType;
}

const SubmissionSchema: Schema = new Schema({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  studentName: { type: String, required: true },
  email: { type: String },
  rollNo: { type: String, required: true },
  evaluationType: { type: String, enum: EvaluationType, required: true },
  files: [{ type: String, required: true }],
  status: { type: String, enum: EvaluationStatus, default: EvaluationStatus.Pending },
}, {
  timestamps: true,
});

const Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema);

export default Submission;