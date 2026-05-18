'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  speed: number;
  phase: number;
  color: string;
  isSparkle: boolean;
  rotation: number;
  rotSpeed: number;
}

function drawGlowingStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  opacity: number,
  color: string,
  isSparkle: boolean,
  rotation: number
) {
  ctx.save();
  ctx.globalAlpha = opacity;

  // Outer soft glow halo
  const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
  glow.addColorStop(0, color.replace('1)', '0.35)'));
  glow.addColorStop(0.4, color.replace('1)', '0.12)'));
  glow.addColorStop(1, color.replace('1)', '0)'));
  ctx.beginPath();
  ctx.arc(x, y, r * 6, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();

  if (isSparkle) {
    // Cross / 4-point star glint
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    const len = r * 5;
    const thin = r * 0.35;
    ctx.moveTo(0, -len);
    ctx.quadraticCurveTo(thin, -thin, len, 0);
    ctx.quadraticCurveTo(thin, thin, 0, len);
    ctx.quadraticCurveTo(-thin, thin, -len, 0);
    ctx.quadraticCurveTo(-thin, -thin, 0, -len);
    ctx.closePath();
    const starGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, len);
    starGrad.addColorStop(0, color.replace('1)', '1)'));
    starGrad.addColorStop(0.4, color.replace('1)', '0.7)'));
    starGrad.addColorStop(1, color.replace('1)', '0)'));
    ctx.fillStyle = starGrad;
    ctx.fill();
  } else {
    // Simple glowing dot
    const dot = ctx.createRadialGradient(x, y, 0, x, y, r * 2.5);
    dot.addColorStop(0, color.replace('1)', '1)'));
    dot.addColorStop(0.5, color.replace('1)', '0.6)'));
    dot.addColorStop(1, color.replace('1)', '0)'));
    ctx.beginPath();
    ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = dot;
    ctx.fill();
  }

  ctx.restore();
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = [
      'rgba(255,255,220,1)',   // warm white
      'rgba(255,240,180,1)',   // gold-white
      'rgba(210,170,80,1)',    // golden
      'rgba(255,255,255,1)',   // pure white
    ];

    const stars: Star[] = [];
    for (let i = 0; i < 90; i++) {
      const isSparkle = i < 22;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: isSparkle ? Math.random() * 1.8 + 1.2 : Math.random() * 1.2 + 0.4,
        opacity: Math.random(),
        speed: Math.random() * 0.012 + 0.004,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        isSparkle,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.008,
      });
    }

    let frame = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        const op = 0.2 + 0.8 * Math.abs(Math.sin(frame * s.speed + s.phase));
        s.rotation += s.rotSpeed;
        drawGlowingStar(ctx, s.x, s.y, s.r, op, s.color, s.isSparkle, s.rotation);
      });
      frame++;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100svh', minHeight: '600px' }}>
      {/* Background — open-air cabana dining scene */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1600&q=85"
          alt="The Big Tree Cafe outdoor dining"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 55%' }}
        />
        {/* Gradient: dark at top over the light image, eases mid, deeper at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(5,7,4,0.62) 0%, rgba(5,7,4,0.42) 35%, rgba(5,7,4,0.55) 65%, rgba(5,7,4,0.92) 100%)',
          }}
        />
        {/* Warm amber bloom — richness without muddying the scene */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 48%, rgba(160,105,15,0.12) 0%, transparent 68%)',
          }}
        />
      </div>

      {/* Glowing stars canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Content — centred, max-width capped so headline never bleeds edge-to-edge */}
      <div
        className="relative z-10 flex flex-col h-full"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        {/* Location tag */}
        <p
          style={{
            fontSize: '12px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '28px',
            color: 'rgb(255, 183, 3)',
            fontFamily: 'DM Mono, monospace',
            textShadow: '0 1px 12px rgba(0,0,0,0.95), 0 0 28px rgba(0,0,0,0.7)',
          }}
        >
          Golf Course Road · Gurgaon · Est. 2020
        </p>

        {/* Headline — constrained so it never touches the viewport edges */}
        <h1
          className="font-serif italic font-light"
          style={{
            fontSize: 'clamp(40px, 6.5vw, 80px)',
            lineHeight: 1.13,
            marginBottom: '24px',
            maxWidth: '820px',
            width: '100%',
          }}
        >
          <span style={{
            display: 'block',
            color: '#F0E6CC',
            textShadow: '0 2px 16px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)',
          }}>
            Where nature meets
          </span>
          <span style={{
            display: 'block',
            color: '#D4A84E',
            textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8), 0 0 50px rgba(195,140,35,0.55)',
          }}>
            good food.
          </span>
        </h1>

        {/* Subtitle */}
        {/* <p
          style={{
            fontSize: 'clamp(10px, 1.6vw, 13px)',
            marginBottom: '40px',
            color: 'rgba(255,248,230,1)',
            fontWeight: 400,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontFamily: 'DM Mono, monospace',
            background: 'rgba(5,7,4,0.38)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '8px 24px',
            borderRadius: '100px',
            border: '1px solid rgba(200,160,60,0.25)',
          }}
        >
          Cabanas · Live Music · Open Air Dining
        </p> */}

        <br></br>
        <br></br>
        <br></br>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '14px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/reserve"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '100px', fontWeight: 500, transition: 'all 0.25s',
              background: 'var(--color-gold)', color: '#0a0d08',
              fontSize: '13px', letterSpacing: '0.06em', padding: '13px 32px',
              boxShadow: '0 4px 20px rgba(200,145,58,0.4)',
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--color-gold-light)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(200,145,58,0.55)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--color-gold)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(200,145,58,0.4)';
            }}
          >
            Reserve a Table
          </Link>
          <Link
            href="/menu"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '100px', fontWeight: 500, transition: 'all 0.25s',
              border: '1.5px solid var(--color-gold)', color: 'var(--color-gold)',
              background: 'rgba(10,13,8,0.35)', fontSize: '13px',
              letterSpacing: '0.06em', padding: '13px 32px',
              backdropFilter: 'blur(6px)', textDecoration: 'none', whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(200,145,58,0.18)';
              (e.currentTarget as HTMLElement).style.color = 'var(--color-gold-light)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold-light)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(10,13,8,0.35)';
              (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold)';
            }}
          >
            View Menu
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <span className="text-xs tracking-[3px] uppercase" style={{ color: 'rgba(200,145,58,0.7)', fontFamily: 'DM Mono, monospace' }}>
          Scroll
        </span>
        <ChevronDown size={20} className="animate-bounce" style={{ color: 'var(--color-gold)' }} />
      </div>
    </section>
  );
}
