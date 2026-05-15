import type { Metadata } from 'next';
import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ReservationPageClient from '@/components/reservation/ReservationPage';

export const metadata: Metadata = {
  title: 'Reserve a Table | The Big Tree Cafe',
  description: 'Book your table or private cabana at The Big Tree Cafe, Golf Course Road, Gurgaon. Outdoor garden, private cabanas and indoor seating available.',
};

export default function ReservePage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center" style={{ color: 'var(--color-muted)' }}>Loading...</div>}>
        <ReservationPageClient />
      </Suspense>
      <Footer />
    </>
  );
}
