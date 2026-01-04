'use client';

import { useState, useEffect } from 'react';
import SuccessStoryCard from './SuccessStoryCard';
import FilterSection from './FilterSection';
import StatsSection from './StatsSection';

import DetailModal from './DetailModal';
import Icon from '@/components/ui/AppIcon';

interface SuccessStory {
  id: number;
  customerName: string;
  location: string;
  homeType: string;
  budgetRange: string;
  savingsAmount: string;
  savingsNumber: number;
  projectImage: string;
  projectImageAlt: string;
  customerImage: string;
  customerImageAlt: string;
  problemIdentified: string;
  expertSolution: string;
  testimonial: string;
  projectDate: string;
  category: string;
  detailedAnalysis: string;
  beforeCosts: Array<{item: string;cost: string;}>;
  afterCosts: Array<{item: string;cost: string;}>;
  expertName: string;
  projectDuration: string;
}

interface VideoTestimonial {
  id: number;
  customerName: string;
  location: string;
  thumbnailImage: string;
  thumbnailImageAlt: string;
  videoTitle: string;
  savingsAmount: string;
  duration: string;
}

export default function SuccessStoriesInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBudget, setSelectedBudget] = useState('All Budgets');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockSuccessStories: SuccessStory[] = [
  {
    id: 1,
    customerName: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    homeType: "1BHK Apartment",
    budgetRange: "₹15-20 Lakhs",
    savingsAmount: "₹2.8 Lakhs",
    savingsNumber: 280000,
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_11c3d0a89-1767117147981.png",
    projectImageAlt: "Compact 1BHK apartment interior with modern furniture, smart storage solutions, and efficient space utilization",
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0883a0c-1763299171534.png",
    customerImageAlt: "Professional Indian woman in blue blazer smiling at camera in modern office",
    problemIdentified: "Original BoQ included overpriced imported marble at ₹850/sq.ft when equivalent quality Indian marble was available at ₹420/sq.ft. Contractor quoted premium brand modular kitchen at ₹4.2 lakhs when similar quality local manufacturer offered ₹2.8 lakhs. Unnecessary false ceiling in bedrooms added ₹1.2 lakhs with no functional benefit.",
    expertSolution: "Recommended high-quality Indian marble with better durability ratings, saving ₹1.2 lakhs on flooring. Identified local modular kitchen manufacturer with ISO certification and 10-year warranty, saving ₹1.4 lakhs. Eliminated unnecessary false ceiling, redirecting ₹80,000 to premium lighting fixtures that enhanced ambiance better.",
    testimonial: "I was about to sign a ₹18 lakh contract when a friend suggested InteriorIQ Pro. Their expert caught overpricing in materials I didn't even know existed! The detailed analysis showed me exactly where my money was going and suggested better alternatives. Saved ₹2.8 lakhs without compromising on quality. The expert even helped me negotiate with my contractor using their report. Best decision ever!",
    projectDate: "March 2024",
    category: "Budget Optimization",
    detailedAnalysis: "Our expert team conducted a comprehensive line-by-line analysis of the original BoQ, comparing material specifications against current market rates across Mumbai suppliers. We identified three major cost inflation areas: imported materials where domestic alternatives met specifications, premium brand markups without quality justification, and unnecessary design elements that added cost without value. The revised BoQ maintained all quality standards while achieving 15.5% cost reduction through strategic material substitution and design optimization.",
    beforeCosts: [
    { item: "Imported Marble Flooring", cost: "₹6.8 Lakhs" },
    { item: "Premium Brand Kitchen", cost: "₹4.2 Lakhs" },
    { item: "False Ceiling (All Rooms)", cost: "₹2.4 Lakhs" },
    { item: "Standard Lighting", cost: "₹1.2 Lakhs" },
    { item: "Other Items", cost: "₹3.4 Lakhs" }],

    afterCosts: [
    { item: "Quality Indian Marble", cost: "₹3.6 Lakhs" },
    { item: "ISO Certified Kitchen", cost: "₹2.8 Lakhs" },
    { item: "False Ceiling (Living Only)", cost: "₹0.8 Lakhs" },
    { item: "Premium LED Lighting", cost: "₹2.0 Lakhs" },
    { item: "Other Items", cost: "₹3.4 Lakhs" }],

    expertName: "Rajesh Kumar",
    projectDuration: "45 Days"
  },
  {
    id: 2,
    customerName: "Karthik Ravi",
    location: "Bengaluru, Karnataka",
    homeType: "2BHK Apartment",
    budgetRange: "₹8-12 Lakhs",
    savingsAmount: "₹1.5 Lakhs",
    savingsNumber: 150000,
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_17caabece-1766421625451.png",
    projectImageAlt: "Contemporary bedroom with wooden bed frame, white bedding, and minimalist decor with plants",
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_155591ed2-1763294586782.png",
    customerImageAlt: "Young Indian man in casual shirt smiling confidently in bright office space",
    problemIdentified: "Contractor specified low-grade plywood (BWP 710) at premium prices claiming it was BWR grade. Electrical wiring quoted at ₹180/point when market rate was ₹120/point. Paint specification included unnecessary primer coats for new walls, adding ₹45,000. Bathroom fittings were mid-range brands at luxury prices.",
    expertSolution: "Verified plywood grade specifications and corrected to actual BWR grade at fair market price, saving ₹65,000. Negotiated electrical work to standard market rates with quality assurance, saving ₹42,000. Optimized paint application process for new construction, saving ₹45,000. Sourced equivalent quality bathroom fittings from authorized dealers at 30% lower cost.",
    testimonial: "As a first-time homeowner, I had no idea what fair pricing looked like. The InteriorIQ Pro analysis was eye-opening! They caught my contractor trying to pass off lower grade materials at premium prices. The detailed report gave me confidence to negotiate, and I saved ₹1.5 lakhs. The expert even recommended better alternatives within my budget. Highly recommend their service!",
    projectDate: "April 2024",
    category: "Quality Improvement",
    detailedAnalysis: "Our analysis revealed systematic quality misrepresentation across multiple categories. The original BoQ used technical specifications that appeared premium but actually described standard materials. We conducted material verification through supplier cross-checks and identified grade inflation in plywood, electrical components, and paint systems. The revised specifications ensured actual premium quality at fair market rates, improving both cost efficiency and final quality outcomes.",
    beforeCosts: [
    { item: "Plywood & Carpentry", cost: "₹2.8 Lakhs" },
    { item: "Electrical Work", cost: "₹1.8 Lakhs" },
    { item: "Painting (All Rooms)", cost: "₹1.2 Lakhs" },
    { item: "Bathroom Fittings", cost: "₹1.5 Lakhs" },
    { item: "Other Items", cost: "₹2.7 Lakhs" }],

    afterCosts: [
    { item: "Quality BWR Plywood", cost: "₹2.15 Lakhs" },
    { item: "Standard Electrical", cost: "₹1.38 Lakhs" },
    { item: "Optimized Painting", cost: "₹0.75 Lakhs" },
    { item: "Authorized Fittings", cost: "₹1.05 Lakhs" },
    { item: "Other Items", cost: "₹2.7 Lakhs" }],

    expertName: "Meera Reddy",
    projectDuration: "30 Days"
  },
  {
    id: 3,
    customerName: "Sneha Desai",
    location: "Pune, Maharashtra",
    homeType: "3BHK Villa",
    budgetRange: "₹25-30 Lakhs",
    savingsAmount: "₹4.2 Lakhs",
    savingsNumber: 420000,
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_10631a62a-1766585932663.png",
    projectImageAlt: "Luxurious 3BHK villa exterior with contemporary architecture, landscaped garden, and spacious layout",
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_14c723b92-1763293896787.png",
    customerImageAlt: "Elegant Indian woman in professional attire standing in modern home interior",
    problemIdentified: "Original quote included imported designer tiles at ₹1,200/sq.ft for entire villa when only feature walls needed premium tiles. HVAC system was oversized by 40% for actual space requirements, adding ₹2.8 lakhs. Landscape design included exotic plants requiring high maintenance and specialized care. Smart home automation quoted at luxury brand prices when mid-range systems offered same functionality.",
    expertSolution: "Created hybrid tiling plan using premium tiles for feature areas and quality standard tiles elsewhere, saving ₹1.8 lakhs while maintaining luxury aesthetic. Right-sized HVAC system based on actual load calculations, saving ₹1.2 lakhs with better efficiency. Recommended native plants with similar aesthetics but lower maintenance, saving ₹65,000. Identified mid-range smart home system with identical features at 35% lower cost.",
    testimonial: "We were planning our dream villa and wanted everything perfect. The contractor's quote seemed reasonable until InteriorIQ Pro's analysis revealed we were paying for unnecessary luxury in wrong places. Their expert helped us redirect savings to areas that truly mattered - like better kitchen appliances and premium bathroom fixtures. Saved ₹4.2 lakhs and got a better result than originally planned. Their expertise is invaluable!",
    projectDate: "February 2024",
    category: "Major Mistake Prevention",
    detailedAnalysis: "This case exemplified the importance of strategic luxury allocation. Our analysis identified areas where premium specifications added cost without proportional value, while highlighting opportunities to invest in features that would enhance daily living experience. We conducted thermal load calculations for HVAC sizing, material aesthetic analysis for tile selection, and functionality comparison for smart home systems. The result was a more balanced specification that achieved the desired luxury feel while optimizing budget allocation.",
    beforeCosts: [
    { item: "Premium Tiles (Entire Villa)", cost: "₹8.5 Lakhs" },
    { item: "Oversized HVAC System", cost: "₹4.2 Lakhs" },
    { item: "Exotic Landscaping", cost: "₹2.8 Lakhs" },
    { item: "Luxury Smart Home", cost: "₹3.5 Lakhs" },
    { item: "Other Items", cost: "₹8.0 Lakhs" }],

    afterCosts: [
    { item: "Strategic Tile Selection", cost: "₹6.7 Lakhs" },
    { item: "Right-Sized HVAC", cost: "₹3.0 Lakhs" },
    { item: "Native Landscaping", cost: "₹2.15 Lakhs" },
    { item: "Mid-Range Smart Home", cost: "₹2.3 Lakhs" },
    { item: "Other Items", cost: "₹8.0 Lakhs" }],

    expertName: "Vikram Singh",
    projectDuration: "60 Days"
  },
  {
    id: 4,
    customerName: "Rahul Mehta",
    location: "Delhi NCR",
    homeType: "2BHK Apartment",
    budgetRange: "₹10-15 Lakhs",
    savingsAmount: "₹1.8 Lakhs",
    savingsNumber: 180000,
    projectImage: "https://images.unsplash.com/photo-1722604817803-4c88edef9bc0",
    projectImageAlt: "Modern kitchen with white cabinets, marble countertops, and stainless steel appliances",
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f67694c1-1763300924452.png",
    customerImageAlt: "Professional Indian man in business casual attire smiling in contemporary office",
    problemIdentified: "Kitchen contractor quoted imported countertop at ₹18,000/running foot when quality Indian granite offered same durability at ₹8,500/running foot. Wardrobe specifications included unnecessary soft-close mechanisms for all shutters, adding ₹85,000. Flooring quote mixed premium and standard tiles without clear demarcation, inflating costs. Electrical points were over-specified with unnecessary provisions.",
    expertSolution: "Recommended premium Indian granite with superior heat resistance and stain protection, saving ₹95,000 on countertops. Optimized soft-close mechanisms for frequently used shutters only, saving ₹52,000. Created clear flooring plan with premium tiles in visible areas and standard tiles in utility spaces, saving ₹48,000. Rationalized electrical points based on actual usage patterns, saving ₹35,000.",
    testimonial: "I'm a software engineer, good with tech but clueless about interiors. The contractor's quote looked professional with fancy terms I didn't understand. InteriorIQ Pro's expert broke down everything in simple language and showed me exactly where I was overpaying. Their analysis saved me ₹1.8 lakhs and taught me so much about interior materials. Now I can make informed decisions. Thank you!",
    projectDate: "May 2024",
    category: "Budget Optimization",
    detailedAnalysis: "This project demonstrated the value of technical specification optimization. Our expert team analyzed each material specification against functional requirements and usage patterns. We identified areas where premium features added cost without practical benefit for the client's lifestyle. The revised BoQ maintained quality standards while eliminating unnecessary premium specifications, achieving significant savings through intelligent material selection and feature optimization.",
    beforeCosts: [
    { item: "Imported Countertops", cost: "₹3.6 Lakhs" },
    { item: "Full Soft-Close Wardrobes", cost: "₹2.8 Lakhs" },
    { item: "Mixed Premium Flooring", cost: "₹2.4 Lakhs" },
    { item: "Over-Specified Electrical", cost: "₹1.8 Lakhs" },
    { item: "Other Items", cost: "₹2.4 Lakhs" }],

    afterCosts: [
    { item: "Premium Indian Granite", cost: "₹2.65 Lakhs" },
    { item: "Selective Soft-Close", cost: "₹2.28 Lakhs" },
    { item: "Strategic Flooring Plan", cost: "₹1.92 Lakhs" },
    { item: "Optimized Electrical", cost: "₹1.45 Lakhs" },
    { item: "Other Items", cost: "₹2.4 Lakhs" }],

    expertName: "Anjali Kapoor",
    projectDuration: "35 Days"
  },
  {
    id: 5,
    customerName: "Kavitha Iyer",
    location: "Chennai, Tamil Nadu",
    homeType: "2BHK Apartment",
    budgetRange: "₹12-18 Lakhs",
    savingsAmount: "₹2.1 Lakhs",
    savingsNumber: 210000,
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_11693b1cb-1764786605584.png",
    projectImageAlt: "Well-designed 2BHK apartment interior with functional layout, quality finishes, and comfortable living spaces",
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1426d9af3-1763296752828.png",
    customerImageAlt: "Confident Indian woman in traditional-modern fusion attire in stylish home setting",
    problemIdentified: "Contractor specified premium waterproofing for all walls when only wet areas required it, adding ₹1.2 lakhs. Ceiling fan specifications included designer models for all rooms at ₹8,500 each when standard quality fans at ₹3,200 were sufficient. Paint brand was luxury segment when mid-range offered same coverage and durability. Window treatments quoted at boutique prices without exploring standard alternatives.",
    expertSolution: "Applied premium waterproofing only to bathrooms and kitchen, using standard treatment elsewhere, saving ₹82,000. Specified designer fans for living areas and standard quality for bedrooms, saving ₹42,000. Recommended mid-range paint brand with equivalent performance at 40% lower cost, saving ₹55,000. Sourced quality window treatments from standard suppliers, saving ₹41,000.",
    testimonial: "As a working mother, I wanted a beautiful home but didn't have time to research every detail. My contractor seemed trustworthy until InteriorIQ Pro's analysis revealed unnecessary premium specifications throughout. Their expert patiently explained each item and suggested practical alternatives. Saved ₹2.1 lakhs which I used for better furniture. The transparency and expertise were exactly what I needed. Highly grateful!",
    projectDate: "March 2024",
    category: "Quality Improvement",
    detailedAnalysis: "Our analysis focused on specification appropriateness across different functional areas. We evaluated each material and fixture against actual performance requirements and usage intensity. The original BoQ applied premium specifications uniformly without considering functional necessity. Our revised approach created a tiered specification system that allocated premium features where they added value while using quality standard options elsewhere, achieving optimal cost-performance balance.",
    beforeCosts: [
    { item: "Premium Waterproofing (All)", cost: "₹2.4 Lakhs" },
    { item: "Designer Fans (All Rooms)", cost: "₹1.7 Lakhs" },
    { item: "Luxury Paint Brand", cost: "₹1.8 Lakhs" },
    { item: "Boutique Window Treatments", cost: "₹1.6 Lakhs" },
    { item: "Other Items", cost: "₹7.5 Lakhs" }],

    afterCosts: [
    { item: "Strategic Waterproofing", cost: "₹1.58 Lakhs" },
    { item: "Mixed Fan Specifications", cost: "₹1.28 Lakhs" },
    { item: "Mid-Range Quality Paint", cost: "₹1.25 Lakhs" },
    { item: "Standard Window Treatments", cost: "₹1.19 Lakhs" },
    { item: "Other Items", cost: "₹7.5 Lakhs" }],

    expertName: "Suresh Nair",
    projectDuration: "40 Days"
  },
  {
    id: 6,
    customerName: "Arjun Reddy",
    location: "Hyderabad, Telangana",
    homeType: "4BHK Penthouse",
    budgetRange: "₹35-45 Lakhs",
    savingsAmount: "₹5.8 Lakhs",
    savingsNumber: 580000,
    projectImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0cdf696-1767177150557.png",
    projectImageAlt: "Spacious penthouse living area with floor-to-ceiling windows, modern furniture, and city skyline view",
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_18f752dd5-1763295813472.png",
    customerImageAlt: "Successful Indian businessman in formal attire standing in luxury apartment",
    problemIdentified: "Original design included imported lighting fixtures at ₹12 lakhs when equivalent quality Indian manufacturers offered similar designs at ₹6.5 lakhs. Home theater system was over-specified with commercial-grade equipment unnecessary for residential use. Bathroom fixtures were luxury European brands when premium Indian brands offered same quality. Unnecessary structural modifications added ₹2.8 lakhs without functional benefit.",
    expertSolution: "Identified premium Indian lighting manufacturers with international design standards, saving ₹5.5 lakhs while maintaining aesthetic vision. Right-sized home theater to residential specifications with better acoustics, saving ₹1.8 lakhs. Recommended premium Indian bathroom brands with superior after-sales service, saving ₹2.2 lakhs. Eliminated unnecessary structural changes, redirecting ₹1.5 lakhs to premium flooring upgrade.",
    testimonial: "I wanted the best for my penthouse and was ready to pay premium prices. InteriorIQ Pro's expert showed me I was paying for brand names rather than quality. Their analysis revealed better alternatives I didn't know existed. Saved ₹5.8 lakhs without compromising on luxury - actually got better quality in some areas! Their expertise in premium segment is exceptional. Worth every minute spent on their analysis.",
    projectDate: "January 2024",
    category: "Major Mistake Prevention",
    detailedAnalysis: "This high-value project required nuanced understanding of luxury segment specifications. Our expert team conducted comparative analysis of international and domestic premium brands, evaluating quality certifications, warranty terms, and after-sales support. We identified areas where import premiums didn't translate to superior quality or service. The revised specification maintained luxury standards while optimizing brand selection for better value and local support availability.",
    beforeCosts: [
    { item: "Imported Lighting", cost: "₹12.0 Lakhs" },
    { item: "Commercial Home Theater", cost: "₹6.5 Lakhs" },
    { item: "European Bathroom Brands", cost: "₹8.2 Lakhs" },
    { item: "Structural Modifications", cost: "₹2.8 Lakhs" },
    { item: "Other Items", cost: "₹12.5 Lakhs" }],

    afterCosts: [
    { item: "Premium Indian Lighting", cost: "₹6.5 Lakhs" },
    { item: "Residential Home Theater", cost: "₹4.7 Lakhs" },
    { item: "Premium Indian Brands", cost: "₹6.0 Lakhs" },
    { item: "Optimized Structure", cost: "₹1.3 Lakhs" },
    { item: "Other Items", cost: "₹12.5 Lakhs" }],

    expertName: "Priya Malhotra",
    projectDuration: "75 Days"
  }];


  const mockVideoTestimonials: VideoTestimonial[] = [
  {
    id: 1,
    customerName: "Neha Gupta",
    location: "Mumbai",
    thumbnailImage: "https://img.rocket.new/generatedImages/rocket_gen_img_181192b59-1766146080114.png",
    thumbnailImageAlt: "Video thumbnail showing happy homeowner in newly renovated living room with modern decor",
    videoTitle: "How InteriorIQ Pro Saved Me ₹3.2 Lakhs on My Dream Home",
    savingsAmount: "₹3.2 Lakhs",
    duration: "4:32"
  },
  {
    id: 2,
    customerName: "Karthik Reddy",
    location: "Bangalore",
    thumbnailImage: "https://img.rocket.new/generatedImages/rocket_gen_img_11d96cdbd-1767513665677.png",
    thumbnailImageAlt: "Video thumbnail of young professional explaining his renovation experience in modern bedroom",
    videoTitle: "From Confusion to Confidence: My Interior Journey",
    savingsAmount: "₹1.8 Lakhs",
    duration: "3:45"
  },
  {
    id: 3,
    customerName: "Deepa Shah",
    location: "Pune",
    thumbnailImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1d165f978-1767513665732.png",
    thumbnailImageAlt: "Video thumbnail showing satisfied customer in luxurious renovated villa living space",
    videoTitle: "Why Every Homeowner Needs Expert BoQ Analysis",
    savingsAmount: "₹4.5 Lakhs",
    duration: "5:18"
  }];


  const filteredStories = mockSuccessStories.filter((story) => {
    const categoryMatch = selectedCategory === 'All Categories' || story.category === selectedCategory;
    const budgetMatch = selectedBudget === 'All Budgets' || story.budgetRange === selectedBudget;
    const cityMatch = selectedCity === 'All Cities' || story.location.includes(selectedCity);
    const searchMatch = searchQuery === '' ||
    story.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.location.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && budgetMatch && cityMatch && searchMatch;
  });

  const totalSavings = mockSuccessStories.reduce((sum, story) => sum + story.savingsNumber, 0);
  const averageSavings = Math.round(totalSavings / mockSuccessStories.length);

  const handleViewDetails = (id: number) => {
    if (!isHydrated) return;
    const story = mockSuccessStories.find((s) => s.id === id);
    if (story) {
      setSelectedStory(story);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    if (!isHydrated) return;
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  const handlePlayVideo = (id: number) => {
    if (!isHydrated) return;
    setSelectedVideoId(id);
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    if (!isHydrated) return;
    setShowVideoModal(false);
    setSelectedVideoId(null);
  };

  const handleClearFilters = () => {
    if (!isHydrated) return;
    setSelectedCategory('All Categories');
    setSelectedBudget('All Budgets');
    setSelectedCity('All Cities');
    setSearchQuery('');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-4 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) =>
              <div key={i} className="h-32 bg-muted rounded-xl"></div>
              )}
            </div>
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 h-96 bg-muted rounded-xl"></div>
              <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) =>
                <div key={i} className="h-96 bg-muted rounded-xl"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="TrophyIcon" size={40} variant="solid" className="text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
              Success Stories
            </h1>
          </div>
          <p className="text-lg text-text-secondary max-w-3xl">
            Real customers, real savings, real transformations. Discover how InteriorIQ Pro's expert analysis has helped homeowners across India save lakhs while achieving their dream interiors.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-12">
          <StatsSection
            totalStories={mockSuccessStories.length}
            totalSavings={`₹${(totalSavings / 100000).toFixed(1)} L`}
            averageSavings={`₹${(averageSavings / 100000).toFixed(1)} Lakhs`}
            satisfactionRate="98.5%" />

        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <FilterSection
                selectedCategory={selectedCategory}
                selectedBudget={selectedBudget}
                selectedCity={selectedCity}
                searchQuery={searchQuery}
                onCategoryChange={setSelectedCategory}
                onBudgetChange={setSelectedBudget}
                onCityChange={setSelectedCity}
                onSearchChange={setSearchQuery}
                onClearFilters={handleClearFilters} />

            </div>
          </div>

          {/* Success Stories Grid */}
          <div className="lg:col-span-3">
            {filteredStories.length > 0 ?
            <div className="grid md:grid-cols-2 gap-6">
                {filteredStories.map((story) =>
              <SuccessStoryCard
                key={story.id}
                story={story}
                onViewDetails={handleViewDetails} />

              )}
              </div> :

            <div className="bg-card border border-border rounded-xl p-12 text-center">
                <Icon name="FaceFrownIcon" size={64} variant="outline" className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">No Stories Found</h3>
                <p className="text-text-secondary mb-6">
                  Try adjusting your filters to see more success stories
                </p>
                <button
                onClick={handleClearFilters}
                className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-cta transition-brand">

                  Clear All Filters
                </button>
              </div>
            }
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-accent to-cta rounded-2xl p-8 md:p-12 text-center shadow-brand-lg">
          <Icon name="SparklesIcon" size={48} variant="solid" className="text-accent-foreground mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-lg text-accent-foreground/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied homeowners who saved lakhs on their interior projects. Get your free expert BoQ analysis today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/upload-analysis"
              className="px-8 py-4 bg-card text-accent font-bold rounded-lg hover:bg-background transition-brand shadow-brand inline-flex items-center justify-center space-x-2">

              <Icon name="CloudArrowUpIcon" size={24} variant="outline" />
              <span>Upload Your BoQ</span>
            </a>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal
        story={selectedStory}
        isOpen={isModalOpen}
        onClose={handleCloseModal} />

      {/* Video Modal */}
      {showVideoModal && selectedVideoId &&
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-card rounded-2xl shadow-brand-lg max-w-4xl w-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-xl font-semibold text-text-primary">Video Testimonial</h3>
              <button
              onClick={handleCloseVideoModal}
              className="w-10 h-10 rounded-lg hover:bg-muted transition-brand flex items-center justify-center"
              aria-label="Close video">

                <Icon name="XMarkIcon" size={24} variant="outline" className="text-text-primary" />
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Icon name="VideoCameraIcon" size={64} variant="outline" className="text-text-secondary mx-auto mb-4" />
                  <p className="text-text-secondary">Video player would be embedded here</p>
                  <p className="text-sm text-text-secondary mt-2">
                    Video ID: {selectedVideoId}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

}