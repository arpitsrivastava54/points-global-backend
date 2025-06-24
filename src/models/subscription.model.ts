// src/models/Subscription.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
  organizationId: mongoose.Types.ObjectId;
  planId: string;
  tokens: number;
  expiresAt: Date;
}

const SubscriptionSchema: Schema = new Schema<ISubscription>({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  planId: { type: String, required: true },
  tokens: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
}, {
  timestamps: true,
});

export default mongoose.model<ISubscription>('Subscription', SubscriptionSchema);