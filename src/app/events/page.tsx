import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventsPageClient from '@/components/events/EventsPage';

export const metadata: Metadata = {
  title: 'Events | The Big Tree Cafe',
  description: 'Live music, birthday packages, corporate events and special dining nights at The Big Tree Cafe, Gurgaon.',
};

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <EventsPageClient />
      <Footer />
    </>
  );
}
