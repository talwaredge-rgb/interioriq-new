'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function CTASection() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-secondary to-primary">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <div className="h-12 bg-primary-foreground/20 rounded w-3/4 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-primary-foreground/20 rounded w-1/2 mx-auto animate-pulse"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Icon */}
          <div className="inline-flex w-20 h-20 bg-accent rounded-full items-center justify-center">
            <Icon name="RocketLaunchIcon" size={40} variant="solid" className="text-accent-foreground" />
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground leading-tight">
              Ready to Save Lakhs on Your Interior Project?
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Join 2500+ smart homeowners who discovered hidden costs and saved lakhs on their projects. 100% free analysis, 24-48 hours turnaround, and expert insights.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/upload-analysis"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-accent text-accent-foreground font-bold text-lg rounded-lg hover:bg-cta transition-brand shadow-brand-lg hover:shadow-brand"
            >
              <Icon name="CloudArrowUpIcon" size={24} variant="outline" />
              <span>Upload Your BoQ Now</span>
            </Link>
            
            <Link
              href="/sample-reports"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-foreground text-primary font-semibold text-lg rounded-lg hover:bg-primary-foreground/90 transition-brand"
            >
              <Icon name="DocumentTextIcon" size={24} variant="outline" />
              <span>View Sample Reports</span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-white">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success" />
              <span className="text-sm">100% Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="ClockIcon" size={20} variant="solid" className="text-success" />
              <span className="text-sm">24-48 Hour Turnaround</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="LockClosedIcon" size={20} variant="solid" className="text-success" />
              <span className="text-sm">Secure & Confidential</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="ShieldCheckIcon" size={20} variant="solid" className="text-success" />
              <span className="text-sm">Expert Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}