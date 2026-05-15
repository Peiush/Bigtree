'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { MapPin, Phone, Clock, Mail, MessageCircle, Share2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const vp = { once: true, amount: 0.2 as const };
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const faqs = [
  { q: 'Do you accept walk-ins?', a: 'Yes — we keep a few cabanas and terrace tables open for walk-ins every evening. Weekend evenings fill fast, so a quick call or WhatsApp saves the trip.' },
  { q: 'Is parking available?', a: 'We have a dedicated valet lane on Golf Course Road. Parking is complimentary for all dine-in guests. Valet opens at 11:30 AM and runs until closing.' },
  { q: 'Can I book a private cabana for an event?', a: 'Absolutely. We have 12 cabanas ranging from intimate two-seaters to a twelve-seat garden suite. Cabana setup is at cost — no hidden charges. Write to us or call for availability.' },
  { q: 'Can I bring an outside cake?', a: 'Yes, cakes from an external bakery are welcome. We charge a small plating fee and provide dessert plates, candles, and a cutting ceremony. No outside alcohol, please.' },
  { q: 'When does live music start?', a: 'Live acoustic sets run Thursday through Sunday, starting at 7:30 PM. The Sunday Brunch Acoustic is a fixed 12:30 PM slot — no cover charge for either.' },
  { q: 'Is the restaurant child and pet-friendly?', a: 'Children are very welcome — we have high chairs and a small kids\' menu on request. Leashed, well-behaved dogs are allowed in the garden area.' },
];

const channels = [
  { icon: <MessageCircle size={22} />, label: 'WhatsApp', sub: 'Fastest response', href: 'https://wa.me/918183959595', color: '#4ADE80', bg: 'rgba(45,106,79,0.12)', border: 'rgba(45,106,79,0.25)' },
  { icon: <Phone size={22} />, label: 'Call Us', sub: '+91 818 395 9595', href: 'tel:+918183959595', color: 'var(--color-gold)', bg: 'rgba(200,145,58,0.08)', border: 'rgba(200,145,58,0.2)' },
  { icon: <Share2 size={22} />, label: 'Instagram', sub: '@thebigtreecafe', href: 'https://instagram.com/thebigtreecafe', color: '#E8C07A', bg: 'rgba(232,192,122,0.08)', border: 'rgba(232,192,122,0.2)' },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(200,145,58,0.12)' }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', gap: '16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span className="font-serif" style={{ fontSize: '17px', color: 'var(--color-gold-cream)', lineHeight: 1.4 }}>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}
          style={{ flexShrink: 0, color: 'var(--color-gold)', display: 'inline-flex' }}>
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            style={{ overflow: 'hidden' }}>
            <p style={{ paddingBottom: '20px', fontSize: '14px', lineHeight: '1.8', color: 'var(--color-muted)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section style={{ position: 'relative', paddingTop: '164px', paddingBottom: '80px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=60)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.05 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, var(--color-bg) 0%, transparent 50%, var(--color-bg) 100%)' }} />

          <div className="content-wrap" style={{ position: 'relative' }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
              transition={{ duration: 0.6, ease }}
              style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>
              Get in Touch
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
              transition={{ duration: 0.75, ease, delay: 0.08 }}
              className="font-serif" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', color: 'var(--color-gold-cream)', lineHeight: 1.08, marginBottom: '20px', maxWidth: '680px' }}>
              We&apos;d love to hear<br /><em>from you.</em>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
              transition={{ duration: 0.65, ease, delay: 0.16 }}
              style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--color-muted)', maxWidth: '440px' }}>
              Whether it&apos;s a reservation question, a private event, feedback, or just a hello — we&apos;re a small team and we read everything.
            </motion.p>
          </div>
        </section>

        {/* ── Quick Channels ────────────────────────────────────────────── */}
        <section style={{ paddingBottom: '72px' }}>
          <div className="content-wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              {channels.map((c, i) => (
                <motion.a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
                  transition={{ duration: 0.55, ease, delay: i * 0.09 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '20px 22px', borderRadius: '14px', background: c.bg, border: `1px solid ${c.border}`, textDecoration: 'none', cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                  <span style={{ color: c.color }}>{c.icon}</span>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-gold-cream)', marginBottom: '2px' }}>{c.label}</p>
                    <p style={{ fontSize: '12px', color: 'var(--color-muted)' }}>{c.sub}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Info + Form ───────────────────────────────────────────────── */}
        <section style={{ paddingTop: '8px', paddingBottom: '96px' }}>
          <div className="content-wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '64px', alignItems: 'flex-start' }}>

            {/* Left — Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
                transition={{ duration: 0.6, ease }}
                style={{ marginBottom: '36px' }}>
                <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>Find Us</p>
                <h2 className="font-serif" style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', color: 'var(--color-gold-cream)', marginBottom: '8px' }}>Come in person.</h2>
                <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.7 }}>We&apos;re on Golf Course Road, under a 60-year-old peepal tree. You won&apos;t miss it.</p>
              </motion.div>

              {[
                { icon: <MapPin size={18} />, title: 'Address', content: 'Pillar 174, Golf Course Road, Opposite Rapid Metro, Sector 53, Gurugram, Haryana 122011' },
                { icon: <Phone size={18} />, title: 'Phone', content: '+91 818 395 9595' },
                { icon: <Mail size={18} />, title: 'Email', content: 'hello@thebigtreecafe.com' },
                { icon: <Clock size={18} />, title: 'Hours', content: 'Mon–Sun · Lunch: 12–4 PM · Dinner: 6–11:30 PM' },
              ].map((item, i) => (
                <motion.div key={item.title}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp}
                  transition={{ duration: 0.55, ease, delay: i * 0.08 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(200,145,58,0.1)', color: 'var(--color-gold)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>{item.title}</p>
                    <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--color-muted)' }}>{item.content}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
                transition={{ duration: 0.6, ease, delay: 0.3 }}>
                <div style={{ borderRadius: '16px', overflow: 'hidden', height: '240px', marginTop: '8px', border: '1px solid rgba(200,145,58,0.12)' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.1234!2d77.0938!3d28.4301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI1JzQ4LjQiTiA3N8KwMDUnMzcuNyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                    width="100%" height="100%" style={{ border: 0, filter: 'brightness(0.72) contrast(1.1)' }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="The Big Tree Cafe Map" />
                </div>
                <a href="https://maps.google.com?q=The+Big+Tree+Cafe+Gurgaon" target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '13px', color: 'var(--color-gold)', textDecoration: 'none' }}>
                  <MapPin size={13} /> Open in Google Maps ↗
                </a>
              </motion.div>
            </div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp}
              transition={{ duration: 0.7, ease }}
              style={{ borderRadius: '20px', padding: '40px', background: 'var(--color-bg-card)', border: '1px solid rgba(200,145,58,0.12)', position: 'sticky', top: '96px' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(200,145,58,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--color-gold)' }}>
                    <Mail size={24} />
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '26px', color: 'var(--color-gold-cream)', marginBottom: '10px' }}>Message received.</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.7 }}>We&apos;ll get back to you within 24 hours. For urgent queries, WhatsApp is faster.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
                    style={{ marginTop: '24px', padding: '10px 24px', borderRadius: '100px', border: '1px solid rgba(200,145,58,0.3)', background: 'none', color: 'var(--color-gold)', fontSize: '13px', cursor: 'pointer' }}>
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>Send a message</p>
                  <h2 className="font-serif" style={{ fontSize: 'clamp(22px, 2.2vw, 28px)', color: 'var(--color-gold-cream)', marginBottom: '28px', lineHeight: 1.2 }}>
                    Tell us what&apos;s<br /><em>on your mind.</em>
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { name: 'name', placeholder: 'Your Name', type: 'text', required: true },
                      { name: 'email', placeholder: 'Email Address', type: 'email', required: true },
                      { name: 'phone', placeholder: 'Phone Number (optional)', type: 'tel', required: false },
                    ].map((f) => (
                      <input key={f.name} type={f.type} placeholder={f.placeholder} required={f.required}
                        value={(form as Record<string, string>)[f.name]}
                        onChange={(e) => setForm((p) => ({ ...p, [f.name]: e.target.value }))}
                        style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', fontSize: '14px', outline: 'none', background: 'var(--color-bg)', border: '1px solid rgba(200,145,58,0.18)', color: 'var(--color-text)', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                    ))}
                    <select style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', fontSize: '14px', outline: 'none', background: 'var(--color-bg)', border: '1px solid rgba(200,145,58,0.18)', color: 'var(--color-muted)', fontFamily: 'inherit', cursor: 'pointer', boxSizing: 'border-box' }}>
                      <option value="">What is this about?</option>
                      <option>Table Reservation</option>
                      <option>Private Cabana / Event</option>
                      <option>Feedback</option>
                      <option>Press / Media</option>
                      <option>Something else</option>
                    </select>
                    <textarea placeholder="Tell us more…" rows={4}
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', fontSize: '14px', outline: 'none', resize: 'none', background: 'var(--color-bg)', border: '1px solid rgba(200,145,58,0.18)', color: 'var(--color-text)', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                    <button type="submit"
                      style={{ width: '100%', padding: '15px', borderRadius: '100px', fontSize: '14px', fontWeight: 500, background: 'var(--color-gold)', color: 'var(--color-bg)', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                      Send Message →
                    </button>
                  </div>
                  <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-muted)', marginTop: '14px' }}>
                    We respond within 24 hours. For same-day, WhatsApp is faster.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </section>

        {/* ── Ambiance Strip ────────────────────────────────────────────── */}
        <section style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', height: '320px' }}>
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
              alt="The Big Tree Cafe atmosphere"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,13,8,0.88) 38%, rgba(10,13,8,0.2) 100%)' }} />
            <div className="content-wrap" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp}
                transition={{ duration: 0.8, ease }}
                style={{ maxWidth: '500px' }}>
                <p className="font-serif" style={{ fontStyle: 'italic', fontSize: 'clamp(20px, 2.8vw, 34px)', color: 'var(--color-gold-cream)', lineHeight: 1.45, marginBottom: '24px' }}>
                  &ldquo;Some places are better experienced than described.&rdquo;
                </p>
                <Link href="/reserve"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '100px', background: 'var(--color-gold)', color: 'var(--color-bg)', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
                  Reserve a table →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section style={{ paddingTop: '96px', paddingBottom: '96px', background: 'var(--color-bg-card)' }}>
          <div className="content-wrap">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.7fr', gap: '80px', alignItems: 'flex-start' }}>
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
                  transition={{ duration: 0.5, ease }}
                  style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>
                  Common Questions
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
                  transition={{ duration: 0.6, ease, delay: 0.07 }}
                  className="font-serif" style={{ fontSize: 'clamp(24px, 2.8vw, 40px)', color: 'var(--color-gold-cream)', lineHeight: 1.2, marginBottom: '18px' }}>
                  Things people<br /><em>usually ask.</em>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
                  transition={{ duration: 0.55, ease, delay: 0.14 }}
                  style={{ fontSize: '14px', lineHeight: '1.75', color: 'var(--color-muted)', marginBottom: '24px' }}>
                  Still not answered? Message us on WhatsApp — it&apos;s the fastest way to reach our team.
                </motion.p>
                <motion.a
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
                  transition={{ duration: 0.5, ease, delay: 0.2 }}
                  href="https://wa.me/918183959595" target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 22px', borderRadius: '100px', border: '1px solid rgba(45,106,79,0.35)', color: '#4ADE80', fontSize: '13px', textDecoration: 'none', background: 'rgba(45,106,79,0.1)' }}>
                  <MessageCircle size={15} /> Ask on WhatsApp
                </motion.a>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, ease }}>
                <div style={{ borderTop: '1px solid rgba(200,145,58,0.12)' }}>
                  {faqs.map((faq) => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA Bottom ───────────────────────────────────────────────── */}
        <section style={{ paddingTop: '96px', paddingBottom: '104px', textAlign: 'center' }}>
          <div className="content-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
              transition={{ duration: 0.5, ease }}
              style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>
              Ready to Visit?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
              transition={{ duration: 0.65, ease, delay: 0.08 }}
              className="font-serif" style={{ fontSize: 'clamp(28px, 4vw, 58px)', color: 'var(--color-gold-cream)', marginBottom: '14px' }}>
              The tree is waiting.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
              transition={{ duration: 0.6, ease, delay: 0.15 }}
              style={{ fontSize: '15px', color: 'var(--color-muted)', maxWidth: '380px', lineHeight: 1.75, marginBottom: '36px', textAlign: 'center' }}>
              Grab a cabana under the fairy lights before the weekend fills up.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
              transition={{ duration: 0.55, ease, delay: 0.22 }}
              style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/reserve"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '100px', background: 'var(--color-gold)', color: 'var(--color-bg)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
                Reserve a table →
              </Link>
              <Link href="/events"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '100px', border: '1px solid rgba(200,145,58,0.35)', color: 'var(--color-gold-cream)', fontSize: '14px', textDecoration: 'none' }}>
                See upcoming events
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
