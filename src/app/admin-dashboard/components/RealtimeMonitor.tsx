'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ActiveUser {
  id: string;
  page: string;
  location: string;
  device: string;
  timeOnPage: string;
}

interface LiveUpload {
  id: string;
  fileName: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed';
  userEmail: string;
  timestamp: string;
}

export default function RealtimeMonitor() {
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([
    { id: '1', page: '/homepage', location: 'Mumbai, India', device: 'Desktop', timeOnPage: '2m 34s' },
    { id: '2', page: '/upload-analysis', location: 'Delhi, India', device: 'Mobile', timeOnPage: '4m 12s' },
    { id: '3', page: '/success-stories', location: 'Bangalore, India', device: 'Desktop', timeOnPage: '1m 45s' },
    { id: '4', page: '/expert-team', location: 'Pune, India', device: 'Tablet', timeOnPage: '3m 08s' },
    { id: '5', page: '/knowledge-center', location: 'Hyderabad, India', device: 'Desktop', timeOnPage: '5m 22s' },
  ]);

  const [liveUploads, setLiveUploads] = useState<LiveUpload[]>([
    { 
      id: '1', 
      fileName: 'villa_boq.xlsx', 
      progress: 75, 
      status: 'uploading',
      userEmail: 'client@example.com',
      timestamp: '2 minutes ago'
    },
    { 
      id: '2', 
      fileName: 'apartment_specs.pdf', 
      progress: 100, 
      status: 'completed',
      userEmail: 'user@example.com',
      timestamp: '5 minutes ago'
    },
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    currentActiveUsers: 47,
    uploadQueueLength: 3,
    avgResponseTime: 1.2,
    serverLoad: 45,
    databaseConnections: 12,
    errorRate: 0.3
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        currentActiveUsers: Math.max(40, Math.min(60, prev.currentActiveUsers + Math.floor(Math.random() * 5) - 2)),
        serverLoad: Math.max(30, Math.min(70, prev.serverLoad + Math.floor(Math.random() * 10) - 5))
      }));

      // Update upload progress
      setLiveUploads(prev => 
        prev.map(upload => {
          if (upload.status === 'uploading' && upload.progress < 100) {
            return { ...upload, progress: Math.min(100, upload.progress + 5) };
          }
          if (upload.progress === 100 && upload.status === 'uploading') {
            return { ...upload, status: 'completed' as const };
          }
          return upload;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading': return 'bg-blue-500';
      case 'processing': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Icon name="UsersIcon" size={24} variant="outline" className="text-green-600" />
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <h3 className="text-3xl font-bold text-primary mb-1">{systemMetrics.currentActiveUsers}</h3>
          <p className="text-sm text-text-secondary">Active Users Right Now</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Icon name="ArrowUpTrayIcon" size={24} variant="outline" className="text-blue-600" />
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <h3 className="text-3xl font-bold text-primary mb-1">{systemMetrics.uploadQueueLength}</h3>
          <p className="text-sm text-text-secondary">Uploads in Queue</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Icon name="BoltIcon" size={24} variant="outline" className="text-purple-600" />
            </div>
            <span className="text-sm font-medium text-green-600">Healthy</span>
          </div>
          <h3 className="text-3xl font-bold text-primary mb-1">{systemMetrics.avgResponseTime}s</h3>
          <p className="text-sm text-text-secondary">Avg Response Time</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Users */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary flex items-center space-x-2">
              <Icon name="UserGroupIcon" size={20} variant="outline" />
              <span>Currently Active Users</span>
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-text-secondary">Live</span>
            </div>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {activeUsers.map((user) => (
              <div key={user.id} className="p-4 bg-muted rounded-lg hover:bg-secondary transition-brand">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-text-primary">{user.page}</span>
                  <span className="text-sm text-text-secondary">{user.timeOnPage}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPinIcon" size={14} variant="outline" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="DevicePhoneMobileIcon" size={14} variant="outline" />
                    <span>{user.device}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Upload Activity */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary flex items-center space-x-2">
              <Icon name="ArrowUpTrayIcon" size={20} variant="outline" />
              <span>Live Upload Activity</span>
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-text-secondary">Live</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {liveUploads.map((upload) => (
              <div key={upload.id} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="DocumentTextIcon" size={20} variant="outline" className="text-primary" />
                    <span className="font-medium text-text-primary">{upload.fileName}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full text-white ${getStatusColor(upload.status)}`}>
                    {upload.status}
                  </span>
                </div>
                
                {upload.status === 'uploading' && (
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-secondary">Progress</span>
                      <span className="font-medium text-accent">{upload.progress}%</span>
                    </div>
                    <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-accent rounded-full transition-all duration-500"
                        style={{ width: `${upload.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <span>{upload.userEmail}</span>
                  <span>{upload.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Performance */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
          <Icon name="ServerIcon" size={20} variant="outline" />
          <span>System Performance</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Server Load</span>
              <span className="text-sm font-medium text-text-primary">{systemMetrics.serverLoad}%</span>
            </div>
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full rounded-full transition-all ${
                  systemMetrics.serverLoad > 70 ? 'bg-red-500' : 
                  systemMetrics.serverLoad > 50 ? 'bg-yellow-500': 'bg-green-500'
                }`}
                style={{ width: `${systemMetrics.serverLoad}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Database Connections</span>
              <span className="text-sm font-medium text-text-primary">{systemMetrics.databaseConnections}/50</span>
            </div>
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${(systemMetrics.databaseConnections / 50) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Error Rate</span>
              <span className="text-sm font-medium text-text-primary">{systemMetrics.errorRate}%</span>
            </div>
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all"
                style={{ width: `${systemMetrics.errorRate * 10}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}