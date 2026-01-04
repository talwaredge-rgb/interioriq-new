'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Desktop Filter */}
      <div className="hidden lg:flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-brand ${
            selectedCategory === 'all' ?'bg-accent text-accent-foreground shadow-brand-sm' :'bg-muted text-text-primary hover:bg-accent/10'
          }`}
        >
          All Topics
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-brand ${
              selectedCategory === category.id
                ? 'bg-accent text-accent-foreground shadow-brand-sm'
                : 'bg-muted text-text-primary hover:bg-accent/10'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Mobile Filter Dropdown */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-muted rounded-lg flex items-center justify-between text-text-primary font-medium"
        >
          <span>
            {selectedCategory === 'all' ?'All Topics' 
              : categories.find(c => c.id === selectedCategory)?.name}
          </span>
          <Icon 
            name={isOpen ? "ChevronUpIcon" : "ChevronDownIcon"} 
            size={20} 
            variant="outline"
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-brand-lg py-2 z-10">
            <button
              onClick={() => {
                onCategoryChange('all');
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left transition-brand ${
                selectedCategory === 'all' ?'bg-accent/10 text-accent font-semibold' :'text-popover-foreground hover:bg-muted'
              }`}
            >
              All Topics
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left transition-brand ${
                  selectedCategory === category.id
                    ? 'bg-accent/10 text-accent font-semibold' :'text-popover-foreground hover:bg-muted'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}