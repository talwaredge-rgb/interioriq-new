'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface InteractiveToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  usageCount: number;
  category: string;
}

export default function InteractiveToolCard({
  id,
  title,
  description,
  icon,
  usageCount,
  category
}: InteractiveToolCardProps) {
  return (
    <Link href={`/knowledge-center/tools/${id}`}>
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand-lg transition-brand group h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-brand">
            <Icon name={icon as any} size={24} variant="outline" className="text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-accent transition-brand">
              {title}
            </h3>
            <span className="text-xs text-text-secondary font-medium">{category}</span>
          </div>
        </div>

        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <Icon name="UserGroupIcon" size={16} variant="outline" />
            <span>{usageCount.toLocaleString('en-IN')} users</span>
          </div>
          <div className="flex items-center gap-1 text-accent font-medium text-sm group-hover:gap-2 transition-all">
            <span>Try Now</span>
            <Icon name="ArrowRightIcon" size={16} variant="outline" />
          </div>
        </div>
      </div>
    </Link>
  );
}