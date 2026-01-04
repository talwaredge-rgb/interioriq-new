'use client';

import Icon from '@/components/ui/AppIcon';

interface RegionalPriceCardProps {
  city: string;
  region: string;
  priceRange: string;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  lastUpdated: string;
}

export default function RegionalPriceCard({
  city,
  region,
  priceRange,
  trend,
  trendPercentage,
  lastUpdated
}: RegionalPriceCardProps) {
  const trendConfig = {
    up: { icon: 'ArrowTrendingUpIcon', color: 'text-error', bg: 'bg-error/10' },
    down: { icon: 'ArrowTrendingDownIcon', color: 'text-success', bg: 'bg-success/10' },
    stable: { icon: 'MinusIcon', color: 'text-text-secondary', bg: 'bg-muted' }
  };

  const config = trendConfig[trend];

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand transition-brand">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">{city}</h3>
          <p className="text-sm text-text-secondary">{region}</p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded ${config.bg}`}>
          <Icon name={config.icon as any} size={16} variant="outline" className={config.color} />
          <span className={`text-sm font-semibold ${config.color}`}>
            {trendPercentage}%
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-text-secondary mb-1">Average Price Range</p>
        <p className="text-2xl font-bold text-accent">{priceRange}</p>
      </div>

      <div className="flex items-center gap-2 text-xs text-text-secondary pt-4 border-t border-border">
        <Icon name="ClockIcon" size={14} variant="outline" />
        <span>Updated {lastUpdated}</span>
      </div>
    </div>
  );
}