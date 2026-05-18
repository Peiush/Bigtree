'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PrivateEventsCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle parallax on the background image
      gsap.to(imgRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Text elements stagger in
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.pe-content', start: 'top 80%', once: true },
      });
      tl.fromTo('.pe-label', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo('.pe-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.3')
        .fromTo('.pe-tags', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .fromTo('.pe-btns', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.25');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="home-sec-100" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1400&q=80"
          alt="Private celebration at The Big Tree Cafe"
          style={{ width: '100%', height: '115%', objectFit: 'cover', willChange: 'transform' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,13,8,0.72)' }} />
      </div>

      <div className="pe-content pe-inner-pad" style={{ position: 'relative', zIndex: 1, maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <p className="pe-label" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace', marginBottom: '16px' }}>
          Private Events
        </p>
        <h2 className="pe-heading" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', marginBottom: '16px', fontSize: 'clamp(28px, 4vw, 52px)', color: 'var(--color-gold-cream)', fontWeight: 400, lineHeight: 1.15 }}>
          Celebrate your next<br />occasion with us.
        </h2>
        <div className="pe-tags" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 24px', marginBottom: '36px', fontSize: '14px', color: 'rgba(232,228,216,0.7)' }}>
          <span>✦ Birthdays</span>
          <span>✦ Anniversaries</span>
          <span>✦ Corporate Outings</span>
          <span>✦ Pre-wedding Shoots</span>
        </div>
        <div className="pe-btns" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/events#packages" style={{
            display: 'inline-block', padding: '15px 36px', borderRadius: '100px', fontSize: '14px', fontWeight: 500,
            background: 'var(--color-gold)', color: 'var(--color-bg)', textDecoration: 'none', transition: 'background 0.2s',
          }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-gold-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-gold)')}>
            Book an Event
          </Link>
          <a href="https://wa.me/918183959595?text=Hi, I'd like to get a custom quote for an event"
            target="_blank" rel="noreferrer" style={{
              display: 'inline-block', padding: '15px 36px', borderRadius: '100px', fontSize: '14px', fontWeight: 500,
              border: '1px solid var(--color-gold)', color: 'var(--color-gold)', textDecoration: 'none', transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(200,145,58,0.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
            Get a Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}
