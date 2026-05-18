'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { galleryItems } from '@/lib/data/gallery';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GalleryTeaser() {
  const photos = galleryItems.slice(0, 5);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.gt-header', start: 'top 85%', once: true },
      });
      tl.fromTo('.gt-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo('.gt-heading', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .fromTo('.gt-sub', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3');

      // Grid photos stagger in with scale
      ScrollTrigger.batch('.gallery-photo', {
        start: 'top 88%',
        once: true,
        onEnter: (els) => gsap.fromTo(els,
          { scale: 0.93, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1 }
        ),
      });

      // CTA
      gsap.fromTo('.gt-cta',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: '.gt-cta', start: 'top 92%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '80px 0', background: 'var(--color-bg)' }}>
      <div className="home-section-inner">
        <div className="gt-header">
          <p className="gt-label" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace', textAlign: 'center', marginBottom: '12px' }}>Gallery</p>
          <h2 className="gt-heading" style={{ fontFamily: 'Cormorant Garamond, serif', textAlign: 'center', marginBottom: '8px', fontSize: 'clamp(26px, 3.5vw, 44px)', color: 'var(--color-gold-cream)', fontWeight: 400 }}>
            As seen on 50,000 feeds.
          </h2>
          <p className="gt-sub" style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-muted)', marginBottom: '40px' }}>
            @bigtreecafegurgaon
          </p>
        </div>

        {/* Asymmetric 5-photo grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr 0.9fr', gridTemplateRows: '260px 260px', gap: '10px' }}>
          <div className="gallery-photo group" style={{ gridRow: '1 / 3', borderRadius: '14px', overflow: 'hidden', position: 'relative' }}>
            <img src={photos[0].src} alt={photos[0].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="group-hover:scale-105" loading="lazy" />
            <div className="group-hover:opacity-100" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', opacity: 0, transition: 'opacity 0.3s', borderRadius: '14px' }} />
          </div>
          <div className="gallery-photo group" style={{ borderRadius: '14px', overflow: 'hidden', position: 'relative' }}>
            <img src={photos[1].src} alt={photos[1].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="group-hover:scale-105" loading="lazy" />
          </div>
          <div className="gallery-photo group" style={{ gridRow: '1 / 3', borderRadius: '14px', overflow: 'hidden', position: 'relative' }}>
            <img src={photos[2].src} alt={photos[2].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="group-hover:scale-105" loading="lazy" />
          </div>
          <div className="gallery-photo group" style={{ borderRadius: '14px', overflow: 'hidden', position: 'relative' }}>
            <img src={photos[3].src} alt={photos[3].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="group-hover:scale-105" loading="lazy" />
          </div>
        </div>

        <div className="gt-cta" style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link href="/gallery" style={{
            display: 'inline-block', padding: '14px 36px', borderRadius: '100px', fontSize: '13px', fontWeight: 500,
            border: '1px solid var(--color-gold)', color: 'var(--color-gold)', textDecoration: 'none',
          }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(200,145,58,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
            View Full Gallery →
          </Link>
        </div>
      </div>
    </section>
  );
}
