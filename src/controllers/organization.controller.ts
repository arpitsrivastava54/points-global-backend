import { Request, Response, NextFunction } from 'express';
import { IAuthRequest } from '../types/types';
import { asyncWrapper } from '../utils/trycatch.utils';
import { organizationService } from '../services/organization.service';
import { apiResponse } from '../utils/api.response';
import Organization from '../models/organization.model';
import { ApiError } from '../utils/api.error';

class OrganizationController {
  createOrganization = asyncWrapper(async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const { name } = req.body as any;
    const organization = await organizationService.createOrganization(name, req.user!.userId);

    apiResponse(res, {
      statusCode: 201,
      message: 'Organization created successfully',
      data: organization,
    });
  });

  getAllOrganizations = asyncWrapper(async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const organizations = await Organization.find();

    if (!organizations) {
      throw new ApiError(400, 'Failed to get organizations');
    }

    apiResponse(res, {
      statusCode: 200,
      message: 'All organizations fetched successfully',
      data: organizations,
    });
  });

  getOrganizationById = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    const organization = await Organization.findById(id);

    if (!organization) {
      throw new ApiError(400, 'Organization not found');
    }

    apiResponse(res, {
      statusCode: 200,
      message: 'Organization fetched successfully',
      data: organization, 
    });
  });

  getAllOrganizationByOwnerId = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, 'Organization ID is required');
    }

    const organizations = await organizationService.getAllOrganizationByOwnerId(id);

    apiResponse(res, {
      statusCode: 200,
      message: 'Organizations fetched successfully',
      data: organizations,
    });
  });

}

export const organizationController = new OrganizationController();

