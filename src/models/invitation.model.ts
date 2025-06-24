import mongoose, { Schema, Document } from 'mongoose';

export interface IInvitation extends Document {
  email: string;
  organizationId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
}

const InvitationSchema: Schema = new Schema<IInvitation>({
  email: { type: String, required: true },
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true, default: new Date(Date.now() + 7 * 24 * 3600000) }, // 
}, {
  timestamps: true,
});

const Invitation = mongoose.model<IInvitation>('Invitation', InvitationSchema);

export default Invitation;