'use client';

import { useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ExpertModalProps {
  expert: {
    id: number;
    name: string;
    title: string;
    experience: string;
    specializations: string[];
    image: string;
    alt: string;
    projectsCompleted: number;
    moneySaved: string;
    certifications: string[];
    regions: string[];
    availability: 'Available' | 'Busy' | 'Booked';
    rating: number;
    testimonialCount: number;
    bio: string;
    education: string[];
    awards: string[];
    mediaFeatures: string[];
    portfolio: Array<{ image: string; alt: string; title: string }>;
    testimonials: Array<{ name: string; project: string; feedback: string; rating: number }>;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onContact: (expertId: number) => void;
}

export default function ExpertModal({ expert, isOpen, onClose, onContact }: ExpertModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !expert) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-card rounded-2xl shadow-brand-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-muted transition-brand"
          >
            <Icon name="XMarkIcon" size={24} variant="outline" className="text-text-primary" />
          </button>

          {/* Header Section */}
          <div className="relative h-64 bg-muted">
            <AppImage
              src={expert.image}
              alt={expert.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-3xl font-bold text-white mb-2">{expert.name}</h2>
              <p className="text-lg text-white/90">{expert.title}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-surface rounded-lg">
                <p className="text-2xl font-bold text-accent mb-1">{expert.projectsCompleted}+</p>
                <p className="text-xs text-text-secondary">Projects</p>
              </div>
              <div className="text-center p-4 bg-surface rounded-lg">
                <p className="text-2xl font-bold text-success mb-1">{expert.moneySaved}</p>
                <p className="text-xs text-text-secondary">Saved</p>
              </div>
              <div className="text-center p-4 bg-surface rounded-lg">
                <p className="text-2xl font-bold text-warning mb-1">{expert.rating}</p>
                <p className="text-xs text-text-secondary">Rating</p>
              </div>
              <div className="text-center p-4 bg-surface rounded-lg">
                <p className="text-2xl font-bold text-primary mb-1">{expert.experience}</p>
                <p className="text-xs text-text-secondary">Experience</p>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="UserIcon" size={24} variant="outline" className="text-accent" />
                <span>About</span>
              </h3>
              <p className="text-text-primary leading-relaxed">{expert.bio}</p>
            </div>

            {/* Specializations */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="SparklesIcon" size={24} variant="outline" className="text-accent" />
                <span>Specializations</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {expert.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-accent/10 text-accent font-medium rounded-lg"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="AcademicCapIcon" size={24} variant="outline" className="text-accent" />
                  <span>Education</span>
                </h3>
                <ul className="space-y-2">
                  {expert.education.map((edu, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success mt-0.5" />
                      <span className="text-text-primary">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="ShieldCheckIcon" size={24} variant="outline" className="text-accent" />
                  <span>Certifications</span>
                </h3>
                <ul className="space-y-2">
                  {expert.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success mt-0.5" />
                      <span className="text-text-primary">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Awards & Recognition */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="TrophyIcon" size={24} variant="outline" className="text-accent" />
                <span>Awards & Recognition</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {expert.awards.map((award, index) => (
                  <div key={index} className="p-4 bg-surface rounded-lg border border-border">
                    <p className="text-text-primary font-medium">{award}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="PhotoIcon" size={24} variant="outline" className="text-accent" />
                <span>Portfolio Highlights</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {expert.portfolio.map((item, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-lg">
                    <AppImage
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white font-semibold">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="ChatBubbleLeftEllipsisIcon" size={24} variant="outline" className="text-accent" />
                <span>Client Testimonials</span>
              </h3>
              <div className="space-y-4">
                {expert.testimonials.map((testimonial, index) => (
                  <div key={index} className="p-6 bg-surface rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-text-primary">{testimonial.name}</p>
                        <p className="text-sm text-text-secondary">{testimonial.project}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="StarIcon"
                            size={16}
                            variant={i < testimonial.rating ? 'solid' : 'outline'}
                            className={i < testimonial.rating ? 'text-warning' : 'text-muted-foreground'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-text-primary leading-relaxed">{testimonial.feedback}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                onClick={() => onContact(expert.id)}
                className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-lg hover:bg-cta transition-brand shadow-brand hover:shadow-brand-lg flex items-center space-x-3"
              >
                <Icon name="ChatBubbleLeftRightIcon" size={24} variant="outline" />
                <span>Contact {expert.name.split(' ')[0]}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}