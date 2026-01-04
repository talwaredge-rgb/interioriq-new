'use client';

import { useState, useEffect } from 'react';
import CategoryFilter from './CategoryFilter';
import ArticleCard from './ArticleCard';
import RegionalPriceCard from './RegionalPriceCard';
import Icon from '@/components/ui/AppIcon';

interface Category {
  id: string;
  name: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  image: string;
  imageAlt: string;
}

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  usageCount: number;
  category: string;
}

interface Guide {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  chapters: number;
  totalReadTime: number;
  completionRate: number;
}

interface RegionalPrice {
  city: string;
  region: string;
  priceRange: string;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  lastUpdated: string;
}

const categories: Category[] = [
{ id: 'cost-guides', name: 'Cost Guides' },
{ id: 'material-insights', name: 'Material Insights' },
{ id: 'vendor-tips', name: 'Vendor Tips' },
{ id: 'design-trends', name: 'Design Trends' },
{ id: 'regional-pricing', name: 'Regional Pricing' }];


const articles: Article[] = [
{
  id: 'hidden-costs-interior-projects',
  title: 'Hidden Costs in Interior Projects: What Contractors Don\'t Tell You',
  excerpt: 'Discover the 15 most common hidden costs that can inflate your interior budget by 20-30%. Learn how to identify and negotiate these charges before signing any contract.',
  category: 'Cost Guides',
  readTime: 8,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12a07f1d0-1766316848629.png",
  imageAlt: 'Modern living room interior with designer furniture and hidden lighting showcasing premium finishes'
},
{
  id: 'red-flags-boq-quotes',
  title: 'Red Flags in BoQ Quotes: Expert Analysis of Warning Signs',
  excerpt: 'Our experts reveal the top 10 red flags in Bill of Quantities that indicate potential overcharging or quality compromises. Real examples from 500+ analyzed projects.',
  category: 'Vendor Tips',
  readTime: 12,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c23e77b4-1764661943205.png",
  imageAlt: 'Professional interior designer reviewing detailed project blueprints and cost estimates on desk'
},
{
  id: 'material-quality-vs-price',
  title: 'Material Quality vs Price Analysis: Making Smart Choices',
  excerpt: 'Comprehensive comparison of 50+ interior materials across brands. Learn when premium pricing reflects quality and when you\'re just paying for the brand name.',
  category: 'Material Insights',
  readTime: 15,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ed8dee03-1767291120909.png",
  imageAlt: 'Close-up of various premium interior materials including wood samples, fabric swatches, and stone tiles'
},
{
  id: 'mumbai-interior-costs-2025',
  title: 'Interior Cost in Mumbai: Complete 2025 Price Guide',
  excerpt: 'Detailed breakdown of interior costs across Mumbai localities. From Andheri to Worli, understand what you should expect to pay for quality work in your area.',
  category: 'Regional Pricing',
  readTime: 10,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1716ff18f-1765306666752.png",
  imageAlt: 'Luxurious Mumbai apartment interior with city skyline view through floor-to-ceiling windows'
},
{
  id: 'modular-kitchen-budget-guide',
  title: 'Best Materials for Modular Kitchens: Quality & Budget Analysis',
  excerpt: 'Expert comparison of kitchen materials from ₹80,000 to ₹5 lakhs. Learn which materials offer the best value for your budget and cooking habits.',
  category: 'Material Insights',
  readTime: 9,
  image: "https://images.unsplash.com/photo-1722604817803-4c88edef9bc0",
  imageAlt: 'Contemporary modular kitchen with white cabinets, marble countertops, and modern appliances'
},
{
  id: 'minimalist-interior-budget',
  title: 'Minimalist Interior Budget Guide: Achieving More with Less',
  excerpt: 'Complete cost breakdown for minimalist interiors. Discover how to create stunning spaces with 30% less budget through smart material selection and design choices.',
  category: 'Design Trends',
  readTime: 11,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18d71bb9d-1767170624569.png",
  imageAlt: 'Modern residential home exterior with clean architectural lines and landscaped garden'
}];


const tools: Tool[] = [
{
  id: 'room-cost-calculator',
  title: 'Room-wise Cost Calculator',
  description: 'Calculate accurate interior costs for living rooms, bedrooms, kitchens, and bathrooms based on your city and requirements.',
  icon: 'CalculatorIcon',
  usageCount: 15420,
  category: 'Cost Planning'
},
{
  id: 'material-comparison-tool',
  title: 'Material Comparison Tool',
  description: 'Compare quality ratings, durability, and prices of different materials side-by-side to make informed decisions.',
  icon: 'ChartBarIcon',
  usageCount: 12350,
  category: 'Material Selection'
},
{
  id: 'timeline-estimator',
  title: 'Project Timeline Estimator',
  description: 'Get realistic project timelines based on scope, room count, and complexity. Plan your interior project effectively.',
  icon: 'CalendarIcon',
  usageCount: 9870,
  category: 'Planning'
},
{
  id: 'budget-planner',
  title: 'Budget Planning Worksheet',
  description: 'Interactive worksheet with Indian cost structures to plan and track your interior budget across all categories.',
  icon: 'CurrencyRupeeIcon',
  usageCount: 18200,
  category: 'Budgeting'
}];


const featuredGuide: Guide = {
  id: 'complete-interior-cost-guide',
  title: 'Complete Interior Cost Guide for Indian Homes',
  description: 'Master the art of interior budgeting with our comprehensive 12-chapter guide. From initial planning to final execution, learn everything about managing interior costs effectively. Includes real project examples, cost-saving strategies, and expert negotiation tips.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_182992347-1765021095393.png",
  imageAlt: 'Elegant Indian home interior with traditional and modern design elements showcasing complete renovation',
  chapters: 12,
  totalReadTime: 85,
  completionRate: 78
};

const regionalPrices: RegionalPrice[] = [
{
  city: 'Mumbai',
  region: 'Maharashtra',
  priceRange: '₹1,800 - ₹2,500/sq ft',
  trend: 'up',
  trendPercentage: 8,
  lastUpdated: '2 days ago'
},
{
  city: 'Delhi NCR',
  region: 'National Capital Region',
  priceRange: '₹1,600 - ₹2,200/sq ft',
  trend: 'stable',
  trendPercentage: 2,
  lastUpdated: '3 days ago'
},
{
  city: 'Bangalore',
  region: 'Karnataka',
  priceRange: '₹1,700 - ₹2,400/sq ft',
  trend: 'up',
  trendPercentage: 12,
  lastUpdated: '1 day ago'
},
{
  city: 'Chennai',
  region: 'Tamil Nadu',
  priceRange: '₹1,400 - ₹1,900/sq ft',
  trend: 'down',
  trendPercentage: 5,
  lastUpdated: '4 days ago'
},
{
  city: 'Pune',
  region: 'Maharashtra',
  priceRange: '₹1,500 - ₹2,100/sq ft',
  trend: 'up',
  trendPercentage: 6,
  lastUpdated: '2 days ago'
},
{
  city: 'Hyderabad',
  region: 'Telangana',
  priceRange: '₹1,300 - ₹1,800/sq ft',
  trend: 'stable',
  trendPercentage: 3,
  lastUpdated: '5 days ago'
}];


export default function KnowledgeCenterInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [filteredArticles, setFilteredArticles] = useState(articles);

  useEffect(() => {
    setIsHydrated(true);
    const saved = localStorage.getItem('bookmarkedArticles');
    if (saved) {
      setBookmarkedArticles(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    let filtered = articles;

    if (selectedCategory !== 'all') {
      const categoryName = categories.find((c) => c.id === selectedCategory)?.name;
      filtered = filtered.filter((article) => article.category === categoryName);
    }

    setFilteredArticles(filtered);
  }, [selectedCategory, isHydrated]);

  const handleBookmark = (articleId: string) => {
    if (!isHydrated) return;

    const updated = bookmarkedArticles.includes(articleId) ?
    bookmarkedArticles.filter((id) => id !== articleId) :
    [...bookmarkedArticles, articleId];

    setBookmarkedArticles(updated);
    localStorage.setItem('bookmarkedArticles', JSON.stringify(updated));
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-4 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-1/3" />
            <div className="h-64 bg-muted rounded" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) =>
              <div key={i} className="h-96 bg-muted rounded" />
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-secondary to-primary text-primary-foreground py-16 lg:py-24">
        <div className="w-full px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-full mb-6">
              <Icon name="AcademicCapIcon" size={20} variant="solid" />
              <span className="text-sm font-semibold">Expert Knowledge Hub</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Master Interior Costs & Make Informed Decisions
            </h1>
            <p className="text-lg lg:text-xl opacity-90">
              Comprehensive guides and expert insights to help you navigate India's interior market with confidence
            </p>
          </div>
        </div>
      </section>

      {/* Regional Pricing */}
      <section className="py-12 lg:py-16">
        <div className="w-full px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-2">Regional Price Trends</h2>
              <p className="text-text-secondary">Latest interior cost updates across major Indian cities</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionalPrices.map((price, index) =>
            <RegionalPriceCard key={index} {...price} />
            )}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="w-full px-4 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-6">Expert Articles & Guides</h2>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory} />

          </div>

          {filteredArticles.length > 0 ?
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) =>
            <ArticleCard
              key={article.id}
              {...article}
              isBookmarked={bookmarkedArticles.includes(article.id)}
              onBookmark={handleBookmark} />

            )}
            </div> :

          <div className="text-center py-16">
              <Icon name="MagnifyingGlassIcon" size={48} variant="outline" className="text-text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">No articles found</h3>
              <p className="text-text-secondary">Try adjusting your filter criteria</p>
            </div>
          }
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-accent via-cta to-accent text-accent-foreground">
        <div className="w-full px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Icon name="DocumentTextIcon" size={48} variant="solid" className="mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Analyze Your Interior Quote?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Get expert analysis of your Bill of Quantities within 24 hours. Completely free, no obligations.
            </p>
            <a
              href="/upload-analysis"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-secondary transition-brand shadow-brand-lg">

              <span>Upload Your BoQ Now</span>
              <Icon name="ArrowRightIcon" size={20} variant="outline" />
            </a>
          </div>
        </div>
      </section>
    </div>);

}