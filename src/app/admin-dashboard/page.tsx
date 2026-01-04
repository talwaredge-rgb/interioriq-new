'use client';

import { Suspense } from 'react';
import Header from '@/components/common/Header';
import AdminDashboardInteractive from './components/AdminDashboardInteractive';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="w-full">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          <AdminDashboardInteractive />
        </Suspense>
      </main>
    </div>
  );
}