import Icon from '@/components/ui/AppIcon';

const FormatGuidance = () => {
  const guidelines = [
    {
      icon: 'DocumentTextIcon',
      title: 'Supported Formats',
      description: 'PDF, Excel (.xlsx, .xls), Word (.docx, .doc), Images (.jpg, .png)',
      color: 'text-accent'
    },
    {
      icon: 'ScaleIcon',
      title: 'File Size Limit',
      description: 'Maximum 10MB per file. You can upload multiple files.',
      color: 'text-success'
    },
    {
      icon: 'TableCellsIcon',
      title: 'Optimal Structure',
      description: 'Include item descriptions, quantities, rates, and total amounts in clear columns',
      color: 'text-warning'
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'Security & Privacy',
      description: 'All files are encrypted and scanned. Your data is never shared with third parties.',
      color: 'text-primary'
    }
  ];

  const tips = [
    'Ensure all text is clearly readable and not blurred',
    'Include vendor/contractor details if available',
    'Multiple quotes? Upload them all for comparison',
    'Handwritten BoQs? Take clear, well-lit photos',
    'Include any special terms or conditions mentioned'
  ];

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        {guidelines?.map((guide, index) => (
          <div
            key={index}
            className="p-4 bg-card border border-border rounded-lg hover:border-accent/50 transition-brand group"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-brand`}>
                <Icon name={guide?.icon} size={20} variant="outline" className={guide?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-text-primary mb-1">
                  {guide?.title}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {guide?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 bg-muted rounded-lg border border-border">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Icon name="LightBulbIcon" size={18} variant="solid" className="text-accent" />
          </div>
          <h4 className="text-sm font-semibold text-text-primary">
            Pro Tips for Better Analysis
          </h4>
        </div>
        <ul className="space-y-2">
          {tips?.map((tip, index) => (
            <li key={index} className="flex items-start space-x-2 text-xs text-text-secondary">
              <Icon name="CheckCircleIcon" size={16} variant="solid" className="text-success flex-shrink-0 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="ExclamationTriangleIcon" size={20} variant="solid" className="text-warning flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-text-primary mb-1">
              Common Upload Issues
            </h4>
            <p className="text-xs text-text-secondary">
              If your upload fails, try: reducing file size, converting to PDF, checking internet connection, or using a different browser. Still having trouble? Contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormatGuidance;