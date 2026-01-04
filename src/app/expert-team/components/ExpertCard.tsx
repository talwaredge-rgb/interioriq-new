'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ExpertCardProps {
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
  };
  onContactClick: (expertId: number) => void;
  onViewProfile: (expertId: number) => void;
}

export default function ExpertCard({ expert, onContactClick, onViewProfile }: ExpertCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-success text-success-foreground';
      case 'Busy':
        return 'bg-warning text-warning-foreground';
      case 'Booked':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-brand-lg transition-brand group">
      {/* Expert Image */}
      <div className="relative h-64 bg-muted overflow-hidden">
        <AppImage
          src={expert.image}
          alt={expert.alt}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          priority={false}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Availability Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(expert.availability)}`}>
            {expert.availability}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center space-x-1">
          <Icon name="StarIcon" size={16} variant="solid" className="text-warning" />
          <span className="text-sm font-semibold text-card-foreground">{expert.rating}</span>
          <span className="text-xs text-muted-foreground">({expert.testimonialCount})</span>
        </div>
      </div>

      {/* Expert Details */}
      <div className="p-6">
        {/* Name & Title */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-text-primary mb-1">{expert.name}</h3>
          <p className="text-sm text-text-secondary">{expert.title}</p>
        </div>

        {/* Experience */}
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BriefcaseIcon" size={18} variant="outline" className="text-accent" />
          <span className="text-sm font-medium text-text-primary">{expert.experience}</span>
        </div>

        {/* Specializations */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {expert.specializations.slice(0, 3).map((spec, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-muted text-text-primary text-xs font-medium rounded-full"
              >
                {spec}
              </span>
            ))}
            {expert.specializations.length > 3 && (
              <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                +{expert.specializations.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border">
          <div>
            <p className="text-2xl font-bold text-accent">{expert.projectsCompleted}+</p>
            <p className="text-xs text-text-secondary">Projects Completed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-success">{expert.moneySaved}</p>
            <p className="text-xs text-text-secondary">Money Saved</p>
          </div>
        </div>

        {/* Regions */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="MapPinIcon" size={16} variant="outline" className="text-text-secondary" />
            <span className="text-xs font-semibold text-text-secondary">Regional Expertise</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {expert.regions.map((region, index) => (
              <span
                key={index}
                className="text-xs text-text-primary bg-surface px-2 py-1 rounded"
              >
                {region}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onViewProfile(expert.id)}
            className="px-4 py-2.5 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-primary transition-brand text-sm"
          >
            View Profile
          </button>
          <button
            onClick={() => onContactClick(expert.id)}
            className="px-4 py-2.5 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-cta transition-brand text-sm flex items-center justify-center space-x-2"
          >
            <Icon name="ChatBubbleLeftRightIcon" size={18} variant="outline" />
            <span>Contact</span>
          </button>
        </div>
      </div>
    </div>
  );
}