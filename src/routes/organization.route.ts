// src/routes/organization.ts
import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { UserRole } from '../types/enums';
import { organizationController } from '../controllers/organization.controller';


const router = express.Router();

router.use(authMiddleware)

router.post('/', organizationController.createOrganization);
router.get('/', roleMiddleware([UserRole.Admin]), organizationController.getAllOrganizations);

router.get('/:id',roleMiddleware([UserRole.Admin]), organizationController.getOrganizationById); // it will be for admin to get all organizations of a user

export default router;
