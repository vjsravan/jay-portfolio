import * as THREE from 'three';
import { liveProjects } from '../data/live';
import { experiences } from '../data/resume';
import { world } from './store';

/**
 * Where everything stands in the world, and where the camera stands for each
 * section. The floor is y = 0 and the walk runs down -z: portal, gallery,
 * pipeline, the career path, the stack, and the signal at the end.
 *
 * Most shots are anchored to an element on the page (`data-anchor="…"`):
 * the camera frames its subject so it lands exactly on that element's box,
 * at that box's size. The 3D then sits where the layout says, on any screen,
 * and moves with the page as it scrolls instead of sliding in on its own.
 */

export const PORTAL = new THREE.Vector3(0, 2.25, 0);
export const PORTAL_RADIUS = 2.1;
/**
 * The erasing edge of the unwinding ring. `erase` 0…1: it starts at the
 * bottom midpoint, runs up the right side, over the top, down the left and
 * back to the bottom, where the star is left behind.
 */
export function ringFront(erase: number, out: THREE.Vector3) {
  const a = -Math.PI / 2 + erase * Math.PI * 2;
  return out.set(PORTAL.x + Math.cos(a) * PORTAL_RADIUS, PORTAL.y + Math.sin(a) * PORTAL_RADIUS, PORTAL.z);
}

export const GALLERY_Z = -16;
export const SLAB_GAP = 2.1;
export const slabX = (i: number) => (i - (liveProjects.length - 1) / 2) * SLAB_GAP;
export const slabZ = (i: number) => GALLERY_Z - Math.abs(i - (liveProjects.length - 1) / 2) * 0.35;

export const PIPELINE_Z = -26;

/** Oldest role first: the path walks forward in time. */
export const roles = [...experiences].reverse();
export const gateZ = (i: number) => -34 - i * 5.5;
export const NOW_Z = gateZ(roles.length) - 1;

export const STACK = new THREE.Vector3(0, 2.2, -60);
export const ORB = new THREE.Vector3(0, 1.9, -78);

export interface Shot {
  pos: THREE.Vector3;
  look: THREE.Vector3;
  /** Where `look` lands on screen, in px from the centre. */
  screen: THREE.Vector2;
}

export interface Frame {
  w: number;
  h: number;
  narrow: boolean;
  /** The page element a shot is anchored to, if it's on the page and visible. */
  anchor: (name: string) => DOMRect | null;
}

const TAN_HALF_FOV = Math.tan(THREE.MathUtils.degToRad(38 / 2));
const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const centre = (r: DOMRect, f: Frame) => new THREE.Vector2(r.left + r.width / 2 - f.w / 2, r.top + r.height / 2 - f.h / 2);

/** Camera distance at which something `radius` world units across fills `px` screen pixels. */
const fit = (radius: number, px: number, f: Frame) =>
  THREE.MathUtils.clamp((radius * f.h / 2) / (TAN_HALF_FOV * Math.max(40, px)), 3, 40);

export function shot(section: number, p: number, f: Frame): Shot {
  switch (section) {
    case 0: { // portal, centred on the portrait's head; the ring collapses into the star as the hero scrolls
      const r = f.anchor('portal');
      const dist = r ? fit(PORTAL_RADIUS, r.height / 2, f) : 12;
      return {
        pos: v(0, PORTAL.y - 0.35, PORTAL.z + dist * (1 - p * 0.12)),
        look: PORTAL.clone(),
        screen: r ? centre(r, f) : new THREE.Vector2(f.narrow ? 0 : f.w * 0.25, 0),
      };
    }
    case 1: { // gallery: the focused slab, with its neighbours in view
      const x = slabX(world.project), z = slabZ(world.project);
      const r = f.anchor('gallery');
      const dist = r ? fit(1.45, Math.min(r.width, r.height) / 2, f) : 7;
      return {
        pos: v(x * 0.9, 1.5, z + dist),
        look: v(x, 1.2, z),
        screen: r ? centre(r, f) : new THREE.Vector2(0, 0),
      };
    }
    case 2: { // pipeline, from above, filling its window in the page
      const r = f.anchor('pipeline');
      const look = v(0, 0, PIPELINE_Z);
      const dist = r ? THREE.MathUtils.clamp((4.6 * f.h) / (2 * TAN_HALF_FOV * Math.max(120, r.width / 2)), 6, 30) : 11;
      return {
        pos: look.clone().add(v(0, 0.8, 0.6).normalize().multiplyScalar(dist)),
        look,
        screen: r ? centre(r, f) : new THREE.Vector2(0, 0),
      };
    }
    case 3: { // the path, walking through the gates
      const z = THREE.MathUtils.lerp(gateZ(0) + 6, NOW_Z + 3.5, p);
      return {
        pos: v(f.narrow ? 0 : 0.5, 1.55, z),
        look: v(f.narrow ? 0 : 0.2, 1.6, z - 8),
        screen: new THREE.Vector2(f.narrow ? 0 : f.w * 0.21, 0),
      };
    }
    case 4: // archive: look up into the dark ahead
      return { pos: v(0, 1.8, -49), look: v(0, 4.2, -62), screen: new THREE.Vector2(0, 0) };
    case 5: { // stack: the gyroscope, turning slowly around as the section scrolls
      const r = f.anchor('stack');
      const dist = r ? fit(2.25, Math.min(r.width, r.height) / 2, f) : 10;
      const a = THREE.MathUtils.lerp(-0.3, 0.3, p);
      return {
        pos: v(STACK.x + Math.sin(a) * dist, STACK.y + dist * 0.12, STACK.z + Math.cos(a) * dist),
        look: STACK.clone(),
        screen: r ? centre(r, f) : new THREE.Vector2(0, -f.h * 0.18),
      };
    }
    default: { // signal
      const r = f.anchor('signal');
      const dist = r ? fit(1.7, Math.min(r.width, r.height) / 2, f) : 14;
      return {
        pos: v(0, ORB.y - 0.2, ORB.z + dist),
        look: ORB.clone(),
        screen: r ? centre(r, f) : new THREE.Vector2(0, -f.h * 0.3),
      };
    }
  }
}
