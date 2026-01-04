'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ReportCardProps {
  report: {
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
  };
  onViewDetails: (id: string) => void;
}

export default function ReportCard({ report, onViewDetails }: ReportCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-brand-lg transition-brand group flex flex-col">
      <div className="relative h-48 overflow-hidden bg-muted">
        {!imageError ? (
          <AppImage
            src={report.image}
            alt={report.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-brand"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Icon name="PhotoIcon" size={48} className="text-muted-foreground" />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-brand">
          {report.savingsAmount} Saved
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-brand">
            {report.title}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="HomeIcon" size={16} className="text-muted-foreground" />
            <span className="text-sm text-text-secondary">{report.projectType}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MapPinIcon" size={16} className="text-muted-foreground" />
            <span className="text-sm text-text-secondary">{report.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CurrencyRupeeIcon" size={16} className="text-muted-foreground" />
            <span className="text-sm text-text-secondary">{report.budgetRange}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="ExclamationTriangleIcon" size={16} className="text-warning" />
            <span className="text-sm text-text-secondary">{report.issuesFound} Issues Found</span>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Original Cost</p>
              <p className="text-lg font-semibold text-text-primary">{report.originalCost}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Optimized Cost</p>
              <p className="text-lg font-semibold text-success">{report.optimizedCost}</p>
            </div>
          </div>
        </div>

        <div className="mb-4 flex-grow">
          <p className="text-xs font-semibold text-text-primary mb-2">Key Highlights:</p>
          <ul className="space-y-1">
            {report.highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="CheckCircleIcon" size={16} className="text-success mt-0.5 flex-shrink-0" variant="solid" />
                <span className="text-sm text-text-secondary">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => onViewDetails(report.id)}
          className="w-full px-4 py-2.5 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-cta transition-brand flex items-center justify-center space-x-2 mt-auto"
        >
          <span>View Full Analysis</span>
          <Icon name="ArrowRightIcon" size={16} />
        </button>
      </div>
    </div>
  );
}