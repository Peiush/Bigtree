'use client';

import Link from 'next/link';
import { Share2, Globe, MessageCircle } from 'lucide-react';

const navLinks = [
  ['/', 'Home'],
  ['/menu', 'Menu'],
  ['/gallery', 'Gallery'],
  ['/events', 'Events'],
  ['/reserve', 'Reservations'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-bg)', borderTop: '1px solid rgba(200,145,58,0.12)' }}>

      {/* Tree branch SVG — same horizontal padding as content */}
      <div className="footer-svg-wrap">
        <svg viewBox="0 0 1200 60" style={{ width: '100%', display: 'block', fill: 'none', stroke: 'var(--color-gold)', strokeWidth: 1, opacity: 0.2 }}>
          <path d="M0,40 Q200,10 400,35 Q600,55 800,20 Q1000,5 1200,30" />
          <path d="M300,35 Q330,15 360,5" />
          <path d="M500,42 Q520,22 545,8" />
          <path d="M700,28 Q715,8 740,2" />
          <path d="M900,22 Q920,5 950,0" />
        </svg>
      </div>

      {/* Main grid */}
      <div className="footer-inner">
        <div className="footer-grid">

          {/* Col 1: Brand */}
          <div>
            <Link href="/" className="footer-logo">The Big Tree Cafe</Link>
            <p className="footer-tagline">
              Where nature meets good food. Golf Course Road, Gurgaon.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { href: 'https://instagram.com/bigtreecafegurgaon', icon: <Share2 size={15} />, label: 'Instagram' },
                { href: '#', icon: <Globe size={15} />, label: 'Facebook' },
                { href: 'https://wa.me/918183959595', icon: <MessageCircle size={15} />, label: 'WhatsApp' },
              ].map(({ href, icon, label }) => (
                <a key={label} href={href} target={href !== '#' ? '_blank' : undefined} rel="noreferrer" aria-label={label}
                  className="footer-social-btn"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,145,58,0.3)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)'; }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigate */}
          <div>
            <h4 className="footer-col-heading">Navigate</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navLinks.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="footer-link"
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold-light)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Upcoming */}
          <div>
            <h4 className="footer-col-heading">Upcoming</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { title: 'Acoustic Evening', when: 'Sat, May 17 · 7:30 PM' },
                { title: 'Jazz Under the Stars', when: 'Fri, May 23 · 8:00 PM' },
              ].map(({ title, when }) => (
                <div key={title}>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text)', marginBottom: '3px' }}>{title}</p>
                  <p style={{ fontSize: '12px', color: 'var(--color-muted)' }}>{when}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="footer-col-heading">Stay Updated</h4>
            <p style={{ fontSize: '13px', color: 'var(--color-muted)', marginBottom: '16px', lineHeight: 1.6 }}>
              Get event updates and exclusive offers.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="footer-form">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email for newsletter"
                className="footer-email-input"
              />
              <button type="submit" className="footer-submit-btn">Join</button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p style={{ fontSize: '12px', color: 'var(--color-muted)' }}>
          © 2025 The Big Tree Cafe · All Rights Reserved
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[['/', 'Privacy Policy'], ['/', 'Terms']].map(([href, label]) => (
            <Link key={label} href={href} style={{ fontSize: '12px', color: 'var(--color-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold-light)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}>
              {label}
            </Link>
          ))}
        </div>
      </div>

    </footer>
  );
}
