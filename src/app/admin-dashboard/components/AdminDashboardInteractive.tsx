'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import MetricsOverview from './MetricsOverview';
import TrafficAnalytics from './TrafficAnalytics';
import ConversionFunnel from './ConversionFunnel';
import ExpertPerformance from './ExpertPerformance';
import RealtimeMonitor from './RealtimeMonitor';
import { trackEvent } from '@/lib/analytics';

interface DashboardTab {
  id: string;
  label: string;
  icon: string;
}

const tabs: DashboardTab[] = [
  { id: 'overview', label: 'Overview', icon: 'ChartBarIcon' },
  { id: 'traffic', label: 'Traffic', icon: 'UserGroupIcon' },
  { id: 'conversions', label: 'Conversions', icon: 'ChartPieIcon' },
  { id: 'experts', label: 'Experts', icon: 'StarIcon' },
  { id: 'realtime', label: 'Real-time', icon: 'BoltIcon' },
];

export default function AdminDashboardInteractive() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [dateRange, setDateRange] = useState<string>('7d');

  useEffect(() => {
    trackEvent('admin_dashboard_view', {
      event_category: 'Admin',
      page_path: window.location.pathname
    });
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    trackEvent('admin_tab_change', {
      event_category: 'Admin',
      tab_name: tabId
    });
  };

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    trackEvent('admin_date_range_change', {
      event_category: 'Admin',
      date_range: range
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <MetricsOverview dateRange={dateRange} />;
      case 'traffic':
        return <TrafficAnalytics dateRange={dateRange} />;
      case 'conversions':
        return <ConversionFunnel dateRange={dateRange} />;
      case 'experts':
        return <ExpertPerformance dateRange={dateRange} />;
      case 'realtime':
        return <RealtimeMonitor />;
      default:
        return <MetricsOverview dateRange={dateRange} />;
    }
  };

  return (
    <div className="w-full px-4 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Analytics Dashboard</h1>
        <p className="text-text-secondary">
          Real-time insights into InteriorIQ Pro&apos;s performance and user engagement
        </p>
      </div>

      {/* Date Range Selector */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-text-primary">Date Range:</label>
          <div className="flex space-x-2">
            {[
              { value: '24h', label: '24 Hours' },
              { value: '7d', label: '7 Days' },
              { value: '30d', label: '30 Days' },
              { value: '90d', label: '90 Days' },
            ].map((range) => (
              <button
                key={range.value}
                onClick={() => handleDateRangeChange(range.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-brand ${
                  dateRange === range.value
                    ? 'bg-accent text-accent-foreground shadow-brand-sm'
                    : 'bg-muted text-text-primary hover:bg-secondary'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            trackEvent('admin_export_report', {
              event_category: 'Admin',
              date_range: dateRange
            });
            alert('Export functionality will be implemented with actual analytics data');
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-cta transition-brand shadow-brand-sm"
        >
          <Icon name="ArrowDownTrayIcon" size={20} variant="outline" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-border overflow-x-auto">
        <div className="flex space-x-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 font-medium transition-brand ${
                activeTab === tab.id
                  ? 'text-accent border-b-2 border-accent' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={20} variant="outline" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {renderTabContent()}
      </div>
    </div>
  );
}