import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ExpertTeamInteractive from './components/ExpertTeamInteractive';

export const metadata: Metadata = {
  title: 'Expert Team - InteriorIQ Pro',
  description: 'Meet our team of certified interior design experts with decades of combined experience. Our professionals have completed 2,360+ projects and saved clients over ₹47 crores through expert BoQ analysis and interior consultation.',
};

export default function ExpertTeamPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ExpertTeamInteractive />
    </main>
  );
}