'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease',
        background: scrolled
          ? 'rgba(10,13,8,0.92)'
          : 'linear-gradient(to bottom, rgba(5,7,4,0.88) 0%, rgba(5,7,4,0.55) 60%, rgba(5,7,4,0) 100%)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,145,58,0.15)' : 'none',
      }}>
        <div className="navbar-inner" style={{
          maxWidth: '1280px', margin: '0 auto', padding: '0 48px',
          height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <Link href="/" style={{
            fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
            fontSize: '22px', color: 'var(--color-gold-light)', textDecoration: 'none',
            textShadow: scrolled ? 'none' : '0 1px 8px rgba(0,0,0,0.6)',
          }}>
            The Big Tree
          </Link>

          {/* Desktop nav */}
          <nav className="desktop-nav">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} style={{
                fontSize: '13px',
                color: scrolled ? 'var(--color-muted)' : 'rgba(232,228,216,0.92)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                fontWeight: 400,
                textShadow: scrolled ? 'none' : '0 1px 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)',
                letterSpacing: '0.03em',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? 'var(--color-muted)' : 'rgba(232,228,216,0.92)')}>
                {l.label}
              </Link>
            ))}
            <Link href="/reserve" style={{
              fontSize: '13px', fontWeight: 500, borderRadius: '100px', padding: '8px 20px',
              background: 'var(--color-gold)', color: 'var(--color-bg)', textDecoration: 'none',
              transition: 'background 0.2s', letterSpacing: '0.3px'
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-gold-light)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-gold)')}>
              Reserve
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(10,13,8,0.97)', backdropFilter: 'blur(16px)',
          display: 'flex', flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', height: '64px' }}>
            <Link href="/" onClick={() => setMenuOpen(false)} style={{
              fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
              fontSize: '22px', color: 'var(--color-gold-light)', textDecoration: 'none'
            }}>The Big Tree</Link>
            <button onClick={() => setMenuOpen(false)} style={{ color: 'var(--color-gold-light)', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '32px' }}>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
                fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
                fontSize: '32px', color: 'var(--color-muted)', textDecoration: 'none', transition: 'color 0.2s'
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold-cream)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}>
                {l.label}
              </Link>
            ))}
            <Link href="/reserve" onClick={() => setMenuOpen(false)} style={{
              marginTop: '16px', padding: '14px 40px', borderRadius: '100px', fontSize: '14px', fontWeight: 500,
              background: 'var(--color-gold)', color: 'var(--color-bg)', textDecoration: 'none'
            }}>
              Reserve a Table
            </Link>
          </nav>
          <p style={{ textAlign: 'center', paddingBottom: '32px', fontSize: '10px', color: 'var(--color-muted)', fontFamily: 'DM Mono, monospace', letterSpacing: '2px' }}>
            GOLF COURSE ROAD · GURGAON
          </p>
        </div>
      )}
    </>
  );
}
