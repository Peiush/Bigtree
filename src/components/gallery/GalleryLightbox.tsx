'use client';

import type React from 'react';
import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from '@/lib/data/gallery';

interface Props {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({ items, index, onClose, onPrev, onNext }: Props) {
  const item = items[index];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(5,8,4,0.94)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* image */}
      <div
        style={{ position: 'relative', maxWidth: '88vw', maxHeight: '88vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            borderRadius: '8px',
            objectFit: 'contain',
            boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
            display: 'block',
          }}
        />
        {/* caption */}
        <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '14px', color: 'var(--color-text)', marginBottom: '4px' }}>{item.alt}</p>
            <span style={{
              fontSize: '11px',
              padding: '3px 10px',
              borderRadius: '100px',
              background: 'rgba(200,145,58,0.15)',
              color: 'var(--color-gold)',
              fontFamily: 'DM Mono, monospace',
              letterSpacing: '0.05em',
            }}>
              {item.category.replace('-', ' ')}
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--color-muted)', fontFamily: 'DM Mono, monospace', whiteSpace: 'nowrap' }}>
            {index + 1} / {items.length}
          </p>
        </div>
      </div>

      {/* prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
        style={navBtnStyle('left')}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(200,145,58,0.2)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(200,145,58,0.1)')}
      >
        <ChevronLeft size={22} />
      </button>

      {/* next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
        style={navBtnStyle('right')}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(200,145,58,0.2)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(200,145,58,0.1)')}
      >
        <ChevronRight size={22} />
      </button>

      {/* close */}
      <button
        onClick={onClose}
        aria-label="Close image viewer"
        style={{
          position: 'absolute', top: '20px', right: '20px',
          width: '40px', height: '40px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(10,13,8,0.8)',
          border: '1px solid rgba(200,145,58,0.2)',
          color: 'var(--color-gold-light)',
          cursor: 'pointer',
          transition: 'all 180ms ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(200,145,58,0.15)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(10,13,8,0.8)')}
      >
        <X size={17} />
      </button>
    </div>
  );
}

function navBtnStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    [side]: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(200,145,58,0.1)',
    border: '1px solid rgba(200,145,58,0.2)',
    color: 'var(--color-gold-light)',
    cursor: 'pointer',
    transition: 'background 180ms ease',
  };
}
