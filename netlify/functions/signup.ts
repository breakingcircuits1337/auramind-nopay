import { Handler } from '@netlify/functions';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email } = JSON.parse(event.body!);
    
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is required' })
      };
    }

    // Generate verification token
    const verificationToken = Buffer.from(email + Date.now().toString()).toString('base64');
    
    // Create verification URL
    const verificationUrl = `${process.env.URL}/verify?token=${verificationToken}`;

    // Send verification email
    const msg = {
      to: email,
      from: 'noreply@auramind.app', // Replace with your verified sender
      subject: 'Verify your email for AuraMind',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to AuraMind!</h2>
          <p>Thank you for signing up. Please click the button below to verify your email address:</p>
          <a href="${verificationUrl}" style="display: inline-block; background: #6d28d9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Verify Email</a>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #666;">${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
        </div>
      `,
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Verification email sent',
        email 
      })
    };
  } catch (error: any) {
    console.error('Signup error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to process signup',
        details: error.message
      })
    };
  }
};