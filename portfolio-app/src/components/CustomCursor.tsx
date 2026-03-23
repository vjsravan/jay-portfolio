import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Smooth follower for the outer ring
  const springX = useSpring(cursorX, { stiffness: 120, damping: 18, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 18, mass: 0.5 });

  // Trail dots
  const TRAIL_LEN = 8;
  const trailRef = useRef<Array<{ x: number; y: number }>>([]);
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Init trail
    trailRef.current = Array.from({ length: TRAIL_LEN }, () => ({ x: -100, y: -100 }));

    let rawX = -100, rawY = -100;

    const move = (e: MouseEvent) => {
      rawX = e.clientX;
      rawY = e.clientY;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setHidden(false);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, [data-hover]');
      setHovering(!!isHoverable);
    };

    // Animate trail
    const animateTrail = () => {
      const trail = trailRef.current;
      // Shift trail
      for (let i = trail.length - 1; i > 0; i--) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.35;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.35;
      }
      if (trail.length > 0) {
        trail[0].x += (rawX - trail[0].x) * 0.5;
        trail[0].y += (rawY - trail[0].y) * 0.5;
      }
      setTrail([...trail]);
      rafRef.current = requestAnimationFrame(animateTrail);
    };
    rafRef.current = requestAnimationFrame(animateTrail);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', checkHover);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.documentElement.addEventListener('mouseleave', leave);
    document.documentElement.addEventListener('mouseenter', enter);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', checkHover);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.removeEventListener('mouseenter', enter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Hide default cursor globally via style */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Trail dots */}
      {trail.map((pos, i) => {
        const size = 6 - (i / TRAIL_LEN) * 5;
        const opacity = (1 - i / TRAIL_LEN) * 0.4;
        return (
          <div
            key={i}
            className="fixed pointer-events-none rounded-full bg-accent-cyan"
            style={{
              width: size,
              height: size,
              left: pos.x - size / 2,
              top: pos.y - size / 2,
              opacity,
              zIndex: 9997,
              transform: 'translate3d(0,0,0)',
            }}
          />
        );
      })}

      {/* Outer glowing ring — spring-follows */}
      <motion.div
        className="fixed pointer-events-none rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: hovering ? '-50%' : '-50%',
          translateY: hovering ? '-50%' : '-50%',
          zIndex: 9998,
          width: hovering ? 48 : clicking ? 20 : 36,
          height: hovering ? 48 : clicking ? 20 : 36,
          marginLeft: -(hovering ? 24 : clicking ? 10 : 18),
          marginTop: -(hovering ? 24 : clicking ? 10 : 18),
          opacity: hidden ? 0 : 1,
          border: hovering
            ? '2px solid rgba(139,92,246,0.8)'
            : '2px solid rgba(6,182,212,0.7)',
          boxShadow: hovering
            ? '0 0 16px rgba(139,92,246,0.5), inset 0 0 8px rgba(139,92,246,0.15)'
            : '0 0 12px rgba(6,182,212,0.4)',
          transition: 'width 0.2s, height 0.2s, margin 0.2s, border-color 0.2s, opacity 0.15s',
        }}
      />

      {/* Inner dot — follows directly */}
      <motion.div
        className="fixed pointer-events-none rounded-full bg-white"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9999,
          width: clicking ? 6 : 5,
          height: clicking ? 6 : 5,
          opacity: hidden ? 0 : 1,
          boxShadow: '0 0 6px rgba(6,182,212,0.9)',
          transition: 'opacity 0.15s',
        }}
      />
    </>
  );
};

export default CustomCursor;

