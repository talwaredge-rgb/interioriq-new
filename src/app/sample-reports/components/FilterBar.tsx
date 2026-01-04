'use client';

import Icon from '@/components/ui/AppIcon';

interface FilterBarProps {
  selectedProjectType: string;
  selectedBudgetRange: string;
  selectedLocation: string;
  onProjectTypeChange: (type: string) => void;
  onBudgetRangeChange: (range: string) => void;
  onLocationChange: (location: string) => void;
  onClearFilters: () => void;
}

export default function FilterBar({
  selectedProjectType,
  selectedBudgetRange,
  selectedLocation,
  onProjectTypeChange,
  onBudgetRangeChange,
  onLocationChange,
  onClearFilters,
}: FilterBarProps) {
  const projectTypes = ['All Projects', '1BHK', '2BHK', '3BHK', 'Villa', 'Commercial'];
  const budgetRanges = ['All Budgets', '₹3-10 Lakhs', '₹10-25 Lakhs', '₹25+ Lakhs'];
  const locations = ['All Locations', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad'];

  const hasActiveFilters = selectedProjectType !== 'All Projects' || 
                          selectedBudgetRange !== 'All Budgets' || 
                          selectedLocation !== 'All Locations';

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="FunnelIcon" size={20} />
          <span>Filter Reports</span>
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-accent hover:text-cta font-medium flex items-center space-x-1 transition-brand"
          >
            <Icon name="XMarkIcon" size={16} />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Project Type
          </label>
          <select
            value={selectedProjectType}
            onChange={(e) => onProjectTypeChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-ring transition-brand"
          >
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Budget Range
          </label>
          <select
            value={selectedBudgetRange}
            onChange={(e) => onBudgetRangeChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-ring transition-brand"
          >
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Location
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-ring transition-brand"
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}