'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryItems, galleryCategories, type GalleryItem } from '@/lib/data/gallery';
import GalleryLightbox from './GalleryLightbox';

gsap.registerPlugin(ScrollTrigger);

const INITIAL_COUNT = 24;
const LOAD_MORE_STEP = 9;

export default function GalleryPageClient() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const cardTriggersRef = useRef<ScrollTrigger[]>([]);

  const filtered = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((i) => i.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visibleCount;

  function getCategoryCount(id: string) {
    if (id === 'all') return galleryItems.length;
    return galleryItems.filter((i) => i.category === id).length;
  }

  function handleFilter(id: string) {
    setActiveCategory(id);
    setVisibleCount(INITIAL_COUNT);
  }

  // ── Hero entrance (runs once on mount) ──────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo('.gallery-eyebrow',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }
      )
        .fromTo('.gallery-title',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' }, '-=0.3'
        )
        .fromTo('.gallery-subtitle',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.35'
        )
        .fromTo('.gallery-ig-link',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, '-=0.3'
        );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // ── Filters scroll reveal (once) ────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-filter-btn',
        { y: 18, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.45, ease: 'power2.out',
          stagger: 0.06,
          scrollTrigger: { trigger: '.gallery-filters', start: 'top 88%', once: true },
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // ── Grid cards — scroll-reveal on filter change or load more ─────────────────
  useEffect(() => {
    // Kill triggers from the previous render
    cardTriggersRef.current.forEach((t) => t.kill());
    cardTriggersRef.current = [];

    const cards = document.querySelectorAll<HTMLElement>('.gallery-card');
    if (!cards.length) return;

    // Hide all cards before setting up triggers
    gsap.set(cards, { opacity: 0, y: 36, scale: 0.96 });

    // Reveal each card as it enters the viewport
    cardTriggersRef.current = ScrollTrigger.batch('.gallery-card', {
      start: 'top 102%',
      onEnter: (els) =>
        gsap.to(els, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.65, ease: 'power3.out',
          stagger: 0.07,
        }),
    });

    // Recalculate positions after DOM settles
    ScrollTrigger.refresh();
  }, [activeCategory, visibleCount]);

  // ── CTA section reveal ───────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.gallery-cta-section', start: 'top 82%', once: true },
      });
      tl.fromTo('.gallery-cta-section',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
      )
        .fromTo('.gallery-cta-eyebrow',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, '-=0.4'
        )
        .fromTo('.gallery-cta-title',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3'
        )
        .fromTo('.gallery-cta-meta',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, '-=0.3'
        )
        .fromTo('.gallery-cta-btn',
          { y: 16, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }, '-=0.25'
        );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <GalleryStyles />

      <div ref={pageRef} style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>

        {/* ── Hero ── */}
        <section className="gallery-hero">
          <div className="gallery-hero-bg">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=90"
              alt=""
              aria-hidden="true"
              className="gallery-hero-img"
            />
            <div className="gallery-hero-overlay" />
          </div>
          <div className="content-wrap gallery-hero-content">
            <p className="gallery-eyebrow">The Gallery</p>
            <h1 className="gallery-title">
              The Big Tree —<br />
              <em>as you&apos;ve never seen it.</em>
            </h1>
            <p className="gallery-subtitle">50,000 people share their evenings with us.</p>
            <a
              href="https://instagram.com/bigtreecafegurgaon"
              target="_blank"
              rel="noreferrer"
              className="gallery-ig-link"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              @bigtreecafegurgaon
            </a>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="content-wrap">
          <div className="gallery-divider" />
        </div>

        {/* ── Filters ── */}
        <div className="content-wrap">
          <div className="gallery-filters">
            {galleryCategories.map((c) => {
              const count = getCategoryCount(c.id);
              const isActive = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => handleFilter(c.id)}
                  className={`gallery-filter-btn${isActive ? ' active' : ''}`}
                  aria-pressed={isActive}
                >
                  {c.label}
                  <span className="gallery-filter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Masonry Grid ── */}
        <div className="content-wrap gallery-grid-wrap">
          <div className="gallery-masonry">
            {visible.map((item, idx) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => setLightboxIndex(idx)}
              />
            ))}
          </div>
        </div>

        {/* ── Load More ── */}
        {remaining > 0 && (
          <div className="gallery-load-more-wrap">
            <button
              className="gallery-load-more-btn"
              onClick={() => setVisibleCount((v) => v + LOAD_MORE_STEP)}
            >
              Load more&nbsp;&nbsp;({remaining}&nbsp;remaining)
            </button>
          </div>
        )}

        {/* ── Instagram CTA ── */}
        <section className="gallery-cta-section">
          <div className="gallery-cta-inner">
            <svg className="gallery-cta-deco" viewBox="0 0 400 200" fill="none" aria-hidden="true">
              <path d="M0 160 Q100 60 200 120 T400 80" stroke="rgba(200,145,58,0.12)" strokeWidth="1.5" fill="none" />
              <path d="M0 180 Q120 80 240 140 T400 100" stroke="rgba(200,145,58,0.07)" strokeWidth="1" fill="none" />
            </svg>
            <p className="gallery-cta-eyebrow">Stay Close</p>
            <h2 className="gallery-cta-title">
              Follow us for daily drops{' '}
              <em>from under the trees.</em>
            </h2>
            <p className="gallery-cta-meta">52,400 followers · 4–5 posts a week</p>
            <a
              href="https://instagram.com/bigtreecafegurgaon"
              target="_blank"
              rel="noreferrer"
              className="gallery-cta-btn"
            >
              Follow @bigtreecafegurgaon
            </a>
          </div>
        </section>

      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          items={visible}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i! - 1 + visible.length) % visible.length)}
          onNext={() => setLightboxIndex((i) => (i! + 1) % visible.length)}
        />
      )}
    </>
  );
}

/* ─── Gallery Card ─────────────────────────────────────────────────────────── */
function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <div className="gallery-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View ${item.alt}`}>
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="gallery-card-img"
      />
      <div className="gallery-card-overlay">
        <span className="gallery-card-label">{item.alt}</span>
      </div>
    </div>
  );
}

/* ─── Styles ───────────────────────────────────────────────────────────────── */
function GalleryStyles() {
  return (
    <style>{`
      /* Hero */
      .gallery-hero {
        position: relative;
        min-height: 520px;
        display: flex;
        align-items: flex-end;
        overflow: hidden;
      }
      .gallery-hero-bg {
        position: absolute;
        inset: 0;
        z-index: 0;
      }
      .gallery-hero-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        animation: gallery-hero-zoom 12s ease-in-out infinite alternate;
      }
      @keyframes gallery-hero-zoom {
        from { transform: scale(1); }
        to   { transform: scale(1.06); }
      }
      .gallery-hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to bottom,
          rgba(5,8,4,0.35) 0%,
          rgba(5,8,4,0.5)  50%,
          rgba(5,8,4,0.82) 100%
        );
      }
      .gallery-hero-content {
        position: relative;
        z-index: 1;
        padding-top: 120px;
        padding-bottom: 56px;
        width: 100%;
      }
      .gallery-eyebrow {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: var(--color-gold);
        margin-bottom: 24px;
      }
      .gallery-title {
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(48px, 6vw, 80px);
        font-weight: 400;
        line-height: 1.08;
        color: var(--color-gold-cream);
        margin-bottom: 24px;
        max-width: 760px;
      }
      .gallery-title em { font-style: italic; color: var(--color-gold-light); }
      .gallery-subtitle {
        font-size: 15px;
        color: var(--color-muted);
        margin-bottom: 16px;
        line-height: 1.6;
      }
      .gallery-ig-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: var(--color-text);
        text-decoration: none;
        transition: color 200ms ease;
      }
      .gallery-ig-link:hover { color: var(--color-gold); }
      .gallery-ig-link svg { opacity: 0.7; }

      /* Divider */
      .gallery-divider { height: 1px; background: rgba(200,145,58,0.12); margin: 0 0 40px; }

      /* Filters */
      .gallery-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 40px; }
      .gallery-filter-btn {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 8px 18px; border-radius: 100px; font-size: 13px;
        font-family: 'DM Sans', sans-serif; cursor: pointer;
        transition: all 200ms ease; background: transparent;
        color: var(--color-muted); border: 1px solid rgba(200,145,58,0.18);
      }
      .gallery-filter-btn:hover {
        color: var(--color-text);
        border-color: rgba(200,145,58,0.4);
        background: rgba(200,145,58,0.06);
      }
      .gallery-filter-btn.active {
        background: var(--color-gold); color: #0A0D08;
        border-color: var(--color-gold); font-weight: 500;
      }
      .gallery-filter-count { font-family: 'DM Mono', monospace; font-size: 11px; opacity: 0.7; }
      .gallery-filter-btn.active .gallery-filter-count { opacity: 0.65; }

      /* Grid */
      .gallery-grid-wrap { margin-bottom: 16px; }
      .gallery-masonry { columns: 3; column-gap: 10px; }
      @media (max-width: 900px) { .gallery-masonry { columns: 2; } }
      @media (max-width: 560px) { .gallery-masonry { columns: 1; } }

      /* Card */
      .gallery-card {
        break-inside: avoid; display: block; position: relative;
        overflow: hidden; border-radius: 6px; margin-bottom: 10px;
        cursor: pointer; background: var(--color-bg-card);
      }
      .gallery-card:focus-visible { outline: 2px solid var(--color-gold); outline-offset: 2px; }
      .gallery-card-img {
        display: block; width: 100%; height: auto;
        transition: transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      .gallery-card:hover .gallery-card-img { transform: scale(1.06); }
      .gallery-card-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(to top, rgba(5,8,4,0.72) 0%, rgba(5,8,4,0.18) 45%, transparent 70%);
        display: flex; flex-direction: column; justify-content: flex-end;
        padding: 16px; opacity: 0; transition: opacity 280ms ease;
      }
      .gallery-card:hover .gallery-card-overlay { opacity: 1; }
      .gallery-card-label {
        font-size: 12px; color: rgba(245,230,194,0.9);
        font-family: 'DM Sans', sans-serif; line-height: 1.4; letter-spacing: 0.01em;
      }

      /* Load More */
      .gallery-load-more-wrap { display: flex; justify-content: center; padding: 40px 0 56px; }
      .gallery-load-more-btn {
        padding: 13px 36px; border-radius: 100px;
        border: 1px solid var(--color-gold); color: var(--color-gold);
        background: transparent; font-size: 13px;
        font-family: 'DM Sans', sans-serif; cursor: pointer;
        letter-spacing: 0.03em; transition: all 220ms ease;
      }
      .gallery-load-more-btn:hover { background: rgba(200,145,58,0.1); transform: translateY(-1px); }

      /* CTA section */
      .gallery-cta-section {
        margin: 0 48px 80px; border-radius: 16px;
        background: #141f10; border: 1px solid rgba(200,145,58,0.1); overflow: hidden;
      }
      @media (max-width: 768px) { .gallery-cta-section { margin: 0 20px 60px; } }
      .gallery-cta-inner {
        position: relative; padding: 72px 80px; text-align: center; overflow: hidden;
      }
      @media (max-width: 768px) { .gallery-cta-inner { padding: 48px 28px; } }
      .gallery-cta-deco {
        position: absolute; bottom: 0; right: 0;
        width: 420px; height: 200px; pointer-events: none; opacity: 1;
      }
      .gallery-cta-eyebrow {
        font-family: 'DM Mono', monospace; font-size: 11px;
        letter-spacing: 3.5px; text-transform: uppercase;
        color: var(--color-gold); margin-bottom: 20px;
      }
      .gallery-cta-title {
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(28px, 3.5vw, 48px); font-weight: 400;
        line-height: 1.2; color: var(--color-gold-cream);
        max-width: 680px; margin: 0 auto 16px;
      }
      .gallery-cta-title em { font-style: italic; color: var(--color-gold-light); }
      .gallery-cta-meta {
        font-size: 13px; color: var(--color-muted); margin-bottom: 36px;
        font-family: 'DM Mono', monospace; letter-spacing: 0.02em;
      }
      .gallery-cta-btn {
        display: inline-block; padding: 15px 44px; border-radius: 100px;
        background: var(--color-gold); color: #0A0D08;
        font-size: 14px; font-weight: 500; font-family: 'DM Sans', sans-serif;
        text-decoration: none; transition: all 220ms ease; letter-spacing: 0.02em;
      }
      .gallery-cta-btn:hover {
        background: var(--color-gold-light); transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(200,145,58,0.25);
      }
    `}</style>
  );
}
