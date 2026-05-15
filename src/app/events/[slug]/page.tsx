import { events } from '@/lib/data/events';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default async function EventDetailPage(props: PageProps<'/events/[slug]'>) {
  const { slug } = await props.params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 flex items-center justify-center text-center px-6">
          <div>
            <h1 className="font-serif italic text-4xl mb-4" style={{ color: 'var(--color-gold-cream)' }}>Event Not Found</h1>
            <Link href="/events" style={{ color: 'var(--color-gold)' }}>← Back to Events</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const date = new Date(event.date);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
        {/* Hero */}
        <div className="relative overflow-hidden" style={{ height: '500px' }}>
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col items-end justify-end p-12"
            style={{ background: 'linear-gradient(to top, rgba(10,13,8,0.9) 0%, rgba(10,13,8,0.2) 60%)' }}>
            <div className="max-w-[600px]">
              <p className="text-xs tracking-[2.5px] uppercase mb-3" style={{ color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace' }}>
                {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} · {event.time}
              </p>
              <h1 className="font-serif italic mb-3" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--color-gold-cream)' }}>
                {event.title}
              </h1>
              {event.artist && (
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{event.artist} · {event.genre}</p>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="py-20 px-6 md:px-12">
          <div className="max-w-[700px] mx-auto">
            <p className="text-base mb-8" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>{event.description}</p>
            <div className="p-4 rounded-xl mb-8 flex items-center justify-between"
              style={{ background: 'var(--color-bg-card)', border: '1px solid rgba(200,145,58,0.12)' }}>
              <span className="text-sm" style={{ color: 'var(--color-muted)' }}>Availability</span>
              <span className="text-sm font-medium"
                style={{ color: event.cabanaCount === 0 ? 'var(--color-danger)' : event.cabanaCount <= 3 ? 'var(--color-danger)' : 'var(--color-success)' }}>
                {event.cabanaCount === 0 ? 'Fully booked' : `${event.cabanaCount} cabanas available`}
              </span>
            </div>
            <Link href={`/reserve?occasion=${event.type === 'private-event' ? 'Birthday' : 'Regular Dining'}`}
              className="w-full block text-center py-4 rounded-full text-sm font-medium"
              style={{ background: 'var(--color-gold)', color: 'var(--color-bg)' }}>
              Book a Table for This Event →
            </Link>
            <div className="mt-6 text-center">
              <Link href="/events" className="text-sm" style={{ color: 'var(--color-muted)' }}>← All Events</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
