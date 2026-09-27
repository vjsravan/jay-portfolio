import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { NAV, openAssistant } from '../../lib/actions';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    NAV.forEach(n => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 transition-colors duration-300"
      style={{
        background: scrolled ? 'rgba(5,6,10,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
      }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <a href="#top" className="font-display text-lg font-bold text-white">
          jsv<span className="text-[var(--accent)]">.</span>
        </a>
        <ul className="hidden flex-1 items-center gap-1 md:flex">
          {NAV.map(n => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className="rounded-full px-3 py-1.5 text-sm transition-colors hover:text-white"
                style={{ color: active === n.id ? '#fff' : 'var(--muted)', background: active === n.id ? 'var(--surface-hi)' : 'transparent' }}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button onClick={() => openAssistant()} className="btn btn-ghost !py-1.5 !px-4">
            <Sparkles size={14} className="text-[var(--accent)]" /> Ask my AI
          </button>
        </div>
      </nav>
    </header>
  );
}
