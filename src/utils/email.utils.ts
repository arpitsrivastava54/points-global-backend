import {
  getWelcomeEmailTemplate,
  getPasswordResetEmailTemplate,
  getInvitationEmailTemplate, getEmailVerificationTemplate
} from './email.templates';
import { config } from '../configs/config';
import { ApiError } from './api.error';

import nodemailer from 'nodemailer';

// Email options interface
interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
}

// Default email configuratio

// Create transporter
const createTransporter = () => {

  return nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: config.email.auth,
  });
};




// Send email function
export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: options.from || config.email.from,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      attachments: options.attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new ApiError(500, `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Convenience function for simple emails
export const sendSimpleEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<void> => {
  await sendEmail({ to, subject, html });
};

// Send welcome email
export const sendWelcomeEmail = async (to: string, userName: string , password?: string): Promise<void> => {
  const html = getWelcomeEmailTemplate(userName, password);
  await sendEmail({ to, subject: 'Welcome to Points Global', html });
};

// Send password reset email
export const sendPasswordResetEmail = async (to: string, resetToken: string): Promise<void> => {
  const resetUrl = `${config.frontendUrl}/reset-password?token=${resetToken}`;
  const html = getPasswordResetEmailTemplate(resetUrl);
  await sendEmail({ to, subject: 'Password Reset Request', html });
};

// Send invitation email
export const sendInvitationEmail = async (
  to: string,
  inviterName: string,
  organizationName: string,
  invitationToken: string
): Promise<void> => {
  const invitationUrl = `${config.baseUrl}/api/invitations/accept?token=${invitationToken}`;
  const html = getInvitationEmailTemplate(inviterName, organizationName, invitationUrl);
  await sendEmail({ to, subject: `Invitation to join ${organizationName}`, html });
};

// Send email verification email
export const sendEmailVerification = async (to: string, verificationToken: string): Promise<void> => {
  const verificationUrl = `${config.baseUrl}/api/auth/verify?token=${verificationToken}`;
  const html = getEmailVerificationTemplate(verificationUrl);
  await sendEmail({ to, subject: 'Verify Your Email Address', html });
};

// Verify email configuration
export const verifyEmailConfig = async (): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('Email configuration is valid');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
};