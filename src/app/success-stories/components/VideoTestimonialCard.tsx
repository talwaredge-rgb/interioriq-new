import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface VideoTestimonialCardProps {
  testimonial: {
    id: number;
    customerName: string;
    location: string;
    thumbnailImage: string;
    thumbnailImageAlt: string;
    videoTitle: string;
    savingsAmount: string;
    duration: string;
  };
  onPlayVideo: (id: number) => void;
}

export default function VideoTestimonialCard({
  testimonial,
  onPlayVideo,
}: VideoTestimonialCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-brand hover:shadow-brand-lg transition-brand">
      <div className="relative h-48 overflow-hidden group cursor-pointer" onClick={() => onPlayVideo(testimonial.id)}>
        <AppImage
          src={testimonial.thumbnailImage}
          alt={testimonial.thumbnailImageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-brand"
        />
        <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/50 transition-brand flex items-center justify-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-brand-lg group-hover:scale-110 transition-brand">
            <Icon name="PlayIcon" size={32} variant="solid" className="text-accent-foreground ml-1" />
          </div>
        </div>
        <div className="absolute bottom-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-lg text-xs font-medium">
          {testimonial.duration}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">
          {testimonial.videoTitle}
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">{testimonial.customerName}</p>
            <p className="text-xs text-text-secondary">{testimonial.location}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-success">{testimonial.savingsAmount}</p>
            <p className="text-xs text-text-secondary">Saved</p>
          </div>
        </div>
      </div>
    </div>
  );
}