import { Request, Response, NextFunction } from 'express';
import { IAuthRequest } from '../types/types';
import { asyncWrapper } from '../utils/trycatch.utils';
import { organizationService } from '../services/organization.service';
import { apiResponse } from '../utils/api.response';
import { ApiError } from '../utils/api.error';
import { userOrganizationService } from '../services/userorganization.service';

class UserOrganizationController {

  getAllUsersOrganizations = asyncWrapper(async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const organizations = await userOrganizationService.getAllUsersOrganizations();
    if (!organizations) {
      throw new ApiError(400, 'Failed to get organizations');
    }

    apiResponse(res, {
      statusCode: 200,
      message: 'Organizations fetched successfully',
      data: organizations,
    });
  });

  getMyOrganizations = asyncWrapper(async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const organizations = await organizationService.getAllOrganizationByOwnerId(req.user!.userId);

    if (!organizations) {
      throw new ApiError(400, 'Failed to get organizations');
    }

    apiResponse(res, {
      statusCode: 200,
      message: 'Organizations fetched successfully',
      data: organizations,
    });
  });

  getOrganizationsByUserId = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const organizations = await organizationService.getAllOrganizationByOwnerId(id);

    if (!organizations) {
      throw new ApiError(400, 'Failed to get organizations');
    }

    apiResponse(res, {
      statusCode: 200,
      message: 'Organizations fetched successfully',
      data: organizations,
    });
  });


}

export const userOrganizationController = new UserOrganizationController();

