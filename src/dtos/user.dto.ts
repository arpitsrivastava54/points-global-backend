import { IUser } from "../models/user.model";
import { UserRole } from "../types/enums";
import { IBaseDto } from "./base.dto";

export interface IUserDto extends IBaseDto {
  email: string;
  name: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
}

export const toUserDto = (user: IUser): IUserDto => {
  return {
    id: user._id as string,
    email: user.email,
    name: user.name,
    role: user.role,
    isVerified: user.isVerified,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};