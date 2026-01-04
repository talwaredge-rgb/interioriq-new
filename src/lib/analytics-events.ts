// src/lib/analytics-events.ts
import { trackEvent } from './analytics';
import type { EventParams } from '@/types/gtag';

interface BoQUploadStartParams extends EventParams {
  file_count: number;
  total_size_mb: number;
  file_types: string[];
}

interface BoQUploadCompleteParams extends EventParams {
  file_count: number;
  total_size_mb: number;
  user_email: string;
  estimated_delivery_hours: number;
}

interface BoQUploadErrorParams extends EventParams {
  error_type: string;
  error_message?: string;
  file_count?: number;
}

interface FileRemoveParams extends EventParams {
  file_name: string;
  file_type: string;
  remaining_files: number;
}

interface GuidelineViewParams extends EventParams {
  page: string;
}

interface ExpertProfileViewParams extends EventParams {
  expert_name: string;
  expert_specialization: string;
}

interface SuccessStoryViewParams extends EventParams {
  story_title: string;
  project_type?: string;
}

interface ConversionParams extends EventParams {
  conversion_type: 'boq_submission' | 'contact_form' | 'expert_inquiry';
  conversion_value?: number;
  user_email?: string;
}

// Admin Dashboard Tracking
interface AdminDashboardParams extends EventParams {
  page_path?: string;
}

interface AdminTabParams extends EventParams {
  tab_name: string;
}

interface AdminDateRangeParams extends EventParams {
  date_range: string;
}

interface AdminExportParams extends EventParams {
  date_range: string;
}

// BoQ Upload Tracking
export function trackBoQUploadStart(params: BoQUploadStartParams): void {
  trackEvent('boq_upload_start', {
    event_category: 'BoQ Upload',
    ...params
  });
}

export function trackBoQUploadComplete(params: BoQUploadCompleteParams): void {
  trackEvent('boq_upload_complete', {
    event_category: 'BoQ Upload',
    ...params
  });
  
  // Track as conversion
  trackConversion({
    conversion_type: 'boq_submission',
    conversion_value: 1,
    user_email: params.user_email
  });
}

export function trackBoQUploadError(params: BoQUploadErrorParams): void {
  trackEvent('boq_upload_error', {
    event_category: 'BoQ Upload',
    ...params
  });
}

export function trackFileRemove(params: FileRemoveParams): void {
  trackEvent('file_remove', {
    event_category: 'BoQ Upload',
    ...params
  });
}

// Content Engagement Tracking
export function trackGuidelineView(params: GuidelineViewParams): void {
  trackEvent('guideline_view', {
    event_category: 'Content Engagement',
    ...params
  });
}

export function trackExpertProfileView(params: ExpertProfileViewParams): void {
  trackEvent('expert_profile_view', {
    event_category: 'Expert Engagement',
    ...params
  });
}

export function trackSuccessStoryView(params: SuccessStoryViewParams): void {
  trackEvent('success_story_view', {
    event_category: 'Content Engagement',
    ...params
  });
}

// Conversion Tracking
export function trackConversion(params: ConversionParams): void {
  trackEvent('conversion', {
    event_category: 'Conversion',
    ...params
  });
}

// Navigation Tracking
export function trackNavigationClick(destination: string, source: string): void {
  trackEvent('navigation_click', {
    event_category: 'Navigation',
    destination,
    source
  });
}

// Form Interaction Tracking
export function trackFormStart(formName: string): void {
  trackEvent('form_start', {
    event_category: 'Form Interaction',
    form_name: formName
  });
}

export function trackFormFieldInteraction(formName: string, fieldName: string): void {
  trackEvent('form_field_interaction', {
    event_category: 'Form Interaction',
    form_name: formName,
    field_name: fieldName
  });
}

export function trackAdminDashboardView(params: AdminDashboardParams): void {
  trackEvent('admin_dashboard_view', {
    event_category: 'Admin',
    ...params
  });
}

export function trackAdminTabChange(params: AdminTabParams): void {
  trackEvent('admin_tab_change', {
    event_category: 'Admin',
    ...params
  });
}

export function trackAdminDateRangeChange(params: AdminDateRangeParams): void {
  trackEvent('admin_date_range_change', {
    event_category: 'Admin',
    ...params
  });
}

export function trackAdminExportReport(params: AdminExportParams): void {
  trackEvent('admin_export_report', {
    event_category: 'Admin',
    ...params
  });
}