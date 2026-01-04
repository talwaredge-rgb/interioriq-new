'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';


interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', href: '/homepage' },
    { label: 'Success Stories', href: '/success-stories' },
  ];

  const moreItems = [
  ];

  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  return (
    <header className={`bg-card border-b border-border sticky top-0 z-50 ${className}`}>
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Logo - No left padding */}
          <Link href="/homepage" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">IQ</span>
            </div>
            <span className="text-xl font-semibold text-primary hidden sm:block">
              InteriorIQ Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-text-primary hover:text-accent hover:bg-muted rounded-md transition-brand"
              >
                {item.label}
              </Link>
            ))}
            

          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-text-primary hover:text-accent hover:bg-muted rounded-md transition-brand"
            aria-label="Toggle mobile menu"
          >
            <Icon 
              name={isMobileMenuOpen ? "XMarkIcon" : "Bars3Icon"} 
              size={24} 
              variant="outline"
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card animate-fade-in">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-text-primary hover:text-accent hover:bg-muted rounded-md transition-brand"
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Admin Dashboard Link for Mobile */}
              <Link
                href="/admin-dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-text-primary hover:text-accent hover:bg-muted rounded-md transition-brand"
              >
                <Icon name="ChartBarIcon" size={16} variant="outline" />
                <span>Admin Dashboard</span>
              </Link>
              
              <div className="pt-4">
                <Link
                  href="/upload-analysis"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-6 py-3 bg-accent text-accent-foreground font-semibold text-center rounded-lg hover:bg-cta transition-brand shadow-brand-sm"
                >
                  Get Free Analysis
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
