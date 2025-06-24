import mongoose, { Schema, Document } from 'mongoose';
import { OrgUserRole } from '../types/enums';

export interface IUserOrganization extends Document {
  userId: mongoose.Types.ObjectId;
  organizations: {
    organizationId: mongoose.Types.ObjectId;
    role: OrgUserRole;
  };
}

const UserOrganizationSchema: Schema = new Schema<IUserOrganization>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  organizations: [
    {
      organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
      role: { type: String, enum: ['Member', 'Owner']},
    }
  ],
}, {
  timestamps: true,
});

const UserOrganization =  mongoose.model<IUserOrganization>('UserOrganization', UserOrganizationSchema);

export default UserOrganization;