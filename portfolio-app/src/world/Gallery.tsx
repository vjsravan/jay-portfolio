import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { liveProjects } from '../data/live';
import { glowMaterial, lightMaterial, stoneMaterial } from './materials';
import { slabX, slabZ } from './layout';
import { ProjectSymbol } from './symbols';
import { symbolFor } from './symbol-kind';
import { pastHero, pickProject, world } from './store';

/**
 * Projects as a gallery of small sculptures, each on its own lit plinth. The
 * focused one rises, turns and glows in its colour; the star (Spark.tsx)
 * hangs over it like a lamp. Clicking any piece focuses it.
 */

const plinthMat = stoneMaterial({ color: '#141418' });
const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });

function Exhibit({ i }: { i: number }) {
  const p = liveProjects[i];
  const piece = useRef<THREE.Group>(null);
  const rim = useRef<THREE.Mesh>(null);
  const pool = useRef<THREE.Mesh>(null);
  const glowMesh = useRef<THREE.Group>(null);
  const kind = useMemo(() => symbolFor(p.repo), [p.repo]);
  const materials = useMemo(() => ({
    // Brighter reflections than the rest of the room, so the pieces catch light.
    metal: new THREE.MeshPhysicalMaterial({ color: '#dcdce4', metalness: 1, roughness: 0.28, clearcoat: 0.6, clearcoatRoughness: 0.1, envMapIntensity: 2.4 }),
    glow: lightMaterial(p.color, 1.4),
    rim: lightMaterial(p.color, 1),
    pool: glowMaterial(p.color, 0.4),
  }), [p.color]);
  const focus = useRef(i === 0 ? 1 : 0);

  useFrame(({ clock }, dt) => {
    const g = piece.current;
    if (!g || !rim.current || !pool.current || !glowMesh.current) return;
    const on = world.project === i ? 1 : 0;
    const k = 1 - Math.exp(-dt * 4);
    focus.current = THREE.MathUtils.lerp(focus.current, on, k);
    const f = focus.current;
    const t = clock.getElapsedTime();
    g.position.y = 1.3 + f * 0.18 + Math.sin(t * 1.1 + i) * 0.03;
    g.rotation.y += dt * (0.25 + f * 0.6);
    g.scale.setScalar(0.9 + f * 0.2);
    // The meshes carry per-project materials; reach them through refs.
    const glow = (glowMesh.current.userData.glow as THREE.MeshBasicMaterial | undefined);
    glow?.color.set(p.color).multiplyScalar(0.6 + f * 1.6);
    (rim.current.material as THREE.MeshBasicMaterial).color.set(p.color).multiplyScalar(0.35 + f * 1.4);
    const pm = pool.current.material as THREE.ShaderMaterial;
    pm.uniforms.uStrength.value = 0.1 + f * 0.6;
  });

  return (
    <group position={[slabX(i), 0, slabZ(i)]}>
      <mesh material={plinthMat} position={[0, 0.3, 0]}><cylinderGeometry args={[0.5, 0.56, 0.6, 64]} /></mesh>
      <mesh ref={rim} material={materials.rim} position={[0, 0.601, 0]} rotation-x={-Math.PI / 2}><ringGeometry args={[0.44, 0.47, 64]} /></mesh>
      <mesh ref={pool} material={materials.pool} rotation-x={-Math.PI / 2} position={[0, 0.011, 0]}><planeGeometry args={[2.6, 2.6]} /></mesh>
      <group ref={piece} position={[0, 1.3, 0]}>
        <group ref={glowMesh} userData={{ glow: materials.glow }}>
          <ProjectSymbol kind={kind} metal={materials.metal} glow={materials.glow} />
        </group>
      </group>
      {/* An invisible, generous hit area: the sculptures themselves are small and full of gaps. */}
      <mesh
        material={hitMat}
        position={[0, 1, 0]}
        onClick={e => { e.stopPropagation(); pickProject(i); }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = ''; }}
      >
        <cylinderGeometry args={[0.75, 0.75, 2, 16]} />
      </mesh>
    </group>
  );
}

export default function Gallery() {
  const root = useRef<THREE.Group>(null);
  // Hidden while the hero is on screen, so the portrait stands alone.
  useFrame(() => { if (root.current) root.current.visible = pastHero(); });
  return <group ref={root}>{liveProjects.map((_, i) => <Exhibit key={i} i={i} />)}</group>;
}
