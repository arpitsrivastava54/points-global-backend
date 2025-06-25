import mongoose, { Schema, Document } from 'mongoose';

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

const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);

export default Subscription;