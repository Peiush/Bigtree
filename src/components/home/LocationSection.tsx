'use client';

import { useEffect, useRef } from 'react';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      const headerTl = gsap.timeline({
        scrollTrigger: { trigger: '.loc-header', start: 'top 85%', once: true },
      });
      headerTl
        .fromTo('.loc-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo('.loc-heading', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' }, '-=0.3');

      // Map slides from left
      gsap.fromTo('.loc-map',
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.loc-grid', start: 'top 80%', once: true },
        }
      );

      // Info items stagger from right
      gsap.fromTo('.loc-info-item',
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.65, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.loc-grid', start: 'top 80%', once: true },
          delay: 0.15,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '80px 0', background: 'var(--color-bg-card)' }}>
      <div className="home-section-inner">
        <div className="loc-header">
          <p className="loc-label" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace', textAlign: 'center', marginBottom: '12px' }}>
            Find Us
          </p>
          <h2 className="loc-heading" style={{ fontFamily: 'Cormorant Garamond, serif', textAlign: 'center', marginBottom: '48px', fontSize: 'clamp(26px, 3.5vw, 44px)', color: 'var(--color-gold-cream)', fontWeight: 400 }}>
            Come find us under the trees.
          </h2>
        </div>

        <div className="loc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          {/* Map */}
          <div className="loc-map" style={{ borderRadius: '16px', overflow: 'hidden', height: '400px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.1234!2d77.0938!3d28.4301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI1JzQ4LjQiTiA3N8KwMDUnMzcuNyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="The Big Tree Cafe location"
            />
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { icon: <MapPin size={18} />, title: 'Address', content: 'Pillar 174, Golf Course Road, Opposite Rapid Metro, Sector 53, Gurugram, Haryana 122011' },
              { icon: <Clock size={18} />, title: 'Timings', content: 'Mon–Sun · Lunch: 12:00 PM – 4:00 PM\nMon–Sun · Dinner: 6:00 PM – 11:30 PM' },
              { icon: <Phone size={18} />, title: 'Phone', content: '+91 818 395 9595' },
            ].map((item) => (
              <div key={item.title} className="loc-info-item" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(200,145,58,0.12)', border: '1px solid rgba(200,145,58,0.25)', color: 'var(--color-gold)',
                }}>{item.icon}</div>
                <div>
                  <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace', marginBottom: '6px' }}>{item.title}</p>
                  <p style={{ fontSize: '13px', color: 'var(--color-muted)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{item.content}</p>
                </div>
              </div>
            ))}

            <a href="https://wa.me/918183959595" target="_blank" rel="noreferrer"
              className="loc-info-item"
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderRadius: '12px',
                background: 'rgba(45,106,79,0.12)', border: '1px solid rgba(45,106,79,0.3)',
                color: '#4ADE80', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(45,106,79,0.22)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(45,106,79,0.12)')}>
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>

            <div className="loc-info-item" style={{
              padding: '14px 16px', borderRadius: '12px', fontSize: '13px',
              background: 'var(--color-bg)', border: '1px solid rgba(200,145,58,0.1)', color: 'var(--color-muted)',
            }}>
              🚗 12 minutes from Cyber Hub · Valet parking available
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
