import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function CTASection() {
  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-8 md:p-12 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="DocumentMagnifyingGlassIcon" size={32} className="text-accent-foreground" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Analyze Your BoQ?
        </h2>
        <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
          Get the same expert analysis for your interior project. Upload your Bill of Quantities and receive a comprehensive report within 48 hours—completely free.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/upload-analysis"
            className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-cta transition-brand shadow-brand-lg hover:shadow-brand flex items-center justify-center space-x-2"
          >
            <Icon name="CloudArrowUpIcon" size={20} />
            <span>Upload Your BoQ Now</span>
          </Link>
        </div>
        <p className="text-sm text-primary-foreground/80 mt-6">
          Join 5,000+ homeowners who saved an average of ₹2.8 lakhs on their interior projects
        </p>
      </div>
    </div>
  );
}