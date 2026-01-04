'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  image: string;
  imageAlt: string;
  isBookmarked?: boolean;
  onBookmark?: (id: string) => void;
}

export default function ArticleCard({
  id,
  title,
  excerpt,
  category,
  readTime,
  image,
  imageAlt,
  isBookmarked = false,
  onBookmark
}: ArticleCardProps) {
  return (
    <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-brand-lg transition-brand group">
      <Link href={`/knowledge-center/${id}`}>
        <div className="relative h-48 overflow-hidden">
          <AppImage
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
              {category}
            </span>
          </div>
          {onBookmark && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onBookmark(id);
              }}
              className="absolute top-4 right-4 p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-brand"
            >
              <Icon 
                name="BookmarkIcon" 
                size={20} 
                variant={isBookmarked ? "solid" : "outline"}
                className={isBookmarked ? "text-accent" : "text-text-secondary"}
              />
            </button>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1 text-text-secondary text-sm">
            <Icon name="ClockIcon" size={16} variant="outline" />
            <span>{readTime} min read</span>
          </div>
        </div>

        <Link href={`/knowledge-center/${id}`}>
          <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-brand line-clamp-2">
            {title}
          </h3>
        </Link>

        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex items-center justify-end pt-4 border-t border-border">
          <Link 
            href={`/knowledge-center/${id}`}
            className="text-accent hover:text-cta font-medium text-sm flex items-center gap-1 transition-brand"
          >
            Read More
            <Icon name="ArrowRightIcon" size={16} variant="outline" />
          </Link>
        </div>
      </div>
    </article>
  );
}