import mongoose, { Schema, Document } from 'mongoose';

export interface IEvaluationToken extends Document {
  submissionId: mongoose.Types.ObjectId;
  inputTokens: number;
  outputTokens: number;
}

const EvaluationTokenSchema: Schema = new Schema({
  submissionId: { type: Schema.Types.ObjectId, ref: 'Submission', required: true },
  inputTokens: { type: Number, required: true },
  outputTokens: { type: Number, required: true },
}, {
  timestamps: true,
});

export default mongoose.model<IEvaluationToken>('EvaluationToken', EvaluationTokenSchema);