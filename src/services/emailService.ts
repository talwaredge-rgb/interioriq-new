const SUPABASE_FUNCTION_URL = process.env.NEXT_PUBLIC_SUPABASE_URL 
  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-boq-email`
  : '';

interface SendEmailParams {
  type: 'upload_confirmation' | 'analysis_delivery' | 'progress_update';
  userEmail: string;
  userName: string;
  fileCount: number;
  estimatedDelivery?: string;
  analysisUrl?: string;
  progressMessage?: string;
}

interface EmailResponse {
  success: boolean;
  message?: string;
  emailId?: string;
  type?: string;
  error?: string;
}

export const sendBoQEmail = async (params: SendEmailParams): Promise<EmailResponse> => {
  try {
    if (!SUPABASE_FUNCTION_URL) {
      console.warn('Supabase URL not configured - email sending skipped');
      return {
        success: false,
        error: 'Email service not configured'
      };
    }

    const response = await fetch(SUPABASE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to send email');
    }

    return data;
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
};

// Helper functions for specific email types
export const sendUploadConfirmationEmail = async (
  userEmail: string,
  userName: string,
  fileCount: number,
  estimatedDelivery: string
): Promise<EmailResponse> => {
  return sendBoQEmail({
    type: 'upload_confirmation',
    userEmail,
    userName,
    fileCount,
    estimatedDelivery
  });
};

export const sendAnalysisDeliveryEmail = async (
  userEmail: string,
  userName: string,
  fileCount: number,
  analysisUrl: string
): Promise<EmailResponse> => {
  return sendBoQEmail({
    type: 'analysis_delivery',
    userEmail,
    userName,
    fileCount,
    analysisUrl
  });
};

export const sendProgressUpdateEmail = async (
  userEmail: string,
  userName: string,
  fileCount: number,
  progressMessage: string,
  estimatedDelivery: string
): Promise<EmailResponse> => {
  return sendBoQEmail({
    type: 'progress_update',
    userEmail,
    userName,
    fileCount,
    progressMessage,
    estimatedDelivery
  });
};