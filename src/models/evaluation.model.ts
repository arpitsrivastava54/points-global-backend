import mongoose, { Schema, Document } from 'mongoose';

export interface IEvaluation extends Document {
  submissionId: mongoose.Types.ObjectId;
  score?: number;
  feedback?: string;
  tokensUsed: number;
}

const EvaluationSchema: Schema = new Schema({
  submissionId: { type: Schema.Types.ObjectId, ref: 'Submission', required: true },
  score: { type: Number },
  feedback: { type: String },
  tokensUsed: { type: Number, required: true },
}, {
  timestamps: true,
});

export default mongoose.model<IEvaluation>('Evaluation', EvaluationSchema);