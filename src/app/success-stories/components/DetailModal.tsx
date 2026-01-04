'use client';

import { useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface DetailModalProps {
  story: {
    id: number;
    customerName: string;
    location: string;
    homeType: string;
    budgetRange: string;
    savingsAmount: string;
    savingsNumber: number;
    projectImage: string;
    projectImageAlt: string;
    customerImage: string;
    customerImageAlt: string;
    problemIdentified: string;
    expertSolution: string;
    testimonial: string;
    projectDate: string;
    category: string;
    detailedAnalysis: string;
    beforeCosts: Array<{ item: string; cost: string }>;
    afterCosts: Array<{ item: string; cost: string }>;
    expertName: string;
    projectDuration: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailModal({ story, isOpen, onClose }: DetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-card rounded-2xl shadow-brand-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-text-primary">Success Story Details</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg hover:bg-muted transition-brand flex items-center justify-center"
            aria-label="Close modal"
          >
            <Icon name="XMarkIcon" size={24} variant="outline" className="text-text-primary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Project Image */}
          <div className="relative h-80 rounded-xl overflow-hidden">
            <AppImage
              src={story.projectImage}
              alt={story.projectImageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-success text-success-foreground px-6 py-3 rounded-lg font-bold text-lg shadow-brand">
              Saved {story.savingsAmount}
            </div>
          </div>

          {/* Customer Info */}
          <div className="flex items-center space-x-4 p-4 bg-muted rounded-xl">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <AppImage
                src={story.customerImage}
                alt={story.customerImageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-text-primary">{story.customerName}</h3>
              <p className="text-text-secondary">{story.location}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary">Project Date</p>
              <p className="font-medium text-text-primary">{story.projectDate}</p>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs text-text-secondary mb-1">Home Type</p>
              <p className="font-semibold text-text-primary">{story.homeType}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs text-text-secondary mb-1">Budget Range</p>
              <p className="font-semibold text-text-primary">{story.budgetRange}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs text-text-secondary mb-1">Category</p>
              <p className="font-semibold text-accent">{story.category}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs text-text-secondary mb-1">Duration</p>
              <p className="font-semibold text-text-primary">{story.projectDuration}</p>
            </div>
          </div>

          {/* Problem & Solution */}
          <div className="space-y-4">
            <div className="p-6 bg-warning/10 border border-warning/20 rounded-xl">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="ExclamationTriangleIcon" size={24} variant="solid" className="text-warning" />
                <h3 className="text-lg font-semibold text-text-primary">Problem Identified</h3>
              </div>
              <p className="text-text-primary leading-relaxed">{story.problemIdentified}</p>
            </div>

            <div className="p-6 bg-success/10 border border-success/20 rounded-xl">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="CheckCircleIcon" size={24} variant="solid" className="text-success" />
                <h3 className="text-lg font-semibold text-text-primary">Expert Solution</h3>
              </div>
              <p className="text-text-primary leading-relaxed">{story.expertSolution}</p>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="p-6 bg-muted rounded-xl">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Detailed Analysis</h3>
            <p className="text-text-primary leading-relaxed">{story.detailedAnalysis}</p>
          </div>

          {/* Cost Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-card border-2 border-destructive/20 rounded-xl">
              <h3 className="text-lg font-semibold text-destructive mb-4">Before Analysis</h3>
              <div className="space-y-3">
                {story.beforeCosts.map((item, index) => (
                  <div key={index} className="flex justify-between items-center pb-3 border-b border-border last:border-0">
                    <span className="text-text-primary">{item.item}</span>
                    <span className="font-semibold text-text-primary">{item.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-card border-2 border-success/20 rounded-xl">
              <h3 className="text-lg font-semibold text-success mb-4">After Analysis</h3>
              <div className="space-y-3">
                {story.afterCosts.map((item, index) => (
                  <div key={index} className="flex justify-between items-center pb-3 border-b border-border last:border-0">
                    <span className="text-text-primary">{item.item}</span>
                    <span className="font-semibold text-text-primary">{item.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="p-6 bg-accent/10 border border-accent/20 rounded-xl">
            <Icon name="ChatBubbleLeftIcon" size={32} variant="solid" className="text-accent mb-4" />
            <p className="text-lg text-text-primary italic leading-relaxed mb-4">"{story.testimonial}"</p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-text-secondary">
                Analyzed by <span className="font-semibold text-accent">{story.expertName}</span>
              </p>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon key={star} name="StarIcon" size={20} variant="solid" className="text-warning" />
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/upload-analysis"
              className="flex-1 px-6 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-cta transition-brand shadow-brand-sm hover:shadow-brand text-center"
            >
              Get Your Free Analysis
            </a>
            <a
              href="/expert-team"
              className="flex-1 px-6 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-primary transition-brand shadow-brand-sm text-center"
            >
              Meet Our Experts
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}