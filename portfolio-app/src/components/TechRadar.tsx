import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface RadarPoint {
  label: string;
  category: string;
  level: number; // 0-1, 1 = center (expert)
  angle: number;
  color: string;
}

const techData: RadarPoint[] = [
  // Java ecosystem - expert level
  { label: 'Java 21', category: 'Backend', level: 0.1, angle: 10, color: '#f59e0b' },
  { label: 'Spring Boot', category: 'Backend', level: 0.12, angle: 35, color: '#f59e0b' },
  { label: 'Spring WebFlux', category: 'Backend', level: 0.18, angle: 60, color: '#f59e0b' },

  // Frontend - expert
  { label: 'Angular', category: 'Frontend', level: 0.15, angle: 85, color: '#06b6d4' },
  { label: 'React', category: 'Frontend', level: 0.18, angle: 110, color: '#06b6d4' },
  { label: 'TypeScript', category: 'Frontend', level: 0.12, angle: 135, color: '#06b6d4' },

  // Cloud - advanced
  { label: 'AWS', category: 'Cloud', level: 0.22, angle: 160, color: '#10b981' },
  { label: 'OpenShift', category: 'Cloud', level: 0.20, angle: 185, color: '#10b981' },
  { label: 'Docker', category: 'Cloud', level: 0.18, angle: 210, color: '#10b981' },

  // DevOps - advanced
  { label: 'ArgoCD', category: 'DevOps', level: 0.25, angle: 235, color: '#8b5cf6' },
  { label: 'Jenkins', category: 'DevOps', level: 0.22, angle: 260, color: '#8b5cf6' },
  { label: 'Kafka', category: 'Messaging', level: 0.28, angle: 285, color: '#8b5cf6' },

  // AI - growing
  { label: 'LLM Prompting', category: 'AI', level: 0.32, angle: 310, color: '#ec4899' },
  { label: 'OpenAI API', category: 'AI', level: 0.38, angle: 335, color: '#ec4899' },
  { label: 'RAG Concepts', category: 'AI', level: 0.42, angle: 355, color: '#ec4899' },
];

const rings = [
  { label: 'Expert', radius: 0.25, color: 'rgba(6,182,212,0.1)' },
  { label: 'Advanced', radius: 0.5, color: 'rgba(139,92,246,0.05)' },
  { label: 'Proficient', radius: 0.75, color: 'rgba(16,185,129,0.04)' },
  { label: 'Learning', radius: 1.0, color: 'rgba(236,72,153,0.03)' },
];

const TechRadar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = Math.min(canvas.offsetWidth, 400);
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const maxR = size / 2 - 40;

    ctx.clearRect(0, 0, size, size);

    // Draw rings
    rings.forEach(ring => {
      const r = maxR * ring.radius;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = ring.color;
      ctx.fill();

      // Ring label
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.font = '10px monospace';
      ctx.fillText(ring.label, cx + r - 35, cy - 5);
    });

    // Draw spokes
    for (let angle = 0; angle < 360; angle += 45) {
      const rad = (angle * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(rad) * maxR, cy + Math.sin(rad) * maxR);
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw tech points
    techData.forEach((point) => {
      const rad = (point.angle * Math.PI) / 180;
      const r = maxR * point.level;
      const x = cx + Math.cos(rad) * r;
      const y = cy + Math.sin(rad) * r;

      // Glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
      gradient.addColorStop(0, point.color + 'cc');
      gradient.addColorStop(1, point.color + '00');
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Dot
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = point.color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.font = 'bold 9px Inter, sans-serif';
      const labelX = x + (Math.cos(rad) > 0 ? 8 : -8);
      const labelY = y + (Math.sin(rad) > 0 ? 14 : -6);
      ctx.textAlign = Math.cos(rad) > 0 ? 'left' : 'right';
      ctx.fillText(point.label, labelX, labelY);
    });

    // Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 6);
    centerGrad.addColorStop(0, '#06b6d4');
    centerGrad.addColorStop(1, '#8b5cf6');
    ctx.fillStyle = centerGrad;
    ctx.fill();
  }, [inView]);

  return (
    <section ref={sectionRef} className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="terminal-text text-sm mb-2">// techRadar.visualize()</p>
          <h2 className="section-title">Tech Radar</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Closer to center = deeper expertise. Watch the AI zone growing outward!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Radar Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <canvas ref={canvasRef} className="w-full max-w-sm" style={{ width: '380px', height: '380px' }} />
              {/* Glow behind canvas */}
              <div className="absolute inset-0 -z-10 bg-accent-purple/5 rounded-full blur-3xl" />
            </div>
          </motion.div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold mb-6">Technology Categories</h3>
            {[
              { label: 'Backend (Java Ecosystem)', color: '#f59e0b', desc: 'Expert — 9+ years of production Java, Spring Boot, WebFlux' },
              { label: 'Frontend (React & Angular)', color: '#06b6d4', desc: 'Expert — Angular v21, React/Redux across 4 companies' },
              { label: 'Cloud & Infrastructure', color: '#10b981', desc: 'Advanced — AWS Certified, OpenShift, ArgoCD GitOps' },
              { label: 'DevOps & Messaging', color: '#8b5cf6', desc: 'Advanced — Jenkins, Kafka, Docker CI/CD pipelines' },
              { label: 'AI & LLM Engineering', color: '#ec4899', desc: 'Growing — OpenAI API, RAG, Agent Workflows (Active focus)' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0 ring-2 ring-white/20"
                     style={{ backgroundColor: item.color }} />
                <div>
                  <p className="text-white text-sm font-semibold">{item.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}

            <div className="mt-6 p-4 rounded-xl border border-accent-pink/20 bg-accent-pink/5">
              <p className="text-accent-pink text-sm font-semibold mb-1">🚀 Actively Expanding</p>
              <p className="text-gray-400 text-xs">
                AI & LLM capabilities are the fastest-growing area — from prompt engineering to 
                RAG pipelines and agent-based workflows at UPS.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechRadar;

