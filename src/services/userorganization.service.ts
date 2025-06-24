import Organization, { IOrganization } from "../models/organization.model";
import User from "../models/user.model";
import UserOrganization, { IUserOrganization } from "../models/userorganization.model";
import { OrgUserRole, UserRole } from "../types/enums";
import { ApiError } from "../utils/api.error";

class UserOrganizationService {
  createUserOrganization = async (userId: string, organizationId: string): Promise<any> => {
    if(!userId || !organizationId) {
      throw new ApiError(400, 'Invalid user or organization');
    }

    const userOrg = await this.getUserOrganizations(userId);
    let org = null;

    if(!userOrg) {
      org = await UserOrganization.create({ userId, organizations: [{ organizationId, role: OrgUserRole.Owner }] });
    } else {
      org = await UserOrganization.findOneAndUpdate({ userId }, { $push: { organizations: { organizationId, role: OrgUserRole.Owner } } }, { new: true });
    }

    return org;
  };

  getAllUsersOrganizations = async (): Promise<IUserOrganization[]> => {
    const usersOrgs = await UserOrganization.find();
    return usersOrgs;
  };

  getUserOrganizations = async (userId: string): Promise<IUserOrganization | null> => {
    const userOrganization = await UserOrganization.findOne({ userId });
    return userOrganization;
  };

  addNewOrganization = async (userId: string, organizationId: string): Promise<IUserOrganization | null> => {
    const userOrganization = await UserOrganization.findOneAndUpdate({ userId }, { $push: { organizations: { organizationId, role: OrgUserRole.Owner } } }, { new: true });
    return userOrganization;
  };

}

export const userOrganizationService = new UserOrganizationService();