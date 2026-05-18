'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { events, birthdayPackages } from '@/lib/data/events';
import { Check, Send, ChevronDown } from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────────────────────────── */
type Tab = 'upcoming' | 'birthdays' | 'corporate' | 'live-music';
type Filter = 'all' | 'this-week' | 'this-month' | 'live-music' | 'special-dining' | 'private-events';

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const num = d.getDate();
  const mon = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  return { day, num, mon };
}

function formatDateLabel(dateStr: string, time: string) {
  const d = new Date(dateStr);
  const day = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const num = d.getDate();
  const mon = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  return `${day}, ${num} ${mon} · ${time}`;
}

const TYPE_LABEL: Record<string, string> = {
  'live-music': 'Live Music',
  'special-dining': 'Special Dining',
  'private-event': 'Private Event',
};

/* ─── Scroll Reveal Hook ─────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = '1';
            (e.target as HTMLElement).style.transform = 'translateY(0)';
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ─── Event Card ─────────────────────────────────────────────────────────────── */
function EventCard({ event, delay = 0 }: { event: (typeof events)[0]; delay?: number }) {
  const isSoldOut = event.cabanaCount === 0;
  const isLow = event.cabanaCount > 0 && event.cabanaCount <= 3;
  const typeLabel = TYPE_LABEL[event.type] ?? event.type;

  return (
    <div
      data-reveal
      style={{
        opacity: 0,
        transform: 'translateY(24px)',
        transition: `opacity 480ms ease ${delay}ms, transform 480ms ease ${delay}ms`,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        overflow: 'hidden',
        background: '#111a0d',
        border: '1px solid rgba(200,145,58,0.12)',
        cursor: isSoldOut ? 'default' : 'pointer',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 500ms cubic-bezier(0.25,0.46,0.45,0.94)',
            filter: isSoldOut ? 'grayscale(40%) brightness(0.7)' : undefined,
          }}
          className="ev-card-img"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,8,4,0.55) 0%, transparent 50%)' }} />
        {/* date + type row */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.04em',
            color: 'rgba(245,230,194,0.9)', background: 'rgba(5,8,4,0.6)',
            padding: '4px 8px', borderRadius: '4px', backdropFilter: 'blur(4px)',
          }}>
            {formatDateLabel(event.date, event.time)}
          </span>
          <span style={{
            fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.06em',
            background: 'var(--color-gold)', color: '#0A0D08',
            padding: '4px 10px', borderRadius: '100px', fontWeight: 500,
          }}>
            {typeLabel}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1, gap: '8px' }}>
        <Link href={`/events/${event.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
            fontSize: '22px', fontWeight: 400, lineHeight: 1.2,
            color: 'var(--color-gold-cream)', marginBottom: '4px',
          }}>
            {event.title}
          </h3>
        </Link>
        <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.6, flex: 1 }}>
          {event.description}
        </p>

        {/* Spacer */}
        <div style={{ flex: 1, minHeight: '12px' }} />

        {/* Availability + Price row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontFamily: 'DM Mono, monospace' }}>
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
              background: isSoldOut ? '#C84040' : isLow ? '#C84040' : '#3D9E5F',
              boxShadow: isSoldOut ? '0 0 6px rgba(200,64,64,0.5)' : isLow ? '0 0 6px rgba(200,64,64,0.4)' : '0 0 6px rgba(61,158,95,0.4)',
            }} />
            <span style={{ color: isSoldOut ? '#C84040' : isLow ? '#C84040' : 'var(--color-muted)' }}>
              {isSoldOut
                ? 'Fully booked'
                : `${event.cabanaCount} cabana${event.cabanaCount !== 1 ? 's' : ''} available`}
            </span>
          </span>
          {event.price !== null ? (
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '14px', color: 'var(--color-gold-cream)', letterSpacing: '0.02em' }}>
              ₹{event.price.toLocaleString('en-IN')}
            </span>
          ) : !isSoldOut ? (
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--color-muted)', textTransform: 'uppercase' }}>
              No Cover
            </span>
          ) : null}
        </div>

        {/* CTA button */}
        {isSoldOut ? (
          <button disabled style={{
            width: '100%', padding: '11px', borderRadius: '100px', fontSize: '13px',
            fontFamily: 'DM Sans, sans-serif', background: 'transparent',
            border: '1px solid rgba(200,145,58,0.2)', color: 'var(--color-muted)',
            cursor: 'not-allowed',
          }}>
            Sold out
          </button>
        ) : (
          <Link
            href={`/reserve?event=${event.slug}`}
            className="ev-book-btn"
            style={{
              display: 'block', width: '100%', padding: '11px', borderRadius: '100px',
              fontSize: '13px', fontFamily: 'DM Sans, sans-serif', textAlign: 'center',
              textDecoration: 'none', background: 'transparent',
              border: '1px solid var(--color-gold)', color: 'var(--color-gold)',
              transition: 'all 220ms ease', letterSpacing: '0.02em',
            }}
          >
            Book a table →
          </Link>
        )}
      </div>
    </div>
  );
}

/* ─── Package Card ───────────────────────────────────────────────────────────── */
function PackageCard({ pkg, delay = 0 }: { pkg: (typeof birthdayPackages)[0]; delay?: number }) {
  const isPopular = (pkg as any).popular;
  return (
    <div
      data-reveal
      style={{
        opacity: 0, transform: 'translateY(24px)',
        transition: `opacity 480ms ease ${delay}ms, transform 480ms ease ${delay}ms`,
        position: 'relative', display: 'flex', flexDirection: 'column',
        borderRadius: '10px', overflow: 'visible',
        background: '#111a0d',
        border: isPopular ? '1px solid var(--color-gold)' : '1px solid rgba(200,145,58,0.12)',
      }}
    >
      {isPopular && (
        <div style={{
          position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)',
          padding: '4px 16px', borderRadius: '100px', fontSize: '10px',
          fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em',
          background: 'var(--color-gold)', color: '#0A0D08', fontWeight: 600,
          whiteSpace: 'nowrap',
        }}>
          MOST POPULAR
        </div>
      )}
      <div style={{ height: '200px', overflow: 'hidden', borderRadius: '10px 10px 0 0' }}>
        <img src={pkg.image} alt={pkg.name} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 400, color: 'var(--color-gold-cream)', marginBottom: '4px' }}>
          {pkg.name}
        </h3>
        <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '22px', color: 'var(--color-gold)', marginBottom: '20px' }}>
          ₹{pkg.price.toLocaleString('en-IN')}
        </p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, marginBottom: '24px' }}>
          {pkg.features.map((f) => (
            <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--color-muted)' }}>
              <Check size={13} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-gold)' }} />
              {f}
            </li>
          ))}
        </ul>
        <Link
          href={`/reserve?package=${pkg.id}&seat=cabana&occasion=Birthday`}
          className="ev-book-btn"
          style={{
            display: 'block', textAlign: 'center', padding: '13px', borderRadius: '100px',
            fontSize: '13px', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none',
            background: 'var(--color-gold)', color: '#0A0D08', fontWeight: 500,
            transition: 'all 220ms ease',
          }}
        >
          Book This Package →
        </Link>
      </div>
    </div>
  );
}

/* ─── Corporate Form ─────────────────────────────────────────────────────────── */
function CorporateSection() {
  const [formData, setFormData] = useState({ company: '', contact: '', phone: '', date: '', headcount: '', message: '' });
  const [sent, setSent] = useState(false);

  return (
    <div data-reveal style={{
      opacity: 0, transform: 'translateY(24px)',
      transition: 'opacity 480ms ease, transform 480ms ease',
    }}>
      <div className="ev-hero-grid">
        <div>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '20px' }}>
            Corporate
          </p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 400, color: 'var(--color-gold-cream)', marginBottom: '24px', lineHeight: 1.15 }}>
            Corporate Outings<br />&amp; Team Events
          </h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              'Private garden & cabana zones for up to 200 guests',
              'Custom menu planning and dietary accommodations',
              'AV support for presentations and branding',
              'Dedicated event coordinator and wait staff',
              'Pre-event site visit and personalised setup',
            ].map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                <Check size={15} style={{ flexShrink: 0, marginTop: '3px', color: 'var(--color-gold)' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ borderRadius: '12px', padding: '36px', background: '#111a0d', border: '1px solid rgba(200,145,58,0.12)' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(61,158,95,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Check size={22} style={{ color: '#3D9E5F' }} />
              </div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: 'var(--color-gold-cream)', marginBottom: '8px' }}>Inquiry Sent!</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)' }}>Our events team will contact you within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: 'var(--color-gold-cream)', marginBottom: '8px' }}>Send an Inquiry</h3>
              {[
                { name: 'company', placeholder: 'Company Name', type: 'text' },
                { name: 'contact', placeholder: 'Contact Person', type: 'text' },
                { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
                { name: 'date', placeholder: 'Preferred Date', type: 'date' },
                { name: 'headcount', placeholder: 'Expected Headcount', type: 'number' },
              ].map((f) => (
                <input key={f.name} type={f.type} placeholder={f.placeholder} required
                  value={(formData as any)[f.name]}
                  onChange={(e) => setFormData((p) => ({ ...p, [f.name]: e.target.value }))}
                  style={{
                    width: '100%', padding: '11px 14px', borderRadius: '8px', fontSize: '13px',
                    outline: 'none', background: 'var(--color-bg)',
                    border: '1px solid rgba(200,145,58,0.2)',
                    color: 'var(--color-text)', colorScheme: 'dark',
                    fontFamily: 'DM Sans, sans-serif',
                  }} />
              ))}
              <textarea placeholder="Additional requirements..." rows={3}
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                style={{
                  width: '100%', padding: '11px 14px', borderRadius: '8px', fontSize: '13px',
                  outline: 'none', background: 'var(--color-bg)', resize: 'none',
                  border: '1px solid rgba(200,145,58,0.2)', color: 'var(--color-text)',
                  fontFamily: 'DM Sans, sans-serif',
                }} />
              <button type="submit" className="ev-submit-btn" style={{
                width: '100%', padding: '13px', borderRadius: '100px', fontSize: '13px',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
                background: 'var(--color-gold)', color: '#0A0D08', border: 'none',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 220ms ease',
              }}>
                <Send size={15} /> Send Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────────── */
export default function EventsPageClient() {
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  useReveal();

  const filters: { id: Filter; label: string }[] = [
    { id: 'all',            label: 'All' },
    { id: 'this-week',      label: 'This Week' },
    { id: 'this-month',     label: 'This Month' },
    { id: 'live-music',     label: 'Live Music' },
    { id: 'special-dining', label: 'Special Dining' },
    { id: 'private-events', label: 'Private Events' },
  ];

  const filteredEvents = events.filter((e) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'live-music') return e.type === 'live-music';
    if (activeFilter === 'special-dining') return e.type === 'special-dining';
    if (activeFilter === 'private-events') return e.type === 'private-event';
    if (activeFilter === 'this-week' || activeFilter === 'this-month') {
      const d = new Date(e.date);
      const now = new Date();
      if (activeFilter === 'this-week') {
        const week = new Date(now); week.setDate(now.getDate() + 7);
        return d >= now && d <= week;
      }
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }
    return true;
  });

  const musicEvents = events.filter((e) => e.type === 'live-music');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'upcoming',   label: 'Upcoming' },
    { id: 'birthdays',  label: 'Birthdays & Anniversaries' },
    { id: 'corporate',  label: 'Corporate' },
    { id: 'live-music', label: 'Live Music Calendar' },
  ];

  return (
    <>
      <EventStyles />
      <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section style={{ position: 'relative', height: '62vh', minHeight: '440px', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=85"
            alt="Events at The Big Tree Cafe"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,13,8,0.3) 0%, rgba(10,13,8,0.6) 60%, rgba(10,13,8,0.85) 100%)' }} />
          <div className="content-wrap" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '52px' }}>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '16px' }}>
              Events &amp; Occasions
            </p>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 400,
              fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 1.05,
              color: 'var(--color-gold-cream)', maxWidth: '760px',
            }}>
              Every evening is a celebration.
            </h1>
          </div>
          {/* Scroll cue */}
          <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', opacity: 0.45 }}>
            <ChevronDown size={18} style={{ color: 'var(--color-gold)', animation: 'ev-bounce 1.8s ease-in-out infinite' }} />
          </div>
        </section>

        {/* ── Tab Nav ───────────────────────────────────────────── */}
        <div style={{ borderBottom: '1px solid rgba(200,145,58,0.12)', position: 'sticky', top: '64px', background: 'var(--color-bg)', zIndex: 20 }}>
          <div className="content-wrap">
            <div style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    padding: '18px 28px', fontSize: '14px', fontFamily: 'DM Sans, sans-serif',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: activeTab === t.id ? 'var(--color-gold-cream)' : 'var(--color-muted)',
                    borderBottom: activeTab === t.id ? '2px solid var(--color-gold)' : '2px solid transparent',
                    transition: 'color 200ms ease, border-color 200ms ease',
                    whiteSpace: 'nowrap', fontWeight: activeTab === t.id ? 500 : 400,
                    marginBottom: '-1px',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content ───────────────────────────────────────────── */}
        <div style={{ paddingTop: '48px', paddingBottom: '80px' }}>

          {/* UPCOMING */}
          {activeTab === 'upcoming' && (
            <div className="content-wrap">
              {/* Filter Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
                {filters.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    style={{
                      padding: '8px 18px', borderRadius: '100px', fontSize: '13px',
                      fontFamily: 'DM Sans, sans-serif', cursor: 'pointer',
                      transition: 'all 200ms ease',
                      background: activeFilter === f.id ? 'var(--color-gold)' : 'transparent',
                      color: activeFilter === f.id ? '#0A0D08' : 'var(--color-muted)',
                      border: activeFilter === f.id ? '1px solid var(--color-gold)' : '1px solid rgba(200,145,58,0.18)',
                      fontWeight: activeFilter === f.id ? 500 : 400,
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Cards Grid */}
              {filteredEvents.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="ev-grid">
                  {filteredEvents.map((e, i) => (
                    <EventCard key={e.id} event={e} delay={i * 60} />
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-muted)' }}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '22px' }}>No events found for this filter.</p>
                </div>
              )}
            </div>
          )}

          {/* BIRTHDAYS */}
          {activeTab === 'birthdays' && (
            <div className="content-wrap">
              <div data-reveal style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 400ms ease, transform 400ms ease', marginBottom: '48px' }}>
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '16px' }}>
                  Celebrate
                </p>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px,3vw,48px)', fontWeight: 400, color: 'var(--color-gold-cream)', marginBottom: '12px', lineHeight: 1.1 }}>
                  Birthday &amp; Anniversary Packages
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--color-muted)', maxWidth: '520px', lineHeight: 1.7 }}>
                  Make the day unforgettable. Choose from three curated celebration packages, each designed to delight.
                </p>
              </div>
              <div className="ev-pkg-grid" style={{ paddingTop: '16px' }}>
                {birthdayPackages.map((p, i) => <PackageCard key={p.id} pkg={p} delay={i * 80} />)}
              </div>
            </div>
          )}

          {/* CORPORATE */}
          {activeTab === 'corporate' && (
            <div className="content-wrap">
              <CorporateSection />
            </div>
          )}

          {/* LIVE MUSIC */}
          {activeTab === 'live-music' && (
            <div className="content-wrap">
              <div data-reveal style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 400ms ease, transform 400ms ease', marginBottom: '40px' }}>
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '16px' }}>
                  Live Music
                </p>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px,3vw,48px)', fontWeight: 400, color: 'var(--color-gold-cream)', lineHeight: 1.1 }}>
                  Upcoming Live Performances
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="ev-grid">
                {musicEvents.map((e, i) => <EventCard key={e.id} event={e} delay={i * 60} />)}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

/* ─── Styles ─────────────────────────────────────────────────────────────────── */
function EventStyles() {
  return (
    <style>{`
      @keyframes ev-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(5px); }
      }

      /* Card image zoom on hover */
      .ev-grid .ev-card-img:hover,
      .ev-pkg-grid .ev-card-img:hover { transform: scale(1.06); }

      /* Book button hover */
      .ev-book-btn:hover {
        background: rgba(200,145,58,0.1) !important;
        transform: translateY(-1px);
      }
      a.ev-book-btn[style*="background: var(--color-gold)"]:hover {
        background: var(--color-gold-light) !important;
      }
      .ev-submit-btn:hover {
        background: var(--color-gold-light) !important;
        transform: translateY(-1px);
      }

      /* Responsive grid */
      @media (max-width: 1100px) {
        .ev-grid { grid-template-columns: repeat(3, 1fr) !important; }
      }
      @media (max-width: 800px) {
        .ev-grid { grid-template-columns: repeat(2, 1fr) !important; }
        .ev-pkg-grid { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 560px) {
        .ev-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
}
