'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Ticket, Music } from 'lucide-react';
import type { Event } from '@/lib/data/events';

gsap.registerPlugin(ScrollTrigger);

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  'live-music':     { label: 'Live Music',      color: '#C8913A', bg: 'rgba(200,145,58,0.12)' },
  'special-dining': { label: 'Special Dining',  color: '#7db87d', bg: 'rgba(125,184,125,0.12)' },
  'private-event':  { label: 'Private Event',   color: '#8A8070', bg: 'rgba(138,128,112,0.12)' },
};

const EXPECT_ITEMS: Record<string, { icon: string; title: string; desc: string }[]> = {
  'live-music': [
    { icon: '🎵', title: 'Live Performance', desc: 'Acoustic sets from the headline artist across the evening.' },
    { icon: '🌿', title: 'Garden Seating', desc: 'Tables under fairy lights in the open garden — cabanas available.' },
    { icon: '🍽️', title: 'Full Menu', desc: 'Our complete food and cocktail menu served throughout.' },
  ],
  'special-dining': [
    { icon: '🍷', title: 'Curated Courses', desc: 'Each plate designed around a single seasonal ingredient or theme.' },
    { icon: '🌿', title: 'Private Setting', desc: 'Intimate cabana arrangement for the full evening.' },
    { icon: '👨‍🍳', title: "Chef's Narrative", desc: 'Chef Riya introduces each course personally.' },
  ],
  'private-event': [
    { icon: '🎉', title: 'Exclusive Venue', desc: 'Dedicated garden zones closed to outside guests.' },
    { icon: '🌿', title: 'Custom Setup', desc: 'Decor, lighting and menu tailored to the occasion.' },
    { icon: '🎶', title: 'Music & Ambience', desc: 'Live or curated background music for the evening.' },
  ],
};

interface Props { event: Event }

export default function EventDetailPage({ event }: Props) {
  const pageRef    = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroRef    = useRef<HTMLElement>(null);

  const date     = new Date(event.date);
  const isSoldOut = event.cabanaCount === 0;
  const isLow     = event.cabanaCount > 0 && event.cabanaCount <= 3;
  const typeConf  = TYPE_CONFIG[event.type] ?? TYPE_CONFIG['live-music'];
  const expectItems = EXPECT_ITEMS[event.type] ?? EXPECT_ITEMS['live-music'];

  const longDate = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const shortDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  /* ── Animations ──────────────────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Hero parallax — image drifts up as user scrolls
      gsap.to(heroImgRef.current, {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4,
        },
      });

      // Hero entrance stagger
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo('.ev-badge',
        { y: -20, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.8)' }
      )
        .fromTo('.ev-date-line',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.25'
        )
        .fromTo('.ev-hero-title',
          { y: 60, opacity: 0, skewY: 1.5 },
          { y: 0, opacity: 1, skewY: 0, duration: 0.9, ease: 'power4.out' }, '-=0.3'
        )
        .fromTo('.ev-hero-artist',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, '-=0.4'
        )
        .fromTo('.ev-scroll-cue',
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2'
        );

      // Decorative line draw
      gsap.fromTo('.ev-deco-line',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 1.2, ease: 'power3.out', delay: 0.8,
        }
      );

      // Content sections scroll reveal
      gsap.fromTo('.ev-section',
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.ev-content', start: 'top 82%', once: true },
        }
      );

      // Booking card slide in
      gsap.fromTo('.ev-booking-card',
        { x: 48, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: '.ev-booking-card', start: 'top 85%', once: true },
        }
      );

      // Expect items stagger
      gsap.fromTo('.ev-expect-item',
        { y: 32, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.ev-expect-grid', start: 'top 86%', once: true },
        }
      );

      // Gold orb subtle float
      gsap.to('.ev-gold-orb', {
        y: -18, x: 10, duration: 5.5, ease: 'sine.inOut', repeat: -1, yoyo: true,
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ position: 'relative', height: '100svh', minHeight: '600px', overflow: 'hidden' }}>

        {/* Background image */}
        <img
          ref={heroImgRef}
          src={event.image.replace('w=700', 'w=1600')}
          alt={event.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '115%', objectFit: 'cover', willChange: 'transform' }}
        />

        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,13,8,0.3) 0%, rgba(10,13,8,0.15) 30%, rgba(10,13,8,0.7) 65%, rgba(10,13,8,0.97) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(10,13,8,0.25) 0%, transparent 100%)' }} />

        {/* Floating gold orb decoration */}
        <div className="ev-gold-orb" style={{ position: 'absolute', top: '20%', right: '8%', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,145,58,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Back link */}
        <Link href="/events" style={{
          position: 'absolute', top: '88px', left: 'clamp(20px, 4vw, 48px)', zIndex: 10,
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontSize: '12px', fontFamily: 'DM Mono, monospace', letterSpacing: '1.5px',
          color: 'rgba(245,230,194,0.65)', textDecoration: 'none', textTransform: 'uppercase',
          transition: 'color 0.2s',
        }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,230,194,0.65)')}>
          <ArrowLeft size={14} /> All Events
        </Link>

        {/* Hero content — bottom left */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: 'clamp(32px, 5vw, 72px) clamp(20px, 5vw, 72px) clamp(48px, 6vw, 80px)',
        }}>
          {/* Decorative line */}
          <div className="ev-deco-line" style={{ height: '1px', width: '80px', background: 'linear-gradient(to right, var(--color-gold), transparent)', marginBottom: '24px' }} />

          {/* Type badge */}
          <span className="ev-badge" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '5px 14px', borderRadius: '100px', marginBottom: '20px',
            background: typeConf.bg,
            border: `1px solid ${typeConf.color}40`,
            color: typeConf.color,
            fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
          }}>
            {event.type === 'live-music' && <Music size={10} />}
            {typeConf.label}
          </span>

          {/* Date line */}
          <p className="ev-date-line" style={{
            fontFamily: 'DM Mono, monospace', fontSize: 'clamp(10px, 1.5vw, 12px)',
            letterSpacing: '2.5px', textTransform: 'uppercase',
            color: 'rgba(200,145,58,0.85)', marginBottom: '16px',
          }}>
            {longDate} · {event.time}
          </p>

          {/* Title */}
          <h1 className="ev-hero-title" style={{
            fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 1.06,
            color: 'var(--color-gold-cream)', marginBottom: '16px',
            maxWidth: '820px',
            textShadow: '0 2px 32px rgba(0,0,0,0.6)',
          }}>
            {event.title}
          </h1>

          {/* Artist / genre */}
          {event.artist && (
            <p className="ev-hero-artist" style={{
              fontSize: 'clamp(13px, 1.6vw, 15px)', color: 'rgba(232,228,216,0.6)',
              fontWeight: 300, letterSpacing: '0.04em',
            }}>
              {event.artist} · {event.genre}
            </p>
          )}
        </div>

        {/* Scroll cue */}
        <div className="ev-scroll-cue" style={{ position: 'absolute', bottom: '24px', right: 'clamp(20px, 4vw, 48px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'rgba(200,145,58,0.5)', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>scroll</span>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(200,145,58,0.5), transparent)' }} />
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <div className="ev-content" style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(48px, 6vw, 96px) clamp(20px, 5vw, 48px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(280px, 360px)', gap: 'clamp(40px, 5vw, 80px)', alignItems: 'start' }} className="ev-content-grid">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>

            {/* About */}
            <div className="ev-section">
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '16px' }}>About this event</p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 400, lineHeight: 1.65, color: 'var(--color-gold-cream)', fontStyle: 'italic', marginBottom: '20px' }}>
                {event.description}
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--color-muted)', maxWidth: '600px' }}>
                {event.type === 'live-music'
                  ? `An evening under the fairy lights at The Big Tree. ${event.artist ? `${event.artist} take the stage` : 'Live performers take the stage'} for an intimate outdoor set — the kind you remember. Cabana seating fills early; book while spaces remain.`
                  : event.type === 'special-dining'
                  ? `A curated dinner experience inside The Big Tree's garden. Chef Riya Khanna designs each course around the season's finest ingredients. Paired beverages available. Cabana seating is limited and books out quickly.`
                  : `A private celebration in the garden. Exclusive access to our cabana cluster, dedicated staff, and a personalised setup designed around the occasion.`}
              </p>
            </div>

            {/* What to expect */}
            <div className="ev-section">
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '24px' }}>What to expect</p>
              <div className="ev-expect-grid" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {expectItems.map((item, i) => (
                  <div key={i} className="ev-expect-item" style={{
                    display: 'flex', alignItems: 'flex-start', gap: '20px',
                    padding: '20px 24px', borderRadius: '14px',
                    background: 'var(--color-bg-card)',
                    border: '1px solid rgba(200,145,58,0.1)',
                    transition: 'border-color 0.25s, background 0.25s',
                  }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,145,58,0.3)';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(20,26,16,0.9)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,145,58,0.1)';
                      (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-card)';
                    }}>
                    {/* Icon circle */}
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(200,145,58,0.1)', border: '1px solid rgba(200,145,58,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '18px' }}>{item.icon}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text)', marginBottom: '4px' }}>{item.title}</p>
                      <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details pills */}
            <div className="ev-section">
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '16px' }}>Event details</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {[
                  { icon: <Calendar size={13} />, text: shortDate },
                  { icon: <Clock size={13} />, text: event.time },
                  { icon: <MapPin size={13} />, text: 'Golf Course Road, Gurugram' },
                  { icon: <Users size={13} />, text: `${event.cabanaCount > 0 ? event.cabanaCount + ' cabanas left' : 'Fully booked'}` },
                  ...(event.artist ? [{ icon: <Music size={13} />, text: `${event.artist} · ${event.genre}` }] : []),
                ].map((d, i) => (
                  <div key={i} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '8px 16px', borderRadius: '100px',
                    background: 'var(--color-bg-card)',
                    border: '1px solid rgba(200,145,58,0.15)',
                    fontSize: '12px', color: 'var(--color-muted)',
                    fontFamily: 'DM Mono, monospace', letterSpacing: '0.03em',
                  }}>
                    <span style={{ color: 'var(--color-gold)', display: 'flex' }}>{d.icon}</span>
                    {d.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Venue */}
            <div className="ev-section" style={{ padding: '28px', borderRadius: '16px', background: 'var(--color-bg-card)', border: '1px solid rgba(200,145,58,0.1)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '160px', height: '160px', background: 'radial-gradient(circle, rgba(200,145,58,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '12px' }}>Venue</p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: 'var(--color-gold-cream)', marginBottom: '6px' }}>The Big Tree Cafe</p>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', marginBottom: '16px', lineHeight: 1.6 }}>
                Pillar 174, Golf Course Road,<br />
                Opposite Rapid Metro, Gurugram · 122011
              </p>
              <a
                href="https://maps.google.com/?q=The+Big+Tree+Cafe+Gurgaon"
                target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '11px', fontFamily: 'DM Mono, monospace', letterSpacing: '1.5px',
                  color: 'var(--color-gold)', textDecoration: 'none', textTransform: 'uppercase',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                <MapPin size={11} /> Get directions
              </a>
            </div>

          </div>

          {/* ── RIGHT COLUMN — booking card ─────────────────────────────── */}
          <div style={{ position: 'sticky', top: '88px' }}>
            <div className="ev-booking-card" style={{
              borderRadius: '20px', overflow: 'hidden',
              background: 'var(--color-bg-card)',
              border: '1px solid rgba(200,145,58,0.18)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
            }}>
              {/* Card image strip */}
              <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                <img src={event.image.replace('w=700', 'w=600')} alt={event.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,13,8,0.3) 0%, rgba(10,13,8,0.75) 100%)' }} />
                <span style={{
                  position: 'absolute', bottom: '14px', left: '16px',
                  fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
                  fontSize: '18px', color: 'var(--color-gold-cream)', lineHeight: 1.15,
                  maxWidth: '90%',
                }}>
                  {event.title}
                </span>
              </div>

              <div style={{ padding: '24px' }}>
                {/* Date + time */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ flex: 1, padding: '12px', borderRadius: '10px', background: 'rgba(200,145,58,0.07)', border: '1px solid rgba(200,145,58,0.12)', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '4px' }}>Date</p>
                    <p style={{ fontSize: '13px', color: 'var(--color-text)', fontWeight: 500 }}>{shortDate}</p>
                  </div>
                  <div style={{ flex: 1, padding: '12px', borderRadius: '10px', background: 'rgba(200,145,58,0.07)', border: '1px solid rgba(200,145,58,0.12)', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '4px' }}>Time</p>
                    <p style={{ fontSize: '13px', color: 'var(--color-text)', fontWeight: 500 }}>{event.time}</p>
                  </div>
                </div>

                {/* Price */}
                {event.price !== null && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', padding: '14px 16px', borderRadius: '10px', background: 'rgba(200,145,58,0.05)', border: '1px solid rgba(200,145,58,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Ticket size={14} style={{ color: 'var(--color-gold)' }} />
                      <span style={{ fontSize: '12px', color: 'var(--color-muted)', fontFamily: 'DM Mono, monospace' }}>Cover charge</span>
                    </div>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 600, color: 'var(--color-gold)' }}>
                      ₹{event.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                {event.price === null && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', padding: '14px 16px', borderRadius: '10px', background: 'rgba(61,107,53,0.08)', border: '1px solid rgba(61,107,53,0.2)' }}>
                    <span style={{ fontSize: '12px', color: 'var(--color-muted)', fontFamily: 'DM Mono, monospace' }}>Cover charge</span>
                    <span style={{ fontSize: '13px', color: '#7db87d', fontFamily: 'DM Mono, monospace', fontWeight: 600 }}>No Cover</span>
                  </div>
                )}

                {/* Availability */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', padding: '12px 16px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid rgba(200,145,58,0.08)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-muted)', fontFamily: 'DM Mono, monospace' }}>Availability</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: '7px', height: '7px', borderRadius: '50%',
                      background: isSoldOut ? '#C84040' : isLow ? '#e8a84a' : '#3D9E5F',
                      boxShadow: isSoldOut ? '0 0 6px rgba(200,64,64,0.5)' : isLow ? '0 0 6px rgba(232,168,74,0.5)' : '0 0 6px rgba(61,158,95,0.5)',
                    }} />
                    <span style={{
                      fontSize: '12px', fontFamily: 'DM Mono, monospace',
                      color: isSoldOut ? '#C84040' : isLow ? '#e8a84a' : '#3D9E5F',
                    }}>
                      {isSoldOut ? 'Fully booked' : `${event.cabanaCount} cabana${event.cabanaCount !== 1 ? 's' : ''} left`}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                {isSoldOut ? (
                  <button disabled style={{
                    width: '100%', padding: '15px', borderRadius: '100px', fontSize: '13px',
                    fontFamily: 'DM Sans, sans-serif', background: 'rgba(200,145,58,0.08)',
                    border: '1px solid rgba(200,145,58,0.15)', color: 'var(--color-muted)', cursor: 'not-allowed',
                  }}>
                    Fully Booked
                  </button>
                ) : (
                  <Link
                    href={`/reserve?event=${event.slug}&occasion=${event.type === 'live-music' ? 'Regular+dining' : event.type === 'special-dining' ? 'Date+Night' : 'Other'}`}
                    style={{
                      display: 'block', width: '100%', padding: '15px', borderRadius: '100px',
                      textAlign: 'center', textDecoration: 'none',
                      fontSize: '13px', fontWeight: 500, fontFamily: 'DM Sans, sans-serif',
                      letterSpacing: '0.04em',
                      background: 'var(--color-gold)', color: '#0A0D08',
                      transition: 'all 0.22s ease',
                      boxShadow: '0 6px 24px rgba(200,145,58,0.25)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--color-gold-light)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 32px rgba(200,145,58,0.4)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--color-gold)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(200,145,58,0.25)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}>
                    Book a Table for This Event →
                  </Link>
                )}

                {/* Fine print */}
                <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '11px', color: 'var(--color-muted)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.5px' }}>
                  Instant confirmation · Cancel 24h before
                </p>
              </div>
            </div>

            {/* Share nudge */}
            <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '11px', color: 'var(--color-muted)', fontFamily: 'DM Mono, monospace', letterSpacing: '1px' }}>
              GOLF COURSE ROAD · GURUGRAM
            </p>
          </div>

        </div>
      </div>

      {/* Responsive grid CSS */}
      <style>{`
        .ev-content-grid {
          grid-template-columns: 1fr minmax(280px, 360px);
        }
        @media (max-width: 860px) {
          .ev-content-grid {
            grid-template-columns: 1fr !important;
          }
          .ev-booking-card {
            position: static !important;
          }
        }
      `}</style>

    </div>
  );
}
