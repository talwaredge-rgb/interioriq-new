import Icon from '@/components/ui/AppIcon';

interface StatsSectionProps {
  totalReports: number;
  totalSavings: string;
  avgSavingsPercent: number;
  issuesIdentified: number;
}

export default function StatsSection({ 
  totalReports, 
  totalSavings, 
  avgSavingsPercent, 
  issuesIdentified 
}: StatsSectionProps) {
  const stats = [
    {
      icon: 'DocumentTextIcon' as const,
      label: 'Sample Reports',
      value: totalReports.toString(),
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: 'CurrencyRupeeIcon' as const,
      label: 'Total Savings Demonstrated',
      value: totalSavings,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      icon: 'ChartBarIcon' as const,
      label: 'Average Savings',
      value: `${avgSavingsPercent}%`,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: 'ExclamationTriangleIcon' as const,
      label: 'Issues Identified',
      value: issuesIdentified.toString(),
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-brand transition-brand">
          <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}>
            <Icon name={stat.icon} size={24} className={stat.color} />
          </div>
          <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}