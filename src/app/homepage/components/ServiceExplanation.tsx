'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ServiceStep {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const serviceSteps: ServiceStep[] = [
  {
    id: 1,
    icon: "CloudArrowUpIcon",
    title: "Upload Your BoQ",
    description: "Simply drag and drop your Bill of Quantities in any format - PDF, Excel, Word, or images. Our secure system accepts all standard formats."
  },
  {
    id: 2,
    icon: "MagnifyingGlassIcon",
    title: "Expert Analysis",
    description: "Our team of seasoned professionals with 20+ years of experience reviews every line item, comparing against market rates and industry standards."
  },
  {
    id: 3,
    icon: "DocumentCheckIcon",
    title: "Detailed Report",
    description: "Receive a comprehensive analysis highlighting overpricing, hidden costs, quality concerns, and cost-saving opportunities within 24-48 hours."
  },
  {
    id: 4,
    icon: "ChatBubbleLeftRightIcon",
    title: "Expert Consultation",
    description: "Get personalized recommendations and have the option to book a detailed consultation with our experts for deeper insights and guidance."
  }
];

export default function ServiceExplanation() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
              How It Works
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
                <div className="w-16 h-16 bg-muted rounded-full mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent">
            Simple Process
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
            How It Works
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Get professional BoQ analysis in four simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {serviceSteps.map((step, index) => (
            <div
              key={step.id}
              className="relative bg-card rounded-xl p-6 shadow-brand hover:shadow-brand-lg transition-brand"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-brand">
                {step.id}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Icon name={step.icon as any} size={32} variant="outline" className="text-accent" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line (except last item) */}
              {index < serviceSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/30"></div>
              )}
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-brand">
          <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-8 text-center">
            Why Choose InteriorIQ Pro?
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="ShieldCheckIcon" size={20} variant="solid" className="text-success" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-1">100% Free Service</h4>
                <p className="text-sm text-text-secondary">No hidden charges, completely complimentary analysis</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="AcademicCapIcon" size={20} variant="solid" className="text-success" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-1">Expert Team</h4>
                <p className="text-sm text-text-secondary">20+ years average experience in interior cost analysis</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="ClockIcon" size={20} variant="solid" className="text-success" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-1">Quick Turnaround</h4>
                <p className="text-sm text-text-secondary">Receive detailed analysis within 24-48 hours</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="DocumentMagnifyingGlassIcon" size={20} variant="solid" className="text-success" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-1">Comprehensive Review</h4>
                <p className="text-sm text-text-secondary">Every line item checked against market standards</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="CurrencyRupeeIcon" size={20} variant="solid" className="text-success" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-1">Cost Savings</h4>
                <p className="text-sm text-text-secondary">Average savings of ₹1.8L per project identified</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="LockClosedIcon" size={20} variant="solid" className="text-success" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-1">Secure & Confidential</h4>
                <p className="text-sm text-text-secondary">Your data is encrypted and never shared</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}