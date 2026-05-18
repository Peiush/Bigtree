'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    href: '/gallery',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80',
    label: 'Private Cabanas',
    desc: 'Intimate open-air dining under fairy lights',
  },
  {
    href: '/events',
    image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&q=80',
    label: 'Live Music',
    desc: 'Acoustic, jazz, and Bollywood nights every weekend',
  },
  {
    href: '/menu',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    label: 'Crafted Cuisine',
    desc: 'Continental, North Indian & Italian masterpieces',
  },
];

export default function ExperiencePreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade up
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.exp-header', start: 'top 85%', once: true },
      });
      tl.fromTo('.exp-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo('.exp-heading', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' }, '-=0.3');

      // Cards stagger in
      ScrollTrigger.batch('.exp-card', {
        start: 'top 88%',
        once: true,
        onEnter: (els) => gsap.fromTo(els,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', stagger: 0.14 }
        ),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="home-sec-80" style={{ background: 'var(--color-bg)' }}>
      <div className="home-section-inner">
        <div className="exp-header">
          <p className="exp-label" style={{
            fontSize: '10px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase',
            color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace', textAlign: 'center', marginBottom: '12px',
          }}>The Experience</p>
          <h2 className="exp-heading" style={{
            fontFamily: 'Cormorant Garamond, serif', textAlign: 'center', marginBottom: '48px',
            fontSize: 'clamp(30px, 3.5vw, 46px)', color: 'var(--color-gold-cream)', fontWeight: 400,
          }}>
            An experience unlike any other.
          </h2>
        </div>

        <div className="exp-cards-grid">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="exp-card group" style={{
              position: 'relative', borderRadius: '16px', overflow: 'hidden',
              aspectRatio: '3/4', display: 'block', cursor: 'pointer', textDecoration: 'none',
            }}>
              <img src={c.image} alt={c.label} style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transition: 'transform 0.6s ease', display: 'block',
              }} className="group-hover:scale-105" />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(5,7,4,0.96) 0%, rgba(5,7,4,0.65) 40%, rgba(5,7,4,0.1) 70%, transparent 100%)',
              }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 24px' }}>
                <p style={{
                  fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase',
                  color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace', marginBottom: '8px',
                  textShadow: '0 1px 6px rgba(0,0,0,0.8)',
                }}>Discover</p>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
                  fontSize: '28px', color: 'var(--color-gold-cream)', marginBottom: '6px', fontWeight: 400,
                  textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                }}>{c.label}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(232,228,216,0.9)', fontWeight: 400, textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
