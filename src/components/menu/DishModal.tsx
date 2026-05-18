'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Clock, Users, Flame, Leaf } from 'lucide-react';
import type { MenuItem } from '@/lib/data/menu';

const SPICE_MAP = {
  mild: { label: 'Mild', dots: 1, color: '#7db87d' },
  medium: { label: 'Medium', dots: 2, color: '#e8a84a' },
  hot: { label: 'Hot', dots: 3, color: '#e85a4a' },
  'extra-hot': { label: 'Extra Hot', dots: 4, color: '#c0392b' },
};

interface Props {
  item: MenuItem;
  onClose: () => void;
  onAdd: () => void;
  onRemove: () => void;
  qty: number;
}

export default function DishModal({ item, onClose, onAdd, onRemove, qty }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mobile = window.innerWidth < 640;
    const tl = gsap.timeline();
    tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      .fromTo(drawerRef.current,
        mobile ? { y: '100%' } : { x: '100%' },
        mobile ? { y: '0%', duration: 0.45, ease: 'power3.out' } : { x: '0%', duration: 0.42, ease: 'power3.out' },
        '-=0.15'
      )
      .fromTo('.dish-modal-section',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' },
        '-=0.2'
      );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClose() {
    const mobile = window.innerWidth < 640;
    const tl = gsap.timeline({ onComplete: onClose });
    if (mobile) {
      tl.to(drawerRef.current, { y: '100%', duration: 0.32, ease: 'power2.in' });
    } else {
      tl.to(drawerRef.current, { x: '100%', duration: 0.32, ease: 'power2.in' });
    }
    tl.to(backdropRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.15');
  }

  const spice = item.spiceLevel ? SPICE_MAP[item.spiceLevel] : null;

  return (
    <div className="dish-modal-outer" style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', justifyContent: 'flex-end' }}>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(2px)' }}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div ref={drawerRef} className="dish-modal-drawer" style={{
        position: 'relative', width: '100%', maxWidth: '520px',
        background: 'var(--color-bg-card)', display: 'flex', flexDirection: 'column',
        borderLeft: '1px solid rgba(200,145,58,0.15)', overflowY: 'auto',
      }}>

        {/* Hero image */}
        <div style={{ position: 'relative', height: '280px', flexShrink: 0, overflow: 'hidden' }}>
          <img
            src={item.image.replace('w=400', 'w=800')}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(5,8,4,0.2) 0%, rgba(5,8,4,0.75) 100%)',
          }} />
          {/* Close button */}
          <button onClick={handleClose} style={{
            position: 'absolute', top: '16px', right: '16px',
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(10,13,8,0.7)', border: '1px solid rgba(200,145,58,0.3)',
            color: 'var(--color-text)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}>
            <X size={16} />
          </button>
          {/* Badges */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '6px' }}>
            {item.isBestseller && (
              <span style={{ padding: '4px 10px', background: 'var(--color-gold)', color: '#0A0D08', fontFamily: 'DM Mono, monospace', fontSize: '8px', fontWeight: 700, letterSpacing: '0.5px', borderRadius: '3px' }}>★ BESTSELLER</span>
            )}
            {item.isChefPick && !item.isBestseller && (
              <span style={{ padding: '4px 10px', background: 'rgba(30,42,24,0.9)', color: 'var(--color-gold-light)', border: '1px solid rgba(200,145,58,0.4)', fontFamily: 'DM Mono, monospace', fontSize: '8px', fontWeight: 700, letterSpacing: '0.5px', borderRadius: '3px' }}>👨‍🍳 CHEF'S PICK</span>
            )}
          </div>
          {/* Name over image */}
          <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '2px', border: `2px solid ${item.isVeg ? '#7db87d' : '#e85a4a'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.isVeg ? '#7db87d' : '#e85a4a' }} />
              </div>
              <span style={{ fontSize: '11px', color: item.isVeg ? '#7db87d' : '#e85a4a', fontFamily: 'DM Mono, monospace', letterSpacing: '1px' }}>{item.isVeg ? 'VEGETARIAN' : 'NON-VEG'}</span>
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 400, color: 'var(--color-gold-cream)', lineHeight: 1.15 }}>{item.name}</h2>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Quick stats */}
          <div className="dish-modal-section" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Stat icon={<Clock size={14} />} label="Prep time" value={item.prepTime} />
            <Stat icon={<Users size={14} />} label="Serves" value={`${item.serves} ${item.serves === 1 ? 'person' : 'people'}`} />
            {item.calories && <Stat icon={<Flame size={14} />} label="Calories" value={`${item.calories} kcal`} />}
            {item.isVeg && <Stat icon={<Leaf size={14} />} label="Diet" value="Plant-based" green />}
          </div>

          {/* Description */}
          <div className="dish-modal-section">
            <SectionLabel>About this dish</SectionLabel>
            <p style={{ fontSize: '14px', color: 'var(--color-text)', lineHeight: 1.7, opacity: 0.85 }}>{item.description}</p>
            {item.story && (
              <p style={{ marginTop: '10px', fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.7, fontStyle: 'italic', borderLeft: '2px solid rgba(200,145,58,0.3)', paddingLeft: '12px' }}>{item.story}</p>
            )}
          </div>

          {/* Ingredients */}
          <div className="dish-modal-section">
            <SectionLabel>Ingredients</SectionLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {item.ingredients.map((ing) => (
                <span key={ing} style={{
                  padding: '5px 12px', borderRadius: '100px',
                  background: 'rgba(200,145,58,0.08)', border: '1px solid rgba(200,145,58,0.15)',
                  fontSize: '12px', color: 'var(--color-text)', lineHeight: 1,
                }}>{ing}</span>
              ))}
            </div>
          </div>

          {/* Spice level */}
          {spice && (
            <div className="dish-modal-section">
              <SectionLabel>Spice level</SectionLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4].map((d) => (
                    <div key={d} style={{
                      width: '10px', height: '10px', borderRadius: '50%',
                      background: d <= spice.dots ? spice.color : 'rgba(200,145,58,0.12)',
                      transition: 'background 0.2s',
                    }} />
                  ))}
                </div>
                <span style={{ fontSize: '13px', color: 'var(--color-muted)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.5px' }}>{spice.label}</span>
              </div>
            </div>
          )}

          {/* Allergens */}
          {item.allergens.length > 0 && (
            <div className="dish-modal-section" style={{ padding: '14px', borderRadius: '10px', background: 'rgba(200,145,58,0.05)', border: '1px solid rgba(200,145,58,0.12)' }}>
              <p style={{ fontSize: '11px', fontFamily: 'DM Mono, monospace', color: 'var(--color-gold)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>⚠ Allergens</p>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.6 }}>{item.allergens.join(' · ')}</p>
            </div>
          )}

        </div>

        {/* Footer — price + add to cart */}
        <div style={{
          position: 'sticky', bottom: 0, padding: '16px 24px',
          background: 'var(--color-bg-card)',
          borderTop: '1px solid rgba(200,145,58,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '16px',
        }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '28px', color: 'var(--color-gold)' }}>₹{item.price}</span>
          {qty === 0 ? (
            <button onClick={onAdd} style={{
              flex: 1, maxWidth: '200px', padding: '13px 28px', borderRadius: '100px',
              border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500,
              fontFamily: 'DM Sans, sans-serif', background: 'var(--color-gold)', color: '#0A0D08',
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(200,145,58,0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Add to order
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={onRemove} style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid rgba(200,145,58,0.35)', background: 'transparent', color: 'var(--color-gold)', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--color-text)', minWidth: '20px', textAlign: 'center' }}>{qty}</span>
              <button onClick={onAdd} style={{ width: '38px', height: '38px', borderRadius: '50%', border: 'none', background: 'var(--color-gold)', color: '#0A0D08', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '10px' }}>{children}</p>
  );
}

function Stat({ icon, label, value, green }: { icon: React.ReactNode; label: string; value: string; green?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: '8px 14px', borderRadius: '10px',
      background: green ? 'rgba(125,184,125,0.08)' : 'rgba(200,145,58,0.07)',
      border: `1px solid ${green ? 'rgba(125,184,125,0.2)' : 'rgba(200,145,58,0.15)'}`,
    }}>
      <span style={{ color: green ? '#7db87d' : 'var(--color-gold)', display: 'flex' }}>{icon}</span>
      <div>
        <p style={{ fontSize: '10px', color: 'var(--color-muted)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.5px', lineHeight: 1 }}>{label}</p>
        <p style={{ fontSize: '13px', color: 'var(--color-text)', fontWeight: 500, marginTop: '2px', lineHeight: 1 }}>{value}</p>
      </div>
    </div>
  );
}
