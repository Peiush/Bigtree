'use client';

import Link from 'next/link';
import { Share2, Globe, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-bg)', borderTop: '1px solid rgba(200,145,58,0.12)' }}>
      {/* Tree branch SVG decoration */}
      <div className="w-full overflow-hidden opacity-20 pt-8 px-12">
        <svg viewBox="0 0 1200 60" className="w-full" style={{ fill: 'none', stroke: 'var(--color-gold)', strokeWidth: 1 }}>
          <path d="M0,40 Q200,10 400,35 Q600,55 800,20 Q1000,5 1200,30" />
          <path d="M300,35 Q330,15 360,5" />
          <path d="M500,42 Q520,22 545,8" />
          <path d="M700,28 Q715,8 740,2" />
          <path d="M900,22 Q920,5 950,0" />
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Logo */}
          <div>
            <Link href="/" className="font-serif italic text-3xl block mb-3" style={{ color: 'var(--color-gold-light)' }}>
              The Big Tree Cafe
            </Link>
            <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
              Where nature meets good food. Golf Course Road, Gurgaon.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/bigtreecafegurgaon" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
                style={{ borderColor: 'rgba(200,145,58,0.3)', color: 'var(--color-muted)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,145,58,0.3)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)'; }}
                aria-label="Instagram">
                <Share2 size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
                style={{ borderColor: 'rgba(200,145,58,0.3)', color: 'var(--color-muted)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,145,58,0.3)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)'; }}
                aria-label="Facebook">
                <Globe size={16} />
              </a>
              <a href="https://wa.me/918183959595" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
                style={{ borderColor: 'rgba(200,145,58,0.3)', color: 'var(--color-muted)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,145,58,0.3)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)'; }}
                aria-label="WhatsApp">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold mb-6 tracking-widest uppercase" style={{ color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace' }}>Navigate</h4>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/menu', 'Menu'], ['/gallery', 'Gallery'], ['/events', 'Events'], ['/reserve', 'Reservations'], ['/about', 'About'], ['/contact', 'Contact']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors" style={{ color: 'var(--color-muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold-light)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Upcoming events */}
          <div>
            <h4 className="text-xs font-semibold mb-6 tracking-widest uppercase" style={{ color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace' }}>Upcoming</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>Acoustic Evening</p>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Sat, May 17 · 7:30 PM</p>
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>Jazz Under the Stars</p>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Fri, May 23 · 8:00 PM</p>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-xs font-semibold mb-6 tracking-widest uppercase" style={{ color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace' }}>Stay Updated</h4>
            <p className="text-sm mb-4" style={{ color: 'var(--color-muted)' }}>Get event updates and exclusive offers.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email" placeholder="Your email" aria-label="Email for newsletter"
                className="flex-1 px-3 py-2 text-sm rounded-lg outline-none"
                style={{ background: 'var(--color-bg-card)', border: '1px solid rgba(200,145,58,0.2)', color: 'var(--color-text)' }}
              />
              <button type="submit"
                className="px-4 py-2 text-sm font-medium rounded-lg"
                style={{ background: 'var(--color-gold)', color: 'var(--color-bg)' }}>
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-3" style={{ borderColor: 'rgba(200,145,58,0.1)' }}>
        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>© 2025 The Big Tree Cafe · All Rights Reserved</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-xs transition-colors" style={{ color: 'var(--color-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}>
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-xs transition-colors" style={{ color: 'var(--color-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}>
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
