# InteriorIQ BoQ Analysis Platform

A Next.js application for analyzing Bill of Quantities (BoQ) documents with expert review and analytics tracking.

## 🚀 Features

- **BoQ Upload & Analysis**: Upload and analyze construction BoQ documents
- **Expert Profiles**: Connect with interior design professionals
- **Success Stories**: View completed projects and testimonials
- **Analytics Tracking**: Comprehensive Google Analytics integration for behavior tracking

## 📊 Analytics Integration

This application uses Google Analytics 4 to track:
- User behavior and page views
- BoQ upload conversion rates
- Expert profile engagement
- Content interaction metrics
- Form submission tracking

## 📧 Email Notifications Setup (Resend Integration)

The BoQ analysis platform uses Resend email service to send automated emails for:
- Upload confirmation emails
- Analysis delivery notifications  
- Progress updates

### Email Setup Steps

1. **Get Resend API Key**
   - Sign up at [Resend.com](https://resend.com)
   - Navigate to API Keys section
   - Create a new API key
   - Copy the API key (format: `re_xxxxxxxxxxxxxxxxxxxxx`)

2. **Configure Supabase Edge Function**
   - Go to your Supabase Dashboard
   - Navigate to **Edge Functions** > **Secrets**
   - Add a new secret:
     - Name: `RESEND_API_KEY`
     - Value: Your Resend API key

3. **Deploy Edge Function**
   ```bash
   # Install Supabase CLI if not already installed
   npm install -g supabase

   # Link to your project
   supabase link --project-ref your-project-ref

   # Deploy the email function
   supabase functions deploy send-boq-email
   ```

4. **Update Sender Email (Production)**
   - Open `supabase/functions/send-boq-email/index.ts`
   - Replace `from: "onboarding@resend.dev"` with your verified domain email
   - Resend requires a paid account with verified domain for custom sender emails
   - Learn more: [Resend Domain Verification](https://resend.com/docs/dashboard/domains/introduction)

### Email Types Sent

| Email Type | Trigger | Content |
|-----------|---------|---------|
| Upload Confirmation | Immediately after successful file upload | Upload details, timeline, next steps |
| Analysis Delivery | When analysis report is ready | Download link, report summary, validity period |
| Progress Update | During analysis process | Current status, estimated completion time |

### Testing Email Integration

```typescript
// Test upload confirmation email
import { sendUploadConfirmationEmail } from '@/services/emailService';

await sendUploadConfirmationEmail(
  'user@example.com',
  'John Doe',
  3,
  '05 Jan, 2026, 08:00 PM'
);
```

### Troubleshooting

**Email not received?**
- Check spam/junk folder
- Verify RESEND_API_KEY is set correctly in Supabase secrets
- Check Supabase Edge Function logs for errors
- Ensure Resend account has sufficient credits

**Custom domain emails not working?**
- Verify domain in Resend dashboard
- Update sender email in edge function
- Check DNS records for domain verification

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Google Analytics

1. **Create a Google Analytics 4 Property**:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new GA4 property
   - Get your Measurement ID (format: G-XXXXXXXXXX)

2. **Set Environment Variables**:
   - Copy `.env.example` to `.env.local`
   - Add your Google Analytics Measurement ID:
   ```
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 📈 Tracked Events

The following events are automatically tracked:

### BoQ Upload Flow
- `boq_upload_start` - When files are selected
- `boq_upload_complete` - When upload succeeds
- `boq_upload_error` - When upload fails
- `file_remove` - When a file is removed
- `guideline_view` - When format guidelines are viewed

### Content Engagement
- `expert_profile_view` - When expert profiles are viewed
- `success_story_view` - When success stories are viewed
- `navigation_click` - Navigation interactions

### Conversions
- `conversion` - BoQ submissions and form completions

## 🗄️ Future: Database Integration

Database storage for uploaded BoQs will be added in a future update. The application is prepared for Supabase integration.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/            # Reusable components
├── lib/                   # Utility functions
│   ├── analytics.ts       # Analytics hook
│   └── analytics-events.ts # Custom event tracking
├── types/                 # TypeScript definitions
│   ├── gtag.d.ts         # Google Analytics types
│   └── env.d.ts          # Environment variable types
└── styles/               # Global styles
```

## 🛠️ Technologies

- **Framework**: Next.js 14.2.0 with App Router
- **Language**: TypeScript 5.0.0
- **Styling**: Tailwind CSS 3.x
- **Analytics**: Google Analytics 4
- **Icons**: Heroicons

## 📝 License

This project is proprietary and confidential.