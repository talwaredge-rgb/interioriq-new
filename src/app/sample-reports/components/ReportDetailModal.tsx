'use client';

import { useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface ReportDetail {
  id: string;
  title: string;
  projectType: string;
  budgetRange: string;
  location: string;
  savingsAmount: string;
  image: string;
  alt: string;
  originalCost: string;
  optimizedCost: string;
  issuesFound: number;
  analysisDate: string;
  highlights: string[];
  detailedAnalysis: {
    overcharges: Array<{ item: string; original: string; optimized: string; savings: string }>;
    qualityIssues: string[];
    recommendations: string[];
    materialComparisons: Array<{ category: string; original: string; recommended: string; reason: string }>;
  };
  expertComments: string;
  customerTestimonial?: {
    name: string;
    feedback: string;
    rating: number;
  };
}

interface ReportDetailModalProps {
  report: ReportDetail | null;
  onClose: () => void;
}

export default function ReportDetailModal({ report, onClose }: ReportDetailModalProps) {
  useEffect(() => {
    if (report) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [report]);

  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-card rounded-lg shadow-brand-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-2xl font-semibold text-text-primary">{report.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-brand"
              aria-label="Close modal"
            >
              <Icon name="XMarkIcon" size={24} />
            </button>
          </div>

          <div className="p-6">
            <div className="relative h-64 rounded-lg overflow-hidden mb-6">
              <AppImage
                src={report.image}
                alt={report.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-success text-success-foreground px-4 py-2 rounded-full font-semibold shadow-brand">
                {report.savingsAmount} Saved
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-muted rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Project Type</p>
                <p className="font-semibold text-text-primary">{report.projectType}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Location</p>
                <p className="font-semibold text-text-primary">{report.location}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Budget Range</p>
                <p className="font-semibold text-text-primary">{report.budgetRange}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Issues Found</p>
                <p className="font-semibold text-warning">{report.issuesFound}</p>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Original Cost</p>
                  <p className="text-3xl font-bold text-text-primary">{report.originalCost}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Optimized Cost</p>
                  <p className="text-3xl font-bold text-success">{report.optimizedCost}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="ExclamationCircleIcon" size={24} className="text-warning" />
                <span>Identified Overcharges</span>
              </h3>
              <div className="space-y-3">
                {report.detailedAnalysis.overcharges.map((item, index) => (
                  <div key={index} className="bg-muted rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-text-primary">{item.item}</p>
                      <span className="bg-error text-error-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        {item.savings} overcharged
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Original Quote</p>
                        <p className="font-semibold text-text-primary">{item.original}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Market Rate</p>
                        <p className="font-semibold text-success">{item.optimized}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="ShieldExclamationIcon" size={24} className="text-error" />
                <span>Quality Issues Identified</span>
              </h3>
              <ul className="space-y-2">
                {report.detailedAnalysis.qualityIssues.map((issue, index) => (
                  <li key={index} className="flex items-start space-x-3 bg-muted rounded-lg p-4">
                    <Icon name="XCircleIcon" size={20} className="text-error mt-0.5 flex-shrink-0" variant="solid" />
                    <span className="text-text-secondary">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="LightBulbIcon" size={24} className="text-accent" />
                <span>Expert Recommendations</span>
              </h3>
              <ul className="space-y-2">
                {report.detailedAnalysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-3 bg-muted rounded-lg p-4">
                    <Icon name="CheckCircleIcon" size={20} className="text-success mt-0.5 flex-shrink-0" variant="solid" />
                    <span className="text-text-secondary">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="ArrowsRightLeftIcon" size={24} className="text-primary" />
                <span>Material Comparisons</span>
              </h3>
              <div className="space-y-4">
                {report.detailedAnalysis.materialComparisons.map((comp, index) => (
                  <div key={index} className="bg-muted rounded-lg p-4">
                    <p className="font-semibold text-text-primary mb-3">{comp.category}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Original Specification</p>
                        <p className="text-sm text-text-primary">{comp.original}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Recommended Alternative</p>
                        <p className="text-sm text-success font-semibold">{comp.recommended}</p>
                      </div>
                    </div>
                    <div className="bg-background rounded p-3">
                      <p className="text-xs text-muted-foreground mb-1">Reason for Change</p>
                      <p className="text-sm text-text-secondary">{comp.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center space-x-2">
                <Icon name="ChatBubbleLeftRightIcon" size={20} className="text-primary" />
                <span>Expert Commentary</span>
              </h3>
              <p className="text-text-secondary leading-relaxed">{report.expertComments}</p>
            </div>

            {report.customerTestimonial && (
              <div className="bg-success/5 border border-success/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center space-x-2">
                  <Icon name="UserCircleIcon" size={20} className="text-success" />
                  <span>Customer Feedback</span>
                </h3>
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="StarIcon"
                      size={20}
                      variant={i < report.customerTestimonial!.rating ? 'solid' : 'outline'}
                      className={i < report.customerTestimonial!.rating ? 'text-accent' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
                <p className="text-text-secondary italic mb-2">&ldquo;{report.customerTestimonial.feedback}&rdquo;</p>
                <p className="text-sm font-semibold text-text-primary">— {report.customerTestimonial.name}</p>
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-cta transition-brand flex items-center justify-center space-x-2">
                <Icon name="ArrowDownTrayIcon" size={20} />
                <span>Download Full Report (PDF)</span>
              </button>
              <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-secondary transition-brand flex items-center justify-center space-x-2">
                <Icon name="DocumentTextIcon" size={20} />
                <span>Get Your BoQ Analyzed</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}