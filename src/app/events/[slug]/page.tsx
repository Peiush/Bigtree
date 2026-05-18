import { events } from '@/lib/data/events';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventDetailPage from '@/components/events/EventDetailPage';
import Link from 'next/link';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(props: PageProps<'/events/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: 'Event Not Found | The Big Tree Cafe' };
  return {
    title: `${event.title} | The Big Tree Cafe`,
    description: event.description,
  };
}

export default async function EventDetailRoute(props: PageProps<'/events/[slug]'>) {
  const { slug } = await props.params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '32px' }}>
          <div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '40px', color: 'var(--color-gold-cream)', marginBottom: '16px' }}>
              Event Not Found
            </h1>
            <Link href="/events" style={{ color: 'var(--color-gold)', fontSize: '14px' }}>← Back to Events</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <EventDetailPage event={event} />
      <Footer />
    </>
  );
}
