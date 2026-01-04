'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentYear, setCurrentYear] = useState('2025');

  useEffect(() => {
    setIsHydrated(true);
    setCurrentYear(new Date()?.getFullYear()?.toString());
  }, []);

  if (!isHydrated) {
    return (
      <footer className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          <div className="h-32 bg-primary-foreground/10 rounded animate-pulse"></div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">IQ</span>
              </div>
              <span className="text-xl font-semibold">InteriorIQ Pro</span>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              India's first expert-driven, complimentary BoQ validation service for home interiors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/homepage" className="text-sm text-primary-foreground/80 hover:text-accent transition-brand">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/upload-analysis" className="text-sm text-primary-foreground/80 hover:text-accent transition-brand">
                  Upload BOQ
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-sm text-primary-foreground/80 hover:text-accent transition-brand">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Icon name="EnvelopeIcon" size={18} variant="outline" className="text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">support@interioriqpro.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="PhoneIcon" size={18} variant="outline" className="text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">+91 98456 02165</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="MapPinIcon" size={18} variant="outline" className="text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">Bengaluru, Karnataka, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-primary-foreground/80">
              © {currentYear} InteriorIQ Pro. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-primary-foreground/80 hover:text-accent transition-brand">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-primary-foreground/80 hover:text-accent transition-brand">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-primary-foreground/80 hover:text-accent transition-brand">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}