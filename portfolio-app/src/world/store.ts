/**
 * Shared, mutable state between the page (React) and the 3D world (render
 * loop). Plain object on purpose: the world reads it every frame, and routing
 * it through React state would re-render the page sixty times a second.
 */
export const world = {
  /** Index of the project the gallery is focused on. */
  project: 0,
  /** Stack layer under the cursor, or the one scrolled to; -1 for none. */
  hoveredLayer: -1,
  activeLayer: -1,
  /** How much each chapter is on screen right now (0…1), written by the camera rig. */
  chapterWeight: [1, 0, 0, 0, 0, 0, 0],
  /** The two chapters on screen and how far between them; progress through each. */
  chapter: { a: 0, b: 0, blend: 0 },
  progress: [0, 0, 0, 0, 0, 0, 0],
};

type Listener = (i: number) => void;
const projectListeners = new Set<Listener>();

/** A slab clicked in the 3D gallery tells the Projects section to show it. */
export function onProjectPicked(fn: Listener) {
  projectListeners.add(fn);
  return () => { projectListeners.delete(fn); };
}
export function pickProject(i: number) {
  projectListeners.forEach(fn => fn(i));
}

/** Sections in page order. The camera has one shot per section. */
export const CHAPTERS = [
  { section: 'top', name: 'Portal' },
  { section: 'projects', name: 'Gallery' },
  { section: 'live', name: 'Pipeline' },
  { section: 'experience', name: 'Path' },
  { section: 'writing', name: 'Archive' },
  { section: 'skills', name: 'Stack' },
  { section: 'contact', name: 'Signal' },
] as const;

/**
 * How far the visitor has scrolled out of the hero, 0 at the top of the page
 * and 1 once it has half left the screen. (`progress[0]` is measured at the
 * middle of the viewport, so it already reads 0.5 at the very top.)
 */
export const heroScroll = () => Math.min(1, Math.max(0, (world.progress[0] - 0.5) * 2));

/** True once the scroll is well on its way out of the hero: the rest of the walk may show. */
export const pastHero = () => world.chapter.a !== 0 || (world.chapter.b !== 0 && world.chapter.blend > 0.4);

export const WORLD_READY = 'world-ready';

/**
 * Whether a WebGL context can actually be created: not just whether the API
 * exists. Chrome blocks WebGL per-site after repeated context losses, and
 * then getContext returns null even though WebGL2RenderingContext is defined.
 * The probe context is released straight away rather than left for GC.
 */
export function supportsWebGL() {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') ?? c.getContext('webgl');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}

/** Switch the page to its no-3D styling (CSS fallbacks for the ring and orb). */
export function setWorldUnavailable(unavailable: boolean) {
  document.documentElement.classList.toggle('no-webgl', unavailable);
}
