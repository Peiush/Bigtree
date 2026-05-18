'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const seatTypes = [
  { id: 'outdoor', label: 'Outdoor Garden', capacity: '2–8 guests', icon: '🌿', note: '' },
  { id: 'cabana', label: 'Private Cabana', capacity: '2–12 guests', icon: '🪔', note: '+₹500' },
  { id: 'indoor', label: 'Indoor', capacity: '2–20 guests', icon: '✨', note: '' },
];

export default function BookingWidget() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [seat, setSeat] = useState('outdoor');
  const today = new Date().toISOString().split('T')[0];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
      tl.fromTo('.bw-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo('.bw-heading', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .fromTo('.bw-sub', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .fromTo('.bw-form', { y: 40, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }, '-=0.25');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: 'var(--color-bg-card)', padding: '80px 0' }}>
      <div className="home-section-inner" style={{ maxWidth: '960px' }}>
        <p className="bw-label" style={{
          fontSize: '10px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase',
          color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace', textAlign: 'center', marginBottom: '12px',
        }}>Reservations</p>
        <h2 className="bw-heading" style={{
          fontFamily: 'Cormorant Garamond, serif', textAlign: 'center', marginBottom: '8px',
          fontSize: 'clamp(30px, 3.5vw, 44px)', color: 'var(--color-gold-cream)', fontWeight: 400,
        }}>Book Your Evening</h2>
        <p className="bw-sub" style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-muted)', marginBottom: '40px', fontWeight: 300 }}>
          Reserve your table in under 2 minutes. Instant confirmation.
        </p>

        <div className="bw-form" style={{
          background: 'var(--color-bg)', borderRadius: '20px',
          border: '1px solid rgba(200,145,58,0.15)', padding: '40px',
        }}>
          {/* Row 1: Date + Guests */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace', marginBottom: '10px' }}>
                📅 Select Date
              </label>
              <input type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)}
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', outline: 'none',
                  background: 'var(--color-bg-card)', border: '1px solid rgba(200,145,58,0.25)',
                  color: 'var(--color-text)', colorScheme: 'dark', boxSizing: 'border-box',
                }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace', marginBottom: '10px' }}>
                👥 Number of Guests
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '50px' }}>
                <button onClick={() => setGuests(Math.max(1, guests - 1))} style={{
                  width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(200,145,58,0.35)',
                  color: 'var(--color-gold)', background: 'transparent', fontSize: '20px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>−</button>
                <span style={{ fontSize: '28px', fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-text)', minWidth: '32px', textAlign: 'center' }}>{guests}</span>
                <button onClick={() => setGuests(Math.min(20, guests + 1))} style={{
                  width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(200,145,58,0.35)',
                  color: 'var(--color-gold)', background: 'transparent', fontSize: '20px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>+</button>
                <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>people</span>
              </div>
            </div>
          </div>

          {/* Seat type */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace', marginBottom: '16px' }}>
              📍 Seating Preference
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {seatTypes.map((s) => (
                <button key={s.id} onClick={() => setSeat(s.id)} style={{
                  padding: '18px 16px', borderRadius: '12px', textAlign: 'left', cursor: 'pointer',
                  border: seat === s.id ? '2px solid var(--color-gold)' : '1px solid rgba(200,145,58,0.2)',
                  background: seat === s.id ? 'rgba(200,145,58,0.08)' : 'var(--color-bg-card)',
                  position: 'relative', transition: 'all 0.2s',
                }}>
                  {seat === s.id && (
                    <span style={{ position: 'absolute', top: '10px', right: '10px', color: 'var(--color-gold)', fontSize: '13px' }}>✓</span>
                  )}
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text)', marginBottom: '4px' }}>{s.label}</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-muted)' }}>
                    {s.capacity}
                    {s.note && <span style={{ color: 'var(--color-gold)', marginLeft: '4px' }}>{s.note}</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              const params = new URLSearchParams({ date, guests: guests.toString(), seat });
              router.push(`/reserve?${params}`);
            }}
            style={{
              width: '100%', padding: '16px', borderRadius: '100px', fontSize: '14px', fontWeight: 500,
              background: date ? 'var(--color-gold)' : 'rgba(200,145,58,0.35)', color: 'var(--color-bg)',
              border: 'none', cursor: date ? 'pointer' : 'not-allowed', transition: 'background 0.2s', letterSpacing: '0.5px',
            }}
            onMouseEnter={(e) => { if (date) e.currentTarget.style.background = 'var(--color-gold-light)'; }}
            onMouseLeave={(e) => { if (date) e.currentTarget.style.background = 'var(--color-gold)'; }}>
            Check Availability →
          </button>
        </div>
      </div>
    </section>
  );
}
