'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '@/components/ui/AppIcon';

interface ConversionFunnelProps {
  dateRange: string;
}

export default function ConversionFunnel({ dateRange }: ConversionFunnelProps) {
  const [funnelData, setFunnelData] = useState([
    { stage: 'Homepage Visit', users: 12543, percentage: 100 },
    { stage: 'Knowledge Center', users: 5621, percentage: 44.8 },
    { stage: 'Upload Page View', users: 3892, percentage: 31.0 },
    { stage: 'Upload Started', users: 1467, percentage: 11.7 },
    { stage: 'Upload Completed', users: 347, percentage: 2.8 },
  ]);

  const [contentPerformance, setContentPerformance] = useState([
    { 
      contentType: 'Design Guides', 
      views: 3420, 
      uploads: 127, 
      conversionRate: 3.7,
      avgTimeToConvert: '2.4 days'
    },
    { 
      contentType: 'Material Specifications', 
      views: 2890, 
      uploads: 98, 
      conversionRate: 3.4,
      avgTimeToConvert: '1.8 days'
    },
    { 
      contentType: 'Cost Calculators', 
      views: 2340, 
      uploads: 89, 
      conversionRate: 3.8,
      avgTimeToConvert: '1.2 days'
    },
    { 
      contentType: 'Success Stories', 
      views: 1980, 
      uploads: 76, 
      conversionRate: 3.8,
      avgTimeToConvert: '3.1 days'
    },
  ]);

  const [uploadJourney, setUploadJourney] = useState({
    avgPagesBeforeUpload: 4.2,
    avgSessionsBeforeUpload: 2.3,
    topEntryPages: [
      { page: '/homepage', uploads: 142, percentage: 40.9 },
      { page: '/knowledge-center', uploads: 98, percentage: 28.2 },
      { page: '/success-stories', uploads: 67, percentage: 19.3 },
      { page: '/expert-team', uploads: 40, percentage: 11.5 },
    ],
    dropOffPoints: [
      { stage: 'File Selection', dropOff: 32.4 },
      { stage: 'Form Filling', dropOff: 18.7 },
      { stage: 'Terms Agreement', dropOff: 8.2 },
      { stage: 'Final Submit', dropOff: 3.1 },
    ]
  });

  useEffect(() => {
    // In production, fetch from Google Analytics API
    console.log('Loading conversion funnel data for:', dateRange);
  }, [dateRange]);

  const getFunnelColor = (percentage: number) => {
    if (percentage >= 50) return '#10B981'; // Green
    if (percentage >= 20) return '#F59E0B'; // Orange
    return '#EF4444'; // Red
  };

  return (
    <div className="space-y-6">
      {/* Conversion Funnel Visualization */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-primary flex items-center space-x-2">
            <Icon name="ChartPieIcon" size={20} variant="outline" />
            <span>Content-to-Submission Funnel</span>
          </h3>
          <div className="text-sm text-text-secondary">
            Overall Conversion Rate: <span className="font-bold text-accent">2.8%</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={funnelData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" stroke="#6b7280" />
            <YAxis dataKey="stage" type="category" width={150} stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              formatter={(value: number, name: string) => {
                if (name === 'users') return [`${value} users`, 'Users'];
                return [value, name];
              }}
            />
            <Bar dataKey="users" name="users">
              {funnelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getFunnelColor(entry.percentage)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          {funnelData.map((stage, index) => (
            <div key={index} className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-accent mb-1">{stage.percentage}%</div>
              <div className="text-xs text-text-secondary">{stage.stage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Performance */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
          <Icon name="DocumentTextIcon" size={20} variant="outline" />
          <span>Content Performance Impact</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Content Type</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Views</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Uploads</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Conv. Rate</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Avg Time</th>
              </tr>
            </thead>
            <tbody>
              {contentPerformance.map((content, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted transition-brand">
                  <td className="py-3 px-4 font-medium text-text-primary">{content.contentType}</td>
                  <td className="py-3 px-4 text-right text-text-primary">{content.views}</td>
                  <td className="py-3 px-4 text-right text-text-primary">{content.uploads}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {content.conversionRate}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-text-secondary">{content.avgTimeToConvert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Journey Insights */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
            <Icon name="MapIcon" size={20} variant="outline" />
            <span>User Journey Analysis</span>
          </h3>
          
          <div className="space-y-4 mb-6">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-accent mb-1">{uploadJourney.avgPagesBeforeUpload}</div>
              <div className="text-sm text-text-secondary">Average Pages Before Upload</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-accent mb-1">{uploadJourney.avgSessionsBeforeUpload}</div>
              <div className="text-sm text-text-secondary">Average Sessions Before Upload</div>
            </div>
          </div>

          <h4 className="font-medium text-text-primary mb-3">Top Entry Pages Leading to Upload</h4>
          <div className="space-y-2">
            {uploadJourney.topEntryPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-text-primary">{page.page}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-accent">{page.uploads}</span>
                  <span className="text-xs text-text-secondary">({page.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drop-off Analysis */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
            <Icon name="ExclamationTriangleIcon" size={20} variant="outline" />
            <span>Upload Drop-off Analysis</span>
          </h3>
          
          <p className="text-sm text-text-secondary mb-6">
            Identify where users abandon the upload process to optimize conversion
          </p>

          <div className="space-y-4">
            {uploadJourney.dropOffPoints.map((point, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-text-primary">{point.stage}</span>
                  <span className={`text-sm font-bold ${
                    point.dropOff > 20 ? 'text-red-600' : 
                    point.dropOff > 10 ? 'text-orange-600': 'text-green-600'
                  }`}>
                    {point.dropOff}% drop-off
                  </span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full rounded-full transition-all ${
                      point.dropOff > 20 ? 'bg-red-500' : 
                      point.dropOff > 10 ? 'bg-orange-500': 'bg-green-500'
                    }`}
                    style={{ width: `${point.dropOff}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-2">
              <Icon name="LightBulbIcon" size={20} variant="outline" className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900 mb-1">Optimization Tip</p>
                <p className="text-sm text-blue-700">
                  File Selection has the highest drop-off rate. Consider implementing drag-and-drop 
                  functionality and clearer file format guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}