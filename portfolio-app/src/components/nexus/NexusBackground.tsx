import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number;
  hue: number; // 187 = cyan, 275 = violet
}

const NexusBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -1000, y: -1000 });
  const rafRef    = useRef<number>(0);
  const timeRef   = useRef(0);
  const sizeRef   = useRef({ width: 0, height: 0 });
  const lastFrameRef = useRef(0);
  const gridRef   = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;

      sizeRef.current = { width, height };
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const hexSize = 55;
      const hexW = hexSize * 2;
      const hexH = Math.sqrt(3) * hexSize;
      const grid: { x: number; y: number }[] = [];
      for (let row = -1; row < height / (hexH * 0.75) + 1; row++) {
        for (let col = -1; col < width / hexW + 2; col++) {
          grid.push({
            x: col * hexW + (row % 2 === 0 ? 0 : hexSize),
            y: row * hexH * 0.75,
          });
        }
      }
      gridRef.current = grid;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    const COUNT = 48;
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.8 + 0.5,
      alpha:  Math.random() * 0.45 + 0.15,
      hue:    Math.random() > 0.65 ? 275 : 187,
    }));

    const drawHexGrid = () => {
      const size  = 55;
      const mouse = mouseRef.current;

      for (const cell of gridRef.current) {
        const dx   = cell.x - mouse.x;
        const dy   = cell.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const glow = distSq < 40000 ? (1 - Math.sqrt(distSq) / 200) * 0.07 : 0;

        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const px    = cell.x + size * Math.cos(angle);
          const py    = cell.y + size * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.028 + glow})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    };

    const animate = (now = 0) => {
      rafRef.current = requestAnimationFrame(animate);
      if (now - lastFrameRef.current < 1000 / 30) return;
      lastFrameRef.current = now;

      const { width, height } = sizeRef.current;
      timeRef.current += 0.005;
      ctx.clearRect(0, 0, width, height);
      drawHexGrid();

      const mouse = mouseRef.current;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdSq = mdx * mdx + mdy * mdy;
        if (mdSq < 12100 && mdSq > 0) {
          const md = Math.sqrt(mdSq);
          p.vx += (mdx / md) * 0.018;
          p.vy += (mdy / md) * 0.018;
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.2) { p.vx = (p.vx / speed) * 1.2; p.vy = (p.vy / speed) * 1.2; }
        p.vx *= 0.996;
        p.vy *= 0.996;

        for (let j = i + 1; j < particles.length; j++) {
          const p2   = particles[j];
          const dx   = p2.x - p.x;
          const dy   = p2.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 18225) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / 135) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.hue === 187
              ? `rgba(0, 212, 255, ${alpha})`
              : `rgba(189, 0, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        const distMSq = (p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2;
        const gf      = distMSq < 14400 ? 1 - Math.sqrt(distMSq) / 120 : 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + gf * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.hue === 187
          ? `rgba(0, 212, 255, ${p.alpha + gf * 0.5})`
          : `rgba(189, 0, 255, ${p.alpha + gf * 0.5})`;
        ctx.fill();

        if (gf > 0.1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + gf * 10, 0, Math.PI * 2);
          ctx.fillStyle = p.hue === 187
            ? `rgba(0, 212, 255, ${gf * 0.06})`
            : `rgba(189, 0, 255, ${gf * 0.06})`;
          ctx.fill();
        }
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
};

export default NexusBackground;
