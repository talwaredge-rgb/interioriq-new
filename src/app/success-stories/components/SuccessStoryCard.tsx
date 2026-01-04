import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface SuccessStoryCardProps {
  story: {
    id: number;
    customerName: string;
    location: string;
    homeType: string;
    budgetRange: string;
    savingsAmount: string;
    savingsNumber: number;
    projectImage: string;
    projectImageAlt: string;
    customerImage: string;
    customerImageAlt: string;
    problemIdentified: string;
    expertSolution: string;
    testimonial: string;
    projectDate: string;
    category: string;
  };
  onViewDetails: (id: number) => void;
}

export default function SuccessStoryCard({ story, onViewDetails }: SuccessStoryCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-brand hover:shadow-brand-lg transition-brand">
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <AppImage
          src={story.projectImage}
          alt={story.projectImageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-success text-success-foreground px-4 py-2 rounded-lg font-semibold shadow-brand">
          Saved {story.savingsAmount}
        </div>
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm px-4 py-2 rounded-lg">
          <span className="text-xs font-medium text-accent">{story.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Customer Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <AppImage
              src={story.customerImage}
              alt={story.customerImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{story.customerName}</h3>
            <p className="text-sm text-text-secondary">{story.location}</p>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-muted rounded-lg">
          <div>
            <p className="text-xs text-text-secondary mb-1">Home Type</p>
            <p className="text-sm font-medium text-text-primary">{story.homeType}</p>
          </div>
          <div>
            <p className="text-xs text-text-secondary mb-1">Budget Range</p>
            <p className="text-sm font-medium text-text-primary">{story.budgetRange}</p>
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="space-y-3 mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="ExclamationTriangleIcon" size={16} variant="solid" className="text-warning" />
              <span className="text-xs font-semibold text-text-primary uppercase">Problem Identified</span>
            </div>
            <p className="text-sm text-text-secondary line-clamp-2">{story.problemIdentified}</p>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircleIcon" size={16} variant="solid" className="text-success" />
              <span className="text-xs font-semibold text-text-primary uppercase">Expert Solution</span>
            </div>
            <p className="text-sm text-text-secondary line-clamp-2">{story.expertSolution}</p>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-muted p-4 rounded-lg mb-4">
          <Icon name="ChatBubbleLeftIcon" size={20} variant="solid" className="text-accent mb-2" />
          <p className="text-sm text-text-primary italic line-clamp-3">"{story.testimonial}"</p>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails(story.id)}
          className="w-full px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-cta transition-brand shadow-brand-sm hover:shadow-brand flex items-center justify-center space-x-2"
        >
          <span>View Full Story</span>
          <Icon name="ArrowRightIcon" size={20} variant="outline" />
        </button>
      </div>
    </div>
  );
}