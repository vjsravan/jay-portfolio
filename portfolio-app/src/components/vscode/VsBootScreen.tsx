import React, { useEffect, useRef, useCallback } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニハヒフヘホJAVASPRINGREACTAWSKAFKA<>{}[]=+-*/&|async await import export const function class interface type void';

interface Props { onComplete: () => void; }

const VsBootScreen: React.FC<Props> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  const doExit = useCallback(() => {
    if (overlayRef.current) {
      overlayRef.current.style.transition = 'opacity 700ms ease';
      overlayRef.current.style.opacity = '1';
    }
    setTimeout(onComplete, 750);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const FONT_SIZE = 14;
    const cols = Math.floor(canvas.width / FONT_SIZE);
    const drops: number[] = Array.from({ length: cols }, () => Math.random() * -80);

    let animId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px 'Cascadia Code', 'Fira Code', monospace`;

      drops.forEach((y, x) => {
        if (y < 0) { drops[x]++; return; }
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const bright = Math.random() > 0.95;
        ctx.fillStyle = bright ? '#ffffff' : (Math.random() > 0.5 ? '#00ff41' : '#00aa33');
        ctx.fillText(char, x * FONT_SIZE, y * FONT_SIZE);
        if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) drops[x] = 0;
        else drops[x]++;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    // Reveal name panel after 1.2s
    const nameTimer = setTimeout(() => {
      if (nameRef.current) {
        nameRef.current.style.transition = 'opacity 600ms ease';
        nameRef.current.style.opacity = '1';
      }
    }, 1200);

    // Fade to VS Code after 3.4s
    const exitTimer = setTimeout(doExit, 3400);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(nameTimer);
      clearTimeout(exitTimer);
    };
  }, [doExit]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Name panel */}
      <div
        ref={nameRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div
          className="text-center px-14 py-10 rounded-2xl"
          style={{
            background: 'rgba(0,0,0,0.8)',
            border: '1px solid rgba(0,255,65,0.25)',
            boxShadow: '0 0 80px rgba(0,255,65,0.08)',
            backdropFilter: 'blur(6px)',
          }}
        >
          {/* Name */}
          <div
            className="font-mono text-4xl font-black tracking-[0.2em] mb-2"
            style={{
              color: '#00ff41',
              textShadow: '0 0 20px rgba(0,255,65,0.7), 0 0 60px rgba(0,255,65,0.3)',
            }}
          >
            JAY SRAVAN VADLAMUDI
          </div>
          <div className="font-mono text-sm tracking-widest mb-8" style={{ color: 'rgba(0,204,68,0.6)' }}>
            Sr. Software Engineer &nbsp;·&nbsp; Applied AI Engineer &nbsp;·&nbsp; 9+ Years
          </div>

          {/* VS Code style loading */}
          <div className="space-y-3 text-left text-xs font-mono" style={{ color: 'rgba(0,180,60,0.7)' }}>
            {['Opening workspace: jay-portfolio/', '  ✓ Java Extension Pack   activated', '  ✓ GitHub Copilot        activated', '  ✓ AWS Toolkit           activated', '  ✓ Spring Boot Dashboard activated'].map((line, i) => (
              <div
                key={i}
                style={{
                  opacity: 0,
                  animation: `matrixLine 0.2s ease forwards`,
                  animationDelay: `${i * 200}ms`,
                }}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-6 w-72 mx-auto">
            <div className="h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,204,68,0.15)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00cc44, #00ff41)',
                  boxShadow: '0 0 8px #00ff41',
                  animation: 'matrixLoad 2s ease forwards',
                  animationDelay: '0.3s',
                  width: 0,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dark overlay for fade-to-VS-Code */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: '#1e1e1e', opacity: 0 }}
      />

      <style>{`
        @keyframes matrixLoad { from { width: 0% } to { width: 100% } }
        @keyframes matrixLine { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
};

export default VsBootScreen;

