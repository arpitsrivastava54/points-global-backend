import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../types/enums';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  role: { type: String, enum: [UserRole.Admin,UserRole.User], default: UserRole.User },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;