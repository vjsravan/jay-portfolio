import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type { SymbolKind } from './symbol-kind';

/**
 * One small sculpture per project, each a picture of what the project does.
 * All share two materials handed in by the gallery: polished `metal`, and a
 * `glow` in the project's colour that brightens when the project is focused.
 * Each fits inside a radius of about 0.6 around its origin.
 */


interface Props { metal: THREE.Material; glow: THREE.Material }

/** Blast Radius: a polished core with shockwaves rolling out from it. */
function Shatter({ metal, glow }: Props) {
  const waves = useRef<(THREE.Mesh | null)[]>([]);
  const waveMats = useMemo(() => [0, 1, 2].map(() => new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, toneMapped: false })), []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const c = (glow as THREE.MeshBasicMaterial).color;
    waves.current.forEach((w, i) => {
      if (!w) return;
      const f = (t * 0.35 + i / 3) % 1; // each wave expands and fades, one after another
      w.scale.setScalar(0.25 + f * 0.85);
      const m = w.material as THREE.MeshBasicMaterial;
      m.color.copy(c);
      m.opacity = (1 - f) ** 1.5;
    });
  });
  return (
    <group>
      <mesh material={metal}><sphereGeometry args={[0.2, 48, 48]} /></mesh>
      <mesh material={glow} scale={0.55}><sphereGeometry args={[0.2, 24, 24]} /></mesh>
      {waveMats.map((m, i) => (
        <mesh key={i} ref={el => { waves.current[i] = el; }} material={m} rotation-x={Math.PI / 2 - 0.35}>
          <torusGeometry args={[0.62, 0.012, 8, 128]} />
        </mesh>
      ))}
    </group>
  );
}

/** shipment-flow: a parcel with packets riding a conveyor ring around it. */
function Packets({ metal, glow }: Props) {
  const ring = useRef<THREE.Group>(null);
  const box = useMemo(() => new RoundedBoxGeometry(0.42, 0.42, 0.42, 4, 0.05), []);
  useFrame(({ clock }) => { if (ring.current) ring.current.rotation.y = clock.getElapsedTime() * 0.8; });
  return (
    <group>
      <mesh geometry={box} material={metal} />
      <group rotation-x={0.75}>
        <mesh material={glow} rotation-x={Math.PI / 2}><torusGeometry args={[0.6, 0.008, 8, 128]} /></mesh>
        <group ref={ring}>
          {Array.from({ length: 6 }, (_, i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <mesh key={i} material={metal} position={[Math.cos(a) * 0.6, 0, Math.sin(a) * 0.6]} rotation-y={-a}>
                <boxGeometry args={[0.09, 0.09, 0.09]} />
              </mesh>
            );
          })}
        </group>
      </group>
    </group>
  );
}

/** LLM Gateway: a gate that requests pass through and split into two routes. */
function Gateway({ metal, glow }: Props) {
  const orbs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    orbs.current.forEach((o, i) => {
      if (!o) return;
      const f = ((t * 0.35 + i / 5) % 1) * 2 - 1; // -1 … 1 along x
      const route = i % 2 === 0 ? 1 : -1;          // cheap tier or premium tier
      o.position.set(f * 0.75, f > 0 ? route * f * 0.28 : 0, 0);
      o.scale.setScalar(1 - Math.abs(f) * 0.5);
    });
  });
  return (
    <group>
      <mesh material={metal} rotation-y={Math.PI / 2}><torusGeometry args={[0.42, 0.055, 24, 96]} /></mesh>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} ref={el => { orbs.current[i] = el; }} material={glow}><sphereGeometry args={[0.055, 16, 16]} /></mesh>
      ))}
    </group>
  );
}

/** llmeval: a polished bell curve, with the regression gate drawn across it. */
function Bell({ metal, glow }: Props) {
  const geo = useMemo(() => {
    const pts = Array.from({ length: 40 }, (_, i) => {
      const r = (i / 39) * 0.62;
      return new THREE.Vector2(r, 0.44 * Math.exp(-(r * r) / 0.1) - 0.22); // a soft dome, not a spike
    });
    return new THREE.LatheGeometry(pts, 96);
  }, []);
  return (
    <group rotation-x={0.35}>
      <mesh geometry={geo} material={metal} />
      <mesh material={glow} rotation-x={Math.PI / 2}><torusGeometry args={[0.27, 0.009, 8, 96]} /></mesh>
    </group>
  );
}

/** flowsim: nested frames around a core that shrinks — a failure shrunk to its minimum. */
function Nested({ metal, glow }: Props) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const bars = (s: number, t: number) => {
    const out: [number, number, number, [number, number, number]][] = [];
    for (const a of [-1, 1]) for (const b of [-1, 1]) {
      out.push([a * s / 2, b * s / 2, 0, [t, t, s]]);
      out.push([a * s / 2, 0, b * s / 2, [t, s, t]]);
      out.push([0, a * s / 2, b * s / 2, [s, t, t]]);
    }
    return out;
  };
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outer.current) outer.current.rotation.set(t * 0.3, t * 0.4, 0);
    if (inner.current) inner.current.rotation.set(-t * 0.5, -t * 0.3, 0);
    if (core.current) core.current.scale.setScalar(0.7 + 0.3 * Math.abs(Math.sin(t * 0.9)));
  });
  return (
    <group>
      <group ref={outer}>{bars(0.8, 0.028).map(([x, y, z, s], i) => <mesh key={i} material={metal} position={[x, y, z]}><boxGeometry args={s} /></mesh>)}</group>
      <group ref={inner}>{bars(0.46, 0.022).map(([x, y, z, s], i) => <mesh key={i} material={metal} position={[x, y, z]}><boxGeometry args={s} /></mesh>)}</group>
      <mesh ref={core} material={glow}><boxGeometry args={[0.14, 0.14, 0.14]} /></mesh>
    </group>
  );
}

/** contextlens: a real glass lens in a metal ring, over a grid of tokens. */
function Lens({ metal, glow }: Props) {
  const glass = useMemo(() => new THREE.MeshPhysicalMaterial({
    transmission: 1, thickness: 0.4, roughness: 0.02, ior: 1.5, color: '#ffffff', clearcoat: 1,
  }), []);
  return (
    <group rotation-y={-0.4}>
      <mesh material={glass} scale={[1, 1, 0.3]}><sphereGeometry args={[0.46, 48, 48]} /></mesh>
      <mesh material={metal}><torusGeometry args={[0.47, 0.035, 16, 96]} /></mesh>
      <mesh material={metal} position={[0.33, -0.5, 0]} rotation-z={0.6}><cylinderGeometry args={[0.03, 0.035, 0.42, 16]} /></mesh>
      {Array.from({ length: 9 }, (_, i) => (
        <mesh key={i} material={glow} position={[((i % 3) - 1) * 0.16, (Math.floor(i / 3) - 1) * 0.16, -0.3]}>
          <boxGeometry args={[0.07, 0.07, 0.01]} />
        </mesh>
      ))}
    </group>
  );
}

/** A point on the (2, 3) torus knot of radius 0.3: the same curve three's TorusKnotGeometry sweeps. */
function knotPoint(u: number, out: THREE.Vector3) {
  const p = 2, q = 3, radius = 0.3;
  const t = u * p * Math.PI * 2;
  const qp = (q / p) * t, cs = Math.cos(qp);
  return out.set(radius * (2 + cs) * 0.5 * Math.cos(t), radius * (2 + cs) * 0.5 * Math.sin(t), radius * Math.sin(qp) * 0.5);
}

/** agentreplay: a knot with a light replaying along it. */
function Knot({ metal, glow }: Props) {
  const dot = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => { if (dot.current) knotPoint((clock.getElapsedTime() * 0.1) % 1, dot.current.position); });
  return (
    <group>
      <mesh material={metal}><torusKnotGeometry args={[0.3, 0.05, 200, 24, 2, 3]} /></mesh>
      <mesh ref={dot} material={glow}><sphereGeometry args={[0.07, 16, 16]} /></mesh>
    </group>
  );
}

/** This portfolio: the portal ring and its star. */
function Portal({ metal, glow }: Props) {
  return (
    <group>
      <mesh material={metal}><torusGeometry args={[0.42, 0.03, 16, 128]} /></mesh>
      <mesh material={glow}><sphereGeometry args={[0.1, 24, 24]} /></mesh>
    </group>
  );
}

function Default({ metal }: Props) {
  return <mesh material={metal}><icosahedronGeometry args={[0.45, 0]} /></mesh>;
}

const BY_KIND: Record<SymbolKind, (p: Props) => React.ReactElement> = {
  shatter: Shatter, packets: Packets, gateway: Gateway, bell: Bell, nested: Nested,
  lens: Lens, knot: Knot, portal: Portal, default: Default,
};

export function ProjectSymbol({ kind, ...props }: Props & { kind: SymbolKind }) {
  const C = BY_KIND[kind];
  return <C {...props} />;
}
