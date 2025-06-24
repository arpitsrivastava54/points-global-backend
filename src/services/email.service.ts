import { 
  sendEmail, 
  sendWelcomeEmail, 
  sendPasswordResetEmail, 
  sendInvitationEmail,
  sendEmailVerification,
  verifyEmailConfig,
  // verifyEmailConfig 
} from '../utils/email.utils';
import {
  getEvaluationCompletionTemplate,
  getSubscriptionNotificationTemplate
} from '../utils/email.templates';

export class EmailService {
  /**
   * Verify email configuration on service startup
   */
  static async initialize(): Promise<boolean> {
    return await verifyEmailConfig();
  }

  /**
   * Send a custom email
   */
  static async sendCustomEmail(
    to: string | string[],
    subject: string,
    html: string,
    text?: string,
    from?: string
  ): Promise<void> {
    await sendEmail({ to, subject, html, text, from });
  }

  /**
   * Send welcome email to new users
   */
  static async sendWelcomeEmail(to: string, userName: string , password?: string): Promise<void> {
    await sendWelcomeEmail(to, userName, password);
  }

  /**
   * Send password reset email
   */
  static async sendPasswordResetEmail(to: string, resetToken: string): Promise<void> {
    await sendPasswordResetEmail(to, resetToken);
  }

  /**
   * Send email verification
   */
  static async sendEmailVerification(to: string, verificationToken: string): Promise<void> {
    await sendEmailVerification(to, verificationToken);
  }

  /**
   * Send organization invitation email
   */
  static async sendInvitationEmail(
    to: string,
    inviterName: string,
    organizationName: string,
    invitationToken: string
  ): Promise<void> {
    await sendInvitationEmail(to, inviterName, organizationName, invitationToken);
  }

  /**
   * Send evaluation completion notification
   */
  static async sendEvaluationCompletionEmail(
    to: string,
    userName: string,
    evaluationName: string,
    score?: number
  ): Promise<void> {
    const html = getEvaluationCompletionTemplate(userName, evaluationName, score);

    await sendEmail({ 
      to, 
      subject: `Evaluation Completed: ${evaluationName}`, 
      html 
    });
  }

  /**
   * Send subscription notification
   */
  static async sendSubscriptionNotification(
    to: string,
    userName: string,
    subscriptionType: string,
    action: 'created' | 'updated' | 'cancelled'
  ): Promise<void> {
    const html = getSubscriptionNotificationTemplate(userName, subscriptionType, action);

    await sendEmail({ 
      to, 
      subject: `Subscription ${action}: ${subscriptionType}`, 
      html 
    });
  }
} 