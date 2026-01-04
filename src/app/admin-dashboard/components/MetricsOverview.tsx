'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  description: string;
}

function MetricCard({ title, value, change, trend, icon, description }: MetricCardProps) {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-text-secondary',
  };

  const trendIcons = {
    up: 'ArrowTrendingUpIcon',
    down: 'ArrowTrendingDownIcon',
    neutral: 'MinusIcon',
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:shadow-brand-lg transition-brand">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon name={icon} size={24} variant="outline" className="text-primary" />
        </div>
        <div className={`flex items-center space-x-1 ${trendColors[trend]}`}>
          <Icon name={trendIcons[trend]} size={16} variant="outline" />
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-primary mb-1">{value}</h3>
      <p className="text-sm font-medium text-text-primary mb-1">{title}</p>
      <p className="text-xs text-text-secondary">{description}</p>
    </div>
  );
}

interface MetricsOverviewProps {
  dateRange: string;
}

export default function MetricsOverview({ dateRange }: MetricsOverviewProps) {
  const [metrics, setMetrics] = useState({
    totalVisitors: { value: '12,543', change: '+12.5%', trend: 'up' as const },
    boqUploads: { value: '347', change: '+8.3%', trend: 'up' as const },
    conversionRate: { value: '23.7%', change: '+2.1%', trend: 'up' as const },
    avgSessionTime: { value: '4m 32s', change: '-5.2%', trend: 'down' as const },
    expertConsults: { value: '89', change: '+15.4%', trend: 'up' as const },
    bounceRate: { value: '42.3%', change: '-3.7%', trend: 'up' as const },
  });

  useEffect(() => {
    // Simulate data loading based on date range
    const loadMetrics = () => {
      // In production, this would fetch from Google Analytics API
      console.log('Loading metrics for date range:', dateRange);
    };
    
    loadMetrics();
  }, [dateRange]);

  const metricCards: MetricCardProps[] = [
    {
      title: 'Total Website Visitors',
      value: metrics.totalVisitors.value,
      change: metrics.totalVisitors.change,
      trend: metrics.totalVisitors.trend,
      icon: 'UserGroupIcon',
      description: 'Unique visitors in selected period',
    },
    {
      title: 'BoQ Uploads',
      value: metrics.boqUploads.value,
      change: metrics.boqUploads.change,
      trend: metrics.boqUploads.trend,
      icon: 'ArrowUpTrayIcon',
      description: 'Total file uploads completed',
    },
    {
      title: 'Upload Conversion Rate',
      value: metrics.conversionRate.value,
      change: metrics.conversionRate.change,
      trend: metrics.conversionRate.trend,
      icon: 'ChartBarIcon',
      description: 'Visitors who completed upload',
    },
    {
      title: 'Avg Session Duration',
      value: metrics.avgSessionTime.value,
      change: metrics.avgSessionTime.change,
      trend: metrics.avgSessionTime.trend,
      icon: 'ClockIcon',
      description: 'Average time spent on site',
    },
    {
      title: 'Expert Consultations',
      value: metrics.expertConsults.value,
      change: metrics.expertConsults.change,
      trend: metrics.expertConsults.trend,
      icon: 'StarIcon',
      description: 'Expert profile engagement',
    },
    {
      title: 'Bounce Rate',
      value: metrics.bounceRate.value,
      change: metrics.bounceRate.change,
      trend: metrics.bounceRate.trend,
      icon: 'ArrowUturnLeftIcon',
      description: 'Single-page visit percentage',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
          <Icon name="BoltIcon" size={20} variant="outline" />
          <span>Quick Actions</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-muted rounded-lg hover:bg-secondary transition-brand text-left">
            <Icon name="DocumentTextIcon" size={24} variant="outline" className="text-accent" />
            <div>
              <p className="font-medium text-text-primary">View Reports</p>
              <p className="text-xs text-text-secondary">Detailed analytics</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-muted rounded-lg hover:bg-secondary transition-brand text-left">
            <Icon name="UsersIcon" size={24} variant="outline" className="text-accent" />
            <div>
              <p className="font-medium text-text-primary">User Management</p>
              <p className="text-xs text-text-secondary">Manage accounts</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-muted rounded-lg hover:bg-secondary transition-brand text-left">
            <Icon name="DocumentDuplicateIcon" size={24} variant="outline" className="text-accent" />
            <div>
              <p className="font-medium text-text-primary">Content Library</p>
              <p className="text-xs text-text-secondary">Manage content</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-muted rounded-lg hover:bg-secondary transition-brand text-left">
            <Icon name="Cog6ToothIcon" size={24} variant="outline" className="text-accent" />
            <div>
              <p className="font-medium text-text-primary">Settings</p>
              <p className="text-xs text-text-secondary">System config</p>
            </div>
          </button>
        </div>
      </div>

      {/* Alert Notifications */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
          <Icon name="BellIcon" size={20} variant="outline" />
          <span>System Alerts</span>
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <Icon name="CheckCircleIcon" size={20} variant="outline" className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-green-900">System Operating Normally</p>
              <p className="text-sm text-green-700">All services running smoothly - Last checked 2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Icon name="InformationCircleIcon" size={20} variant="outline" className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">High Traffic Period</p>
              <p className="text-sm text-blue-700">20% above average - Consider scaling resources</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}