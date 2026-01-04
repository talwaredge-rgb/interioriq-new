'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  projectType: string;
  image: string;
  alt: string;
  rating: number;
  savings: string;
  quote: string;
}

const mockTestimonials: Testimonial[] = [
{
  id: 1,
  name: "Anita Desai",
  location: "Mumbai",
  projectType: "3BHK Apartment",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1106cb969-1763295153968.png",
  alt: "Professional Indian woman in her 30s with elegant traditional jewelry wearing modern saree with confident business expression",
  rating: 5,
  savings: "₹2,45,000",
  quote: "InteriorIQ Pro saved me from a massive overpricing trap. They identified inflated material costs and unnecessary items worth ₹2.45 lakhs. Absolutely invaluable service!"
},
{
  id: 2,
  name: "Vikram Singh",
  location: "Bangalore",
  projectType: "Villa Interior",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1211dd392-1763294112808.png",
  alt: "Professional Indian man in his 40s with well-groomed beard wearing crisp blue business shirt with warm approachable smile",
  rating: 5,
  savings: "₹3,80,000",
  quote: "The expert analysis revealed quality issues with proposed materials and suggested better alternatives at lower costs. Their decades of experience really shows in the detailed report."
},
{
  id: 3,
  name: "Meera Krishnan",
  location: "Chennai",
  projectType: "2BHK Renovation",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14c723b92-1763293896787.png",
  alt: "Professional Indian woman in her 20s with shoulder-length hair wearing grey blazer in bright office environment",
  rating: 5,
  savings: "₹1,65,000",
  quote: "As a first-time homeowner, I was completely lost with the BoQ. InteriorIQ Pro's free analysis gave me confidence and saved me over ₹1.6 lakhs. Highly recommended!"
}];


export default function TrustSignals() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % mockTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHydrated]);

  if (!isHydrated) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
              Trusted by Homeowners Across India
            </h2>
          </div>
          <div className="bg-card rounded-2xl p-8 shadow-brand animate-pulse">
            <div className="h-48 bg-muted rounded"></div>
          </div>
        </div>
      </section>);

  }

  const currentTestimonial = mockTestimonials[activeTestimonial];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent">
            Customer Success Stories
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
            Trusted by Homeowners Across India
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Real stories from customers who saved lakhs with our expert analysis
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-card rounded-xl p-6 text-center shadow-brand">
            <div className="text-4xl font-bold text-accent mb-2">2,500+</div>
            <div className="text-sm text-text-secondary">BoQs Analysed</div>
          </div>
          <div className="bg-card rounded-xl p-6 text-center shadow-brand">
            <div className="text-4xl font-bold text-accent mb-2">₹45Crore+</div>
            <div className="text-sm text-text-secondary">Saved for Clients</div>
          </div>
          <div className="bg-card rounded-xl p-6 text-center shadow-brand">
            <div className="text-4xl font-bold text-accent mb-2">98%</div>
            <div className="text-sm text-text-secondary">Satisfaction Rate</div>
          </div>
          <div className="bg-card rounded-xl p-6 text-center shadow-brand">
            <div className="text-4xl font-bold text-accent mb-2">24-48h</div>
            <div className="text-sm text-text-secondary">Avg. Turnaround</div>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-brand-lg">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Testimonial Content */}
            <div className="space-y-6">
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="ChatBubbleLeftIcon" size={24} variant="solid" className="text-accent" />
              </div>

              {/* Rating */}
              <div className="flex space-x-1">
                {[...Array(currentTestimonial.rating)].map((_, i) =>
                <Icon key={i} name="StarIcon" size={20} variant="solid" className="text-warning" />
                )}
              </div>

              {/* Quote */}
              <blockquote className="text-xl lg:text-2xl text-text-primary leading-relaxed">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Savings Highlight */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-lg">
                <Icon name="CurrencyRupeeIcon" size={20} variant="solid" className="text-success" />
                <span className="font-bold text-success text-lg">
                  Saved {currentTestimonial.savings}
                </span>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <AppImage
                    src={currentTestimonial.image}
                    alt={currentTestimonial.alt}
                    className="w-full h-full object-cover" />

                </div>
                <div>
                  <div className="font-bold text-text-primary">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {currentTestimonial.projectType} • {currentTestimonial.location}
                  </div>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex space-x-2 pt-4">
                {mockTestimonials.map((_, index) =>
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-brand ${
                  index === activeTestimonial ?
                  'bg-accent w-8' : 'bg-border hover:bg-accent/50'}`
                  }
                  aria-label={`View testimonial ${index + 1}`}>
                </button>
                )}
              </div>
            </div>

            {/* Visual Element */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-primary-foreground">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm opacity-80 mb-1">Average Savings</div>
                        <div className="text-3xl font-bold">₹1,80,000</div>
                      </div>
                      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                        <Icon name="TrophyIcon" size={32} variant="solid" className="text-accent-foreground" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="opacity-80">Material Cost Savings</span>
                        <span className="font-semibold">₹85,000</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="opacity-80">Labor Cost Optimization</span>
                        <span className="font-semibold">₹55,000</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="opacity-80">Hidden Charges Avoided</span>
                        <span className="font-semibold">₹40,000</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-primary-foreground/20">
                      <div className="flex items-center space-x-2 text-sm">
                        <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success" />
                        <span>Based on 2,500+ analyzed projects</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}