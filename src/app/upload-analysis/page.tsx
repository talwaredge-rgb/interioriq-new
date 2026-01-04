import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import UploadAnalysisInteractive from './components/UploadAnalysisInteractive';

export const metadata: Metadata = {
  title: 'Upload & Analysis - InteriorIQ Pro',
  description: 'Upload your Bill of Quantities (BoQ) for free expert analysis. Get comprehensive insights on pricing, quality, and potential savings from seasoned interior professionals within 24-48 hours.',
};

export default function UploadAnalysisPage() {
  return (
    <>
      <Header />
      <UploadAnalysisInteractive />
    </>
  );
}