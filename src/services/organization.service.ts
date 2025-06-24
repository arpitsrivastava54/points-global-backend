import Organization, { IOrganization } from "../models/organization.model";
import { ApiError } from "../utils/api.error";
import { userOrganizationService } from "./userorganization.service";


class OrganizationService {
  createOrganization = async (name: string, userId: string): Promise<IOrganization> => {
    const organization = await Organization.create({ name, ownerId: userId });

    if (!organization) {
      throw new ApiError(400, 'Failed to create organization');
    }

    await userOrganizationService.createUserOrganization(userId, organization._id as string);
    
    return organization;
  };

  getAllOrganizations = async (): Promise<IOrganization[]> => {
    const organizations = await Organization.find();

    if (!organizations) {
      throw new ApiError(400, 'Failed to get organizations');
    }

    return organizations;
  };

  getOrganizationById = async (id: string): Promise<IOrganization> => {
    const organization = await Organization.findById(id);
    if (!organization) {
      throw new ApiError(400, 'Organization not found');
    }
    return organization;
  };

  getAllOrganizationByOwnerId = async (ownerId: string): Promise<IOrganization[]> => {
    const organizations = await Organization.find({ ownerId });
    if (!organizations) {
      throw new ApiError(400, 'Failed to get organizations');
    }
    return organizations;
  };

}

export const organizationService = new OrganizationService();