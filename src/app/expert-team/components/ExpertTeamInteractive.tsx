'use client';

import { useState, useEffect } from 'react';
import ExpertCard from './ExpertCard';
import FilterPanel, { FilterState } from './FilterPanel';
import ExpertModal from './ExpertModal';
import ContactModal from './ContactModal';
import Icon from '@/components/ui/AppIcon';

interface Expert {
  id: number;
  name: string;
  title: string;
  experience: string;
  specializations: string[];
  image: string;
  alt: string;
  projectsCompleted: number;
  moneySaved: string;
  certifications: string[];
  regions: string[];
  availability: 'Available' | 'Busy' | 'Booked';
  rating: number;
  testimonialCount: number;
  bio: string;
  education: string[];
  awards: string[];
  mediaFeatures: string[];
  portfolio: Array<{image: string;alt: string;title: string;}>;
  testimonials: Array<{name: string;project: string;feedback: string;rating: number;}>;
}

const mockExperts: Expert[] = [
{
  id: 1,
  name: 'Priya Sharma',
  title: 'Senior Interior Design Consultant',
  experience: '22 Years',
  specializations: ['Kitchen Design', 'Living Spaces', 'Luxury Design'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14c723b92-1763293896787.png",
  alt: 'Professional Indian woman interior designer in elegant business attire with architectural plans in modern office',
  projectsCompleted: 450,
  moneySaved: '₹8.5Cr',
  certifications: ['NCIDQ Certified', 'LEED AP Interior Design', 'Vastu Shastra Expert'],
  regions: ['Mumbai', 'Pune', 'Bangalore'],
  availability: 'Available',
  rating: 4.9,
  testimonialCount: 187,
  bio: 'With over two decades of experience transforming residential spaces across India, Priya specializes in creating luxurious yet functional interiors that blend contemporary aesthetics with traditional Indian elements. Her expertise in kitchen design and living spaces has helped hundreds of families create their dream homes while staying within budget.',
  education: [
  'Master of Interior Design, CEPT University',
  'Bachelor of Architecture, IIT Kharagpur',
  'Advanced Certification in Sustainable Design'],

  awards: [
  'Best Residential Interior Designer 2023 - Indian Design Awards',
  'Excellence in Kitchen Design 2022 - Interior Design India',
  'Top 50 Interior Designers in India 2021'],

  mediaFeatures: [
  'Featured in Architectural Digest India',
  'Guest Speaker at Design India Summit 2023',
  'Regular Contributor to Elle Decor India'],

  portfolio: [
  {
    image: "https://images.unsplash.com/photo-1722764386927-cebe6c896d13",
    alt: 'Modern luxury kitchen with white marble countertops, gold fixtures, and custom cabinetry',
    title: 'Contemporary Kitchen - Mumbai'
  },
  {
    image: "https://images.unsplash.com/photo-1618069455903-d39882ba8c55",
    alt: 'Elegant living room with plush velvet sofa, brass accents, and floor-to-ceiling windows',
    title: 'Luxury Living Space - Pune'
  },
  {
    image: "https://images.unsplash.com/photo-1611776609113-1e1fcc208e1e",
    alt: 'Sophisticated dining area with wooden table, designer chairs, and statement chandelier',
    title: 'Modern Dining - Bangalore'
  }],

  testimonials: [
  {
    name: 'Rajesh Mehta',
    project: '3BHK Kitchen Renovation',
    feedback: 'Priya saved us ₹4.5 lakhs by identifying overpriced items in our BoQ. Her attention to detail and market knowledge is exceptional. The kitchen turned out better than we imagined!',
    rating: 5
  },
  {
    name: 'Anita Desai',
    project: 'Full Home Interior',
    feedback: 'Working with Priya was a game-changer. She caught several quality issues in our contractor\'s quote and suggested better alternatives. Highly recommend her expertise!',
    rating: 5
  }]

},
{
  id: 2,
  name: 'Arjun Patel',
  title: 'Commercial Interior Specialist',
  experience: '18 Years',
  specializations: ['Commercial Interiors', 'Budget-Friendly', 'Bathroom Renovation'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1eeed0bfe-1763294084874.png",
  alt: 'Confident male interior designer in navy blazer reviewing blueprints in contemporary office space',
  projectsCompleted: 380,
  moneySaved: '₹6.2Cr',
  certifications: ['IIDA Professional Member', 'Green Building Consultant', 'Project Management Professional'],
  regions: ['Delhi', 'Bangalore', 'Hyderabad'],
  availability: 'Busy',
  rating: 4.8,
  testimonialCount: 156,
  bio: 'Arjun brings nearly two decades of expertise in commercial and residential interior design, with a special focus on creating cost-effective solutions without compromising quality. His analytical approach to BoQ analysis has helped businesses and homeowners save millions while achieving their design goals.',
  education: [
  'Bachelor of Interior Design, NID Ahmedabad',
  'MBA in Project Management, IIM Bangalore',
  'Certification in Sustainable Interior Design'],

  awards: [
  'Commercial Interior Excellence Award 2023',
  'Cost-Effective Design Innovation 2022',
  'Best Budget Interior Designer 2021'],

  mediaFeatures: [
  'Featured in Business Today Interior Special',
  'Expert Panelist at Interior Design Expo 2023',
  'Contributing Writer for Design Digest'],

  portfolio: [
  {
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fab2bc84-1766571431624.png",
    alt: 'Modern commercial office space with ergonomic furniture, glass partitions, and natural lighting',
    title: 'Corporate Office - Delhi'
  },
  {
    image: "https://images.unsplash.com/photo-1722942113751-64e441744e6a",
    alt: 'Stylish bathroom with marble tiles, rainfall shower, and contemporary fixtures',
    title: 'Luxury Bathroom - Bangalore'
  },
  {
    image: "https://images.unsplash.com/photo-1633809365429-2fa048a02119",
    alt: 'Budget-friendly bedroom with smart storage solutions and minimalist design',
    title: 'Budget Bedroom - Hyderabad'
  }],

  testimonials: [
  {
    name: 'Vikram Singh',
    project: 'Office Interior Design',
    feedback: 'Arjun\'s commercial expertise helped us redesign our office within budget. He identified unnecessary expenses worth ₹8 lakhs in the original quote. Outstanding professional!',
    rating: 5
  },
  {
    name: 'Meera Krishnan',
    project: 'Bathroom Renovation',
    feedback: 'His budget-friendly approach saved us money while delivering premium results. The bathroom looks like it cost twice what we actually spent. Highly skilled!',
    rating: 5
  }]

},
{
  id: 3,
  name: 'Kavita Reddy',
  title: 'Luxury Interior Design Expert',
  experience: '25 Years',
  specializations: ['Luxury Design', 'Living Spaces', 'Kitchen Design'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e4f4bd99-1764786603645.png",
  alt: 'Elegant female interior designer in sophisticated attire with design samples in upscale studio',
  projectsCompleted: 520,
  moneySaved: '₹12.3Cr',
  certifications: ['Master Interior Designer', 'Luxury Design Specialist', 'International Design Council Member'],
  regions: ['Mumbai', 'Delhi', 'Bangalore'],
  availability: 'Available',
  rating: 5.0,
  testimonialCount: 243,
  bio: 'Kavita is renowned for her work in luxury residential interiors, bringing 25 years of unparalleled expertise to every project. Her meticulous attention to detail and deep understanding of premium materials has made her the go-to expert for high-end interior projects across India\'s major metros.',
  education: [
  'Master of Fine Arts in Interior Design, Parsons School of Design',
  'Bachelor of Architecture, SPA Delhi',
  'Advanced Studies in Luxury Brand Management'],

  awards: [
  'Luxury Interior Designer of the Year 2023',
  'Best High-End Residential Project 2022',
  'Lifetime Achievement Award - Indian Interior Design Association'],

  mediaFeatures: [
  'Cover Story in Architectural Digest India',
  'Keynote Speaker at Luxury Design Summit',
  'Judge at National Interior Design Awards'],

  portfolio: [
  {
    image: "https://images.unsplash.com/photo-1659247423117-a6ea3cd0c2b2",
    alt: 'Opulent living room with Italian marble flooring, designer furniture, and crystal chandelier',
    title: 'Luxury Penthouse - Mumbai'
  },
  {
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c9889b36-1765159449018.png",
    alt: 'High-end kitchen with premium appliances, custom cabinetry, and marble backsplash',
    title: 'Designer Kitchen - Delhi'
  },
  {
    image: "https://images.unsplash.com/photo-1572297258415-b9cc3cc5bb71",
    alt: 'Luxurious bedroom suite with king-size bed, silk drapes, and bespoke furniture',
    title: 'Master Suite - Bangalore'
  }],

  testimonials: [
  {
    name: 'Aditya Kapoor',
    project: 'Luxury Villa Interior',
    feedback: 'Kavita\'s expertise in luxury interiors is unmatched. She identified premium material alternatives that saved us ₹15 lakhs while maintaining the high-end aesthetic we wanted. Simply brilliant!',
    rating: 5
  },
  {
    name: 'Shreya Malhotra',
    project: 'Penthouse Renovation',
    feedback: 'Her knowledge of luxury materials and finishes is encyclopedic. She caught several quality compromises in our contractor\'s proposal and ensured we got genuine premium products. Worth every penny!',
    rating: 5
  }]

},
{
  id: 4,
  name: 'Rahul Khanna',
  title: 'Residential Interior Consultant',
  experience: '15 Years',
  specializations: ['Living Spaces', 'Budget-Friendly', 'Kitchen Design'],
  image: "https://images.unsplash.com/photo-1677091507440-7d1c17c9834c",
  alt: 'Young male interior designer in casual business attire with tablet reviewing design plans',
  projectsCompleted: 320,
  moneySaved: '₹5.8Cr',
  certifications: ['Certified Interior Designer', 'Vastu Consultant', 'Green Building Professional'],
  regions: ['Pune', 'Mumbai', 'Chennai'],
  availability: 'Available',
  rating: 4.7,
  testimonialCount: 142,
  bio: 'Rahul specializes in creating beautiful, functional residential spaces that maximize value for homeowners. His practical approach to interior design combines aesthetic appeal with budget consciousness, making quality interiors accessible to a wider audience.',
  education: [
  'Bachelor of Interior Design, MIT Institute of Design',
  'Diploma in Vastu Shastra',
  'Certification in Sustainable Living Spaces'],

  awards: [
  'Best Value Interior Designer 2023',
  'Innovation in Residential Design 2022',
  'Rising Star Award - Interior Design India'],

  mediaFeatures: [
  'Featured in HomeLane Magazine',
  'Guest on Interior Design Podcast Series',
  'Regular Contributor to Design Blogs'],

  portfolio: [
  {
    image: "https://images.unsplash.com/photo-1713365747492-7918df1942b7",
    alt: 'Cozy living room with comfortable seating, warm lighting, and modern decor',
    title: 'Family Living Space - Pune'
  },
  {
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13e167bc6-1767196178127.png",
    alt: 'Functional kitchen with smart storage, modular cabinets, and efficient layout',
    title: 'Modular Kitchen - Mumbai'
  },
  {
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15ff4a388-1767513668142.png",
    alt: 'Budget-conscious bedroom with clever storage solutions and stylish furnishings',
    title: 'Smart Bedroom - Chennai'
  }],

  testimonials: [
  {
    name: 'Pooja Nair',
    project: '2BHK Complete Interior',
    feedback: 'Rahul helped us achieve our dream home within our limited budget. His BoQ analysis saved us ₹3.2 lakhs and he suggested better alternatives for every overpriced item. Fantastic experience!',
    rating: 5
  },
  {
    name: 'Sameer Joshi',
    project: 'Kitchen Renovation',
    feedback: 'His practical approach and honest advice were refreshing. He didn\'t just analyze our BoQ but educated us about materials and pricing. Highly recommend for budget-conscious projects!',
    rating: 5
  }]

},
{
  id: 5,
  name: 'Neha Gupta',
  title: 'Bathroom & Kitchen Specialist',
  experience: '12 Years',
  specializations: ['Bathroom Renovation', 'Kitchen Design', 'Budget-Friendly'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11ad90d07-1764642190685.png",
  alt: 'Professional female designer in modern workspace with material samples and design tools',
  projectsCompleted: 280,
  moneySaved: '₹4.5Cr',
  certifications: ['Kitchen & Bath Design Specialist', 'Plumbing Systems Expert', 'Material Science Certification'],
  regions: ['Bangalore', 'Hyderabad', 'Chennai'],
  availability: 'Booked',
  rating: 4.8,
  testimonialCount: 128,
  bio: 'Neha has carved a niche in bathroom and kitchen design, bringing technical expertise and creative vision to functional spaces. Her deep understanding of plumbing, materials, and space optimization has helped countless homeowners create beautiful, practical kitchens and bathrooms.',
  education: [
  'Bachelor of Interior Design, NIFT Bangalore',
  'Specialized Training in Kitchen & Bath Design',
  'Certification in Plumbing Systems'],

  awards: [
  'Best Kitchen Design 2023 - South India',
  'Excellence in Bathroom Renovation 2022',
  'Innovative Space Planning Award 2021'],

  mediaFeatures: [
  'Featured in Kitchen & Bath Design Magazine',
  'Expert Consultant for Home Renovation Shows',
  'Contributing Author for Design Publications'],

  portfolio: [
  {
    image: "https://images.unsplash.com/photo-1722269244008-572e2394d502",
    alt: 'Contemporary bathroom with walk-in shower, floating vanity, and designer tiles',
    title: 'Modern Bathroom - Bangalore'
  },
  {
    image: "https://images.unsplash.com/photo-1577579242425-b323e6d61bd4",
    alt: 'Efficient kitchen with island counter, premium appliances, and ample storage',
    title: 'Designer Kitchen - Hyderabad'
  },
  {
    image: "https://images.unsplash.com/photo-1721274506081-4cf0555338e3",
    alt: 'Compact bathroom with space-saving fixtures and elegant finishes',
    title: 'Space-Efficient Bath - Chennai'
  }],

  testimonials: [
  {
    name: 'Karthik Reddy',
    project: 'Master Bathroom Renovation',
    feedback: 'Neha\'s technical knowledge of bathroom fixtures and materials is impressive. She identified substandard products in our quote and suggested better alternatives at similar prices. The bathroom is stunning!',
    rating: 5
  },
  {
    name: 'Divya Iyer',
    project: 'Kitchen Remodeling',
    feedback: 'Her expertise in kitchen design saved us from making costly mistakes. She optimized our layout and caught overpricing worth ₹2.8 lakhs. Professional and knowledgeable!',
    rating: 5
  }]

},
{
  id: 6,
  name: 'Sanjay Verma',
  title: 'Commercial & Residential Expert',
  experience: '20 Years',
  specializations: ['Commercial Interiors', 'Living Spaces', 'Luxury Design'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1005fab09-1766507938911.png",
  alt: 'Experienced male interior designer in formal attire reviewing architectural drawings in office',
  projectsCompleted: 410,
  moneySaved: '₹9.7Cr',
  certifications: ['NCIDQ Certified', 'Commercial Design Specialist', 'LEED Accredited Professional'],
  regions: ['Delhi', 'Mumbai', 'Pune'],
  availability: 'Available',
  rating: 4.9,
  testimonialCount: 198,
  bio: 'Sanjay brings two decades of versatile experience spanning both commercial and high-end residential projects. His ability to balance aesthetics, functionality, and budget has made him a trusted advisor for diverse interior projects across India\'s major business hubs.',
  education: [
  'Master of Interior Architecture, CEPT University',
  'Bachelor of Architecture, SPA Delhi',
  'Executive Program in Business Management'],

  awards: [
  'Versatile Designer of the Year 2023',
  'Excellence in Commercial Design 2022',
  'Top Interior Consultant 2021'],

  mediaFeatures: [
  'Featured in Forbes India Design Special',
  'Regular Speaker at Design Conferences',
  'Expert Columnist for Business Publications'],

  portfolio: [
  {
    image: "https://images.unsplash.com/photo-1680781336783-8382d382e892",
    alt: 'Professional office space with modern workstations, collaborative areas, and natural light',
    title: 'Corporate Office - Delhi'
  },
  {
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12a07f1d0-1766316848629.png",
    alt: 'Luxurious living room with designer furniture, art pieces, and sophisticated lighting',
    title: 'Luxury Residence - Mumbai'
  },
  {
    image: "https://images.unsplash.com/photo-1588167347845-7692e65a2b75",
    alt: 'Elegant commercial lobby with marble flooring, statement lighting, and premium finishes',
    title: 'Commercial Lobby - Pune'
  }],

  testimonials: [
  {
    name: 'Amit Sharma',
    project: 'Office Interior Design',
    feedback: 'Sanjay\'s commercial expertise transformed our workspace while staying within budget. His BoQ analysis revealed ₹6 lakhs in potential savings. Exceptional professional with great vision!',
    rating: 5
  },
  {
    name: 'Priyanka Malhotra',
    project: 'Luxury Apartment',
    feedback: 'His experience shows in every detail. He caught quality issues we would have never noticed and ensured we got premium materials at fair prices. Highly recommend!',
    rating: 5
  }]

}];


export default function ExpertTeamInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>(mockExperts);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactExpertName, setContactExpertName] = useState('');
  const [sortBy, setSortBy] = useState('experience');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...mockExperts];

    // Apply specialization filter
    if (filters.specialization.length > 0) {
      filtered = filtered.filter((expert) =>
      expert.specializations.some((spec) => filters.specialization.includes(spec))
      );
    }

    // Apply experience filter
    if (filters.experience.length > 0) {
      filtered = filtered.filter((expert) => {
        const years = parseInt(expert.experience);
        return filters.experience.some((exp) => {
          if (exp === '5-10 Years') return years >= 5 && years <= 10;
          if (exp === '10-20 Years') return years > 10 && years <= 20;
          if (exp === '20+ Years') return years > 20;
          return false;
        });
      });
    }

    // Apply region filter
    if (filters.region.length > 0) {
      filtered = filtered.filter((expert) =>
      expert.regions.some((region) => filters.region.includes(region))
      );
    }

    // Apply availability filter
    if (filters.availability.length > 0) {
      filtered = filtered.filter((expert) => filters.availability.includes(expert.availability));
    }

    setFilteredExperts(filtered);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredExperts];

    switch (value) {
      case 'experience':
        sorted.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'projects':
        sorted.sort((a, b) => b.projectsCompleted - a.projectsCompleted);
        break;
      case 'savings':
        sorted.sort((a, b) => {
          const aValue = parseFloat(a.moneySaved.replace(/[₹Cr]/g, ''));
          const bValue = parseFloat(b.moneySaved.replace(/[₹Cr]/g, ''));
          return bValue - aValue;
        });
        break;
    }

    setFilteredExperts(sorted);
  };

  const handleViewProfile = (expertId: number) => {
    const expert = mockExperts.find((e) => e.id === expertId);
    if (expert) {
      setSelectedExpert(expert);
      setIsModalOpen(true);
    }
  };

  const handleContactClick = (expertId: number) => {
    const expert = mockExperts.find((e) => e.id === expertId);
    if (expert) {
      setContactExpertName(expert.name);
      setIsContactModalOpen(true);
    }
  };

  const handleModalContact = (expertId: number) => {
    setIsModalOpen(false);
    const expert = mockExperts.find((e) => e.id === expertId);
    if (expert) {
      setContactExpertName(expert.name);
      setIsContactModalOpen(true);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-4 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-1/3"></div>
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="h-96 bg-muted rounded"></div>
              <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) =>
                <div key={i} className="h-96 bg-muted rounded"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary via-secondary to-accent text-white py-16 px-4 lg:px-8">
        <div className="w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Expert Team</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Decades of collective expertise at your service. Our certified interior professionals have saved clients over ₹50 crores through expert BoQ analysis.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">2,360+</p>
              <p className="text-white/80">Projects Completed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">₹47Cr+</p>
              <p className="text-white/80">Money Saved</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">4.8</p>
              <p className="text-white/80">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">117</p>
              <p className="text-white/80">Years Combined</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel onFilterChange={handleFilterChange} />
          </div>

          {/* Experts Grid */}
          <div className="lg:col-span-3">
            {/* Sort & Results */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <p className="text-text-secondary">
                Showing <span className="font-semibold text-text-primary">{filteredExperts.length}</span> experts
              </p>
              <div className="flex items-center space-x-3">
                <label htmlFor="sort" className="text-sm font-medium text-text-primary">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-4 py-2 bg-card border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent">

                  <option value="experience">Experience</option>
                  <option value="rating">Rating</option>
                  <option value="projects">Projects</option>
                  <option value="savings">Money Saved</option>
                </select>
              </div>
            </div>

            {/* Experts Grid */}
            {filteredExperts.length > 0 ?
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredExperts.map((expert) =>
              <ExpertCard
                key={expert.id}
                expert={expert}
                onContactClick={handleContactClick}
                onViewProfile={handleViewProfile} />

              )}
              </div> :

            <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                  <Icon name="FunnelIcon" size={32} variant="outline" className="text-text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">No experts found</h3>
                <p className="text-text-secondary mb-6">Try adjusting your filters to see more results</p>
              </div>
            }
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-accent text-accent-foreground py-16 px-4 lg:px-8">
        <div className="w-full text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Expert Analysis?</h2>
          <p className="text-xl mb-8 opacity-90">
            Upload your BoQ and get a free expert review within 24 hours
          </p>
          <a
            href="/upload-analysis"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-accent font-bold rounded-lg hover:bg-gray-100 transition-brand shadow-brand-lg">

            <Icon name="CloudArrowUpIcon" size={24} variant="outline" />
            <span>Upload Your BoQ Now</span>
          </a>
        </div>
      </div>

      {/* Modals */}
      <ExpertModal
        expert={selectedExpert}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContact={handleModalContact} />


      <ContactModal
        expertName={contactExpertName}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)} />

    </div>);

}