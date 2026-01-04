'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface FeaturedGuideCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  chapters: number;
  totalReadTime: number;
  completionRate: number;
}

export default function FeaturedGuideCard({
  id,
  title,
  description,
  image,
  imageAlt,
  chapters,
  totalReadTime,
  completionRate
}: FeaturedGuideCardProps) {
  return (
    <Link href={`/knowledge-center/guides/${id}`}>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-brand-lg transition-brand group">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="relative h-64 lg:h-full overflow-hidden">
            <AppImage
              src={image}
              alt={imageAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-1">
                  <Icon name="BookOpenIcon" size={16} variant="outline" />
                  <span className="text-sm font-medium">{chapters} Chapters</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="ClockIcon" size={16} variant="outline" />
                  <span className="text-sm font-medium">{totalReadTime} min</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <div className="mb-3">
              <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                Featured Guide
              </span>
            </div>

            <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-accent transition-brand">
              {title}
            </h3>

            <p className="text-text-secondary mb-6 line-clamp-3">
              {description}
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-text-secondary">Average Completion</span>
                  <span className="text-accent font-semibold">{completionRate}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                <span>Start Learning</span>
                <Icon name="ArrowRightIcon" size={20} variant="outline" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}