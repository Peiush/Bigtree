'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { menuItems, categories, type MenuItem } from '@/lib/data/menu';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import DishModal from './DishModal';

gsap.registerPlugin(ScrollTrigger);

interface CartItem { item: MenuItem; qty: number; }

function MenuCard({ item, onAdd, onRemove, qty, onOpenDetail }: { item: MenuItem; onAdd: () => void; onRemove: () => void; qty: number; onOpenDetail: () => void }) {
  return (
    <div className="menu-card group" style={{
      borderRadius: '14px', overflow: 'hidden',
      background: 'var(--color-bg-card)', border: '1px solid rgba(200,145,58,0.1)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Clickable image area */}
      <div
        onClick={onOpenDetail}
        style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer' }}
      >
        <img src={item.image} alt={item.name} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.4s ease', display: 'block',
        }} className="group-hover:scale-105" loading="lazy" />
        {item.isBestseller && (
          <div style={{ position: 'absolute', top: 0, left: 0, padding: '5px 10px', background: 'var(--color-gold)', color: 'var(--color-bg)', fontFamily: 'DM Mono, monospace', fontSize: '8px', fontWeight: 700, letterSpacing: '0.5px' }}>★ BESTSELLER</div>
        )}
        {item.isChefPick && !item.isBestseller && (
          <div style={{ position: 'absolute', top: 0, left: 0, padding: '5px 10px', background: 'rgba(30,42,24,0.9)', color: 'var(--color-gold-light)', border: '1px solid rgba(200,145,58,0.3)', fontFamily: 'DM Mono, monospace', fontSize: '8px', fontWeight: 700, letterSpacing: '0.5px' }}>👨‍🍳 CHEF&apos;S PICK</div>
        )}
        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '18px', height: '18px', borderRadius: '3px', border: `2px solid ${item.isVeg ? 'var(--color-forest)' : 'var(--color-danger)'}`, background: 'rgba(10,13,8,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: item.isVeg ? 'var(--color-forest)' : 'var(--color-danger)' }} />
        </div>
        {/* "View details" hint on hover */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,8,4,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.25s' }}
          className="menu-card-detail-hint">
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(245,230,194,0.9)', border: '1px solid rgba(245,230,194,0.3)', padding: '6px 14px', borderRadius: '100px' }}>View details</span>
        </div>
      </div>
      <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Clickable name */}
        <h3
          onClick={onOpenDetail}
          style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text)', marginBottom: '6px', cursor: 'pointer' }}
        >{item.name}</h3>
        <p style={{ fontSize: '12px', color: 'var(--color-muted)', fontWeight: 300, flex: 1, marginBottom: '14px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>{item.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '22px', color: 'var(--color-gold)' }}>₹{item.price}</span>
          {qty === 0 ? (
            <button onClick={onAdd} style={{ width: '34px', height: '34px', borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'var(--color-gold)', color: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.12)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
              <Plus size={16} />
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button onClick={onRemove} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid rgba(200,145,58,0.3)', background: 'transparent', color: 'var(--color-gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} /></button>
              <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text)', minWidth: '16px', textAlign: 'center' }}>{qty}</span>
              <button onClick={onAdd} style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: 'var(--color-gold)', color: 'var(--color-bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MenuPageClient() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filters, setFilters] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<MenuItem | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const cardTriggersRef = useRef<ScrollTrigger[]>([]);

  const toggleFilter = (f: string) =>
    setFilters((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);

  const filtered = useMemo(() => {
    let items = menuItems;
    if (activeCategory !== 'all') items = items.filter((i) => i.category === activeCategory);
    if (filters.includes('veg')) items = items.filter((i) => i.isVeg);
    if (filters.includes('chef')) items = items.filter((i) => i.isChefPick);
    if (filters.includes('under300')) items = items.filter((i) => i.price < 300);
    if (filters.includes('bestseller')) items = items.filter((i) => i.isBestseller);
    return items;
  }, [activeCategory, filters]);

  const cartTotal = cart.reduce((sum, c) => sum + c.item.price * c.qty, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);
  const getQty = (id: string) => cart.find((c) => c.item.id === id)?.qty ?? 0;

  const addToCart = (item: MenuItem) => setCart((prev) => {
    const existing = prev.find((c) => c.item.id === item.id);
    if (existing) return prev.map((c) => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
    return [...prev, { item, qty: 1 }];
  });
  const removeFromCart = (item: MenuItem) => setCart((prev) => {
    const existing = prev.find((c) => c.item.id === item.id);
    if (!existing || existing.qty <= 1) return prev.filter((c) => c.item.id !== item.id);
    return prev.map((c) => c.item.id === item.id ? { ...c, qty: c.qty - 1 } : c);
  });

  const filterOptions = [
    { id: 'veg',        label: '🌿 Veg Only' },
    { id: 'chef',       label: "👨‍🍳 Chef's Pick" },
    { id: 'under300',   label: '💰 Under ₹300' },
    { id: 'bestseller', label: '⭐ Bestsellers' },
  ];

  // ── Hero entrance ──────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image subtle zoom out (starts zoomed in, settles to normal)
      gsap.fromTo(heroImgRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 1.6, ease: 'power2.out' }
      );

      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo('.menu-hero-eyebrow',
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }
      )
        .fromTo('.menu-hero-h1',
          { y: 45, opacity: 0, skewY: 1 },
          { y: 0, opacity: 1, skewY: 0, duration: 0.8, ease: 'power4.out' }, '-=0.3'
        )
        .fromTo('.menu-hero-sub',
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, '-=0.4'
        );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // ── Tabs + pills stagger in (once) ────────────────────────────────────────
  useEffect(() => {
    gsap.fromTo('.menu-tab-btn',
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', stagger: 0.05, delay: 0.55 }
    );
    gsap.fromTo('.menu-filter-pill',
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', stagger: 0.07, delay: 0.75 }
    );
  }, []);

  // ── Menu cards — scroll reveal, re-runs on filter / category change ───────
  useEffect(() => {
    cardTriggersRef.current.forEach((t) => t.kill());
    cardTriggersRef.current = [];

    const cards = document.querySelectorAll<HTMLElement>('.menu-card');
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 36, scale: 0.96 });

    cardTriggersRef.current = ScrollTrigger.batch('.menu-card', {
      start: 'top 102%',
      onEnter: (els) =>
        gsap.to(els, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, ease: 'power3.out', stagger: 0.07,
        }),
    });

    ScrollTrigger.refresh();
  }, [activeCategory, filters]);

  return (
    <div ref={pageRef} style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>

      {/* ── Page header ── */}
      <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
        <img ref={heroImgRef}
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80"
          alt="Menu" style={{ width: '100%', height: '100%', objectFit: 'cover', willChange: 'transform' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,13,8,0.72)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <p className="menu-hero-eyebrow" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace', marginBottom: '12px' }}>
            HOME · MENU
          </p>
          <h1 className="menu-hero-h1" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(36px, 5vw, 60px)', color: 'var(--color-gold-cream)', fontWeight: 400, marginBottom: '8px' }}>
            Our Menu
          </h1>
          <p className="menu-hero-sub" style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(232,228,216,0.7)' }}>
            Crafted fresh, served under the stars.
          </p>
        </div>
      </div>

      {/* ── Category tabs — sticky ── */}
      <div className="menu-tabs-scroll" style={{
        position: 'sticky', top: '64px', zIndex: 30,
        overflowX: 'auto', scrollbarWidth: 'none',
        background: 'var(--color-bg-card)',
        borderBottom: '1px solid rgba(200,145,58,0.12)',
      }}>
        <div className="menu-tabs-pad" style={{ display: 'flex', alignItems: 'flex-end', minWidth: 'max-content' }}>
          {[{ id: 'all', label: 'All', icon: '🍴' }, ...categories].map((c) => {
            const isActive = activeCategory === c.id;
            return (
              <button key={c.id} onClick={() => setActiveCategory(c.id)}
                className="menu-tab-btn"
                style={{
                  padding: '14px 20px 12px',
                  fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap',
                  border: 'none', background: 'transparent', cursor: 'pointer',
                  borderBottom: `2px solid ${isActive ? 'var(--color-gold)' : 'transparent'}`,
                  marginBottom: '-1px',
                  color: isActive ? 'var(--color-gold)' : 'var(--color-muted)',
                  transition: 'color 0.2s, border-color 0.2s',
                }}>
                {c.icon} {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Filter pills ── */}
      <div className="menu-filter-pad" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', borderBottom: '1px solid rgba(200,145,58,0.08)' }}>
        {filterOptions.map((f) => (
          <button key={f.id} onClick={() => toggleFilter(f.id)}
            className="menu-filter-pill"
            style={{ padding: '8px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', background: filters.includes(f.id) ? 'var(--color-gold)' : 'transparent', color: filters.includes(f.id) ? 'var(--color-bg)' : 'var(--color-muted)', border: filters.includes(f.id) ? '1px solid transparent' : '1px solid rgba(200,145,58,0.25)' }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      <div className="menu-page-pad" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>🍃</p>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '22px', color: 'var(--color-muted)' }}>No items match your filters</p>
            <button onClick={() => setFilters([])} style={{ marginTop: '16px', fontSize: '13px', color: 'var(--color-gold)', background: 'none', border: 'none', cursor: 'pointer' }}>
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="menu-grid">
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item}
                qty={getQty(item.id)}
                onAdd={() => addToCart(item)}
                onRemove={() => removeFromCart(item)}
                onOpenDetail={() => setDetailItem(item)} />
            ))}
          </div>
        )}
      </div>

      {/* ── Floating cart bar ── */}
      {cartCount > 0 && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40, padding: '16px 24px' }}>
          <button onClick={() => setCartOpen(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '16px 24px', borderRadius: '100px', border: 'none', cursor: 'pointer', background: 'var(--color-gold)', color: 'var(--color-bg)', boxShadow: '0 8px 32px rgba(200,145,58,0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShoppingCart size={18} />
              <span style={{ fontSize: '14px', fontWeight: 500 }}>{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
            </div>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '20px' }}>₹{cartTotal} →</span>
          </button>
        </div>
      )}

      {/* ── Dish detail modal ── */}
      {detailItem && (
        <DishModal
          item={detailItem}
          qty={getQty(detailItem.id)}
          onAdd={() => addToCart(detailItem)}
          onRemove={() => removeFromCart(detailItem)}
          onClose={() => setDetailItem(null)}
        />
      )}

      {/* ── Cart drawer ── */}
      {cartOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} onClick={() => setCartOpen(false)} />
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', background: 'var(--color-bg-card)', borderLeft: '1px solid rgba(200,145,58,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(200,145,58,0.12)' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: 'var(--color-gold-cream)', fontWeight: 400 }}>Your Order</h2>
              <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}><X size={20} /></button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map((c) => (
                <div key={c.item.id} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={c.item.image} alt={c.item.name} style={{ width: '52px', height: '52px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text)', marginBottom: '2px' }}>{c.item.name}</p>
                    <p style={{ fontSize: '13px', color: 'var(--color-gold)' }}>₹{c.item.price}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button onClick={() => removeFromCart(c.item)} style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1px solid rgba(200,145,58,0.3)', background: 'transparent', color: 'var(--color-gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={10} /></button>
                    <span style={{ fontSize: '14px', color: 'var(--color-text)', minWidth: '16px', textAlign: 'center' }}>{c.qty}</span>
                    <button onClick={() => addToCart(c.item)} style={{ width: '26px', height: '26px', borderRadius: '50%', border: 'none', background: 'var(--color-gold)', color: 'var(--color-bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={10} /></button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(200,145,58,0.12)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>Total</span>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '24px', color: 'var(--color-gold)' }}>₹{cartTotal}</span>
              </div>
              <button style={{ width: '100%', padding: '14px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500, background: 'var(--color-gold)', color: 'var(--color-bg)' }}
                onClick={() => alert('Razorpay payment integration launches here.')}>
                Pay ₹{cartTotal} →
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .menu-card:hover .menu-card-detail-hint { opacity: 1 !important; }
        .menu-card h3:hover { color: var(--color-gold) !important; }
      `}</style>
    </div>
  );
}
