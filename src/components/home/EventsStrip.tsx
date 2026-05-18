'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { events } from '@/lib/data/events';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function EventCard({ event }: { event: (typeof events)[0] }) {
  const date = new Date(event.date);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const dayNum = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  const typeLabel: Record<string, string> = {
    'live-music': '🎵 Live Music',
    'birthday': '🎂 Birthday',
    'corporate': '🏢 Corporate',
    'special-dining': '✨ Special Dining',
  };
  const availColor = event.cabanaCount === 0 ? '#e74c3c' : event.cabanaCount <= 3 ? '#e74c3c' : event.cabanaCount > 5 ? 'var(--color-success)' : 'var(--color-gold)';

  return (
    <Link href={`/events/${event.slug}`} className="event-card group" style={{
      flexShrink: 0, width: 'min(300px, 78vw)', height: '400px', borderRadius: '16px', overflow: 'hidden',
      position: 'relative', display: 'block', cursor: 'pointer', textDecoration: 'none',
    }}>
      <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
        className="group-hover:scale-105" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,13,8,0.95) 0%, rgba(10,13,8,0.08) 55%)' }} />

      <div style={{
        position: 'absolute', top: '16px', left: '16px', padding: '10px 12px', borderRadius: '8px', textAlign: 'center',
        background: 'rgba(10,13,8,0.75)', border: '1px solid rgba(200,145,58,0.35)', fontFamily: 'DM Mono, monospace',
      }}>
        <div style={{ fontSize: '9px', color: 'var(--color-muted)', letterSpacing: '1px' }}>{dayName}</div>
        <div style={{ fontSize: '22px', fontWeight: 600, lineHeight: 1, color: 'var(--color-gold-cream)' }}>{dayNum}</div>
        <div style={{ fontSize: '9px', color: 'var(--color-muted)', letterSpacing: '1px' }}>{month}</div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
        <span style={{
          display: 'inline-block', padding: '4px 10px', borderRadius: '100px', marginBottom: '10px',
          background: 'rgba(200,145,58,0.18)', color: 'var(--color-gold)',
          fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.5px',
        }}>{typeLabel[event.type]}</span>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: 'var(--color-gold-cream)', marginBottom: '8px', lineHeight: 1.2, fontWeight: 400 }}>
          {event.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', color: availColor, fontFamily: 'DM Mono, monospace' }}>
            {event.cabanaCount === 0 ? 'Fully booked' : `${event.cabanaCount} cabanas left`}
          </span>
          <span style={{ fontSize: '12px', color: 'var(--color-gold)', opacity: 0 }} className="group-hover:opacity-100">Book →</span>
        </div>
      </div>
    </Link>
  );
}

export default function EventsStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.ev-header', start: 'top 85%', once: true },
      });
      tl.fromTo('.ev-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo('.ev-heading', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .fromTo('.ev-link', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2');

      // Cards stagger from bottom
      ScrollTrigger.batch('.event-card', {
        start: 'top 92%',
        once: true,
        onEnter: (els) => gsap.fromTo(els,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', stagger: 0.12 }
        ),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="home-sec-80" style={{ background: 'var(--color-bg)' }}>
      <div className="home-section-inner">
        <div className="ev-header ev-header-row">
          <div>
            <p className="ev-label" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace', marginBottom: '12px' }}>Events</p>
            <h2 className="ev-heading" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(26px, 3vw, 42px)', color: 'var(--color-gold-cream)', fontWeight: 400 }}>
              This week at The Big Tree.
            </h2>
          </div>
          <Link className="ev-link" href="/events" style={{ fontSize: '13px', color: 'var(--color-gold)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            See all events →
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'none' }}>
          {events.slice(0, 4).map((e) => <EventCard key={e.id} event={e} />)}
        </div>
      </div>
    </section>
  );
}
