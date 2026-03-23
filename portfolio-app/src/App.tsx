import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import './index.css';

import NexusBoot       from './components/nexus/NexusBoot';
import NexusBackground from './components/nexus/NexusBackground';
import NexusCursor     from './components/nexus/NexusCursor';
import NexusInterface  from './components/nexus/NexusInterface';

const isTouch =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

function App() {
  const [nexusBoot, setNexusBoot] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!nexusBoot ? (
        <NexusBoot key="nexus-boot" onComplete={() => setNexusBoot(true)} />
      ) : (
        <div key="nexus-main">
          <NexusBackground />
          {!isTouch && <NexusCursor />}
          <NexusInterface />
        </div>
      )}
    </AnimatePresence>
  );
}

export default App;
