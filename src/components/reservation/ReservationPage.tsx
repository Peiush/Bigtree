'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────
type FormState = {
  date: string;
  guests: number;
  occasion: string;
  seatType: string;
  timeSlot: string;
  name: string;
  phone: string;
  email: string;
  specialReq: string;
  preOrder: boolean;
};

// ── Constants ──────────────────────────────────────────────────────────────────
const STEPS = ['Date & Guests', 'Seating', 'Time', 'Your Details'];

const OCCASIONS = ['Regular dining', 'Date Night', 'Birthday', 'Anniversary', 'Corporate', 'Other'];

const SEAT_TYPES = [
  {
    id: 'outdoor',
    label: 'Outdoor Garden',
    capacity: '2–8 guests',
    desc: 'Open-air tables under the canopy with fairy lights overhead.',
    surcharge: null,
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=480&q=80&fit=crop',
  },
  {
    id: 'cabana',
    label: 'Private Cabana',
    capacity: '2–12 guests',
    desc: 'Your own wooden hideaway. Includes complimentary decor setup.',
    surcharge: 500,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=480&q=80&fit=crop',
  },
  {
    id: 'indoor',
    label: 'Indoor',
    capacity: '2–20 guests',
    desc: 'Climate-controlled, larger groups welcome. Same warm aesthetic.',
    surcharge: null,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=480&q=80&fit=crop',
  },
];

const LUNCH_SLOTS = ['12:00 PM', '1:30 PM', '3:00 PM'];
const EVENING_SLOTS = ['6:00 PM', '7:30 PM', '8:00 PM', '9:30 PM'];
const FULL_SLOTS = new Set(['7:30 PM', '8:00 PM']);
const FULL_DAYS = new Set([19, 22, 27]);
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DOW = ['M','T','W','T','F','S','S'];

// ── Seat icons (custom SVG) ────────────────────────────────────────────────────
const SeatIcons: Record<string, React.ReactNode> = {
  outdoor: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3"/><path d="M12 8v13M8 21h8M6 12c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
    </svg>
  ),
  cabana: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21h6M12 3v3M7.5 9.5L12 6l4.5 3.5"/><path d="M10 9.5h4v5h-4z"/><line x1="12" y1="14.5" x2="12" y2="21"/>
    </svg>
  ),
  indoor: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  ),
};

// ── Custom Calendar ────────────────────────────────────────────────────────────
function MiniCalendar({ value, onChange }: { value: string; onChange: (d: string) => void }) {
  const todayObj = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(todayObj.getFullYear());
  const [viewMonth, setViewMonth] = useState(todayObj.getMonth());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayRaw = new Date(viewYear, viewMonth, 1).getDay();
  const offset = (firstDayRaw + 6) % 7;

  const cells: (number | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isPast = (d: number) => {
    const dt = new Date(viewYear, viewMonth, d);
    return dt < new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate());
  };
  const isToday = (d: number) =>
    d === todayObj.getDate() && viewMonth === todayObj.getMonth() && viewYear === todayObj.getFullYear();
  const isFull = (d: number) => FULL_DAYS.has(d);
  const dateStr = (d: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const isSelected = (d: number) => value === dateStr(d);

  return (
    <div style={{ background: 'var(--color-bg)', border: '1px solid rgba(200,145,58,0.15)', borderRadius: '16px', padding: '24px' }}>
      {/* Month nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-gold)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-muted)'; }}>
          <ChevronLeft size={16} />
        </button>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'var(--color-text)', letterSpacing: '1px' }}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-gold)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-muted)'; }}>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '6px' }}>
        {DOW.map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: '10px', color: 'var(--color-muted)', fontFamily: 'DM Mono, monospace', padding: '4px 0' }}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const past = isPast(day);
          const full = isFull(day);
          const today = isToday(day);
          const selected = isSelected(day);
          const available = !past && !full;
          return (
            <button key={i} disabled={past || full} onClick={() => available && onChange(dateStr(day))}
              style={{
                position: 'relative', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '5px 2px 9px', borderRadius: '8px',
                background: selected ? 'var(--color-gold)' : 'transparent',
                border: today && !selected ? '1px solid rgba(200,145,58,0.45)' : '1px solid transparent',
                color: selected ? 'var(--color-bg)' : past || full ? 'rgba(138,128,112,0.28)' : 'var(--color-text)',
                cursor: available ? 'pointer' : 'default',
                fontSize: '13px', fontWeight: selected ? '600' : '400',
                textDecoration: full ? 'line-through' : 'none',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={e => { if (available && !selected) e.currentTarget.style.background = 'rgba(200,145,58,0.1)'; }}
              onMouseLeave={e => { if (!selected) e.currentTarget.style.background = 'transparent'; }}>
              {day}
              {available && (
                <span style={{
                  position: 'absolute', bottom: '3px',
                  width: '3px', height: '3px', borderRadius: '50%',
                  background: selected ? 'rgba(10,13,8,0.5)' : 'var(--color-gold)',
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(200,145,58,0.1)' }}>
        {[
          { dot: <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-gold)', display: 'inline-block' }} />, label: 'SELECTED' },
          { dot: <span style={{ width: '8px', height: '8px', borderRadius: '50%', border: '1px solid rgba(200,145,58,0.5)', display: 'inline-block' }} />, label: 'TODAY' },
          { dot: <span style={{ fontSize: '10px', color: 'rgba(138,128,112,0.5)', textDecoration: 'line-through' }}>00</span>, label: 'FULL' },
        ].map(({ dot, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {dot}
            <span style={{ fontSize: '9px', color: 'var(--color-muted)', fontFamily: 'DM Mono, monospace', letterSpacing: '1px' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Step Indicator ─────────────────────────────────────────────────────────────
function StepBar({ step }: { step: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '36px' }}>
      {STEPS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' as unknown as number }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', flexShrink: 0 }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                background: active ? 'var(--color-gold)' : 'transparent',
                border: done ? '1.5px solid var(--color-muted)' : active ? 'none' : '1.5px solid rgba(200,145,58,0.22)',
                color: done ? 'var(--color-muted)' : active ? 'var(--color-bg)' : 'rgba(138,128,112,0.4)',
                fontSize: '12px', fontWeight: '600',
                transition: 'all 0.25s',
              }}>
                {done ? <Check size={12} /> : i + 1}
              </div>
              <span style={{
                fontSize: '11px', fontFamily: 'DM Mono, monospace', letterSpacing: '0.8px',
                color: active ? 'var(--color-text)' : done ? 'var(--color-muted)' : 'rgba(138,128,112,0.45)',
                textTransform: 'uppercase', fontWeight: active ? '500' : '400',
                transition: 'color 0.25s', whiteSpace: 'nowrap',
              }}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                flex: 1, height: '1px', margin: '0 14px',
                background: i < step ? 'rgba(138,128,112,0.5)' : 'rgba(200,145,58,0.14)',
                transition: 'background 0.25s',
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Nav Buttons ────────────────────────────────────────────────────────────────
function NavButtons({
  isFirst = false,
  canContinue,
  continueLabel = 'Continue →',
  onBack,
  onContinue,
}: {
  isFirst?: boolean;
  canContinue: boolean;
  continueLabel?: string;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div style={{ display: 'flex', justifyContent: isFirst ? 'flex-end' : 'space-between', alignItems: 'center', marginTop: '20px' }}>
      {!isFirst && (
        <button onClick={onBack}
          style={{
            padding: '11px 24px', borderRadius: '100px',
            border: '1.5px solid rgba(200,145,58,0.3)', background: 'transparent',
            color: 'var(--color-gold)', fontSize: '13px', fontWeight: '500',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,145,58,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
          ← Back
        </button>
      )}
      <button onClick={onContinue} disabled={!canContinue}
        style={{
          padding: '11px 28px', borderRadius: '100px',
          background: canContinue ? 'var(--color-gold)' : 'rgba(200,145,58,0.18)',
          border: 'none',
          color: canContinue ? 'var(--color-bg)' : 'rgba(200,145,58,0.38)',
          fontSize: '13px', fontWeight: '500', letterSpacing: '0.3px',
          cursor: canContinue ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
        }}
        onMouseEnter={e => { if (canContinue) e.currentTarget.style.background = 'var(--color-gold-light)'; }}
        onMouseLeave={e => { if (canContinue) e.currentTarget.style.background = 'var(--color-gold)'; }}>
        {continueLabel}
      </button>
    </div>
  );
}

// ── Time Slot Button ───────────────────────────────────────────────────────────
function TimeSlot({ time, selected, full, onClick }: { time: string; selected: boolean; full: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={full}
      style={{
        padding: '18px 8px', borderRadius: '10px', textAlign: 'center',
        border: selected ? '2px solid var(--color-gold)' : full ? '1px dashed rgba(200,145,58,0.18)' : '1.5px solid rgba(200,145,58,0.2)',
        background: selected ? 'var(--color-gold)' : 'var(--color-bg)',
        color: selected ? 'var(--color-bg)' : full ? 'rgba(138,128,112,0.3)' : 'var(--color-text)',
        cursor: full ? 'not-allowed' : 'pointer',
        transition: 'all 0.18s',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
      }}
      onMouseEnter={e => { if (!full && !selected) e.currentTarget.style.borderColor = 'rgba(200,145,58,0.5)'; }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = full ? 'rgba(200,145,58,0.18)' : 'rgba(200,145,58,0.2)'; }}>
      <span style={{ fontSize: '15px', fontFamily: 'DM Mono, monospace', letterSpacing: '0.5px', textDecoration: full ? 'line-through' : 'none' }}>{time}</span>
      {full && <span style={{ fontSize: '9px', fontFamily: 'DM Mono, monospace', letterSpacing: '1.5px', opacity: 0.6 }}>FULL</span>}
    </button>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ReservationPageClient() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId] = useState(`BTC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`);

  const [form, setForm] = useState<FormState>({
    date: params.get('date') || '',
    guests: parseInt(params.get('guests') || '2'),
    occasion: 'Regular dining',
    seatType: params.get('seat') || 'outdoor',
    timeSlot: '',
    name: '',
    phone: '',
    email: '',
    specialReq: '',
    preOrder: false,
  });

  const upd = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm(p => ({ ...p, [k]: v }));
  const selectedSeat = SEAT_TYPES.find(s => s.id === form.seatType)!;
  const totalCharge = selectedSeat?.surcharge ?? 0;

  const formattedDate = useMemo(() => {
    if (!form.date) return '';
    const [y, m, d] = form.date.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  }, [form.date]);

  const shortDate = useMemo(() => {
    if (!form.date) return '';
    const [y, m, d] = form.date.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }).toUpperCase();
  }, [form.date]);

  // ── Confirmed screen ─────────────────────────────────────────────────────────
  if (confirmed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px' }}>
        <div style={{ maxWidth: '640px', width: '100%', textAlign: 'center' }}>

          {/* Gold check circle */}
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', background: 'rgba(200,145,58,0.07)', border: '1.5px solid var(--color-gold)' }}>
            <Check size={32} style={{ color: 'var(--color-gold)' }} />
          </div>

          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--color-gold)', letterSpacing: '3px', marginBottom: '16px', textTransform: 'uppercase' }}>
            You're Confirmed
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(44px, 7vw, 70px)', color: 'var(--color-text)', lineHeight: 1.1, marginBottom: '16px', fontWeight: 400 }}>
            See you under the trees.
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-muted)', marginBottom: '40px' }}>
            A WhatsApp confirmation is on its way to {form.phone}.
          </p>

          {/* Booking card — 2-col grid */}
          <div style={{ borderRadius: '16px', padding: '32px', background: 'var(--color-bg-card)', border: '1px solid rgba(200,145,58,0.12)', textAlign: 'left', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '18px', borderBottom: '1px solid rgba(200,145,58,0.1)' }}>
              <span style={{ fontSize: '10px', color: 'var(--color-muted)', fontFamily: 'DM Mono, monospace', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Booking ID</span>
              <span style={{ fontSize: '14px', color: 'var(--color-gold)', fontFamily: 'DM Mono, monospace', letterSpacing: '1px' }}>{bookingId}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px' }}>
              {[
                { label: 'Date', value: formattedDate },
                { label: 'Time', value: form.timeSlot },
                { label: 'Seating', value: selectedSeat?.label },
                { label: 'Party of', value: String(form.guests) },
                { label: 'Guest', value: form.name },
                { label: 'Occasion', value: form.occasion },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '1.5px', color: 'var(--color-muted)', textTransform: 'uppercase', marginBottom: '5px' }}>{label}</p>
                  <p style={{ fontSize: '15px', color: 'var(--color-text)', lineHeight: 1.4 }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
            <a href={`https://wa.me/918183959595?text=Booking+ID%3A+${bookingId}`} target="_blank" rel="noreferrer"
              style={{ padding: '13px 22px', borderRadius: '100px', fontSize: '13px', fontWeight: '500', background: 'var(--color-gold)', color: 'var(--color-bg)', textDecoration: 'none', transition: 'background 0.2s' }}>
              Share on WhatsApp
            </a>
            <button style={{ padding: '13px 22px', borderRadius: '100px', fontSize: '13px', fontWeight: '500', background: 'none', border: '1.5px solid rgba(200,145,58,0.35)', color: 'var(--color-gold)', cursor: 'pointer', transition: 'all 0.2s' }}>
              + Google Calendar
            </button>
            <button style={{ padding: '13px 22px', borderRadius: '100px', fontSize: '13px', fontWeight: '500', background: 'none', border: '1.5px solid rgba(200,145,58,0.35)', color: 'var(--color-gold)', cursor: 'pointer', transition: 'all 0.2s' }}>
              Download PDF
            </button>
          </div>

          <a href="/menu" style={{ fontSize: '13px', color: 'var(--color-gold)', textDecoration: 'none' }}>
            Explore the menu before you arrive →
          </a>
        </div>
      </div>
    );
  }

  // ── Page shell ───────────────────────────────────────────────────────────────
  const card = (children: React.ReactNode, extraStyle?: React.CSSProperties) => (
    <div style={{
      background: 'var(--color-bg-card)',
      border: '1px solid rgba(200,145,58,0.12)',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 12px 48px rgba(0,0,0,0.3)',
      ...extraStyle,
    }}>
      {children}
    </div>
  );

  const sectionHead = (text: string, sub?: string) => (
    <div style={{ marginBottom: sub ? '8px' : '28px' }}>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '30px', color: 'var(--color-gold-light)', fontWeight: '400', lineHeight: 1.2 }}>{text}</h2>
      {sub && <p style={{ fontSize: '14px', color: 'var(--color-muted)', marginTop: '6px', marginBottom: '28px' }}>{sub}</p>}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>

        {/* ── Page header ── */}
        <div style={{ paddingTop: '24px', marginBottom: '40px' }}>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--color-muted)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '14px' }}>
            Reservation
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(30px, 4vw, 50px)', color: 'var(--color-text)', lineHeight: 1.15, fontWeight: '400', margin: 0 }}>
            Reserve your evening{' '}
            <em style={{ color: 'var(--color-gold-light)', fontStyle: 'italic' }}>under the stars.</em>
          </h1>
        </div>

        {/* ── Step bar ── */}
        <StepBar step={step} />

        {/* ════════════ STEP 0: DATE & GUESTS ════════════ */}
        {step === 0 && (
          <>
            {card(
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
                {/* Left: Calendar */}
                <div>
                  {sectionHead('Pick a date')}
                  <MiniCalendar value={form.date} onChange={v => upd('date', v)} />
                </div>

                {/* Right: Guests + Occasion */}
                <div>
                  {sectionHead('How many guests?')}

                  {/* Guest counter */}
                  <div style={{ background: 'var(--color-bg)', border: '1px solid rgba(200,145,58,0.15)', borderRadius: '14px', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px' }}>
                    <div>
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: 'var(--color-text)', lineHeight: 1, marginBottom: '4px' }}>{form.guests}</p>
                      <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--color-muted)', letterSpacing: '1.5px' }}>GUESTS</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button onClick={() => upd('guests', Math.max(1, form.guests - 1))}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid rgba(200,145,58,0.3)', background: 'transparent', color: 'var(--color-gold)', cursor: 'pointer', fontSize: '20px', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,145,58,0.1)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>−</button>
                      <span style={{ minWidth: '24px', textAlign: 'center', fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: 'var(--color-text)' }}>{form.guests}</span>
                      <button onClick={() => upd('guests', Math.min(50, form.guests + 1))}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-gold)', border: 'none', color: 'var(--color-bg)', cursor: 'pointer', fontSize: '20px', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-gold-light)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-gold)'; }}>+</button>
                    </div>
                  </div>

                  {sectionHead("What's the occasion?")}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {OCCASIONS.map(o => (
                      <button key={o} onClick={() => upd('occasion', o)}
                        style={{
                          padding: '8px 18px', borderRadius: '100px',
                          border: form.occasion === o ? '1.5px solid var(--color-gold)' : '1.5px solid rgba(200,145,58,0.2)',
                          background: form.occasion === o ? 'rgba(200,145,58,0.1)' : 'transparent',
                          color: form.occasion === o ? 'var(--color-gold)' : 'var(--color-muted)',
                          fontSize: '13px', cursor: 'pointer', transition: 'all 0.18s',
                        }}
                        onMouseEnter={e => { if (form.occasion !== o) { e.currentTarget.style.borderColor = 'rgba(200,145,58,0.4)'; e.currentTarget.style.color = 'var(--color-text)'; } }}
                        onMouseLeave={e => { if (form.occasion !== o) { e.currentTarget.style.borderColor = 'rgba(200,145,58,0.2)'; e.currentTarget.style.color = 'var(--color-muted)'; } }}>
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <NavButtons isFirst canContinue={!!form.date} onBack={() => {}} onContinue={() => setStep(1)} />
          </>
        )}

        {/* ════════════ STEP 1: SEATING ════════════ */}
        {step === 1 && (
          <>
            {card(
              <>
                {sectionHead('Choose your seating', 'All three are gorgeous — pick the vibe you\'re after.')}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  {SEAT_TYPES.map(s => (
                    <button key={s.id} onClick={() => upd('seatType', s.id)}
                      style={{
                        textAlign: 'left', padding: 0,
                        borderRadius: '16px', overflow: 'hidden',
                        border: form.seatType === s.id ? '2px solid var(--color-gold)' : '1.5px solid rgba(200,145,58,0.15)',
                        background: 'var(--color-bg)',
                        cursor: 'pointer', transition: 'border-color 0.2s', outline: 'none',
                      }}
                      onMouseEnter={e => { if (form.seatType !== s.id) e.currentTarget.style.borderColor = 'rgba(200,145,58,0.38)'; }}
                      onMouseLeave={e => { if (form.seatType !== s.id) e.currentTarget.style.borderColor = 'rgba(200,145,58,0.15)'; }}>
                      {/* Image */}
                      <div style={{ height: '156px', overflow: 'hidden', position: 'relative', background: 'var(--color-bg-hover)' }}>
                        <img src={s.image} alt={s.label}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: form.seatType === s.id ? 'brightness(1)' : 'brightness(0.75)', transition: 'filter 0.2s' }} />
                        {form.seatType === s.id && (
                          <div style={{ position: 'absolute', top: '10px', right: '10px', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={13} color="var(--color-bg)" />
                          </div>
                        )}
                      </div>
                      {/* Info */}
                      <div style={{ padding: '16px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ color: 'var(--color-gold)', display: 'flex' }}>{SeatIcons[s.id]}</span>
                          <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text)' }}>{s.label}</span>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.55, marginBottom: '14px' }}>{s.desc}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '11px', fontFamily: 'DM Mono, monospace', color: 'var(--color-muted)' }}>{s.capacity}</span>
                          <span style={{ fontSize: '11px', fontFamily: 'DM Mono, monospace', color: s.surcharge ? 'var(--color-gold)' : 'var(--color-muted)', letterSpacing: '0.5px' }}>
                            {s.surcharge ? `+₹${s.surcharge}` : 'NO SURCHARGE'}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
            <NavButtons canContinue onBack={() => setStep(0)} onContinue={() => setStep(2)} />
          </>
        )}

        {/* ════════════ STEP 2: TIME ════════════ */}
        {step === 2 && (
          <>
            {card(
              <>
                {sectionHead('Pick a time')}
                <p style={{ fontSize: '14px', color: 'var(--color-muted)', marginTop: '-20px', marginBottom: '10px' }}>
                  ✦ We recommend 7:30 PM for the best fairy light experience.
                </p>
                {shortDate && (
                  <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--color-gold)', letterSpacing: '1.5px', marginBottom: '28px' }}>{shortDate}</p>
                )}

                {/* Lunch */}
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--color-muted)', letterSpacing: '1.5px', marginBottom: '10px' }}>LUNCH</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
                  {LUNCH_SLOTS.map(t => (
                    <TimeSlot key={t} time={t} selected={form.timeSlot === t} full={FULL_SLOTS.has(t)} onClick={() => !FULL_SLOTS.has(t) && upd('timeSlot', t)} />
                  ))}
                </div>

                {/* Evening */}
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--color-muted)', letterSpacing: '1.5px', marginBottom: '10px' }}>EVENING</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  {EVENING_SLOTS.map(t => (
                    <TimeSlot key={t} time={t} selected={form.timeSlot === t} full={FULL_SLOTS.has(t)} onClick={() => !FULL_SLOTS.has(t) && upd('timeSlot', t)} />
                  ))}
                </div>
              </>
            )}
            <NavButtons canContinue={!!form.timeSlot} onBack={() => setStep(1)} onContinue={() => setStep(3)} />
          </>
        )}

        {/* ════════════ STEP 3: YOUR DETAILS ════════════ */}
        {step === 3 && (
          <>
            {card(
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px' }}>
                {/* Form */}
                <div>
                  {sectionHead('A few details to lock it in')}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {[
                      { key: 'name', label: 'FULL NAME', req: true, type: 'text', placeholder: 'Your full name' },
                      { key: 'phone', label: 'PHONE (WHATSAPP)', req: true, type: 'tel', placeholder: '+91 98 1100 4567' },
                      { key: 'email', label: 'EMAIL', req: true, type: 'email', placeholder: 'your@email.com' },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '1.5px', color: 'var(--color-muted)', marginBottom: '8px' }}>
                          {f.label} {f.req && <span style={{ color: 'var(--color-gold)' }}>*</span>}
                        </label>
                        <input type={f.type} placeholder={f.placeholder}
                          value={(form as unknown as Record<string, string>)[f.key]}
                          onChange={e => upd(f.key as keyof FormState, e.target.value)}
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid rgba(200,145,58,0.2)', color: 'var(--color-text)', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s', fontFamily: 'DM Sans, sans-serif' }}
                          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(200,145,58,0.55)'; }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(200,145,58,0.2)'; }} />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '1.5px', color: 'var(--color-muted)', marginBottom: '8px' }}>
                        SPECIAL REQUESTS / DIETARY NEEDS
                      </label>
                      <textarea rows={4} placeholder="Allergies, accessibility, seating preferences…"
                        value={form.specialReq} onChange={e => upd('specialReq', e.target.value)}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid rgba(200,145,58,0.2)', color: 'var(--color-text)', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'DM Sans, sans-serif', transition: 'border-color 0.2s' }}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(200,145,58,0.55)'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(200,145,58,0.2)'; }} />
                    </div>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={form.preOrder} onChange={e => upd('preOrder', e.target.checked)}
                        style={{ marginTop: '2px', width: '15px', height: '15px', accentColor: 'var(--color-gold)', cursor: 'pointer', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5 }}>
                        Pre-order from the menu so it's waiting when you arrive
                      </span>
                    </label>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <div style={{ background: 'var(--color-bg)', border: '1px solid rgba(200,145,58,0.15)', borderRadius: '14px', padding: '24px' }}>
                    <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '2px', color: 'var(--color-gold)', marginBottom: '20px' }}>YOUR RESERVATION</p>
                    {[
                      ['DATE', formattedDate || '—'],
                      ['TIME', form.timeSlot || '—'],
                      ['SEATING', selectedSeat?.label || '—'],
                      ['GUESTS', `${form.guests} guests`],
                      ['OCCASION', form.occasion],
                    ].map(([l, v]) => (
                      <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
                        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '1px', color: 'var(--color-muted)', flexShrink: 0, paddingTop: '1px' }}>{l}</span>
                        <span style={{ fontSize: '13px', color: 'var(--color-text)', textAlign: 'right', lineHeight: 1.4 }}>{v}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: '1px dashed rgba(200,145,58,0.2)', paddingTop: '16px', marginTop: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '1px', color: 'var(--color-muted)' }}>SETUP FEE</span>
                        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '22px', color: 'var(--color-gold-light)' }}>
                          {totalCharge > 0 ? `₹${totalCharge}` : 'Free'}
                        </span>
                      </div>
                      <p style={{ fontSize: '11px', color: 'var(--color-muted)', lineHeight: 1.5 }}>F&B charged on the night, taxes inclusive.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <NavButtons
              canContinue={!!(form.name && form.phone && form.email)}
              continueLabel="Confirm Reservation"
              onBack={() => setStep(2)}
              onContinue={() => { if (form.name && form.phone && form.email) setConfirmed(true); }}
            />
          </>
        )}

      </div>
    </div>
  );
}
