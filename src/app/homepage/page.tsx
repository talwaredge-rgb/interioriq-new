import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HomepageInteractive from './components/HomepageInteractive';

export const metadata: Metadata = {
  title: 'Homepage - InteriorIQ Pro',
  description: 'India\'s first expert-driven, complimentary BoQ validation service for home interiors. Get professional analysis from experts with decades of experience. Upload your Bill of Quantities and receive detailed cost analysis within 24-48 hours.',
};

export default function Homepage() {
  return (
    <>
      <Header />
      <HomepageInteractive />
    </>
  );
}