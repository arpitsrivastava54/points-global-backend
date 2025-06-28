import mongoose, { Schema, Document } from 'mongoose';
import { EvaluationStatus } from '../types/enums';
import { EvaluationApiResponse } from '../utils/evaluation-response.utils';

export interface IEvaluation extends Document {
  submissionId: mongoose.Types.ObjectId;
}

const EvaluationSchema: Schema = new Schema({
  submissionId: { type: Schema.Types.ObjectId, ref: 'Submission', required: true },
  data: { type: Object, default: null },
}, {
  timestamps: true,
});

const Evaluation = mongoose.model<IEvaluation>('Evaluation', EvaluationSchema);

export default Evaluation;