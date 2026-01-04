'use client';

import { useState, useEffect } from 'react';
import ReportCard from './ReportCard';
import FilterBar from './FilterBar';
import ReportDetailModal from './ReportDetailModal';
import StatsSection from './StatsSection';
import CTASection from './CTASection';
import Icon from '@/components/ui/AppIcon';

interface Report {
  id: string;
  title: string;
  projectType: string;
  budgetRange: string;
  location: string;
  savingsAmount: string;
  image: string;
  alt: string;
  originalCost: string;
  optimizedCost: string;
  issuesFound: number;
  analysisDate: string;
  highlights: string[];
  detailedAnalysis: {
    overcharges: Array<{item: string;original: string;optimized: string;savings: string;}>;
    qualityIssues: string[];
    recommendations: string[];
    materialComparisons: Array<{category: string;original: string;recommended: string;reason: string;}>;
  };
  expertComments: string;
  customerTestimonial?: {
    name: string;
    feedback: string;
    rating: number;
  };
}

const mockReports: Report[] = [
{
  id: '1',
  title: 'Modern 2BHK Apartment - Complete Interior',
  projectType: '2BHK',
  budgetRange: '₹10-25 Lakhs',
  location: 'Mumbai',
  savingsAmount: '₹2.8 Lakhs',
  image: "https://images.unsplash.com/photo-1721824288192-99cc195384ca",
  alt: 'Modern 2BHK apartment interior featuring contemporary modular kitchen with sleek cabinets, integrated appliances, and efficient space design',
  originalCost: '₹18.5 Lakhs',
  optimizedCost: '₹15.7 Lakhs',
  issuesFound: 12,
  analysisDate: '15/11/2024',
  highlights: [
  'Identified 40% markup on modular kitchen hardware',
  'Found better quality laminate at 25% lower cost',
  'Removed unnecessary false ceiling in bedroom'],

  detailedAnalysis: {
    overcharges: [
    { item: 'Modular Kitchen Hardware (Hettich)', original: '₹1,85,000', optimized: '₹1,32,000', savings: '₹53,000' },
    { item: 'Living Room False Ceiling', original: '₹95,000', optimized: '₹68,000', savings: '₹27,000' },
    { item: 'Bedroom Wardrobe (8ft)', original: '₹1,45,000', optimized: '₹1,12,000', savings: '₹33,000' },
    { item: 'Bathroom Fittings (Kohler)', original: '₹78,000', optimized: '₹62,000', savings: '₹16,000' }],

    qualityIssues: [
    'Kitchen cabinet material specified as 18mm BWP plywood but quote included 16mm commercial ply',
    'Wardrobe shutters mentioned as laminate finish but actual specification was lower-grade veneer',
    'Bathroom tiles brand mentioned (Kajaria) but actual tiles were unbranded alternatives',
    'False ceiling material specified as Gyproc but quote included local gypsum boards'],

    recommendations: [
    'Use Ebco hardware instead of Hettich for kitchen—same quality, 30% cost savings',
    'Replace POP false ceiling with gypsum board for better durability and 20% cost reduction',
    'Source bathroom fittings from authorized Jaquar dealer instead of Kohler for similar quality at lower price',
    'Eliminate decorative false ceiling in master bedroom—unnecessary expense of ₹45,000'],

    materialComparisons: [
    {
      category: 'Kitchen Countertop',
      original: 'Imported Granite (Kashmir White) - ₹450/sqft',
      recommended: 'Indian Granite (River White) - ₹280/sqft',
      reason: 'Similar aesthetic appeal and durability. Indian granite offers better value with local availability and easier maintenance.'
    },
    {
      category: 'Living Room Flooring',
      original: 'Imported Laminate (Pergo) - ₹185/sqft',
      recommended: 'Premium Indian Laminate (Greenlam) - ₹125/sqft',
      reason: 'Greenlam offers AC4 rating suitable for residential use. Better warranty support and 32% cost savings.'
    },
    {
      category: 'Bedroom Wardrobe Material',
      original: 'Marine Ply with Laminate - ₹850/sqft',
      recommended: 'BWP Plywood with Laminate - ₹620/sqft',
      reason: 'BWP plywood is sufficient for bedroom wardrobes. Marine ply is overkill for non-coastal, non-humid environments.'
    }]

  },
  expertComments: 'This BoQ showed classic signs of vendor markup on branded items. The original quote included premium international brands where equally good Indian alternatives exist. We identified ₹2.8 lakhs in potential savings without compromising on quality. The false ceiling design was unnecessarily elaborate—simplified design saves ₹45,000 while maintaining aesthetics. Kitchen hardware was the biggest overcharge at 40% markup. Overall, this is a well-planned project that just needed cost optimization.',
  customerTestimonial: {
    name: 'Priya Sharma',
    feedback: 'I was about to sign the contract when I decided to get a second opinion. InteriorIQ Pro saved me ₹2.8 lakhs! They explained every single item and suggested better alternatives. The detailed report gave me confidence to negotiate with my contractor.',
    rating: 5
  }
},
{
  id: '2',
  title: 'Luxury 3BHK Villa - Premium Finishes',
  projectType: '3BHK',
  budgetRange: '₹25+ Lakhs',
  location: 'Bangalore',
  savingsAmount: '₹4.2 Lakhs',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12fb4fd9f-1765300009958.png",
  alt: 'Spacious 3BHK apartment with modern open-plan living area, premium finishes, and contemporary design elements',
  originalCost: '₹42.8 Lakhs',
  optimizedCost: '₹38.6 Lakhs',
  issuesFound: 18,
  analysisDate: '22/11/2024',
  highlights: [
  'Discovered 35% overpricing on Italian marble',
  'Identified duplicate charges for electrical work',
  'Found better lighting fixtures at 40% lower cost'],

  detailedAnalysis: {
    overcharges: [
    { item: 'Italian Marble Flooring (2,400 sqft)', original: '₹8,40,000', optimized: '₹6,20,000', savings: '₹2,20,000' },
    { item: 'Designer Lighting Fixtures', original: '₹3,25,000', optimized: '₹2,15,000', savings: '₹1,10,000' },
    { item: 'Home Automation System', original: '₹2,80,000', optimized: '₹2,15,000', savings: '₹65,000' },
    { item: 'Wooden Flooring (Bedrooms)', original: '₹4,50,000', optimized: '₹3,85,000', savings: '₹65,000' }],

    qualityIssues: [
    'Marble grade specified as Premium A but quote included B-grade material with higher variation',
    'Lighting fixtures mentioned as Philips Hue but actual products were Chinese replicas',
    'Wooden flooring specified as engineered oak but quote included laminated alternatives',
    'Home automation mentioned as Schneider but quote included unbranded Chinese systems'],

    recommendations: [
    'Source Italian marble directly from importers—save ₹2.2 lakhs with same quality',
    'Use Wipro smart lighting instead of imported brands—60% cost savings with local support',
    'Install Legrand home automation instead of Schneider—similar features at 25% lower cost',
    'Use engineered wood flooring from Pergo instead of solid wood—better durability and ₹65,000 savings'],

    materialComparisons: [
    {
      category: 'Living Room Marble',
      original: 'Italian Statuario Marble - ₹350/sqft',
      recommended: 'Indian Makrana Marble - ₹220/sqft',
      reason: 'Makrana marble offers similar white veining pattern. Used in Taj Mahal, proven durability. Better value for money.'
    },
    {
      category: 'Kitchen Cabinets',
      original: 'Imported Acrylic Finish - ₹1,850/sqft',
      recommended: 'High-Gloss Laminate Finish - ₹1,200/sqft',
      reason: 'Modern laminates offer similar glossy finish. Easier to maintain and repair. 35% cost savings without aesthetic compromise.'
    },
    {
      category: 'Bathroom Sanitary Ware',
      original: 'Duravit (Imported) - ₹1,85,000',
      recommended: 'Hindware (Premium Range) - ₹1,25,000',
      reason: 'Hindware premium range matches imported quality. Better after-sales service in India. 32% cost reduction.'
    }]

  },
  expertComments: 'This high-end villa project had significant markup on imported materials. We found that 70% of imported items had equally good Indian alternatives. The marble pricing was particularly inflated—direct sourcing from importers saves ₹2.2 lakhs. Home automation was quoted at premium brand prices but actual specification was for mid-range products. The lighting fixtures were the most concerning—Chinese replicas being sold as branded products. Overall savings of ₹4.2 lakhs achieved while maintaining luxury standards.',
  customerTestimonial: {
    name: 'Rajesh Mehta',
    feedback: 'As an NRI managing this project remotely, I needed expert guidance. InteriorIQ Pro not only saved me ₹4.2 lakhs but also caught quality issues I would never have noticed. Their detailed material comparisons helped me make informed decisions. Highly recommended!',
    rating: 5
  }
},
{
  id: '3',
  title: 'Compact 1BHK Apartment - Smart Design',
  projectType: '1BHK',
  budgetRange: '₹3-10 Lakhs',
  location: 'Pune',
  savingsAmount: '₹1.2 Lakhs',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11c3d0a89-1767117147981.png",
  alt: 'Compact modern apartment interior with efficient space utilization and smart storage solutions',
  originalCost: '₹6.8 Lakhs',
  optimizedCost: '₹5.6 Lakhs',
  issuesFound: 8,
  analysisDate: '28/11/2024',
  highlights: [
  'Removed unnecessary items worth ₹45,000',
  'Found space-saving alternatives saving ₹38,000',
  'Optimized storage solutions reducing cost by 22%'],

  detailedAnalysis: {
    overcharges: [
    { item: 'Modular Kitchen (6ft)', original: '₹1,85,000', optimized: '₹1,42,000', savings: '₹43,000' },
    { item: 'Bedroom Wardrobe (5ft)', original: '₹78,000', optimized: '₹62,000', savings: '₹16,000' },
    { item: 'Living Room TV Unit', original: '₹52,000', optimized: '₹38,000', savings: '₹14,000' },
    { item: 'Bathroom Renovation', original: '₹95,000', optimized: '₹78,000', savings: '₹17,000' }],

    qualityIssues: [
    'Kitchen cabinet depth specified as 22 inches but standard 18 inches would suffice for compact space',
    'Wardrobe included full-height shutters when sliding doors would be more space-efficient',
    'TV unit design included unnecessary decorative elements consuming valuable floor space',
    'Bathroom tiles specified as 2x2 feet when 1x2 feet would create better visual proportion'],

    recommendations: [
    'Use 18-inch depth kitchen cabinets—saves space and ₹28,000 without functionality loss',
    'Install sliding wardrobe doors instead of hinged—saves space and ₹12,000',
    'Simplify TV unit design with wall-mounted option—saves ₹14,000 and floor space',
    'Use vertical storage solutions in bathroom—better space utilization at lower cost'],

    materialComparisons: [
    {
      category: 'Kitchen Countertop',
      original: 'Granite Countertop - ₹320/sqft',
      recommended: 'Quartz Composite - ₹280/sqft',
      reason: 'Quartz offers non-porous surface, easier maintenance. Better for small kitchens. 12% cost savings.'
    },
    {
      category: 'Living Room Flooring',
      original: 'Vitrified Tiles (800x800mm) - ₹85/sqft',
      recommended: 'Vitrified Tiles (600x600mm) - ₹62/sqft',
      reason: 'Smaller tiles create better visual proportion in compact spaces. 27% cost reduction with same quality.'
    },
    {
      category: 'Wardrobe Material',
      original: 'Plywood with Laminate - ₹720/sqft',
      recommended: 'Pre-laminated Particle Board - ₹520/sqft',
      reason: 'Particle board sufficient for bedroom wardrobes. Better cost-effectiveness for compact spaces.'
    }]

  },
  expertComments: 'This 1BHK project had a common issue—applying 2BHK design standards to a smaller space. The original BoQ included oversized furniture and unnecessary decorative elements. We focused on space optimization and functionality. Kitchen cabinet depth reduction alone saved ₹28,000 while improving workflow. The wardrobe design change from hinged to sliding doors saved both money and space. Overall, we achieved ₹1.2 lakhs in savings while making the space more functional and visually appealing.',
  customerTestimonial: {
    name: 'Ananya Desai',
    feedback: 'As a first-time homeowner, I had no idea what was reasonable. InteriorIQ Pro helped me understand every aspect of my BoQ. They saved me ₹1.2 lakhs and made my small apartment more functional. The space-saving suggestions were brilliant!',
    rating: 5
  }
},
{
  id: '4',
  title: 'Contemporary 2BHK - Minimalist Style',
  projectType: '2BHK',
  budgetRange: '₹10-25 Lakhs',
  location: 'Delhi',
  savingsAmount: '₹1.8 Lakhs',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_114ea2147-1764833935445.png",
  alt: 'Traditional Indian style 2BHK home interior with ethnic decor elements, wooden furniture, and warm color palette',
  originalCost: '₹14.2 Lakhs',
  optimizedCost: '₹12.4 Lakhs',
  issuesFound: 10,
  analysisDate: '05/12/2024',
  highlights: [
  'Eliminated redundant false ceiling work worth ₹62,000',
  'Found better paint brands at 18% lower cost',
  'Optimized electrical layout saving ₹28,000'],

  detailedAnalysis: {
    overcharges: [
    { item: 'False Ceiling (Living + Dining)', original: '₹1,42,000', optimized: '₹95,000', savings: '₹47,000' },
    { item: 'Paint Work (Asian Paints Royale)', original: '₹85,000', optimized: '₹68,000', savings: '₹17,000' },
    { item: 'Electrical Work & Fixtures', original: '₹1,25,000', optimized: '₹98,000', savings: '₹27,000' },
    { item: 'Flooring (Vitrified Tiles)', original: '₹2,80,000', optimized: '₹2,45,000', savings: '₹35,000' }],

    qualityIssues: [
    'False ceiling design included unnecessary multi-level drops not aligned with minimalist aesthetic',
    'Paint specification mentioned Royale but quote included lower-grade Apcolite',
    'Electrical layout had redundant light points increasing material and labor costs',
    'Tile specification mentioned Kajaria but quote included unbranded alternatives'],

    recommendations: [
    'Simplify false ceiling to single-level design—aligns with minimalist style and saves ₹47,000',
    'Use Berger Silk Luxury instead of Asian Paints Royale—similar quality, 20% lower cost',
    'Optimize electrical layout by removing redundant light points—saves ₹27,000',
    'Use Somany tiles instead of Kajaria—comparable quality with better pricing'],

    materialComparisons: [
    {
      category: 'Living Room Tiles',
      original: 'Kajaria Vitrified (800x800mm) - ₹95/sqft',
      recommended: 'Somany Vitrified (800x800mm) - ₹78/sqft',
      reason: 'Somany offers similar quality and design range. Better warranty terms. 18% cost savings.'
    },
    {
      category: 'Interior Paint',
      original: 'Asian Paints Royale - ₹485/litre',
      recommended: 'Berger Silk Luxury - ₹395/litre',
      reason: 'Berger Silk offers similar finish and durability. Better coverage per litre. 19% cost reduction.'
    },
    {
      category: 'Kitchen Platform',
      original: 'Granite (Absolute Black) - ₹380/sqft',
      recommended: 'Granite (Black Galaxy) - ₹295/sqft',
      reason: 'Black Galaxy offers similar aesthetic. Better availability and easier maintenance. 22% savings.'
    }]

  },
  expertComments: 'This minimalist design project had a BoQ that contradicted the design philosophy. The elaborate false ceiling design was completely out of place in a minimalist interior. We simplified the design to align with the aesthetic while saving ₹47,000. The paint specification was misleading—Royale mentioned but Apcolite quoted. Electrical layout had 40% more light points than necessary. Overall, we achieved ₹1.8 lakhs in savings while staying true to the minimalist design intent.'
},
{
  id: '5',
  title: 'Traditional 3BHK - Classic Elegance',
  projectType: '3BHK',
  budgetRange: '₹25+ Lakhs',
  location: 'Chennai',
  savingsAmount: '₹3.5 Lakhs',
  image: "https://images.unsplash.com/photo-1618920912621-a218d8fd35cc",
  alt: 'Traditional elegant home interior with ornate wooden furniture, rich fabrics, and classic architectural details',
  originalCost: '₹38.5 Lakhs',
  optimizedCost: '₹35.0 Lakhs',
  issuesFound: 15,
  analysisDate: '08/12/2024',
  highlights: [
  'Identified 28% markup on teak wood furniture',
  'Found authentic alternatives for decorative elements',
  'Optimized traditional design elements saving ₹1.2 lakhs'],

  detailedAnalysis: {
    overcharges: [
    { item: 'Teak Wood Furniture (Living Room)', original: '₹6,85,000', optimized: '₹5,20,000', savings: '₹1,65,000' },
    { item: 'Traditional Wooden Doors', original: '₹3,25,000', optimized: '₹2,68,000', savings: '₹57,000' },
    { item: 'Decorative Ceiling Work', original: '₹2,80,000', optimized: '₹2,15,000', savings: '₹65,000' },
    { item: 'Traditional Lighting Fixtures', original: '₹1,95,000', optimized: '₹1,42,000', savings: '₹53,000' }],

    qualityIssues: [
    'Teak wood furniture quoted as solid teak but specification included teak veneer on engineered wood',
    'Traditional doors mentioned as Burma teak but quote included Indian teak with lower durability',
    'Decorative ceiling work included machine-made elements instead of specified hand-carved details',
    'Lighting fixtures mentioned as brass but actual material was brass-plated steel'],

    recommendations: [
    'Source teak furniture from Chettinad craftsmen—authentic quality at 25% lower cost',
    'Use seasoned Indian teak for doors—better suited for Chennai climate and ₹57,000 savings',
    'Simplify decorative ceiling work while maintaining traditional aesthetic—saves ₹65,000',
    'Use authentic brass lighting fixtures from local artisans—better quality at lower price'],

    materialComparisons: [
    {
      category: 'Living Room Furniture',
      original: 'Burma Teak (Solid) - ₹8,500/cft',
      recommended: 'Indian Teak (Seasoned) - ₹6,200/cft',
      reason: 'Indian teak better suited for local climate. Proper seasoning ensures durability. 27% cost savings.'
    },
    {
      category: 'Flooring',
      original: 'Italian Marble (Botticino) - ₹420/sqft',
      recommended: 'Indian Marble (Makrana) - ₹285/sqft',
      reason: 'Makrana marble aligns with traditional aesthetic. Better for Chennai climate. 32% cost reduction.'
    },
    {
      category: 'Decorative Elements',
      original: 'Machine-carved Panels - ₹1,850/sqft',
      recommended: 'Hand-carved Panels (Local Artisans) - ₹1,420/sqft',
      reason: 'Hand-carved panels offer authentic traditional look. Support local craftsmanship. 23% savings.'
    }]

  },
  expertComments: 'This traditional design project had significant quality misrepresentation. The teak furniture was quoted as solid teak but specification revealed teak veneer on engineered wood—a 40% quality downgrade. We recommended sourcing from Chettinad craftsmen who offer authentic solid teak at better prices. The decorative ceiling work was overpriced and included machine-made elements instead of hand-carved details. Overall, we achieved ₹3.5 lakhs in savings while ensuring authentic traditional quality.',
  customerTestimonial: {
    name: 'Venkatesh Iyer',
    feedback: 'I wanted an authentic traditional home but was worried about being overcharged. InteriorIQ Pro not only saved me ₹3.5 lakhs but also connected me with genuine craftsmen. The quality of work is outstanding, and I got exactly what I wanted.',
    rating: 5
  }
},
{
  id: '6',
  title: 'Modern Commercial Office - 2000 sqft',
  projectType: 'Commercial',
  budgetRange: '₹25+ Lakhs',
  location: 'Hyderabad',
  savingsAmount: '₹5.8 Lakhs',
  image: "https://images.unsplash.com/photo-1631248988030-141c05a37dd2",
  alt: 'Modern commercial office space with open floor plan, ergonomic workstations, and contemporary lighting',
  originalCost: '₹32.5 Lakhs',
  optimizedCost: '₹26.7 Lakhs',
  issuesFound: 22,
  analysisDate: '10/12/2024',
  highlights: [
  'Identified 45% overpricing on office furniture',
  'Found better HVAC solution saving ₹1.8 lakhs',
  'Optimized electrical and networking layout'],

  detailedAnalysis: {
    overcharges: [
    { item: 'Office Workstations (25 units)', original: '₹8,75,000', optimized: '₹6,20,000', savings: '₹2,55,000' },
    { item: 'HVAC System (VRV)', original: '₹6,50,000', optimized: '₹4,85,000', savings: '₹1,65,000' },
    { item: 'False Ceiling & Lighting', original: '₹4,25,000', optimized: '₹3,42,000', savings: '₹83,000' },
    { item: 'Electrical & Networking', original: '₹3,80,000', optimized: '₹3,05,000', savings: '₹75,000' }],

    qualityIssues: [
    'Workstation specification mentioned Herman Miller but quote included local replicas',
    'HVAC system quoted as Daikin VRV but specification was for split AC units',
    'False ceiling mentioned as Armstrong but quote included local gypsum boards',
    'Networking cables specified as Cat6A but quote included Cat5e cables'],

    recommendations: [
    'Use Godrej Interio workstations—commercial-grade quality at 30% lower cost than imported brands',
    'Install Voltas VRV system instead of Daikin—similar efficiency with better local support',
    'Use Gyproc false ceiling with LED panel lights—better aesthetics and ₹83,000 savings',
    'Upgrade to Cat6A networking as specified—future-proof infrastructure at correct pricing'],

    materialComparisons: [
    {
      category: 'Office Workstations',
      original: 'Herman Miller (Imported) - ₹35,000/unit',
      recommended: 'Godrej Interio (Premium) - ₹24,800/unit',
      reason: 'Godrej offers commercial-grade ergonomics. Better warranty and local service. 29% cost savings.'
    },
    {
      category: 'HVAC System',
      original: 'Daikin VRV - ₹325/sqft',
      recommended: 'Voltas VRV - ₹242/sqft',
      reason: 'Voltas offers similar energy efficiency. Better service network in India. 25% cost reduction.'
    },
    {
      category: 'Flooring',
      original: 'Carpet Tiles (Interface) - ₹185/sqft',
      recommended: 'Carpet Tiles (Welspun) - ₹135/sqft',
      reason: 'Welspun offers commercial-grade durability. Easier replacement and maintenance. 27% savings.'
    }]

  },
  expertComments: 'This commercial project had the most significant quality misrepresentation we have seen. Herman Miller workstations were quoted but local replicas were specified—a massive quality gap. The HVAC system was particularly concerning—VRV system quoted but split AC units specified. We recommended authentic commercial-grade alternatives that meet quality standards while saving ₹5.8 lakhs. The networking infrastructure was also downgraded from Cat6A to Cat5e, which would have caused future issues. Overall, this BoQ needed complete restructuring to align with commercial standards.',
  customerTestimonial: {
    name: 'Suresh Reddy',
    feedback: 'Setting up our first office, we had no idea about commercial interior standards. InteriorIQ Pro saved us from a disaster. They caught quality issues that would have cost us much more in the long run. The ₹5.8 lakhs savings was a bonus—the real value was in ensuring we got what we paid for.',
    rating: 5
  }
}];


export default function SampleReportsInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState('All Projects');
  const [selectedBudgetRange, setSelectedBudgetRange] = useState('All Budgets');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filteredReports, setFilteredReports] = useState<Report[]>(mockReports);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    let filtered = mockReports;

    if (selectedProjectType !== 'All Projects') {
      filtered = filtered.filter((report) => report.projectType === selectedProjectType);
    }

    if (selectedBudgetRange !== 'All Budgets') {
      filtered = filtered.filter((report) => report.budgetRange === selectedBudgetRange);
    }

    if (selectedLocation !== 'All Locations') {
      filtered = filtered.filter((report) => report.location === selectedLocation);
    }

    setFilteredReports(filtered);
  }, [selectedProjectType, selectedBudgetRange, selectedLocation, isHydrated]);

  const handleViewDetails = (id: string) => {
    const report = mockReports.find((r) => r.id === id);
    if (report) {
      setSelectedReport(report);
    }
  };

  const handleClearFilters = () => {
    setSelectedProjectType('All Projects');
    setSelectedBudgetRange('All Budgets');
    setSelectedLocation('All Locations');
  };

  const totalSavings = mockReports.reduce((sum, report) => {
    const savings = parseFloat(report.savingsAmount.replace(/[₹,Lakhs\s]/g, ''));
    return sum + savings;
  }, 0);

  const totalIssues = mockReports.reduce((sum, report) => sum + report.issuesFound, 0);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-4 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-32 bg-muted rounded-lg" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) =>
                <div key={i} className="h-32 bg-muted rounded-lg" />
                )}
              </div>
              <div className="h-24 bg-muted rounded-lg" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) =>
                <div key={i} className="h-96 bg-muted rounded-lg" />
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Icon name="DocumentTextIcon" size={16} />
              <span>Real Analysis Examples</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Sample BoQ Analysis Reports
            </h1>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Explore detailed case studies showcasing how our expert analysis has helped homeowners save lakhs on their interior projects while ensuring quality and transparency.
            </p>
          </div>

          <StatsSection
            totalReports={mockReports.length}
            totalSavings={`₹${totalSavings.toFixed(1)} Lakhs`}
            avgSavingsPercent={18}
            issuesIdentified={totalIssues} />


          <FilterBar
            selectedProjectType={selectedProjectType}
            selectedBudgetRange={selectedBudgetRange}
            selectedLocation={selectedLocation}
            onProjectTypeChange={setSelectedProjectType}
            onBudgetRangeChange={setSelectedBudgetRange}
            onLocationChange={setSelectedLocation}
            onClearFilters={handleClearFilters} />


          {filteredReports.length > 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredReports.map((report) =>
            <ReportCard
              key={report.id}
              report={report}
              onViewDetails={handleViewDetails} />

            )}
            </div> :

          <div className="text-center py-16 bg-card border border-border rounded-lg mb-12">
              <Icon name="FolderOpenIcon" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">No Reports Found</h3>
              <p className="text-text-secondary mb-6">
                Try adjusting your filters to see more results
              </p>
              <button
              onClick={handleClearFilters}
              className="px-6 py-2.5 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-cta transition-brand">

                Clear All Filters
              </button>
            </div>
          }

          <CTASection />
        </div>
      </div>

      <ReportDetailModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)} />

    </div>);

}