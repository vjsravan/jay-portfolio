import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { usePrefersReducedMotion } from '../hooks/useInView';
import Gallery from './Gallery';
import Spark from './Spark';
import StackTower from './StackTower';
import { allLabels } from './labels';
import { shot, type Frame } from './layout';
import { BG } from './materials';
import { Floor, Orb, Path, Pipeline, Portal } from './objects';
import { CHAPTERS, WORLD_READY, setWorldUnavailable, world } from './store';

/**
 * The world behind the page: a dark, quiet space with a survey-grid floor,
 * walked through by a camera that scrolling drives. Each section has a shot
 * (layout.ts); between sections the camera travels from one to the next, so
 * reading the page is moving through the space.
 */

const NARROW = () => window.innerWidth < 1024;

/** Soft studio reflections for the polished surfaces, and fog into the page colour. */
function setupScene(gl: THREE.WebGLRenderer, scene: THREE.Scene) {
  gl.setClearColor(BG);
  gl.toneMapping = THREE.ACESFilmicToneMapping;
  const pm = new THREE.PMREMGenerator(gl);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.35;
  scene.fog = new THREE.Fog(BG, 9, 30);
  pm.dispose();

  // If the GPU drops the context and doesn't give it back (e.g. the browser
  // blocks WebGL for the site), fall back to the CSS version rather than
  // leaving a dead canvas. three restores the scene itself if it does return.
  let timer: number | undefined;
  gl.domElement.addEventListener('webglcontextlost', () => {
    timer = window.setTimeout(() => setWorldUnavailable(true), 2000);
  });
  gl.domElement.addEventListener('webglcontextrestored', () => {
    window.clearTimeout(timer);
    setWorldUnavailable(false);
  });
}

function Lights() {
  return (
    <>
      <hemisphereLight args={['#c8cfe0', '#07070a', 0.35]} />
      <directionalLight position={[3, 8, 5]} intensity={0.9} />
    </>
  );
}

/** Scroll position → which section's shot, and how far between two of them. */
function readScroll(height: number, progress: number[]) {
  const mid = height / 2;
  let a = 0, b = 0, blend = 0;
  CHAPTERS.forEach((c, i) => {
    const r = document.getElementById(c.section)?.getBoundingClientRect();
    if (!r) return;
    progress[i] = THREE.MathUtils.clamp((mid - r.top) / r.height, 0, 1);
    if (r.top <= mid && r.bottom > mid) {
      a = b = i;
      // The hero holds the camera until the portal ring has fully unwound into
      // the star, so leaving it only starts late.
      const w = i === 0 ? height * 0.2 : Math.min(height * 0.45, r.height / 2);
      if (r.bottom - mid < w && i < CHAPTERS.length - 1) { b = i + 1; blend = 0.5 * (1 - (r.bottom - mid) / w); }
      else if (mid - r.top < w && i > 0) { a = i - 1; b = i; blend = 0.5 + 0.5 * ((mid - r.top) / w); }
    }
  });
  const last = document.getElementById(CHAPTERS[CHAPTERS.length - 1].section)?.getBoundingClientRect();
  if (last && last.bottom <= mid) { a = b = CHAPTERS.length - 1; blend = 0; }
  return { a, b, blend: blend * blend * (3 - 2 * blend) };
}

const progress: number[] = CHAPTERS.map(() => 0);

/** `data-anchor` elements, looked up once and re-found if React replaces them. */
const anchorEls = new Map<string, Element>();
function anchorRect(name: string): DOMRect | null {
  let el = anchorEls.get(name);
  if (!el || !el.isConnected) {
    el = document.querySelector(`[data-anchor="${name}"]`) ?? undefined;
    if (el) anchorEls.set(name, el);
  }
  const r = el?.getBoundingClientRect();
  return r && r.width > 0 && r.height > 0 ? r : null; // hidden (e.g. on phones): no anchor
}
const screen = new THREE.Vector2();
const tmpPos = new THREE.Vector3(), tmpLook = new THREE.Vector3();
const look = new THREE.Vector3(0, 2, -1);
const sway = new THREE.Vector2(), pointer = new THREE.Vector2();

function CameraRig({ reduced }: { reduced: boolean }) {
  const first = useRef(true);

  useEffect(() => {
    window.dispatchEvent(new Event(WORLD_READY));
    const onMove = (e: PointerEvent) => pointer.set(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame(({ camera, size }, dt) => {
    const cam = camera as THREE.PerspectiveCamera;
    const frame: Frame = { w: size.width, h: size.height, narrow: NARROW(), anchor: anchorRect };
    const { a, b, blend } = readScroll(size.height, progress);
    world.chapter.a = a; world.chapter.b = b; world.chapter.blend = blend;
    progress.forEach((p, i) => { world.progress[i] = p; });
    world.chapterWeight.fill(0);
    world.chapterWeight[a] += 1 - blend;
    world.chapterWeight[b] += blend;
    const sa = shot(a, progress[a], frame), sb = shot(b, progress[b], frame);
    tmpPos.lerpVectors(sa.pos, sb.pos, blend);
    tmpLook.lerpVectors(sa.look, sb.look, blend);
    screen.lerpVectors(sa.screen, sb.screen, blend);

    // A little parallax from the cursor, so the space feels physical.
    if (!reduced) sway.lerp(pointer, 1 - Math.exp(-dt * 2));
    tmpPos.x += sway.x * 0.35;
    tmpPos.y -= sway.y * 0.2;

    const k = first.current || reduced ? 1 : 1 - Math.exp(-dt * 3.2);
    first.current = false;
    cam.position.lerp(tmpPos, k);
    look.lerp(tmpLook, k);
    cam.lookAt(look);
    // Shift the frame (not the camera) so the subject lands on its anchor
    // element. Applied without easing: anchors move with the page as it
    // scrolls, and a lagging subject would slide across instead of scrolling.
    cam.setViewOffset(size.width, size.height, -screen.x, -screen.y, size.width, size.height);
  });
  return null;
}

const v = new THREE.Vector3();

function LabelSync({ spans }: { spans: React.RefObject<(HTMLDivElement | null)[]> }) {
  useFrame(({ camera, size }) => {
    allLabels.forEach((l, i) => {
      const el = spans.current[i];
      if (!el) return;
      const d = camera.position.distanceTo(l.pos);
      v.copy(l.pos).project(camera);
      // Only the chapter on screen shows its labels; the rest of the world
      // stays wordless behind it.
      const chapter = world.chapterWeight[l.chapter] ?? 0;
      // Fade in on approach, out again as the camera passes close by.
      const range = (1 - THREE.MathUtils.smoothstep(d, 14, 26)) * THREE.MathUtils.smoothstep(d, 5, 8.5);
      const vis = v.z < 1 && d < 26 ? chapter * range * (l.visible ? l.visible() : 1) : 0;
      if (vis < 0.02) { if (el.style.opacity !== '0') el.style.opacity = '0'; return; }
      const x = (v.x * 0.5 + 0.5) * size.width, y = (-v.y * 0.5 + 0.5) * size.height;
      // Fade out under the nav bar rather than colliding with it.
      const underNav = THREE.MathUtils.smoothstep(y, 70, 110);
      if (vis * underNav < 0.02) { if (el.style.opacity !== '0') el.style.opacity = '0'; return; }
      const ax = l.align === 'center' ? '-50%' : l.align === 'right' ? '-100%' : '0';
      el.style.transform = `translate(${x}px, ${y}px) translate(${ax}, -50%)`;
      el.style.opacity = (vis * underNav).toFixed(2);
    });
  });
  return null;
}

export default function World() {
  const reduced = usePrefersReducedMotion();
  const spans = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 1.7, 9.5], fov: 38, near: 0.1, far: 120 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ gl, scene }) => setupScene(gl, scene)}
        style={{ position: 'fixed', inset: 0, zIndex: 0 }}
        eventSource={document.getElementById('root')!}
        eventPrefix="client"
      >
        <Lights />
        <Floor />
        <Portal />
        <Gallery />
        <Pipeline />
        <Path />
        <StackTower />
        <Orb />
        <CameraRig reduced={reduced} />
        <Spark reduced={reduced} />
        <LabelSync spans={spans} />
      </Canvas>
      <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden>
        {allLabels.map((l, i) => (
          <div
            key={`${l.text}-${i}`}
            ref={el => { spans.current[i] = el; }}
            className="absolute left-0 top-0 whitespace-nowrap"
            style={{ opacity: 0, textAlign: l.align === 'right' ? 'right' : l.align }}
          >
            <div className="font-display text-[15px] font-semibold tracking-tight" style={{ color: l.color, textShadow: '0 1px 12px #07070a' }}>{l.text}</div>
            {l.sub && <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--faint)]">{l.sub}</div>}
          </div>
        ))}
      </div>
    </>
  );
}
