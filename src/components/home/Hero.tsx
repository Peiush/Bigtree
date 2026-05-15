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
      {/* Background image — brighter outdoor dining scene */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85"
          alt="The Big Tree Cafe outdoor dining"
          className="w-full h-full object-cover"
        />
        {/* Base dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(6,8,5,0.55) 0%, rgba(6,8,5,0.42) 30%, rgba(6,8,5,0.65) 70%, rgba(6,8,5,0.96) 100%)',
          }}
        />
        {/* Radial scrim — darkens the center where text lives */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 60% at 50% 52%, rgba(4,6,3,0.45) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Glowing stars canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <p
          className="text-xs tracking-[3px] uppercase mb-6"
          style={{
            color: 'rgba(255, 251, 251, 0.85)',
            fontFamily: 'DM Mono, monospace',
            textShadow: '0 1px 8px rgba(0,0,0,0.6)',
          }}
        >
          Golf Course Road · Gurgaon · Est. 2020
        </p>

        <h1
          className="font-serif italic font-light leading-[1.1] mb-6"
          style={{
            fontSize: 'clamp(42px, 7vw, 96px)',
            color: 'var(--color-gold-cream)',
            textShadow: '0 2px 24px rgba(0,0,0,0.75), 0 1px 6px rgba(0,0,0,0.5)',
          }}
        >
          Where nature meets<br />
          <span style={{ color: 'var(--color-gold)', textShadow: '0 2px 24px rgba(0,0,0,0.8), 0 0 40px rgba(200,145,58,0.25)' }}>
            good food.
          </span>
        </h1>
        <br></br>

        <p
          className="text-sm md:text-base mb-12 max-w-md uppercase"
          style={{
            color: 'rgba(232,228,216,0.85)',
            fontWeight: 300,
            letterSpacing: '0.22em',
            textShadow: '0 1px 10px rgba(0,0,0,0.7)',
          }}
        >
          Cabanas · Live Music · Open Air Dining
        </p>

        <br></br>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none sm:w-auto">
          <Link
            href="/reserve"
            className="inline-flex items-center justify-center rounded-full font-medium transition-all duration-200"
            style={{
              background: 'var(--color-gold)',
              color: '#0a0d08',
              fontSize: '0.9rem',
              letterSpacing: '0.04em',
              padding: '14px 36px',
              boxShadow: '0 4px 20px rgba(200,145,58,0.35)',
              minWidth: '170px',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--color-gold-light)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(200,145,58,0.5)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--color-gold)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(200,145,58,0.35)';
            }}
          >
            Reserve a Table
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center rounded-full font-medium transition-all duration-200"
            style={{
              border: '1.5px solid var(--color-gold)',
              color: 'var(--color-gold)',
              background: 'rgba(10,13,8,0.35)',
              fontSize: '0.9rem',
              letterSpacing: '0.04em',
              padding: '14px 36px',
              backdropFilter: 'blur(6px)',
              minWidth: '150px',
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
