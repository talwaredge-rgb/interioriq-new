'use client';

import HeroSection from './HeroSection';
import ServiceExplanation from './ServiceExplanation';
import CTASection from './CTASection';
import Footer from './Footer';

export default function HomepageInteractive() {
  const handleFileUpload = (file: File) => {
    // File upload logic handled in HeroSection component
    console.log('File uploaded:', file.name);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onFileUpload={handleFileUpload} />
      <ServiceExplanation />
      <CTASection />
      <Footer />
    </div>
  );
}