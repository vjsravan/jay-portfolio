import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import './index.css';

import NexusBoot       from './components/nexus/NexusBoot';
import NexusBackground from './components/nexus/NexusBackground';
import NexusCursor     from './components/nexus/NexusCursor';
import NexusInterface  from './components/nexus/NexusInterface';

/** Shown on screens narrower than 1024 px */
function MobileNotice() {
  return (
    <div style={{
      minHeight: '100dvh',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
      padding: '2rem',
      fontFamily: 'JetBrains Mono, monospace',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 48 }}>⬡</div>
      <h1 style={{ color: '#00d4ff', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.12em', margin: 0 }}>
        NEXUS PROTOCOL
      </h1>
      <p style={{ color: 'rgba(0,212,255,0.55)', fontSize: '0.78rem', lineHeight: 1.7, maxWidth: 280, margin: 0 }}>
        This portfolio is optimised for desktop.<br />
        Please open it on a laptop or larger screen for the full experience.
      </p>
      <a
        href={`mailto:jayforfullstack@gmail.com`}
        style={{
          color: '#00d4ff',
          fontSize: '0.72rem',
          letterSpacing: '0.1em',
          border: '1px solid rgba(0,212,255,0.35)',
          padding: '8px 18px',
          borderRadius: 8,
          textDecoration: 'none',
        }}
      >
        ✉ jayforfullstack@gmail.com
      </a>
    </div>
  );
}

function App() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [checked, setChecked]     = useState(false);
  const [nexusBoot, setNexusBoot] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    setChecked(true);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!checked) return null;
  if (!isDesktop) return <MobileNotice />;

  return (
    <AnimatePresence mode="wait">
      {!nexusBoot ? (
        <NexusBoot key="nexus-boot" onComplete={() => setNexusBoot(true)} />
      ) : (
        <div key="nexus-main">
          <NexusBackground />
          <NexusCursor />
          <NexusInterface />
        </div>
      )}
    </AnimatePresence>
  );
}

export default App;
