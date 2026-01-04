'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '@/components/ui/AppIcon';

interface TrafficAnalyticsProps {
  dateRange: string;
}

export default function TrafficAnalytics({ dateRange }: TrafficAnalyticsProps) {
  const [trafficData, setTrafficData] = useState([
    { date: 'Jan 1', visitors: 1200, pageViews: 3400, sessions: 1800 },
    { date: 'Jan 2', visitors: 1400, pageViews: 3800, sessions: 2000 },
    { date: 'Jan 3', visitors: 1100, pageViews: 3200, sessions: 1600 },
    { date: 'Jan 4', visitors: 1600, pageViews: 4200, sessions: 2200 },
    { date: 'Jan 5', visitors: 1800, pageViews: 4600, sessions: 2400 },
    { date: 'Jan 6', visitors: 1500, pageViews: 4000, sessions: 2100 },
    { date: 'Jan 7', visitors: 1700, pageViews: 4400, sessions: 2300 },
  ]);

  const [topPages, setTopPages] = useState([
    { page: '/homepage', views: 5420, avgTime: '3m 24s', bounceRate: '38.2%' },
    { page: '/upload-analysis', views: 3210, avgTime: '5m 12s', bounceRate: '22.5%' },
    { page: '/success-stories', views: 2890, avgTime: '4m 08s', bounceRate: '35.1%' },
    { page: '/knowledge-center', views: 2340, avgTime: '6m 45s', bounceRate: '28.7%' },
    { page: '/expert-team', views: 1980, avgTime: '3m 56s', bounceRate: '42.3%' },
  ]);

  const [trafficSources, setTrafficSources] = useState([
    { source: 'Organic Search', visitors: 6420, percentage: 51.2 },
    { source: 'Direct', visitors: 3210, percentage: 25.6 },
    { source: 'Social Media', visitors: 1890, percentage: 15.1 },
    { source: 'Referral', visitors: 1023, percentage: 8.1 },
  ]);

  useEffect(() => {
    // In production, this would fetch from Google Analytics API based on dateRange
    console.log('Loading traffic analytics for:', dateRange);
  }, [dateRange]);

  return (
    <div className="space-y-6">
      {/* Traffic Trend Chart */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-primary flex items-center space-x-2">
            <Icon name="ChartBarIcon" size={20} variant="outline" />
            <span>Website Traffic Trends</span>
          </h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded-md">Visitors</button>
            <button className="px-3 py-1 text-sm bg-muted text-text-primary rounded-md hover:bg-secondary">Page Views</button>
            <button className="px-3 py-1 text-sm bg-muted text-text-primary rounded-md hover:bg-secondary">Sessions</button>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            <Line type="monotone" dataKey="visitors" stroke="#7C3AED" strokeWidth={2} name="Visitors" />
            <Line type="monotone" dataKey="pageViews" stroke="#10B981" strokeWidth={2} name="Page Views" />
            <Line type="monotone" dataKey="sessions" stroke="#F59E0B" strokeWidth={2} name="Sessions" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
            <Icon name="DocumentTextIcon" size={20} variant="outline" />
            <span>Top Pages</span>
          </h3>
          <div className="space-y-3">
            {topPages.map((page, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg hover:bg-secondary transition-brand">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-text-primary">{page.page}</span>
                  <span className="text-lg font-bold text-accent">{page.views}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <span>Avg Time: {page.avgTime}</span>
                  <span>Bounce: {page.bounceRate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
            <Icon name="GlobeAltIcon" size={20} variant="outline" />
            <span>Traffic Sources</span>
          </h3>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-text-primary">{source.source}</span>
                  <span className="text-sm text-text-secondary">{source.percentage}%</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-accent rounded-full transition-all"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{source.visitors} visitors</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device & Browser Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
            <Icon name="DevicePhoneMobileIcon" size={20} variant="outline" />
            <span>Device Distribution</span>
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { device: 'Desktop', users: 7200 },
              { device: 'Mobile', users: 4100 },
              { device: 'Tablet', users: 1243 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="device" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="users" fill="#7C3AED" name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
            <Icon name="GlobeAltIcon" size={20} variant="outline" />
            <span>Browser Statistics</span>
          </h3>
          <div className="space-y-3">
            {[
              { browser: 'Chrome', percentage: 62.4, users: 7825 },
              { browser: 'Safari', percentage: 18.2, users: 2283 },
              { browser: 'Firefox', percentage: 12.1, users: 1518 },
              { browser: 'Edge', percentage: 7.3, users: 917 },
            ].map((browser, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="GlobeAltIcon" size={20} variant="outline" className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{browser.browser}</p>
                    <p className="text-sm text-text-secondary">{browser.users} users</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-accent">{browser.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}