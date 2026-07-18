'use client';
import { useState, useEffect, type CSSProperties } from 'react';
import { FONT } from '../_shared/theme';

type DigitProps = { digit: string; cardH: number; cardW: number; fs: number };

function FlipDigit({ digit, cardH, cardW, fs }: DigitProps) {
  const [cur, setCur] = useState(digit);
  const [nxt, setNxt] = useState(digit);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (digit === cur) return;
    setNxt(digit);
    setFlip(true);
    const t = setTimeout(() => { setCur(digit); setFlip(false); }, 440);
    return () => clearTimeout(t);
  }, [digit]); // eslint-disable-line react-hooks/exhaustive-deps

  const num: CSSProperties = {
    fontFamily: FONT.mono, fontSize: fs, fontWeight: 800,
    color: '#f0ede8', lineHeight: 1, letterSpacing: '-0.04em',
    position: 'absolute', width: '100%', textAlign: 'center',
    top: '50%', transform: 'translateY(-50%)', userSelect: 'none',
  };

  const h = (top: boolean): CSSProperties => ({
    position: 'absolute', left: 0, right: 0, height: '50%', overflow: 'hidden',
    ...(top ? { top: 0 } : { bottom: 0 }),
  });

  return (
    <div style={{ position: 'relative', width: cardW, height: cardH }}>
      {/* static back — top half = cur */}
      <div style={h(true)}>
        <div style={{ position: 'relative', height: cardH }}>
          <span style={num}>{cur}</span>
        </div>
      </div>
      {/* static back — bottom half = nxt (shows once flap folds away) */}
      <div style={h(false)}>
        <div style={{ position: 'relative', height: cardH, top: `-${cardH / 2}px` }}>
          <span style={num}>{nxt}</span>
        </div>
      </div>

      {/* hinge line */}
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.65)', zIndex: 4 }} />

      {/* 3-D perspective wrapper */}
      <div style={{ position: 'absolute', inset: 0, perspective: '500px' }}>
        {flip && (
          /* top flap — cur folding away */
          <div style={{
            ...h(true),
            background: '#12203a',
            transformOrigin: 'center bottom',
            animation: ' oyFlipTop 220ms ease-in forwards',
            zIndex: 3,
            boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
          }}>
            <div style={{ position: 'relative', height: cardH }}><span style={num}>{cur}</span></div>
          </div>
        )}
        {flip && (
          /* bottom flap — nxt unfolding in */
          <div style={{
            ...h(false),
            background: '#0c1526',
            transformOrigin: 'center top',
            animation: 'oyFlipBottom 220ms ease-out forwards',
            animationDelay: '220ms',
            zIndex: 3,
          }}>
            <div style={{ position: 'relative', height: cardH, top: `-${cardH / 2}px` }}><span style={num}>{nxt}</span></div>
          </div>
        )}
      </div>
    </div>
  );
}

export function FlipUnit({ value, label, size = 68 }: { value: number; label: string; size?: number }) {
  const str  = String(value).padStart(2, '0');
  const cardH = size;
  const cardW = Math.round(size * 0.7);
  const fs    = Math.round(size * 0.82);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <span style={{ fontFamily: FONT.mono, fontSize: 9, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.15em' }}>
        {label}
      </span>
      <div style={{
        display: 'flex', gap: 3,
        background: '#0f1729',
        borderRadius: 10,
        padding: '0 3px',
        overflow: 'hidden',
        boxShadow: '0 10px 36px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}>
        <FlipDigit digit={str[0]} cardH={cardH} cardW={cardW} fs={fs} />
        <FlipDigit digit={str[1]} cardH={cardH} cardW={cardW} fs={fs} />
      </div>
    </div>
  );
}
