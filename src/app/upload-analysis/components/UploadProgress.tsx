'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface UploadProgressProps {
  isUploading: boolean;
  progress: number;
  currentStage: string;
  estimatedTime: string;
}

const UploadProgress = ({ isUploading, progress, currentStage, estimatedTime }: UploadProgressProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isUploading) return null;

  const stages = [
    { label: 'Uploading Files', icon: 'CloudArrowUpIcon' },
    { label: 'Scanning for Security', icon: 'ShieldCheckIcon' },
    { label: 'Processing Documents', icon: 'DocumentMagnifyingGlassIcon' },
    { label: 'Queuing for Analysis', icon: 'ClockIcon' }
  ];

  const currentStageIndex = stages.findIndex(stage => stage.label === currentStage);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl shadow-brand-lg p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Icon name="ArrowPathIcon" size={32} variant="outline" className="text-accent animate-spin" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary">
            Uploading Your BoQ
          </h3>
          <p className="text-sm text-text-secondary">
            Please don&apos;t close this window
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">{currentStage}</span>
              <span className="font-semibold text-accent">{progress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {stages.map((stage, index) => (
              <div
                key={stage.label}
                className={`flex items-center space-x-3 transition-brand ${
                  index <= currentStageIndex ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  index < currentStageIndex
                    ? 'bg-success text-success-foreground'
                    : index === currentStageIndex
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-text-secondary'
                }`}>
                  {index < currentStageIndex ? (
                    <Icon name="CheckIcon" size={16} variant="solid" />
                  ) : (
                    <Icon name={stage.icon} size={16} variant="outline" />
                  )}
                </div>
                <span className={`text-sm ${
                  index <= currentStageIndex ? 'text-text-primary font-medium' : 'text-text-secondary'
                }`}>
                  {stage.label}
                </span>
              </div>
            ))}
          </div>

          {isHydrated && estimatedTime && (
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-text-secondary text-center">
                Estimated time remaining: <span className="font-semibold text-text-primary">{estimatedTime}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadProgress;