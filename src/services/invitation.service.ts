import { organizationService } from './organization.service';
import { ApiError } from '../utils/api.error';
import { tokensUtils } from '../utils/tokens.utils';
import Invitation, { IInvitation } from '../models/invitation.model';
import { EmailService } from './email.service';
import { userService } from './user.service';
import bcrypt from 'bcrypt';
import { UserRole } from '../types/enums';
import { userOrganizationService } from './userorganization.service';
import { helper } from '../utils/helper';

class InvitationService {
  sendInvitation = async (email: string, organizationId: string, ownerId: string): Promise<IInvitation> => {
    const organization = await organizationService.getOrganizationById(organizationId);
    if (!organization) throw new ApiError(400, 'Organization not found');

    const owner = await userService.getUserById(ownerId);
    if (!owner) throw new ApiError(400, 'Owner not found');

    const token = tokensUtils.generateToken({ email, organizationId }, '7d');

    const invitation = await Invitation.create({
      email,
      organizationId,
      token,
    })

    await EmailService.sendInvitationEmail(email, owner.name, organization.name, token);

    return invitation;

  };

  acceptInvitation = async (token: string): Promise<any> => {
    console.log("token", token);
    const { email, organizationId } = tokensUtils.verifyToken(token) as { email: string, organizationId: string };

    const invitation = await Invitation.findOne({ token, email, organizationId });
    if (!invitation || invitation.expiresAt < new Date()) throw new Error('Invalid or expired invitation');

    let user = await userService.getUserByEmail(email);

    if (!user) {
      const password = helper.generateRandomString();
    
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await userService.createUser(
        email,
        hashedPassword,
        UserRole.Member,
        "User",
        true
      );


      await EmailService.sendWelcomeEmail(email, user.name , password);
    }

    await userOrganizationService.createUserOrganization(user._id as string, organizationId);
    await Invitation.deleteMany({ email, organizationId });

    return user;

  };

  // getInvitations = async (organizationId: string, ownerId: string): Promise<IInvitation[]> => {
  //   const organization = await Organization.findOne({ _id: organizationId, ownerId });
  //   if (!organization) throw new Error('Unauthorized or organization not found');
  //   return Invitation.find({ organizationId });
  // };
}

export const invitationService = new InvitationService();