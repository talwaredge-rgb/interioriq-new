'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  isSubmitting: boolean;
}

export interface ContactFormData {
  email: string;
  phone: string;
  name: string;
  projectType: string;
  communicationPreference: string[];
  gdprConsent: boolean;
  marketingConsent: boolean;
}

const ContactForm = ({ onSubmit, isSubmitting }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    phone: '',
    name: '',
    projectType: '',
    communicationPreference: [],
    gdprConsent: false,
    marketingConsent: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const projectTypes = [
    'Complete Home Interior',
    'Kitchen Renovation',
    'Bedroom Makeover',
    'Living Room Design',
    'Bathroom Remodeling',
    'Office Interior',
    'Other'
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    if (!formData.gdprConsent) {
      newErrors.gdprConsent = 'You must accept the privacy policy to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      communicationPreference: prev.communicationPreference.includes(value)
        ? prev.communicationPreference.filter(item => item !== value)
        : [...prev.communicationPreference, value]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-brand ${
              errors.name ? 'border-destructive' : 'border-input'
            }`}
            placeholder="Enter your full name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-destructive flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={14} variant="solid" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
            Email Address <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-brand ${
              errors.email ? 'border-destructive' : 'border-input'
            }`}
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={14} variant="solid" />
              <span>{errors.email}</span>
            </p>
          )}
          <p className="mt-1 text-xs text-text-secondary">
            Your analysis report will be sent to this email
          </p>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
            Phone Number <span className="text-xs text-text-secondary">(Optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-brand"
            placeholder="+91 98765 43210"
            disabled={isSubmitting}
          />
          <p className="mt-1 text-xs text-text-secondary">
            For premium consultation follow-up
          </p>
        </div>

        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-text-primary mb-2">
            Project Type <span className="text-destructive">*</span>
          </label>
          <select
            id="projectType"
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-brand ${
              errors.projectType ? 'border-destructive' : 'border-input'
            }`}
            disabled={isSubmitting}
          >
            <option value="">Select your project type</option>
            {projectTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.projectType && (
            <p className="mt-1 text-xs text-destructive flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={14} variant="solid" />
              <span>{errors.projectType}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Communication Preferences
          </label>
          <div className="space-y-2">
            {['Email Updates', 'SMS Notifications', 'WhatsApp Messages'].map(option => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.communicationPreference.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="w-4 h-4 text-accent border-input rounded focus:ring-2 focus:ring-accent cursor-pointer"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-text-primary group-hover:text-accent transition-brand">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <label className="flex items-start space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.gdprConsent}
              onChange={(e) => setFormData({ ...formData, gdprConsent: e.target.checked })}
              className={`w-4 h-4 mt-0.5 text-accent rounded focus:ring-2 focus:ring-accent cursor-pointer ${
                errors.gdprConsent ? 'border-destructive' : 'border-input'
              }`}
              disabled={isSubmitting}
            />
            <span className="text-sm text-text-primary group-hover:text-accent transition-brand">
              I agree to the <a href="#" className="text-accent hover:underline">Privacy Policy</a> and consent to the processing of my personal data for BoQ analysis <span className="text-destructive">*</span>
            </span>
          </label>
          {errors.gdprConsent && (
            <p className="text-xs text-destructive flex items-center space-x-1 ml-7">
              <Icon name="ExclamationCircleIcon" size={14} variant="solid" />
              <span>{errors.gdprConsent}</span>
            </p>
          )}

          <label className="flex items-start space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.marketingConsent}
              onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
              className="w-4 h-4 mt-0.5 text-accent border-input rounded focus:ring-2 focus:ring-accent cursor-pointer"
              disabled={isSubmitting}
            />
            <span className="text-sm text-text-primary group-hover:text-accent transition-brand">
              I would like to receive market insights, cost trends, and exclusive offers from InteriorIQ Pro
            </span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-cta transition-brand shadow-brand hover:shadow-brand-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <Icon name="ArrowPathIcon" size={20} variant="outline" className="animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span>Submit for Analysis</span>
            <Icon name="ArrowRightIcon" size={20} variant="outline" />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;