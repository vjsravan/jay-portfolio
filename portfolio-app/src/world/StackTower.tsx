import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { stackLayers } from '../data/stack';
import { AMBER, glowMaterial } from './materials';
import { STACK } from './layout';
import { stackLabels } from './labels';
import { world } from './store';

/**
 * The stack as a gyroscope: one polished ring per architecture layer, nested
 * from the cloud (outermost) to AI (the core), each turning on its own axis
 * with a bead for every tool in that layer. The layer being read swings round
 * to face the visitor, lights up, and carries a signal around its rim.
 */

const L = stackLayers.length;
const radius = (k: number) => 0.62 + (L - 1 - k) * 0.27;

// Each ring's own tumble: axis speeds and phases, fixed so it's the same every visit.
const SPIN = stackLayers.map((_, k) => ({
  x: 0.13 + (k % 3) * 0.05, y: 0.21 - (k % 2) * 0.08, z: 0.07 + k * 0.015,
  px: k * 1.3, py: k * 0.7, pz: k * 2.1,
}));

const ringGeometry = stackLayers.map((_, k) => new THREE.TorusGeometry(radius(k), 0.016, 12, 220));
const beadGeometry = new THREE.SphereGeometry(0.028, 12, 12);
const signalGeometry = new THREE.SphereGeometry(0.05, 16, 16);

const identity = new THREE.Quaternion();
const spinQ = new THREE.Quaternion();
const euler = new THREE.Euler();
const labelAt = new THREE.Vector3();
const dummy = new THREE.Object3D();

/** Beads spaced evenly around each ring: one per tool in the layer. */
const beadMatrices = stackLayers.map((l, k) => {
  const n = l.skills.length;
  return Array.from({ length: n }, (_, j) => {
    const a = (j / n) * Math.PI * 2;
    dummy.position.set(Math.cos(a) * radius(k), Math.sin(a) * radius(k), 0);
    dummy.updateMatrix();
    return dummy.matrix.clone();
  });
});

export default function StackTower() {
  const root = useRef<THREE.Group>(null);
  const facing = useRef<THREE.Group>(null);
  const rings = useRef<(THREE.Group | null)[]>([]);
  const ringMeshes = useRef<(THREE.Mesh | null)[]>([]);
  const beads = useRef<(THREE.InstancedMesh | null)[]>([]);
  const signals = useRef<(THREE.Mesh | null)[]>([]);
  const focus = useRef(stackLayers.map(() => 0));

  const materials = useMemo(() => stackLayers.map(l => ({
    ring: new THREE.MeshPhysicalMaterial({
      color: '#c9c9d2', metalness: 1, roughness: 0.22, clearcoat: 0.6,
      emissive: new THREE.Color(l.color), emissiveIntensity: 0.04,
    }),
    bead: new THREE.MeshBasicMaterial({ color: new THREE.Color(l.color), toneMapped: false }),
    signal: new THREE.MeshBasicMaterial({ color: new THREE.Color(l.color).lerp(new THREE.Color('#ffffff'), 0.5), toneMapped: false }),
  })), []);
  const core = useMemo(() => new THREE.MeshBasicMaterial({ color: AMBER.clone().multiplyScalar(1.4), toneMapped: false }), []);
  const halo = useMemo(() => glowMaterial(AMBER, 0.55), []);

  useFrame(({ clock, camera }, dt) => {
    const g = root.current, f = facing.current;
    if (!g || !f) return;
    // Hidden until the walk is past the career path; seen through the fog
    // from there it would read as stray shapes behind "Now".
    g.visible = camera.position.z < STACK.z + 15;
    if (!g.visible) return;

    f.lookAt(camera.position); // local +z towards the visitor: a ring at rest faces them
    const t = clock.getElapsedTime();
    const on = world.hoveredLayer >= 0 ? world.hoveredLayer : world.activeLayer;
    const k = 1 - Math.exp(-dt * 3);

    rings.current.forEach((ring, i) => {
      if (!ring) return;
      focus.current[i] = THREE.MathUtils.lerp(focus.current[i], i === on ? 1 : 0, k);
      const w = focus.current[i];
      const s = SPIN[i];
      spinQ.setFromEuler(euler.set(t * s.x + s.px, t * s.y + s.py, t * s.z + s.pz));
      ring.quaternion.slerpQuaternions(spinQ, identity, THREE.MathUtils.smoothstep(w, 0, 1));

      const rm = ringMeshes.current[i]?.material as THREE.MeshPhysicalMaterial | undefined;
      if (rm) rm.emissiveIntensity = 0.04 + w * 0.9;
      const bm = beads.current[i]?.material as THREE.MeshBasicMaterial | undefined;
      if (bm) bm.color.set(stackLayers[i].color).multiplyScalar(on < 0 ? 0.9 : 0.35 + w * 1.6);

      // A signal runs around the rim of the ring being read.
      const sig = signals.current[i];
      if (sig) {
        const a = t * 1.6 + i;
        sig.position.set(Math.cos(a) * radius(i), Math.sin(a) * radius(i), 0);
        sig.scale.setScalar(0.001 + w);
      }

      labelAt.set(radius(i) + 0.14, 0, 0);
      stackLabels[i].pos.copy(ring.localToWorld(labelAt));
    });
  });

  return (
    <group ref={root} position={STACK}>
      <group ref={facing}>
        <mesh material={halo} position={[0, 0, -0.4]}><planeGeometry args={[3.2, 3.2]} /></mesh>
        <mesh material={core}><sphereGeometry args={[0.2, 32, 32]} /></mesh>
        {stackLayers.map((l, i) => (
          <group key={l.name} ref={el => { rings.current[i] = el; }}>
            <mesh ref={el => { ringMeshes.current[i] = el; }} geometry={ringGeometry[i]} material={materials[i].ring} />
            <instancedMesh
              args={[beadGeometry, materials[i].bead, beadMatrices[i].length]}
              ref={el => {
                beads.current[i] = el;
                if (el) { beadMatrices[i].forEach((mx, j) => el.setMatrixAt(j, mx)); el.instanceMatrix.needsUpdate = true; }
              }}
            />
            <mesh ref={el => { signals.current[i] = el; }} geometry={signalGeometry} material={materials[i].signal} />
          </group>
        ))}
      </group>
    </group>
  );
}
