import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number;
  hue: number; // 187=cyan, 275=violet
}

const NexusBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);

    // Particles
    const COUNT = 65;
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.45 + 0.15,
      hue: Math.random() > 0.65 ? 275 : 187,
    }));

    // Draw hexagonal grid
    const drawHexGrid = () => {
      const size = 55;
      const w = size * 2;
      const h = Math.sqrt(3) * size;
      const mouse = mouseRef.current;

      for (let row = -1; row < canvas.height / (h * 0.75) + 1; row++) {
        for (let col = -1; col < canvas.width / w + 2; col++) {
          const cx = col * w + (row % 2 === 0 ? 0 : size);
          const cy = row * h * 0.75;
          const dx = cx - mouse.x;
          const dy = cy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const glow = dist < 200 ? (1 - dist / 200) * 0.07 : 0;

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const px = cx + size * Math.cos(angle);
            const py = cy + size * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.028 + glow})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      timeRef.current += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawHexGrid();

      const mouse = mouseRef.current;

      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 110 && md > 0) {
          p.vx += (mdx / md) * 0.018;
          p.vy += (mdy / md) * 0.018;
        }

        // Speed limit + dampen
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.2) { p.vx = (p.vx / speed) * 1.2; p.vy = (p.vy / speed) * 1.2; }
        p.vx *= 0.996;
        p.vy *= 0.996;

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 135) {
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

        // Glow near mouse
        const distM = Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2);
        const gf = distM < 120 ? 1 - distM / 120 : 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + gf * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.hue === 187
          ? `rgba(0, 212, 255, ${p.alpha + gf * 0.5})`
          : `rgba(189, 0, 255, ${p.alpha + gf * 0.5})`;
        ctx.fill();

        // Extra glow halo
        if (gf > 0.1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + gf * 10, 0, Math.PI * 2);
          ctx.fillStyle = p.hue === 187
            ? `rgba(0, 212, 255, ${gf * 0.06})`
            : `rgba(189, 0, 255, ${gf * 0.06})`;
          ctx.fill();
        }
      });

      rafRef.current = requestAnimationFrame(animate);
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

