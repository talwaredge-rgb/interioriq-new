'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Expert {
  id: number;
  name: string;
  title: string;
  experience: string;
  specialization: string;
  image: string;
  alt: string;
  projectsCompleted: number;
  certifications: string[];
}

const mockExperts: Expert[] = [
{
  id: 1,
  name: "Rajesh Kumar",
  title: "Senior Interior Cost Analyst",
  experience: "25+ Years",
  specialization: "Luxury Residential Projects",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cb468779-1763295443265.png",
  alt: "Professional Indian man in his 50s with grey hair wearing navy blue suit in modern office",
  projectsCompleted: 850,
  certifications: ["RICS Certified", "IGBC Accredited", "NCIDQ Member"]
},
{
  id: 2,
  name: "Priya Sharma",
  title: "Lead BoQ Specialist",
  experience: "18+ Years",
  specialization: "Commercial & Retail Spaces",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a6cc7b76-1763300209811.png",
  alt: "Professional Indian woman in her 40s with shoulder-length black hair wearing white blazer in bright office",
  projectsCompleted: 620,
  certifications: ["IIDA Certified", "LEED AP", "CID Qualified"]
},
{
  id: 3,
  name: "Amit Patel",
  title: "Material Cost Expert",
  experience: "22+ Years",
  specialization: "Budget Optimization",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cb468779-1763295443265.png",
  alt: "Professional Indian man in his 40s with beard wearing grey suit and glasses in contemporary workspace",
  projectsCompleted: 740,
  certifications: ["ASID Member", "NCIDQ Certified", "IGBC AP"]
}];


export default function ExpertShowcase() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Decades of combined experience in interior cost analysis
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) =>
            <div key={i} className="bg-card rounded-xl shadow-brand p-6 animate-pulse">
                <div className="w-full h-64 bg-muted rounded-lg mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            )}
          </div>
        </div>
      </section>);

  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent">
            Expert Team
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
            Meet Our Expert Team
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Decades of combined experience in interior cost analysis, helping homeowners make informed decisions
          </p>
        </div>

        {/* Expert Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockExperts.map((expert) =>
          <div
            key={expert.id}
            className="bg-card rounded-xl shadow-brand hover:shadow-brand-lg transition-brand overflow-hidden group">

              {/* Expert Image */}
              <div className="relative h-64 overflow-hidden">
                <AppImage
                src={expert.image}
                alt={expert.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-brand" />

                <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                  {expert.experience}
                </div>
              </div>

              {/* Expert Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">
                    {expert.name}
                  </h3>
                  <p className="text-sm text-accent font-medium mb-2">
                    {expert.title}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {expert.specialization}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between py-3 border-t border-border">
                  <div>
                    <div className="text-2xl font-bold text-text-primary">
                      {expert.projectsCompleted}+
                    </div>
                    <div className="text-xs text-text-secondary">Projects Analyzed</div>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon name="CheckBadgeIcon" size={24} variant="solid" className="text-accent" />
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                    Certifications
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {expert.certifications.map((cert, index) =>
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-text-primary text-xs rounded-md">

                        {cert}
                      </span>
                  )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/expert-team"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-secondary transition-brand shadow-brand-sm hover:shadow-brand">

            <span>View All Experts</span>
            <Icon name="ArrowRightIcon" size={20} variant="outline" />
          </Link>
        </div>
      </div>
    </section>);

}