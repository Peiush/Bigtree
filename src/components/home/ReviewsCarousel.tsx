'use client';

import { useState, useEffect, useRef } from 'react';
import { reviews } from '@/lib/data/reviews';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.rc-inner',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const r = reviews[current];

  return (
    <section ref={sectionRef} style={{ padding: '80px 0', background: 'var(--color-bg-card)' }}>
      <div className="rc-inner" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
        <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace', marginBottom: '40px' }}>
          What They Say
        </p>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div style={{ fontSize: '72px', lineHeight: 1, marginBottom: '8px', opacity: 0.25, fontFamily: 'Georgia, serif', color: 'var(--color-gold)' }}>"</div>

          <div key={r.id}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '20px' }}>
              {Array(5).fill(0).map((_, i) => <span key={i} style={{ color: 'var(--color-gold)', fontSize: '16px' }}>★</span>)}
            </div>
            <blockquote style={{
              fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
              fontSize: 'clamp(18px, 2.5vw, 24px)', lineHeight: 1.6,
              color: 'var(--color-gold-cream)', marginBottom: '24px', fontWeight: 400,
            }}>
              "{r.text}"
            </blockquote>
            <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text)', marginBottom: '4px' }}>{r.name}</p>
            <p style={{ fontSize: '11px', color: 'var(--color-muted)', fontFamily: 'DM Mono, monospace' }}>{r.date} · Google Review</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Review ${i + 1}`} style={{
                width: i === current ? '24px' : '8px', height: '8px', borderRadius: '100px',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                background: i === current ? 'var(--color-gold)' : 'rgba(200,145,58,0.3)',
              }} />
            ))}
          </div>
        </div>

        <p style={{ marginTop: '32px', fontSize: '12px', color: 'var(--color-muted)' }}>
          <a href="#" style={{ color: 'var(--color-gold)', textDecoration: 'underline' }}>2,800+ reviews on Google</a>
        </p>
      </div>
    </section>
  );
}
