import Icon from '@/components/ui/AppIcon';

interface FilterSectionProps {
  selectedCategory: string;
  selectedBudget: string;
  selectedCity: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onBudgetChange: (budget: string) => void;
  onCityChange: (city: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

export default function FilterSection({
  selectedCategory,
  selectedBudget,
  selectedCity,
  searchQuery,
  onCategoryChange,
  onBudgetChange,
  onCityChange,
  onSearchChange,
  onClearFilters,
}: FilterSectionProps) {
  const categories = [
    'All Categories',
    'Budget Optimization',
    'Quality Improvement',
    'Timeline Acceleration',
    'Vendor Issue Resolution',
    'Major Mistake Prevention',
  ];

  const budgetRanges = [
    'All Budgets',
    '₹3-10 Lakhs',
    '₹10-25 Lakhs',
    '₹25+ Lakhs',
  ];

  const cities = [
    'All Cities',
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Pune',
    'Hyderabad',
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-brand">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Filter Success Stories</h2>
        <button
          onClick={onClearFilters}
          className="text-sm text-accent hover:text-cta font-medium flex items-center space-x-1 transition-brand"
        >
          <Icon name="XMarkIcon" size={16} variant="outline" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Search Stories
          </label>
          <div className="relative">
            <Icon
              name="MagnifyingGlassIcon"
              size={20}
              variant="outline"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by customer name, location..."
              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-text-primary"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-text-primary"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Range Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Budget Range
          </label>
          <select
            value={selectedBudget}
            onChange={(e) => onBudgetChange(e.target.value)}
            className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-text-primary"
          >
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Location
          </label>
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-text-primary"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}