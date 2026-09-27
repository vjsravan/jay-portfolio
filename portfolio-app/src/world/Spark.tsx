import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NOW_Z, ORB, PIPELINE_Z, STACK, gateZ, ringFront, slabX, slabZ } from './layout';
import { spark } from './spark-state';
import { heroScroll, world } from './store';

/**
 * The star. Scrolling past the portrait collapses the portal ring into it;
 * from there it travels ahead of the visitor and powers each section — a
 * lamp over the focused project, the pulse through the pipeline, the light
 * through each gate, the core of the gyroscope — and finally lands in the
 * signal orb at the end, which it ignites.
 *
 * Other objects react to it through spark-state.ts.
 */

/** Where the star wants to be for a chapter, at a given progress through it. */
function sparkAt(section: number, p: number, out: THREE.Vector3) {
  switch (section) {
    case 0: return ringFront(spark.erase, out); // riding the ring's erasing edge
    case 1: return out.set(slabX(world.project), 2.55, slabZ(world.project) + 0.35);
    case 2: return out.set(THREE.MathUtils.lerp(-3.4, 3.4, THREE.MathUtils.smoothstep(p, 0.15, 0.85)), 0.45, PIPELINE_Z);
    case 3: { // just ahead of the walker, down the path through the gates
      const z = THREE.MathUtils.lerp(gateZ(0) + 6, NOW_Z + 3.5, p) - 5.5;
      return out.set(0, 2.3, Math.max(z, NOW_Z));
    }
    case 4: return out.set(0, 3.2 + p * 2.2, -56);
    case 5: return out.copy(STACK);
    default: return out.copy(ORB);
  }
}

function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.18, 'rgba(255,240,215,0.85)');
  grad.addColorStop(0.45, 'rgba(255,190,110,0.25)');
  grad.addColorStop(1, 'rgba(255,160,70,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const TRAIL = 56;
const a = new THREE.Vector3(), b = new THREE.Vector3(), target = new THREE.Vector3();
const history = new Float32Array(TRAIL * 3);
const colors = new Float32Array(TRAIL * 3);

export default function Spark({ reduced }: { reduced: boolean }) {
  const core = useRef<THREE.Sprite>(null);
  const halo = useRef<THREE.Sprite>(null);
  const light = useRef<THREE.PointLight>(null);
  const trail = useRef<THREE.Points>(null);
  const first = useRef(true);

  const tex = useMemo(() => glowTexture(), []);

  useFrame(({ clock }, dt) => {
    if (!core.current || !halo.current || !light.current || !trail.current) return;
    const { a: ca, b: cb, blend } = world.chapter;

    // How far the portal ring has unwound: over the first stretch of the
    // hero's scroll, eased so a scroll-wheel notch doesn't jump the edge.
    const eraseTarget = ca === 0 ? THREE.MathUtils.smoothstep(heroScroll(), 0.04, 0.56) : 1;
    spark.erase = first.current || reduced ? eraseTarget : THREE.MathUtils.lerp(spark.erase, eraseTarget, 1 - Math.exp(-dt * 7));

    target.lerpVectors(sparkAt(ca, world.progress[ca], a), sparkAt(cb, world.progress[cb], b), blend);

    // While it rides the ring it sits exactly on the erasing edge; once free,
    // a slow hover keeps its trail alive even when it's parked.
    const riding = ca === 0 && cb === 0;
    const t = clock.getElapsedTime();
    if (!reduced && !riding) target.add(a.set(Math.sin(t * 1.3) * 0.12, Math.cos(t * 1.7) * 0.08, Math.sin(t * 0.9) * 0.1));

    const k = first.current || reduced || riding ? 1 : 1 - Math.exp(-dt * 3.5);
    first.current = false;
    spark.pos.lerp(target, k);

    // A small bright point as the ring starts to unwind, a full star by the time
    // it's back at the bottom; it merges into the orb at the end.
    const formed = riding ? THREE.MathUtils.smoothstep(spark.erase, 0, 0.1) * (0.4 + 0.6 * spark.erase) : 1;
    const merged = world.chapterWeight[6] * (1 - THREE.MathUtils.smoothstep(spark.pos.distanceTo(ORB), 0.3, 2.5));
    spark.power = formed * (1 - merged * 0.85);

    const pulse = 1 + Math.sin(t * 3.1) * 0.08;
    core.current.position.copy(spark.pos);
    core.current.scale.setScalar(0.55 * spark.power * pulse + 0.0001);
    halo.current.position.copy(spark.pos);
    halo.current.scale.setScalar(2.4 * spark.power * pulse + 0.0001);
    light.current.position.copy(spark.pos);
    light.current.intensity = 9 * spark.power;

    // Trail: the last TRAIL positions, fading and cooling towards the tail.
    history.copyWithin(3, 0, (TRAIL - 1) * 3);
    spark.pos.toArray(history, 0);
    for (let i = 0; i < TRAIL; i++) {
      const f = (1 - i / TRAIL) ** 2 * spark.power;
      colors[i * 3] = f; colors[i * 3 + 1] = f * 0.72; colors[i * 3 + 2] = f * 0.4;
    }
    const g = trail.current.geometry;
    (g.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (g.attributes.color as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <>
      <sprite ref={halo}>
        <spriteMaterial map={tex} color="#ffb454" transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </sprite>
      <sprite ref={core}>
        <spriteMaterial map={tex} color="#fff4e2" transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </sprite>
      <pointLight ref={light} color="#ffc27a" distance={7} decay={1.4} intensity={0} />
      <points ref={trail} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[history, 3]} usage={THREE.DynamicDrawUsage} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} usage={THREE.DynamicDrawUsage} />
        </bufferGeometry>
        <pointsMaterial map={tex} size={0.34} vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </points>
    </>
  );
}
