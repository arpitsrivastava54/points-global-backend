import User, { IUser } from "../models/user.model";
import { UserRole } from "../types/enums";
import { ApiError } from "../utils/api.error";

class UserService {

  createUser = async (email: string, password: string, role: UserRole, name: string , isVerified: boolean = false) => {
    const user = await User.create({ email, password, role, name, isVerified });

    if (!user) throw new ApiError(400, 'Failed to create user');

    return user;
  };

  updateUser = async (id: string, data: Partial<IUser>) => {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    if (!user) throw new ApiError(400, 'Failed to update user');
    return user;
  };

  getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email });
    return user;
  };

  getUserById = async (id: string) => {
    const user = await User.findById(id);

    if (!user) throw new ApiError(400, 'User not found');

    return user;
  };
}

export const userService = new UserService();