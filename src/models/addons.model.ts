import mongoose, { Schema, Document } from 'mongoose';

export interface IAddOn extends Document {
  organizationId: mongoose.Types.ObjectId;
  tokens: number;
  expiresAt: Date;
  createdAt: Date;
}

const AddOnSchema: Schema = new Schema({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  tokens: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
}, {
  timestamps: true,
});

export default mongoose.model<IAddOn>('AddOn', AddOnSchema);