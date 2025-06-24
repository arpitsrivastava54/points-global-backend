// Base email template wrapper
const createEmailTemplate = (content: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Points Global</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
        }
        .header { 
          background-color: #007bff; 
          color: white; 
          padding: 20px; 
          text-align: center; 
        }
        .content { 
          padding: 20px; 
          background-color: #f8f9fa; 
        }
        .button { 
          display: inline-block; 
          padding: 12px 24px; 
          background-color: #007bff; 
          color: white; 
          text-decoration: none; 
          border-radius: 4px; 
          margin: 16px 0; 
        }
        .button.primary{
          background-color: #007bff;
          color: white;
        }
        .button.success { 
          background-color: #28a745; 
          color: white;
        }
        .footer { 
          padding: 20px; 
          text-align: center; 
          color: #666; 
          font-size: 14px; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Points Global</h1>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>&copy; 2024 Points Global. All rights reserved.</p>
          <p>If you have any questions, please contact our support team.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Welcome email template
export const getWelcomeEmailTemplate = (userName: string, password?: string): string => {
  const content = `
    <h2 style="color: #333; margin-bottom: 20px;">Welcome to Points Global!</h2>
    <p>Hello ${userName},</p>
    ${password ? `
      <p>Your password is: ${password}</p>
    ` : ''}
    <p>Thank you for joining our platform. We're excited to have you on board!</p>
    <p>With Points Global, you can:</p>
    <ul>
      <li>Create and manage evaluations</li>
      <li>Track performance metrics</li>
      <li>Collaborate with team members</li>
      <li>Access detailed analytics</li>
    </ul>
    <p>If you have any questions or need assistance getting started, feel free to reach out to our support team.</p>
    <p>Best regards,<br>The Points Global Team</p>
  `;

  return createEmailTemplate(content);
};

// Password reset email template
export const getPasswordResetEmailTemplate = (resetUrl: string): string => {
  const content = `
    <h2 style="color: #333; margin-bottom: 20px;">Password Reset Request</h2>
    <p>You requested a password reset for your Points Global account.</p>
    <p>Click the button below to reset your password:</p>
    <a href="${resetUrl}" class="button primary">Reset Password</a>
    <p><strong>Important:</strong> This link will expire in 1 hour for security reasons.</p>
    <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
    <p>If you're having trouble clicking the button, copy and paste this URL into your browser:</p>
    <p style="word-break: break-all; color: #666;">${resetUrl}</p>
    <p>Best regards,<br>The Points Global Team</p>
  `;

  return createEmailTemplate(content);
};

// Organization invitation email template
export const getInvitationEmailTemplate = (
  inviterName: string,
  organizationName: string,
  invitationUrl: string
): string => {
  const content = `
    <h2 style="color: #333; margin-bottom: 20px;">Organization Invitation</h2>
    <p>Hello,</p>
    <p>${inviterName} has invited you to join <strong>${organizationName}</strong> on Points Global.</p>
    <p>By accepting this invitation, you'll be able to:</p>
    <ul>
      <li>Access shared evaluations and assessments</li>
      <li>Collaborate with team members</li>
      <li>View organization-wide analytics</li>
      <li>Participate in team activities</li>
    </ul>
    <p>Click the button below to accept the invitation:</p>
    <a href="${invitationUrl}" class="button success">Accept Invitation</a>
    <p>If you don't want to accept this invitation, you can safely ignore this email.</p>
    <p>If you're having trouble clicking the button, copy and paste this URL into your browser:</p>
    <p style="word-break: break-all; color: #666;">${invitationUrl}</p>
    <p>Best regards,<br>The Points Global Team</p>
  `;

  return createEmailTemplate(content);
};

// Evaluation completion email template
export const getEvaluationCompletionTemplate = (
  userName: string,
  evaluationName: string,
  score?: number
): string => {
  const scoreSection = score ? `
    <div style="background-color: #e8f5e8; padding: 15px; border-radius: 4px; margin: 20px 0;">
      <h3 style="color: #28a745; margin: 0;">Your Score: ${score}</h3>
    </div>
  ` : '';

  const content = `
    <h2 style="color: #333; margin-bottom: 20px;">Evaluation Completed</h2>
    <p>Hello ${userName},</p>
    <p>Congratulations! You have successfully completed the evaluation: <strong>${evaluationName}</strong></p>
    ${scoreSection}
    <p>Thank you for participating in our evaluation system. Your results have been recorded and will be available in your dashboard.</p>
    <p>If you have any questions about your evaluation results, please don't hesitate to contact us.</p>
    <p>Best regards,<br>The Points Global Team</p>
  `;

  return createEmailTemplate(content);
};

// Subscription notification email template
export const getSubscriptionNotificationTemplate = (
  userName: string,
  subscriptionType: string,
  action: 'created' | 'updated' | 'cancelled'
): string => {
  const actionText = {
    created: 'has been successfully created',
    updated: 'has been successfully updated',
    cancelled: 'has been cancelled'
  };

  const actionColor = {
    created: '#28a745',
    updated: '#007bff',
    cancelled: '#dc3545'
  };

  const content = `
    <h2 style="color: #333; margin-bottom: 20px;">Subscription ${actionText[action]}</h2>
    <p>Hello ${userName},</p>
    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin: 20px 0; border-left: 4px solid ${actionColor[action]};">
      <p style="margin: 0;"><strong>Subscription Type:</strong> ${subscriptionType}</p>
      <p style="margin: 5px 0 0 0;"><strong>Status:</strong> ${actionText[action]}</p>
    </div>
    <p>If you have any questions about your subscription or need assistance, please contact our support team.</p>
    <p>Best regards,<br>The Points Global Team</p>
  `;

  return createEmailTemplate(content);
};

// Email verification template
export const getEmailVerificationTemplate = (verificationUrl: string): string => {
  const content = `
    <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
    <p>Thank you for signing up for Points Global!</p>
    <p>To complete your registration and activate your account, please verify your email address by clicking the button below:</p>
    <a href="${verificationUrl}" class="button success">Verify Email Address</a>
    <p><strong>Important:</strong> This verification link will expire in 24 hours for security reasons.</p>
    <p>If you didn't create an account with Points Global, please ignore this email.</p>
    <p>If you're having trouble clicking the button, copy and paste this URL into your browser:</p>
    <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
    <p>Best regards,<br>The Points Global Team</p>
  `;

  return createEmailTemplate(content);
}; 