import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

interface EmailRequest {
  type: 'upload_confirmation' | 'analysis_delivery' | 'progress_update';
  userEmail: string;
  userName: string;
  fileCount: number;
  estimatedDelivery?: string;
  analysisUrl?: string;
  progressMessage?: string;
}

serve(async (req) => {
  // ✅ CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "*"
      }
    });
  }

  try {
    const { type, userEmail, userName, fileCount, estimatedDelivery, analysisUrl, progressMessage }: EmailRequest = await req.json();

    // Get Resend API key from environment
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured');
    }

    let subject = '';
    let htmlContent = '';

    // Generate email content based on type
    switch (type) {
      case 'upload_confirmation':
        subject = '✅ BoQ Upload Confirmed - Analysis in Progress';
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
                .highlight { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; }
                .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                .check-icon { font-size: 48px; margin-bottom: 10px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="check-icon">✅</div>
                  <h1 style="margin: 0;">Upload Successful!</h1>
                </div>
                <div class="content">
                  <p>Dear ${userName},</p>
                  <p>Great news! We've successfully received your Bill of Quantities (BoQ) documents.</p>
                  
                  <div class="highlight">
                    <strong>Upload Details:</strong>
                    <ul style="margin: 10px 0;">
                      <li><strong>Files Received:</strong> ${fileCount} document${fileCount > 1 ? 's' : ''}</li>
                      <li><strong>Status:</strong> Queued for Expert Analysis</li>
                      <li><strong>Expected Delivery:</strong> ${estimatedDelivery || 'Within 24-48 hours'}</li>
                    </ul>
                  </div>

                  <h3>What Happens Next?</h3>
                  <ol>
                    <li><strong>Security Scan:</strong> Your documents are being scanned for security (completed)</li>
                    <li><strong>Expert Review:</strong> Our team of seasoned interior professionals will analyze your BoQ</li>
                    <li><strong>Detailed Report:</strong> You'll receive a comprehensive analysis including:
                      <ul>
                        <li>Pricing verification and overpricing detection</li>
                        <li>Quality assessment of materials and specifications</li>
                        <li>Potential cost-saving opportunities</li>
                        <li>Expert recommendations</li>
                      </ul>
                    </li>
                  </ol>

                  <p><strong>Important:</strong> You'll receive an email with your detailed analysis report and a secure download link as soon as our experts complete the review.</p>

                  <p style="margin-top: 30px;">If you have any questions, feel free to reply to this email or contact our support team.</p>

                  <p>Best regards,<br><strong>BoQ Analysis Team</strong></p>
                </div>
                <div class="footer">
                  <p>This is an automated email. Please do not reply directly to this message.</p>
                  <p style="margin-top: 10px;">🔒 Your documents are encrypted and will be automatically deleted after analysis completion.</p>
                </div>
              </div>
            </body>
          </html>
        `;
        break;

      case 'analysis_delivery':
        subject = '🎉 Your BoQ Analysis Report is Ready!';
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
                .highlight { background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
                .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; padding: 14px 35px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
                .star-icon { font-size: 48px; margin-bottom: 10px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="star-icon">🎉</div>
                  <h1 style="margin: 0;">Your Analysis is Complete!</h1>
                </div>
                <div class="content">
                  <p>Dear ${userName},</p>
                  <p>Excellent news! Our expert team has completed the analysis of your Bill of Quantities.</p>
                  
                  <div class="highlight">
                    <h3 style="margin-top: 0; color: #059669;">📊 What's Inside Your Report:</h3>
                    <ul style="margin: 10px 0;">
                      <li><strong>Comprehensive Pricing Analysis</strong> - Line-by-line cost verification</li>
                      <li><strong>Quality Assessment</strong> - Material and specification evaluation</li>
                      <li><strong>Savings Opportunities</strong> - Identified cost optimization areas</li>
                      <li><strong>Expert Recommendations</strong> - Professional insights and alternatives</li>
                      <li><strong>Summary Dashboard</strong> - Easy-to-understand visual overview</li>
                    </ul>
                  </div>

                  <div style="text-align: center;">
                    <a href="${analysisUrl || '#'}" class="button">📥 Download Your Analysis Report</a>
                  </div>

                  <p><strong>⏰ Download Link Valid For:</strong> 7 days from receipt of this email</p>

                  <h3>Next Steps:</h3>
                  <ol>
                    <li>Review the detailed analysis report</li>
                    <li>Check the identified savings opportunities</li>
                    <li>Consider our expert recommendations</li>
                    <li>Contact us if you need clarification on any points</li>
                  </ol>

                  <p style="background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin: 20px 0;">
                    <strong>💡 Pro Tip:</strong> Many of our clients save 15-30% on their project costs by implementing our recommendations. Make sure to review the "Cost Optimization" section carefully!
                  </p>

                  <p>Need help understanding the report? Our expert team is here to assist you.</p>

                  <p style="margin-top: 30px;">Best regards,<br><strong>BoQ Analysis Expert Team</strong></p>
                </div>
                <div class="footer">
                  <p>Questions? Reply to this email or contact our support team.</p>
                  <p style="margin-top: 10px;">🔒 Your privacy is important. Files will be deleted after 30 days.</p>
                </div>
              </div>
            </body>
          </html>
        `;
        break;

      case 'progress_update':
        subject = '⏳ BoQ Analysis Progress Update';
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
                .highlight { background: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
                .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; border-radius: 0 0 10px 10px; }
                .progress-icon { font-size: 48px; margin-bottom: 10px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="progress-icon">⏳</div>
                  <h1 style="margin: 0;">Analysis in Progress</h1>
                </div>
                <div class="content">
                  <p>Dear ${userName},</p>
                  <p>We wanted to keep you informed about the progress of your BoQ analysis.</p>
                  
                  <div class="highlight">
                    <strong>Current Status:</strong>
                    <p style="margin: 10px 0; font-size: 16px;">${progressMessage || 'Your documents are currently being analyzed by our expert team.'}</p>
                  </div>

                  <h3>Analysis Progress:</h3>
                  <ul>
                    <li>✅ Document Upload - Complete</li>
                    <li>✅ Security Scan - Complete</li>
                    <li>🔄 Expert Analysis - In Progress</li>
                    <li>⏸️ Report Generation - Pending</li>
                  </ul>

                  <p><strong>Estimated Completion:</strong> ${estimatedDelivery || 'Within next 24 hours'}</p>

                  <p>You'll receive another email with a download link as soon as your analysis report is ready.</p>

                  <p style="margin-top: 30px;">Thank you for your patience!</p>

                  <p>Best regards,<br><strong>BoQ Analysis Team</strong></p>
                </div>
                <div class="footer">
                  <p>This is an automated progress update.</p>
                  <p style="margin-top: 10px;">🔒 Your data is secure and encrypted.</p>
                </div>
              </div>
            </body>
          </html>
        `;
        break;

      default:
        throw new Error('Invalid email type');
    }

    // Send email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: [userEmail],
        subject: subject,
        html: htmlContent
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Resend API error: ${errorData.message || 'Unknown error'}`);
    }

    const emailData = await response.json();

    return new Response(JSON.stringify({
      success: true,
      message: 'Email sent successfully',
      emailId: emailData.id,
      type: type
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
});