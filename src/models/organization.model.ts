// src/models/Organization.ts
import mongoose, { Schema, Document } from 'mongoose';
import { OrgUserRole } from '../types/enums';

export interface IOrganization extends Document {
  name: string;
  ownerId: mongoose.Types.ObjectId;
  subscription: mongoose.Types.ObjectId;
}

const OrganizationSchema: Schema = new Schema<IOrganization>({
  name: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subscription: { type: Schema.Types.ObjectId, ref: 'Subscription' },
}, {
  timestamps: true,
});


const Organization = mongoose.model<IOrganization>('Organization', OrganizationSchema);

export default Organization;