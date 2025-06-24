// src/routes/invitation.ts
import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { zodMiddleware } from '../middlewares/zod.middleware';
import { invitationSchema } from '../schemas/invitation.schema';
import { invitationController } from '../controllers/invitation.controller';


const router = express.Router();


router.post('/', authMiddleware, zodMiddleware(invitationSchema), invitationController.sendInvitation);
router.get('/accept', invitationController.acceptInvitation);


export default router;