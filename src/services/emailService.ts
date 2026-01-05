import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface BaseEmailProps {
  userEmail: string;
  userName: string;
  fileCount: number;
}

interface UploadConfirmationProps extends BaseEmailProps {
  estimatedDelivery: string;
}

interface AnalysisDeliveryProps extends BaseEmailProps {
  analysisUrl: string;
}

interface ProgressUpdateProps extends BaseEmailProps {
  progressMessage: string;
  estimatedDelivery: string;
}

export const sendUploadConfirmationEmail = async ({
  userEmail,
  userName,
  fileCount,
  estimatedDelivery,
}: UploadConfirmationProps) => {
  try {
    const response = await resend.emails.send({
      from: 'Support <support@interioriqpro.com>',
      to: userEmail,
      subject: 'We’ve received your BOQ — InteriorIQ Pro',
      html: `
        <h2>Thanks ${userName || ''}!</h2>
        <p>Your BOQ has been received successfully.</p>
        <p><strong>Files Received:</strong> ${fileCount}</p>
        <p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>
        <p>Our experts will review and get back to you shortly.</p>
        <br/>
        <p>— InteriorIQ Pro Team</p>
      `
    });

    return { success: true, response };
  } catch (error) {
    console.error('Upload email failed', error);
    return { success: false, error };
  }
};

export const sendAnalysisDeliveryEmail = async ({
  userEmail,
  userName,
  fileCount,
  analysisUrl,
}: AnalysisDeliveryProps) => {
  try {
    const response = await resend.emails.send({
      from: 'Support <support@interioriqpro.com>',
      to: userEmail,
      subject: 'Your Interior Cost Analysis is Ready 🎯',
      html: `
        <h2>Hello ${userName || ''},</h2>
        <p>Your BOQ analysis is complete!</p>
        <p><strong>Files Analyzed:</strong> ${fileCount}</p>
        <p>You can download it here:</p>
        <a href="${analysisUrl}">${analysisUrl}</a>
        <br/><br/>
        <p>— InteriorIQ Pro Team</p>
      `
    });

    return { success: true, response };
  } catch (error) {
    console.error('Delivery email failed', error);
    return { success: false, error };
  }
};

export const sendProgressUpdateEmail = async ({
  userEmail,
  userName,
  fileCount,
  progressMessage,
  estimatedDelivery,
}: ProgressUpdateProps) => {
  try {
    const response = await resend.emails.send({
      from: 'Support <support@interioriqpro.com>',
      to: userEmail,
      subject: 'Update on your BOQ analysis',
      html: `
        <h2>Hi ${userName || ''},</h2>
        <p>Here’s an update on your BOQ:</p>
        <p>${progressMessage}</p>
        <p><strong>Files:</strong> ${fileCount}</p>
        <p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>
        <br/>
        <p>— InteriorIQ Pro Team</p>
      `
    });

    return { success: true, response };
  } catch (error) {
    console.error('Progress email failed', error);
    return { success: false, error };
  }
};
