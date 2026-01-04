import Icon from '@/components/ui/AppIcon';

interface StatsSectionProps {
  totalStories: number;
  totalSavings: string;
  averageSavings: string;
  satisfactionRate: string;
}

export default function StatsSection({
  totalStories,
  totalSavings,
  averageSavings,
  satisfactionRate,
}: StatsSectionProps) {
  const stats = [
    {
      icon: 'DocumentTextIcon',
      label: 'Success Stories',
      value: totalStories.toString(),
      color: 'text-accent',
    },
    {
      icon: 'CurrencyRupeeIcon',
      label: 'Total Savings',
      value: totalSavings,
      color: 'text-success',
    },
    {
      icon: 'ChartBarIcon',
      label: 'Average Savings',
      value: averageSavings,
      color: 'text-accent',
    },
    {
      icon: 'StarIcon',
      label: 'Satisfaction Rate',
      value: satisfactionRate,
      color: 'text-warning',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-xl p-6 shadow-brand hover:shadow-brand-lg transition-brand"
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
              <Icon name={stat.icon as any} size={24} variant="solid" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-sm text-text-secondary">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}