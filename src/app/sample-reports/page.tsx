import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import SampleReportsInteractive from './components/SampleReportsInteractive';

export const metadata: Metadata = {
  title: 'Sample BoQ Analysis Reports - InteriorIQ Pro',
  description: 'Explore detailed sample reports showcasing how our expert BoQ analysis has helped homeowners save lakhs on interior projects. See real examples of cost optimization, quality improvements, and expert recommendations.',
};

export default function SampleReportsPage() {
  return (
    <>
      <Header />
      <SampleReportsInteractive />
    </>
  );
}