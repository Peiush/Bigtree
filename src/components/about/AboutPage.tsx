'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: '50K+', label: 'Instagram Followers' },
  { num: '4.6 ★', label: 'Google Rating' },
  { num: '2,800+', label: 'Reviews' },
  { num: '12', label: 'Private Cabanas' },
  { num: '60 yr', label: 'Old Peepal Tree' },
];

const values = [
  { roman: 'I',   title: 'Imperfect & alive',   desc: "Live music has crackles. Wood-fire pizza has charred edges. We don’t sand them smooth — they’re the point." },
  { roman: 'II',  title: 'Slow before fast',     desc: "Service is unhurried. Food is slow-cooked. The cabanas don’t turn over every 90 minutes. The night should breathe." },
  { roman: 'III', title: 'Garden over grid',     desc: "No screens, no QR-everything aggression, no upselling carousel. The garden is the interface — we just keep it lit." },
  { roman: 'IV',  title: 'Honest pricing',       desc: "Cabana setup at cost. No silent surcharges. Cake from a real baker, not Swiggy. You will know what you’re paying for." },
];

const timeline = [
  { year: '2018', title: 'A peepal tree on a brownfield plot',   desc: 'Vikram leases a half-acre on Golf Course Road. The big tree at the centre is the only thing he refuses to cut.' },
  { year: '2019', title: 'First cabanas, hand-built',            desc: 'Six wooden cabanas come up around the trunk. The fairy lights are tested for three weeks.' },
  { year: '2020', title: 'Soft-opened in lockdown',             desc: 'Outdoor seating meets a city desperate for fresh air. Word spreads.' },
  { year: '2022', title: 'Sunday acoustic begins',              desc: 'We swap the speakers for an artist with a guitar. The format never leaves.' },
  { year: '2024', title: 'Six cabanas become twelve',           desc: 'The garden doubles. The tree, mercifully, has more room than ever.' },
  { year: '2026', title: 'Today',                               desc: '50,000+ followers. 2,800+ reviews. One big tree.' },
];

const team = [
  { name: 'Vikram Bhatia', role: 'Founder',         bio: 'Walked away from a corner-office job to plant a tree.', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80' },
  { name: 'Riya Khanna',   role: 'Head Chef',       bio: 'Trained at The Leela. Stays for the wood-fire oven.',   img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80' },
  { name: 'Aanchal Mehra', role: 'Events Director', bio: '200+ celebrations and counting.',                        img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80' },
  { name: 'Imran Sayed',   role: 'Beverage Lead',   bio: 'The Monsoon cocktail is his.',                           img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80' },
  { name: 'Sneha Patel',   role: 'Front of House',  bio: "Knows every regular's seat preference.",                 img: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80' },
  { name: 'Dev Malhotra',  role: 'Music Director',  bio: 'Curates every Thursday to Sunday set list personally.',  img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80' },
];

const kitchenStats = [
  { num: '40+',  raw: 40,  suffix: '+',    label: 'Dishes on Rotation' },
  { num: '9 yrs',raw: 9,   suffix: ' yrs', label: 'Head Chef Tenure' },
  { num: '0',    raw: 0,   suffix: '',     label: 'Frozen Ingredients' },
  { num: '100%', raw: 100, suffix: '%',    label: 'FSSAI Compliant' },
];

export default function AboutPageClient() {
  const mainRef = useRef<HTMLElement>(null);
  const teamTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 1. HERO — entrance on load ─────────────────────────────────────────
      const heroTl = gsap.timeline({ delay: 0.15 });
      heroTl
        .fromTo('.ah-eyebrow',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }
        )
        .fromTo('.ah-h1',
          { y: 60, opacity: 0, skewY: 1.5 },
          { y: 0, opacity: 1, skewY: 0, duration: 0.85, ease: 'power4.out' }, '-=0.3'
        )
        .fromTo('.ah-intro',
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' }, '-=0.45'
        )
        .fromTo('.ah-stat',
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08 }, '-=0.35'
        );

      // ── 2. ORIGIN — split left / right reveal ────────────────────────────
      gsap.fromTo('.origin-label',
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.origin-section', start: 'top 78%', once: true },
        }
      );
      gsap.fromTo('.origin-h2',
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: '.origin-section', start: 'top 78%', once: true },
        }
      );
      gsap.fromTo('.origin-para',
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.14, delay: 0.2,
          scrollTrigger: { trigger: '.origin-section', start: 'top 75%', once: true },
        }
      );
      gsap.fromTo('.origin-img-wrap',
        { x: 70, opacity: 0, scale: 0.94 },
        {
          x: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.origin-section', start: 'top 78%', once: true },
        }
      );

      // ── 3. VALUES — roman numeral pop + cards ───────────────────────────
      const valTl = gsap.timeline({
        scrollTrigger: { trigger: '.values-section', start: 'top 82%', once: true },
      });
      valTl
        .fromTo('.values-label', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo('.values-h2',    { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }, '-=0.3');

      // Roman numerals scale in from above
      gsap.fromTo('.val-roman',
        { y: -30, scale: 0.6, opacity: 0 },
        {
          y: 0, scale: 1, opacity: 0.22, duration: 0.85, ease: 'back.out(1.8)', stagger: 0.1,
          scrollTrigger: { trigger: '.values-grid', start: 'top 84%', once: true },
        }
      );
      gsap.fromTo('.val-title',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1, delay: 0.2,
          scrollTrigger: { trigger: '.values-grid', start: 'top 84%', once: true },
        }
      );
      gsap.fromTo('.val-desc',
        { y: 18, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.1, delay: 0.35,
          scrollTrigger: { trigger: '.values-grid', start: 'top 84%', once: true },
        }
      );

      // ── 4. TIMELINE — line draw + item fan in ───────────────────────────
      const tlHeaderTl = gsap.timeline({
        scrollTrigger: { trigger: '.timeline-section', start: 'top 80%', once: true },
      });
      tlHeaderTl
        .fromTo('.tl-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo('.tl-h2',    { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }, '-=0.3');

      // Vertical line grows with scroll scrub
      gsap.fromTo('.tl-line',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, ease: 'none',
          scrollTrigger: {
            trigger: '.tl-container',
            start: 'top 68%',
            end: 'bottom 75%',
            scrub: 1.2,
          },
        }
      );

      // Each item slides in from left + dot pops
      ScrollTrigger.batch('.tl-item', {
        start: 'top 88%',
        once: true,
        onEnter: (els) => {
          gsap.fromTo(els,
            { x: -48, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12 }
          );
        },
      });
      ScrollTrigger.batch('.tl-dot',
        {
          start: 'top 88%',
          once: true,
          onEnter: (els) => {
            gsap.fromTo(els,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.5)', stagger: 0.12 }
            );
          },
        }
      );

      // ── 5. TEAM — header then card batch ────────────────────────────────
      const teamHdrTl = gsap.timeline({
        scrollTrigger: { trigger: '.team-section', start: 'top 80%', once: true },
      });
      teamHdrTl
        .fromTo('.team-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo('.team-h2',    { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }, '-=0.3')
        .fromTo('.team-sub',   { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, '-=0.3');

      teamTriggersRef.current = ScrollTrigger.batch('.team-card', {
        start: 'top 90%',
        once: true,
        onEnter: (els) =>
          gsap.fromTo(els,
            { y: 50, opacity: 0, scale: 0.94 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.09 }
          ),
      });

      // ── 6. KITCHEN — image from left + parallax, text from right ────────
      gsap.fromTo('.kitchen-img',
        { x: -70, opacity: 0, scale: 0.95 },
        {
          x: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.kitchen-section', start: 'top 78%', once: true },
        }
      );
      // Subtle parallax on the kitchen image while scrolling
      gsap.to('.kitchen-img img',
        {
          yPercent: -10, ease: 'none',
          scrollTrigger: {
            trigger: '.kitchen-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo('.kitchen-label', { x: 40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.55, ease: 'power2.out',
        scrollTrigger: { trigger: '.kitchen-section', start: 'top 78%', once: true },
      });
      gsap.fromTo('.kitchen-h2', { x: 50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: '.kitchen-section', start: 'top 78%', once: true },
      });
      gsap.fromTo('.kitchen-para', { x: 35, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.12, delay: 0.2,
        scrollTrigger: { trigger: '.kitchen-section', start: 'top 75%', once: true },
      });

      // Kitchen stats count-up
      const statEls = document.querySelectorAll<HTMLElement>('.kitchen-stat-num');
      statEls.forEach((el, i) => {
        const target = kitchenStats[i]?.raw ?? 0;
        const suffix = kitchenStats[i]?.suffix ?? '';
        if (!target) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 1.6, ease: 'power2.out',
          delay: i * 0.1,
          onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
          scrollTrigger: { trigger: '.kitchen-stats', start: 'top 85%', once: true },
        });
      });

      // ── 7. CTA — scale reveal with back.out ──────────────────────────────
      const ctaTl = gsap.timeline({
        scrollTrigger: { trigger: '.about-cta', start: 'top 80%', once: true },
      });
      ctaTl
        .fromTo('.cta-label', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo('.cta-h2',    { y: 36, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'power3.out' }, '-=0.3')
        .fromTo('.cta-para',  { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, '-=0.4')
        .fromTo('.cta-btns',  { y: 20, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.6)' }, '-=0.3');

    }, mainRef);

    return () => {
      teamTriggersRef.current.forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <main ref={mainRef} style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '100vh', minHeight: '640px', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1484659619207-9165d119dafe?w=1600&q=85"
          alt="The Big Tree Cafe outdoor ambience"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,13,8,0.5) 0%, rgba(10,13,8,0.68) 55%, rgba(10,13,8,0.92) 100%)' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '120px' }}>
          <div className="content-wrap">
            <p className="ah-eyebrow" style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>About</p>
            <h1 className="ah-h1 font-serif" style={{ fontSize: 'clamp(38px, 6vw, 82px)', color: 'var(--color-gold-cream)', lineHeight: 1.08, maxWidth: '780px' }}>
              We started with <em>one tree.</em><br />
              Everything else grew<br />
              around it.
            </h1>
            <p className="ah-intro font-serif" style={{ fontStyle: 'italic', marginTop: '24px', fontSize: 'clamp(14px, 1.3vw, 17px)', color: 'var(--color-gold-cream)', opacity: 0.72, maxWidth: '540px', lineHeight: 1.75 }}>
              An open-air evening in a city that doesn&apos;t know how to slow down. Cabanas under fairy lights, live acoustic, wood-fire kitchen, and the same 60-year-old peepal we built it all around.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(10,13,8,0.82)', borderTop: '1px solid rgba(200,145,58,0.15)', backdropFilter: 'blur(10px)' }}>
          <div className="content-wrap" style={{ paddingTop: '20px', paddingBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            {stats.map((s) => (
              <div key={s.label} className="ah-stat" style={{ textAlign: 'center', flex: '1', minWidth: '80px' }}>
                <p className="font-serif" style={{ fontSize: 'clamp(20px, 2.2vw, 30px)', color: 'var(--color-gold-cream)', lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px', color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Origin ──────────────────────────────────────────────────────── */}
      <section className="origin-section about-section-pad">
        <div className="content-wrap about-origin-grid">
          <div>
            <p className="origin-label" style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>The Origin</p>
            <h2 className="origin-h2 font-serif" style={{ fontSize: 'clamp(26px, 3.2vw, 50px)', color: 'var(--color-gold-cream)', lineHeight: 1.15, marginBottom: '32px' }}>
              A peepal tree on Golf Course Road, and a stubborn idea.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '15px', lineHeight: '1.8', color: 'var(--color-muted)' }}>
              <p className="origin-para">In 2018, the plot at 4-B was due to be cleared for another glass-tower restaurant. The 60-year-old peepal at its centre was scheduled to come down on a Wednesday.</p>
              <p className="origin-para">Vikram leased the plot the Monday before. The tree stayed. The architects who agreed to design <em style={{ color: 'var(--color-gold-cream)', fontStyle: 'italic' }}>around</em> it stayed. Everyone else walked.</p>
              <p className="origin-para">Two years later, the first cabanas opened during a lockdown — wood-built, fairy-lit, six of them in a wide circle. The first guest was a couple on their first anniversary out of quarantine. They still come every May.</p>
            </div>
          </div>

          <div className="origin-img-wrap" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/5' }}>
            <img
              src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=85"
              alt="Food at The Big Tree Cafe"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 24px', background: 'rgba(20,26,16,0.9)', backdropFilter: 'blur(6px)' }}>
              <p style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '4px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>The Big Tree</p>
              <p style={{ fontSize: '14px', color: 'var(--color-gold-cream)', opacity: 0.85 }}>Ficus religiosa · ~60 years · still here.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────────────────── */}
      <section className="values-section about-section-pad" style={{ background: '#121D0F' }}>
        <div className="content-wrap">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p className="values-label" style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>What We Believe</p>
            <h2 className="values-h2 font-serif" style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', color: 'var(--color-gold-cream)' }}>
              Four rules, <em>quietly held.</em>
            </h2>
          </div>

          <div className="values-grid about-values-grid">
            {values.map((v) => (
              <div key={v.roman}>
                <p className="val-roman font-serif" style={{ fontStyle: 'italic', fontSize: 'clamp(52px, 5.5vw, 76px)', color: 'var(--color-gold)', opacity: 0.22, lineHeight: 1, marginBottom: '20px' }}>{v.roman}</p>
                <h3 className="val-title font-serif" style={{ fontSize: '20px', color: 'var(--color-gold-cream)', marginBottom: '12px' }}>{v.title}</h3>
                <p className="val-desc" style={{ fontSize: '14px', lineHeight: '1.75', color: 'var(--color-muted)' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────────────────────────── */}
      <section className="timeline-section about-section-pad">
        <div className="content-wrap">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p className="tl-label" style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>How We Got Here</p>
            <h2 className="tl-h2 font-serif" style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', color: 'var(--color-gold-cream)' }}>
              Eight years, <em>one garden.</em>
            </h2>
          </div>

          <div className="tl-container" style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
            <div className="tl-line" style={{ position: 'absolute', left: '8px', top: '10px', bottom: '10px', width: '1px', background: 'rgba(200,145,58,0.35)', zIndex: 0 }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {timeline.map((item) => (
                <div key={item.year} className="tl-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '28px' }}>
                  <div className="tl-dot" style={{ flexShrink: 0, marginTop: '4px', width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--color-gold)', background: 'var(--color-bg)', position: 'relative', zIndex: 1 }} />
                  <div>
                    <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>{item.year}</p>
                    <h3 className="font-serif" style={{ fontSize: '20px', color: 'var(--color-gold-cream)', marginBottom: '8px' }}>{item.title}</h3>
                    <p style={{ fontSize: '14px', lineHeight: '1.75', color: 'var(--color-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ────────────────────────────────────────────────────────── */}
      <section className="team-section about-section-pad" style={{ background: 'var(--color-bg-card)' }}>
        <div className="content-wrap">
          <div style={{ marginBottom: '48px' }}>
            <p className="team-label" style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>The Team</p>
            <h2 className="team-h2 font-serif" style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', color: 'var(--color-gold-cream)', marginBottom: '12px' }}>
              The six who keep <em>the lights on.</em>
            </h2>
            <p className="team-sub" style={{ fontSize: '14px', color: 'var(--color-muted)' }}>Plus thirty-eight more — servers, cooks, gardeners, valets — without whom there&apos;s no garden.</p>
          </div>

          <div className="about-team-grid">
            {team.map((member) => (
              <div key={member.name} className="team-card group" style={{ borderRadius: '16px', overflow: 'hidden', background: 'var(--color-bg)', border: '1px solid rgba(200,145,58,0.1)', cursor: 'pointer' }}>
                <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                  <img src={member.img} alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="group-hover:scale-105" />
                </div>
                <div style={{ padding: '16px' }}>
                  <p className="font-serif" style={{ fontSize: '15px', color: 'var(--color-gold-cream)', marginBottom: '4px' }}>{member.name}</p>
                  <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>{member.role}</p>
                  <p style={{ fontSize: '12px', lineHeight: '1.6', color: 'var(--color-muted)' }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Kitchen ─────────────────────────────────────────────────────── */}
      <section className="kitchen-section about-section-pad">
        <div className="content-wrap about-kitchen-grid">
          <div className="kitchen-img" style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/5' }}>
            <img
              src="https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=85"
              alt="Wood-fire kitchen at The Big Tree Cafe"
              style={{ width: '100%', height: '115%', objectFit: 'cover', willChange: 'transform' }}
            />
          </div>

          <div>
            <p className="kitchen-label" style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>The Kitchen</p>
            <h2 className="kitchen-h2 font-serif" style={{ fontSize: 'clamp(26px, 3vw, 44px)', color: 'var(--color-gold-cream)', lineHeight: 1.2, marginBottom: '24px' }}>
              Wood-fire at the centre,<br />
              <em>everything else built around.</em>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', lineHeight: '1.8', color: 'var(--color-muted)', marginBottom: '32px' }}>
              <p className="kitchen-para">Chef Riya Khanna runs a small open-kitchen pass with a single wood-fired oven and two charcoal grills. Most of the menu touches one of those three flames before it leaves the line.</p>
              <p className="kitchen-para">Greens come from a 2-acre farm in Karnal that we&apos;ve worked with since 2021. Sourdough is fermented in-house. The dairy is single-origin from a Punjab co-op. The cheese, sadly, is still imported — we&apos;re working on it.</p>
            </div>

            <div className="kitchen-stats" style={{ borderTop: '1px solid rgba(200,145,58,0.15)', paddingTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 32px' }}>
              {kitchenStats.map((s, i) => (
                <div key={s.label}>
                  <p className="kitchen-stat-num font-serif" data-index={i} style={{ fontSize: 'clamp(24px, 2.5vw, 34px)', color: 'var(--color-gold)', marginBottom: '4px' }}>{s.num}</p>
                  <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="about-cta about-section-pad" style={{ background: 'var(--color-bg-card)', textAlign: 'center' }}>
        <div className="content-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p className="cta-label" style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px', color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>Come Visit</p>
          <h2 className="cta-h2 font-serif" style={{ fontSize: 'clamp(32px, 5vw, 72px)', color: 'var(--color-gold-cream)', marginBottom: '20px' }}>
            Best understood <em>in person.</em>
          </h2>
          <p className="cta-para" style={{ fontSize: '15px', lineHeight: '1.75', color: 'var(--color-muted)', maxWidth: '460px', marginBottom: '40px', textAlign: 'center' }}>
            The cabanas, the tree, the lights, the smoke off the oven — none of this photographs the way it feels.
          </p>
          <div className="cta-btns" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/reserve"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '100px', padding: '14px 32px', fontSize: '14px', fontWeight: 500, background: 'var(--color-gold)', color: 'var(--color-bg)', textDecoration: 'none', transition: 'opacity 0.2s' }}>
              Reserve a table →
            </Link>
            <Link href="/gallery"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '100px', padding: '14px 32px', fontSize: '14px', fontWeight: 500, border: '1px solid rgba(200,145,58,0.45)', color: 'var(--color-gold-cream)', textDecoration: 'none' }}>
              Browse the gallery
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
