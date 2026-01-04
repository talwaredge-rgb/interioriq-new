import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import KnowledgeCenterInteractive from './components/KnowledgeCenterInteractive';

export const metadata: Metadata = {
  title: 'Knowledge Center - InteriorIQ Pro',
  description: 'Comprehensive interior cost guides, expert insights, and interactive tools to help you make informed decisions about your interior projects. Learn about hidden costs, material quality, vendor red flags, and regional pricing trends across India.',
};

export default function KnowledgeCenterPage() {
  return (
    <>
      <Header />
      <KnowledgeCenterInteractive />
    </>
  );
}