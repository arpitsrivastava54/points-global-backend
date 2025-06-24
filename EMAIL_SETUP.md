# Email Setup Guide

This guide explains how to set up and use the email functionality in the Points Global backend.

## Prerequisites

- Node.js and npm installed
- An email service provider account (Gmail, SendGrid, etc.)

## Installation

The email functionality uses nodemailer. It's already installed in the project:

```bash
npm install nodemailer @types/nodemailer
```

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3000
```

### Gmail Setup

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate a password for "Mail"
3. Use the generated password as `EMAIL_PASSWORD`

### Other Email Providers

- **SendGrid**: Use `smtp.sendgrid.net` as host
- **Outlook**: Use `smtp-mail.outlook.com` as host
- **Custom SMTP**: Use your provider's SMTP settings

## Usage

### Basic Email Sending

```typescript
import { EmailService } from './src/services/email.service';

// Send a custom email
await EmailService.sendCustomEmail(
  'recipient@example.com',
  'Subject',
  '<h1>Hello World</h1>'
);
```

### Pre-built Email Templates

```typescript
// Welcome email
await EmailService.sendWelcomeEmail('user@example.com', 'John Doe');

// Email verification
await EmailService.sendEmailVerification('user@example.com', 'verification-token');

// Password reset email
await EmailService.sendPasswordResetEmail('user@example.com', 'reset-token');

// Organization invitation
await EmailService.sendInvitationEmail(
  'invitee@example.com',
  'Jane Smith',
  'Acme Corp',
  'invitation-token'
);

// Evaluation completion
await EmailService.sendEvaluationCompletionEmail(
  'student@example.com',
  'Alice Johnson',
  'JavaScript Test',
  85
);

// Subscription notification
await EmailService.sendSubscriptionNotification(
  'customer@example.com',
  'Bob Wilson',
  'Premium Plan',
  'created'
);
```

### Email Configuration Verification

```typescript
import { EmailService } from './src/services/email.service';

// Verify email configuration on startup
const isValid = await EmailService.initialize();
if (!isValid) {
  console.error('Email configuration is invalid');
}
```

## File Structure

```
src/
├── utils/
│   ├── email.utils.ts      # Core email functionality
│   ├── email.templates.ts  # Email templates
│   └── email.test.ts       # Test examples
├── services/
│   └── email.service.ts    # Email service layer
└── configs/
    └── config.ts           # Email configuration
```

## Email Templates

The system includes professionally designed email templates for:

- Welcome emails
- Email verification
- Password reset
- Organization invitations
- Evaluation completion
- Subscription notifications

All templates are responsive and include:
- Professional styling
- Brand colors
- Clear call-to-action buttons
- Mobile-friendly design

## Error Handling

The email service includes comprehensive error handling:

- Configuration validation
- SMTP connection errors
- Email sending failures
- Graceful fallbacks

## Testing

To test the email functionality:

1. Set up your environment variables
2. Uncomment the test function in `src/utils/email.test.ts`
3. Run the test:

```typescript
import { testEmailFunctionality } from './src/utils/email.test';
await testEmailFunctionality();
```

## Security Considerations

- Use environment variables for sensitive data
- Implement rate limiting for email sending
- Validate email addresses before sending
- Use HTTPS for email links
- Set appropriate token expiration times

## Troubleshooting

### Common Issues

1. **Authentication failed**: Check your email credentials and app passwords
2. **Connection timeout**: Verify SMTP host and port settings
3. **Emails not received**: Check spam folder and email provider settings
4. **Template rendering issues**: Ensure HTML is properly formatted

### Debug Mode

Enable debug logging by setting:

```env
NODE_ENV=development
```

This will log detailed SMTP communication for troubleshooting.

## Support

For issues with email functionality, check:
1. Environment variable configuration
2. Email provider settings
3. Network connectivity
4. Application logs 