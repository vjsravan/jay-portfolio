import React, { useEffect, useRef } from 'react';

// Animated neural/aurora mesh using canvas
// Nodes pulse and connect like a brain - perfect for an AI engineer
const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Node definition
    interface Node {
      x: number; y: number;
      vx: number; vy: number;
      radius: number;
      color: string;
      pulseOffset: number;
      pulseSpeed: number;
    }

    const palette = ['#06b6d4', '#8b5cf6', '#10b981', '#0ea5e9', '#6366f1'];
    const nodes: Node[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.5 + 1,
      color: palette[Math.floor(Math.random() * palette.length)],
      pulseOffset: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
    }));

    // Aurora blobs
    const blobs = [
      { cx: 0.15, cy: 0.25, r: 0.35, color: '#06b6d4', speed: 0.0003, phase: 0 },
      { cx: 0.8,  cy: 0.15, r: 0.30, color: '#8b5cf6', speed: 0.0004, phase: 1 },
      { cx: 0.65, cy: 0.75, r: 0.40, color: '#10b981', speed: 0.0002, phase: 2 },
      { cx: 0.3,  cy: 0.8,  r: 0.25, color: '#0ea5e9', speed: 0.0005, phase: 3 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      // 1. Aurora blobs (bottom layer)
      blobs.forEach(blob => {
        const x = (blob.cx + Math.sin(time * blob.speed + blob.phase) * 0.08) * canvas.width;
        const y = (blob.cy + Math.cos(time * blob.speed * 1.3 + blob.phase) * 0.06) * canvas.height;
        const r = blob.r * Math.min(canvas.width, canvas.height);

        const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
        grd.addColorStop(0, blob.color + '18');
        grd.addColorStop(0.5, blob.color + '08');
        grd.addColorStop(1, blob.color + '00');
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      // 2. Move nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // 3. Draw connections
      const MAX_DIST = 160;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.25;
            // Pulse along connection
            const pulse = 0.5 + 0.5 * Math.sin(time * 0.02 + i * 0.5);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * pulse})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 4. Draw nodes with pulse glow
      nodes.forEach(n => {
        const pulse = 0.6 + 0.4 * Math.sin(time * n.pulseSpeed + n.pulseOffset);
        const glowR = n.radius * 4 * pulse;

        // Glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        grd.addColorStop(0, n.color + 'aa');
        grd.addColorStop(1, n.color + '00');
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // 5. Scan-line overlay (subtle)
      const scanY = (time * 1.2) % canvas.height;
      const scanGrd = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80);
      scanGrd.addColorStop(0, 'rgba(6,182,212,0)');
      scanGrd.addColorStop(0.5, 'rgba(6,182,212,0.015)');
      scanGrd.addColorStop(1, 'rgba(6,182,212,0)');
      ctx.fillStyle = scanGrd;
      ctx.fillRect(0, scanY - 80, canvas.width, 160);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.85 }}
    />
  );
};

export default NeuralBackground;

