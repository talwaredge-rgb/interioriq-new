import Icon from '@/components/ui/AppIcon';

const TrustSignals = () => {
  const stats = [
    { value: '15,000+', label: 'BoQs Analyzed', icon: 'DocumentCheckIcon' },
    { value: '₹45 Cr+', label: 'Savings Identified', icon: 'CurrencyRupeeIcon' },
    { value: '98%', label: 'Customer Satisfaction', icon: 'StarIcon' },
    { value: '24-48h', label: 'Average Turnaround', icon: 'ClockIcon' }
  ];

  const features = [
    {
      icon: 'UserGroupIcon',
      title: '50+ Years Combined Experience',
      description: 'Our expert team brings decades of interior industry knowledge'
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'Completely Free Service',
      description: 'No hidden charges, no credit card required, no obligations'
    },
    {
      icon: 'LockClosedIcon',
      title: 'Bank-Level Security',
      description: 'SSL encryption and secure file handling for your peace of mind'
    },
    {
      icon: 'ChatBubbleLeftRightIcon',
      title: 'Expert Follow-up Available',
      description: 'Questions about your analysis? Our experts are here to help'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat, index) => (
          <div
            key={index}
            className="p-4 bg-card border border-border rounded-lg text-center hover:border-accent/50 transition-brand group"
          >
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-brand">
              <Icon name={stat?.icon} size={20} variant="solid" className="text-accent" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">
              {stat?.value}
            </div>
            <div className="text-xs text-text-secondary">
              {stat?.label}
            </div>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {features?.map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 bg-muted rounded-lg hover:bg-card hover:border hover:border-accent/50 transition-brand"
          >
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={20} variant="outline" className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-text-primary mb-1">
                {feature?.title}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-xl">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="SparklesIcon" size={24} variant="solid" className="text-accent-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              What Makes Our Analysis Different?
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Unlike automated tools, every BoQ is reviewed by experienced interior professionals who understand regional pricing, material quality variations, and common vendor tactics. We catch what others miss.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Material Quality Check', 'Price Benchmarking', 'Hidden Cost Detection', 'Vendor Credibility']?.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-card text-xs font-medium text-text-primary rounded-full border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;