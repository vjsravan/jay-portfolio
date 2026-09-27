import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import Nav from './components/site/Nav';
import Hero from './components/site/Hero';
import Projects from './components/site/Projects';
import LiveFeed from './components/site/LiveFeed';
import Experience from './components/site/Experience';
import Writing from './components/site/Writing';
import Stack from './components/site/Stack';
import Contact, { Footer } from './components/site/Contact';
import AskAI from './components/site/AskAI';
import SectionRail from './components/site/SectionRail';
import { setWorldUnavailable, supportsWebGL } from './world/store';

// three.js is ~250 KB gzipped: fetched once the page has painted and gone
// idle, so the words are never waiting on the world.
const World = lazy(() => import('./world/World'));

/** If the 3D world fails to start (no GPU, WebGL blocked), keep the page and use its CSS fallbacks. */
class WorldBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { setWorldUnavailable(true); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function App() {
  const [loadWorld, setLoadWorld] = useState(false);

  useEffect(() => {
    if (!supportsWebGL()) {
      setWorldUnavailable(true);
      return;
    }
    const start = () => setLoadWorld(true);
    // A beat after load, then the next idle moment: the portrait and copy are
    // fully painted and interactive before the world starts compiling shaders.
    const idle = () => setTimeout(() =>
      'requestIdleCallback' in window ? requestIdleCallback(start, { timeout: 2000 }) : start(), 800);
    if (document.readyState === 'complete') idle();
    else window.addEventListener('load', idle, { once: true });
    return () => window.removeEventListener('load', idle);
  }, []);

  return (
    <>
      {loadWorld && (
        <WorldBoundary>
          <Suspense fallback={null}>
            <World />
          </Suspense>
        </WorldBoundary>
      )}
      <Nav />
      <SectionRail />
      <main className="relative z-[1]">
        <Hero />
        <Projects />
        <LiveFeed />
        <Experience />
        <Writing />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <AskAI />
    </>
  );
}
