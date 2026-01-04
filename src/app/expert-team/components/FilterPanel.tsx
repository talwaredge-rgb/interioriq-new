'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  specialization: string[];
  experience: string[];
  region: string[];
  budget: string[];
  availability: string[];
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    specialization: [],
    experience: [],
    region: [],
    budget: [],
    availability: [],
  });

  const filterOptions = {
    specialization: [
      'Kitchen Design',
      'Bathroom Renovation',
      'Living Spaces',
      'Commercial Interiors',
      'Luxury Design',
      'Budget-Friendly',
    ],
    experience: ['5-10 Years', '10-20 Years', '20+ Years'],
    region: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad'],
    budget: ['₹3-10 Lakhs', '₹10-25 Lakhs', '₹25+ Lakhs'],
    availability: ['Available', 'Busy', 'Booked'],
  };

  const handleFilterToggle = (category: keyof FilterState, value: string) => {
    const newFilters = { ...filters };
    const categoryFilters = newFilters[category];
    
    if (categoryFilters.includes(value)) {
      newFilters[category] = categoryFilters.filter((item) => item !== value);
    } else {
      newFilters[category] = [...categoryFilters, value];
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters: FilterState = {
      specialization: [],
      experience: [],
      region: [],
      budget: [],
      availability: [],
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((acc, curr) => acc + curr.length, 0);
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-card border border-border rounded-lg flex items-center justify-between hover:bg-muted transition-brand"
        >
          <div className="flex items-center space-x-2">
            <Icon name="FunnelIcon" size={20} variant="outline" className="text-accent" />
            <span className="font-semibold text-text-primary">Filters</span>
            {getActiveFilterCount() > 0 && (
              <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <Icon
            name={isOpen ? 'ChevronUpIcon' : 'ChevronDownIcon'}
            size={20}
            variant="outline"
            className="text-text-secondary"
          />
        </button>
      </div>

      {/* Filter Panel */}
      <div
        className={`bg-card border border-border rounded-xl p-6 ${
          isOpen ? 'block' : 'hidden'
        } lg:block`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="FunnelIcon" size={20} variant="outline" className="text-accent" />
            <h3 className="text-lg font-bold text-text-primary">Filter Experts</h3>
          </div>
          {getActiveFilterCount() > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-accent hover:text-cta font-medium transition-brand"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Filter Categories */}
        <div className="space-y-6">
          {Object.entries(filterOptions).map(([category, options]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-text-primary mb-3 capitalize">
                {category === 'specialization' ? 'Specialization' : category}
              </h4>
              <div className="space-y-2">
                {options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters[category as keyof FilterState].includes(option)}
                      onChange={() => handleFilterToggle(category as keyof FilterState, option)}
                      className="w-4 h-4 text-accent border-border rounded focus:ring-2 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-sm text-text-primary group-hover:text-accent transition-brand">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}