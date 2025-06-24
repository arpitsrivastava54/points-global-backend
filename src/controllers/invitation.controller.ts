import { Request, Response, NextFunction } from 'express';
import { asyncWrapper } from '../utils/trycatch.utils';
import { apiResponse } from '../utils/api.response';
import { invitationService } from '../services/invitation.service';
import { ApiError } from '../utils/api.error';

class InviteController {
  sendInvitation = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { email, organizationId } = req.body;

    const invitation = await invitationService.sendInvitation(email, organizationId, req.user!.userId);

    if (!invitation) {
      throw new ApiError(400, 'Failed to send invitation');
    }

    apiResponse(res, {
      statusCode: 200,
      message: 'Invitation sent successfully',
      data: null,
    })
  });

  acceptInvitation = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.query;

    const user = await invitationService.acceptInvitation(token as string);

    apiResponse(res, {
      statusCode: 200,
      message: 'Invitation accepted',
      data: user,
    })

  });

  // getInvitations = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  //   try {
  //     const { organizationId } = req.params;
  //     const invitations = await getInvitations(organizationId, req.user!.userId);
  //     res.json(invitations);
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export const invitationController = new InviteController();
