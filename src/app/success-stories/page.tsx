import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import SuccessStoriesInteractive from './components/SuccessStoriesInteractive';

export const metadata: Metadata = {
  title: 'Success Stories - InteriorIQ Pro',
  description: 'Real customer success stories showing money saved and mistakes prevented through expert BoQ analysis. Discover how homeowners across India saved lakhs on their interior projects with InteriorIQ Pro.',
};

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <SuccessStoriesInteractive />
    </main>
  );
}