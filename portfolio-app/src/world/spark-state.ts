import * as THREE from 'three';
import { PORTAL, PORTAL_RADIUS } from './layout';

/** The star's live position and strength, written by Spark.tsx each frame. */
export const spark = {
  pos: new THREE.Vector3(PORTAL.x, PORTAL.y - PORTAL_RADIUS, PORTAL.z),
  /** How much of the portal ring has been unwound, 0…1 (smoothed; the ring and star share it). */
  erase: 0,
  /** 0 before it has formed, 1 in flight, falling back as it merges into the orb. */
  power: 0,
};

/** 1 when the star is right here, falling to 0 at `reach` world units away. */
export function energyAt(p: THREE.Vector3, reach = 3.5) {
  return spark.power * (1 - THREE.MathUtils.smoothstep(spark.pos.distanceTo(p), 0.5, reach));
}
