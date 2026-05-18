'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '50,000+', label: 'Instagram Followers' },
  { value: '4.6 ★', label: 'Google Rating' },
  { value: '2,800+', label: 'Happy Reviews' },
  { value: '#1', label: "Golf Course Road's Outdoor Cafe" },
];

export default function SocialProofStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-item',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{
      background: 'var(--color-bg-card)',
      borderTop: '1px solid rgba(200,145,58,0.12)',
      borderBottom: '1px solid rgba(200,145,58,0.12)',
      padding: '0',
    }}>
      <div className="home-section-inner" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-item" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ padding: 'clamp(14px, 2vw, 18px) clamp(16px, 3vw, 32px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textAlign: 'center', width: '100%' }}>
              <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace' }}>
                {s.value}
              </span>
              <span style={{ fontSize: '10px', color: 'var(--color-muted)', fontFamily: 'DM Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                {s.label}
              </span>
            </div>
            {i < stats.length - 1 && (
              <div className="stat-divider-v" style={{ width: '1px', height: '24px', background: 'rgba(200,145,58,0.2)', flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
