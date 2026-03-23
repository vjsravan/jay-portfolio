import React, { useEffect, useRef, useState } from 'react';

/**
 * Zero-lag cursor.
 * Key fix: ring WRAPPER handles translate3d (positioning), inner
 * ring elements use CSS animation only (rotation). Separating these
 * prevents the animation from clobbering the JS-set transform.
 */
const NexusCursor: React.FC = () => {
  const [visible, setVisible] = useState(false);

  // DOM refs
  const wrapRef   = useRef<HTMLDivElement>(null); // outer ring container — translate3d only
  const ring0Ref  = useRef<HTMLDivElement>(null); // spinning outer arc
  const ring1Ref  = useRef<HTMLDivElement>(null); // counter-spinning inner arc
  const dotRef    = useRef<HTMLDivElement>(null); // centre dot — instant follow
  const linesRef  = useRef<HTMLDivElement>(null); // crosshair lines — instant follow
  const cardRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null, null]); // N S W E marks

  // Behaviour refs
  const hoverRef = useRef(false);
  const clickRef = useRef(false);
  const prevHov  = useRef(false);
  const prevClk  = useRef(false);
  const visRef   = useRef(false);

  // Position refs
  const target = useRef({ x: -300, y: -300 });
  const lerped = useRef({ x: -300, y: -300 });
  const rafId  = useRef(0);

  /* ── hide OS cursor ── */
  useEffect(() => {
    document.body.classList.add('nexus-mode');
    return () => document.body.classList.remove('nexus-mode');
  }, []);

  /* ── single RAF loop, never restarts ── */
  useEffect(() => {
    const LERP = 0.13;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visRef.current) { visRef.current = true; setVisible(true); }
    };
    const onOver = (e: MouseEvent) => {
      hoverRef.current = !!(e.target as HTMLElement).closest(
        'button, a, [role="button"], input, textarea, select, [data-hover]'
      );
    };
    const onDown  = () => { clickRef.current = true; };
    const onUp    = () => { clickRef.current = false; };
    const onLeave = () => { visRef.current = false; setVisible(false); };
    const onEnter = () => { visRef.current = true;  setVisible(true); };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    const loop = () => {
      const tx = target.current.x;
      const ty = target.current.y;

      lerped.current.x += (tx - lerped.current.x) * LERP;
      lerped.current.y += (ty - lerped.current.y) * LERP;
      const lx = lerped.current.x;
      const ly = lerped.current.y;

      const isHov = hoverRef.current;
      const isClk = clickRef.current;
      const size  = isHov ? 52 : isClk ? 22 : 38;
      const half  = size / 2;

      /* ── ring wrapper: translate3d only, NO rotation here ── */
      const wrap = wrapRef.current;
      if (wrap) {
        wrap.style.transform = `translate3d(${lx - half}px,${ly - half}px,0)`;
        if (isHov !== prevHov.current || isClk !== prevClk.current) {
          wrap.style.width  = `${size}px`;
          wrap.style.height = `${size}px`;
        }
      }

      /* ── centre dot: instant ── */
      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate3d(${tx - 3}px,${ty - 3}px,0) scale(${isClk ? 0.35 : 1})`;
      }

      /* ── crosshair lines: instant ── */
      const lines = linesRef.current;
      if (lines) lines.style.transform = `translate3d(${tx}px,${ty}px,0)`;

      /* ── colour update — only when hover/click state changes ── */
      if (isHov !== prevHov.current || isClk !== prevClk.current) {
        prevHov.current = isHov;
        prevClk.current = isClk;
        const col = isHov ? '#ff006e' : '#00d4ff';

        // ring0: bottom + right colored, top + left transparent
        const r0 = ring0Ref.current;
        if (r0) {
          r0.style.borderBottomColor = col;
          r0.style.borderRightColor  = col;
          r0.style.borderTopColor    = 'transparent';
          r0.style.borderLeftColor   = 'transparent';
          r0.style.boxShadow = `0 0 10px ${col}70`;
        }
        // ring1: bottom + left colored, top + right transparent
        const r1 = ring1Ref.current;
        if (r1) {
          r1.style.borderBottomColor = col;
          r1.style.borderLeftColor   = `${col}60`;
          r1.style.borderTopColor    = 'transparent';
          r1.style.borderRightColor  = 'transparent';
        }

        cardRefs.current.forEach(el => {
          if (el) { el.style.background = col; el.style.boxShadow = `0 0 5px ${col}`; }
        });

        if (dot) {
          dot.style.background  = col;
          dot.style.boxShadow   = `0 0 8px ${col}, 0 0 20px ${col}70`;
        }
        if (lines) {
          Array.from(lines.children).forEach(c => {
            const el = c as HTMLElement;
            el.style.background = col;
            el.style.boxShadow  = `0 0 4px ${col}`;
          });
        }
      }

      rafId.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  if (!visible) return null;

  const C = '#00d4ff';

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden>

      {/*
        ── Ring wrapper ──
        This div ONLY handles position via translate3d.
        Child divs use CSS animation for rotation — no transform conflict.
      */}
      <div
        ref={wrapRef}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: 38, height: 38,
          willChange: 'transform',
          transition: 'width 0.16s ease, height 0.16s ease',
        }}
      >
        {/* Outer arc — spins clockwise via CSS animation only */}
        <div
          ref={ring0Ref}
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '1.5px solid transparent',
            borderBottomColor: C, borderRightColor: C,
            boxShadow: `0 0 10px ${C}70`,
            animation: 'nx-reticle-spin 2.8s linear infinite',
          }}
        />

        {/* Inner arc — counter-spins, dimmer */}
        <div
          ref={ring1Ref}
          style={{
            position: 'absolute', inset: 8, borderRadius: '50%',
            border: '1px solid transparent',
            borderBottomColor: `${C}60`, borderLeftColor: `${C}60`,
            animation: 'nx-reticle-spin 5s linear infinite reverse',
          }}
        />

        {/* Cardinal marks: N, S, W, E — stay fixed inside wrapper */}
        {/* North */}
        <div ref={el => { cardRefs.current[0] = el; }}
          style={{ position: 'absolute', top: -2, left: '50%', transform: 'translateX(-50%)', width: 3, height: 3, borderRadius: '50%', background: C, boxShadow: `0 0 5px ${C}` }} />
        {/* South */}
        <div ref={el => { cardRefs.current[1] = el; }}
          style={{ position: 'absolute', bottom: -2, left: '50%', transform: 'translateX(-50%)', width: 3, height: 3, borderRadius: '50%', background: C, boxShadow: `0 0 5px ${C}` }} />
        {/* West */}
        <div ref={el => { cardRefs.current[2] = el; }}
          style={{ position: 'absolute', top: '50%', left: -2, transform: 'translateY(-50%)', width: 3, height: 3, borderRadius: '50%', background: C, boxShadow: `0 0 5px ${C}` }} />
        {/* East */}
        <div ref={el => { cardRefs.current[3] = el; }}
          style={{ position: 'absolute', top: '50%', right: -2, transform: 'translateY(-50%)', width: 3, height: 3, borderRadius: '50%', background: C, boxShadow: `0 0 5px ${C}` }} />
      </div>

      {/* Centre dot — instant follow */}
      <div
        ref={dotRef}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: 6, height: 6, borderRadius: '50%',
          background: C,
          boxShadow: `0 0 8px ${C}, 0 0 20px ${C}70`,
          transition: 'background 0.16s, box-shadow 0.16s',
          willChange: 'transform',
        }}
      />

      {/* Crosshair lines — instant follow */}
      <div
        ref={linesRef}
        style={{ position: 'absolute', top: 0, left: 0, willChange: 'transform' }}
      >
        {/* Top line */}
        <div style={{ position: 'absolute', width: 1, height: 10, background: C, opacity: 0.5, left: -0.5, top: -24, boxShadow: `0 0 4px ${C}` }} />
        {/* Bottom line */}
        <div style={{ position: 'absolute', width: 1, height: 10, background: C, opacity: 0.5, left: -0.5, top: 14, boxShadow: `0 0 4px ${C}` }} />
        {/* Left line */}
        <div style={{ position: 'absolute', width: 10, height: 1, background: C, opacity: 0.5, left: -24, top: -0.5, boxShadow: `0 0 4px ${C}` }} />
        {/* Right line */}
        <div style={{ position: 'absolute', width: 10, height: 1, background: C, opacity: 0.5, left: 14, top: -0.5, boxShadow: `0 0 4px ${C}` }} />
      </div>
    </div>
  );
};

export default NexusCursor;

