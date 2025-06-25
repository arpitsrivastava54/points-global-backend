import mongoose, { Schema, Document } from 'mongoose';
import { EvaluationStatus } from '../types/enums';

export interface IEvaluation extends Document {
  submissionId: mongoose.Types.ObjectId;
  score?: number;
  feedback?: string;
  tokensUsed: number;
}

const EvaluationSchema: Schema = new Schema({
  submissionId: { type: Schema.Types.ObjectId, ref: 'Submission', required: true },
  status: { type: String, enum: EvaluationStatus, default: EvaluationStatus.Pending },
  score: { type: Number },
  feedback: { type: String },
  tokensUsed: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const Evaluation = mongoose.model<IEvaluation>('Evaluation', EvaluationSchema);

export default Evaluation;