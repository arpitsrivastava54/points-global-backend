import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { UserRole } from '../types/enums';
import { organizationController } from '../controllers/organization.controller';
import { userOrganizationController } from '../controllers/userorganization.controller';


const router = express.Router();

router.use(authMiddleware)

router.get('/', userOrganizationController.getAllUsersOrganizations);

router.get('/user/:id',roleMiddleware([UserRole.Admin]), userOrganizationController.getOrganizationsByUserId); // it will be for admin to get all organizations of a user

router.get('/my', userOrganizationController.getMyOrganizations);

export default router;