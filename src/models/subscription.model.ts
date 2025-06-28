import mongoose, { Schema, Document } from 'mongoose';
import Organization from './organization.model';
import { ApiError } from '../utils/api.error';

export interface ISubscription extends Document {
  organizationId: mongoose.Types.ObjectId;
  planId: mongoose.Types.ObjectId;
  tokens: number;
  expiresAt: Date;
}

const SubscriptionSchema: Schema = new Schema<ISubscription>({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  planId: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
  tokens: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
}, {
  timestamps: true,
});

SubscriptionSchema.post('save', async function (doc, next) {
  const organization = await Organization.findById(doc.organizationId);
  if (!organization) return next(new ApiError(400, 'Organization not found'));
  organization.subscription = doc._id as mongoose.Types.ObjectId;
  await organization.save();
  next();
});

const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);

export default Subscription;