'use client';

import { useState, useEffect } from 'react';

import Icon from '@/components/ui/AppIcon';

interface ExpertPerformanceProps {
  dateRange: string;
}

interface ExpertMetric {
  id: string;
  name: string;
  specialization: string;
  profileViews: number;
  consultationBookings: number;
  satisfactionScore: number;
  responseTime: string;
  completedProjects: number;
  revenue: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
}

export default function ExpertPerformance({ dateRange }: ExpertPerformanceProps) {
  const [experts, setExperts] = useState<ExpertMetric[]>([
    {
      id: '1',
      name: 'Sarah Anderson',
      specialization: 'Interior Design',
      profileViews: 1543,
      consultationBookings: 47,
      satisfactionScore: 4.9,
      responseTime: '2.3 hrs',
      completedProjects: 142,
      revenue: 12450,
      trend: 'up',
      trendValue: '+12%'
    },
    {
      id: '2',
      name: 'Michael Chen',
      specialization: 'Cost Estimation',
      profileViews: 1289,
      consultationBookings: 39,
      satisfactionScore: 4.8,
      responseTime: '1.8 hrs',
      completedProjects: 128,
      revenue: 10890,
      trend: 'up',
      trendValue: '+8%'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      specialization: 'Project Management',
      profileViews: 1156,
      consultationBookings: 34,
      satisfactionScore: 4.7,
      responseTime: '3.1 hrs',
      completedProjects: 98,
      revenue: 9670,
      trend: 'stable',
      trendValue: '0%'
    },
    {
      id: '4',
      name: 'David Park',
      specialization: 'Material Selection',
      profileViews: 987,
      consultationBookings: 28,
      satisfactionScore: 4.6,
      responseTime: '2.7 hrs',
      completedProjects: 85,
      revenue: 8340,
      trend: 'down',
      trendValue: '-3%'
    },
  ]);

  const [teamStats, setTeamStats] = useState({
    totalExperts: 12,
    avgSatisfaction: 4.7,
    totalConsultations: 248,
    totalRevenue: 67890,
    avgResponseTime: '2.5 hrs',
    activeExperts: 11
  });

  useEffect(() => {
    // In production, fetch from database/analytics
    console.log('Loading expert performance data for:', dateRange);
  }, [dateRange]);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'ArrowTrendingUpIcon';
      case 'down': return 'ArrowTrendingDownIcon';
      case 'stable': return 'MinusIcon';
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-text-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Team Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon name="UsersIcon" size={24} variant="outline" className="text-primary" />
            </div>
            <span className="text-sm font-medium text-green-600">+2 this month</span>
          </div>
          <h3 className="text-2xl font-bold text-primary mb-1">{teamStats.totalExperts}</h3>
          <p className="text-sm text-text-secondary">Total Experts</p>
          <p className="text-xs text-text-secondary mt-2">{teamStats.activeExperts} currently active</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon name="StarIcon" size={24} variant="outline" className="text-primary" />
            </div>
            <span className="text-sm font-medium text-green-600">+0.2 pts</span>
          </div>
          <h3 className="text-2xl font-bold text-primary mb-1">{teamStats.avgSatisfaction}/5.0</h3>
          <p className="text-sm text-text-secondary">Avg Satisfaction Score</p>
          <p className="text-xs text-text-secondary mt-2">Based on {teamStats.totalConsultations} consultations</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon name="CurrencyDollarIcon" size={24} variant="outline" className="text-primary" />
            </div>
            <span className="text-sm font-medium text-green-600">+15.3%</span>
          </div>
          <h3 className="text-2xl font-bold text-primary mb-1">${teamStats.totalRevenue.toLocaleString()}</h3>
          <p className="text-sm text-text-secondary">Total Revenue</p>
          <p className="text-xs text-text-secondary mt-2">From {teamStats.totalConsultations} consultations</p>
        </div>
      </div>

      {/* Individual Expert Performance */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
          <Icon name="ChartBarIcon" size={20} variant="outline" />
          <span>Individual Expert Performance</span>
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Expert</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Profile Views</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Bookings</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Rating</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Response</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Revenue</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Trend</th>
              </tr>
            </thead>
            <tbody>
              {experts.map((expert, index) => (
                <tr key={expert.id} className="border-b border-border hover:bg-muted transition-brand">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">{expert.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{expert.name}</p>
                        <p className="text-xs text-text-secondary">{expert.specialization}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-text-primary">{expert.profileViews}</td>
                  <td className="py-4 px-4 text-right text-text-primary">{expert.consultationBookings}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Icon name="StarIcon" size={16} variant="solid" className="text-yellow-500" />
                      <span className="font-medium text-text-primary">{expert.satisfactionScore}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-text-secondary">{expert.responseTime}</td>
                  <td className="py-4 px-4 text-right font-medium text-text-primary">
                    ${expert.revenue.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className={`flex items-center justify-end space-x-1 ${getTrendColor(expert.trend)}`}>
                      <Icon name={getTrendIcon(expert.trend)} size={16} variant="outline" />
                      <span className="text-sm font-medium">{expert.trendValue}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expert Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
            <Icon name="TrophyIcon" size={20} variant="outline" />
            <span>Top by Views</span>
          </h3>
          <div className="space-y-3">
            {[...experts].sort((a, b) => b.profileViews - a.profileViews).slice(0, 3).map((expert, index) => (
              <div key={expert.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                  index === 0 ? 'bg-yellow-500 text-white' :
                  index === 1 ? 'bg-gray-400 text-white': 'bg-orange-600 text-white'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{expert.name}</p>
                  <p className="text-sm text-text-secondary">{expert.profileViews} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
            <Icon name="StarIcon" size={20} variant="outline" />
            <span>Top by Rating</span>
          </h3>
          <div className="space-y-3">
            {[...experts].sort((a, b) => b.satisfactionScore - a.satisfactionScore).slice(0, 3).map((expert, index) => (
              <div key={expert.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                  index === 0 ? 'bg-yellow-500 text-white' :
                  index === 1 ? 'bg-gray-400 text-white': 'bg-orange-600 text-white'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{expert.name}</p>
                  <p className="text-sm text-text-secondary">{expert.satisfactionScore}/5.0 rating</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
            <Icon name="CurrencyDollarIcon" size={20} variant="outline" />
            <span>Top by Revenue</span>
          </h3>
          <div className="space-y-3">
            {[...experts].sort((a, b) => b.revenue - a.revenue).slice(0, 3).map((expert, index) => (
              <div key={expert.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                  index === 0 ? 'bg-yellow-500 text-white' :
                  index === 1 ? 'bg-gray-400 text-white': 'bg-orange-600 text-white'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{expert.name}</p>
                  <p className="text-sm text-text-secondary">${expert.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}