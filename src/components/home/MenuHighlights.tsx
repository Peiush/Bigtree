'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { menuItems, type MenuItem } from '@/lib/data/menu';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DishModal from '@/components/menu/DishModal';

gsap.registerPlugin(ScrollTrigger);

export default function MenuHighlights() {
  const bestsellers = menuItems.filter((i) => i.isBestseller).slice(0, 6);
  const sectionRef = useRef<HTMLElement>(null);
  const [detailItem, setDetailItem] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);

  const getQty = (id: string) => cart.find((c) => c.id === id)?.qty ?? 0;
  const addToCart = (item: MenuItem) => setCart((prev) => {
    const ex = prev.find((c) => c.id === item.id);
    return ex ? prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c) : [...prev, { id: item.id, qty: 1 }];
  });
  const removeFromCart = (item: MenuItem) => setCart((prev) => {
    const ex = prev.find((c) => c.id === item.id);
    if (!ex || ex.qty <= 1) return prev.filter((c) => c.id !== item.id);
    return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty - 1 } : c);
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.mh-header', start: 'top 85%', once: true },
      });
      tl.fromTo('.mh-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo('.mh-heading', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' }, '-=0.3');

      // Cards stagger
      ScrollTrigger.batch('.menu-card', {
        start: 'top 90%',
        once: true,
        onEnter: (els) => gsap.fromTo(els,
          { y: 50, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out', stagger: 0.1 }
        ),
      });

      // CTA button
      gsap.fromTo('.mh-cta',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: '.mh-cta', start: 'top 92%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
    <section ref={sectionRef} className="home-sec-80" style={{ background: 'var(--color-bg-card)' }}>
      <div className="home-section-inner">
        <div className="mh-header">
          <p className="mh-label" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace', textAlign: 'center', marginBottom: '12px' }}>
            The Menu
          </p>
          <h2 className="mh-heading" style={{ fontFamily: 'Cormorant Garamond, serif', textAlign: 'center', marginBottom: '48px', fontSize: 'clamp(26px, 3.5vw, 44px)', color: 'var(--color-gold-cream)', fontWeight: 400 }}>
            What everyone orders.
          </h2>
        </div>

        <div className="menu-grid">
          {bestsellers.map((item) => (
            <div key={item.id} className="menu-card group" style={{
              borderRadius: '14px', overflow: 'hidden',
              background: 'var(--color-bg)', border: '1px solid rgba(200,145,58,0.1)',
              cursor: 'pointer',
            }} onClick={() => setDetailItem(item)}>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                <img src={item.image} alt={item.name} style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.35s ease', display: 'block',
                }} className="group-hover:scale-105" loading="lazy" />
                {item.isBestseller && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, padding: '5px 10px',
                    background: 'var(--color-gold)', color: 'var(--color-bg)',
                    fontFamily: 'DM Mono, monospace', fontSize: '8px', fontWeight: 700, letterSpacing: '0.5px',
                  }}>★ BESTSELLER</div>
                )}
                <div style={{
                  position: 'absolute', top: '10px', right: '10px', width: '16px', height: '16px',
                  borderRadius: '3px', border: `2px solid ${item.isVeg ? 'var(--color-forest)' : 'var(--color-danger)'}`,
                  background: 'rgba(10,13,8,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.isVeg ? 'var(--color-forest)' : 'var(--color-danger)' }} />
                </div>
                {/* hover hint */}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,8,4,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.25s' }} className="menu-card-detail-hint">
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,230,194,0.9)', border: '1px solid rgba(245,230,194,0.3)', padding: '6px 14px', borderRadius: '100px' }}>View details</span>
                </div>
              </div>
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text)', marginBottom: '4px' }}>{item.name}</h3>
                <p style={{
                  fontSize: '12px', color: 'var(--color-muted)', fontWeight: 300, marginBottom: '12px',
                  overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
                }}>{item.description}</p>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '22px', color: 'var(--color-gold)' }}>
                  ₹{item.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mh-cta" style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/menu" style={{
            display: 'inline-block', padding: '14px 36px', borderRadius: '100px', fontSize: '13px', fontWeight: 500,
            border: '1px solid var(--color-gold)', color: 'var(--color-gold)', textDecoration: 'none', transition: 'background 0.2s',
          }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(200,145,58,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
            View Full Menu →
          </Link>
        </div>
      </div>
    </section>

      {detailItem && (
        <DishModal
          item={detailItem}
          qty={getQty(detailItem.id)}
          onAdd={() => addToCart(detailItem)}
          onRemove={() => removeFromCart(detailItem)}
          onClose={() => setDetailItem(null)}
        />
      )}
    </>
  );
}
