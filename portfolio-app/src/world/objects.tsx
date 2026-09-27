import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AMBER, floorMaterial, glowMaterial, lightMaterial, stoneMaterial } from './materials';
import { NOW_Z, ORB, PIPELINE_Z, PORTAL, gateZ, roles } from './layout';
import { energyAt, spark } from './spark-state';
import { pastHero, world } from './store';

// While the hero is on screen only the portal exists: everything further down
// the walk is hidden (pastHero), so the portrait and name are the whole picture.

export function Floor() {
  useFrame(({ camera }) => { (floorMaterial.uniforms.uCam.value as THREE.Vector3).copy(camera.position); });
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, -40]} material={floorMaterial}>
      <planeGeometry args={[240, 240]} />
    </mesh>
  );
}

// ── Portal: a ring of warm light rising out of the floor ────────────────
const portalGlow = glowMaterial(AMBER, 0.55);
const portalPool = glowMaterial(AMBER, 0.45);

/**
 * The ring's two layers (a bright core line and a soft halo) share one shader
 * that can unwind: fragments are dropped from the bottom midpoint round the
 * right side, up to the erasing edge, which the star rides (Spark.tsx).
 */
function ringMaterial(fragmentBody: string, color: THREE.Color, strength: number) {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: color }, uStrength: { value: strength }, uErase: { value: 0 } },
    vertexShader: `
      varying vec3 vN; varying vec3 vV; varying vec2 vLocal;
      void main() {
        vLocal = position.xy;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uColor; uniform float uStrength; uniform float uErase;
      varying vec3 vN; varying vec3 vV; varying vec2 vLocal;
      void main() {
        // Angle from the bottom midpoint, increasing up the right side.
        float fromBottom = mod(atan(vLocal.y, vLocal.x) + 1.5707963, 6.2831853);
        float edge = uErase * 6.2831853;
        float keep = uErase <= 0.0001 ? 1.0 : smoothstep(edge, edge + 0.08, fromBottom);
        if (keep <= 0.001) discard;
        ${fragmentBody}
        gl_FragColor = vec4(col * keep, 1.0);
      }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
  });
}
const portalCore = ringMaterial('vec3 col = uColor * uStrength;', new THREE.Color('#ffe2b8'), 1.6);
const portalHalo = ringMaterial('vec3 col = uColor * pow(abs(dot(vN, vV)), 2.5) * uStrength;', AMBER.clone(), 0.5);

export function Portal() {
  const root = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!root.current) return;
    // Scrolling the hero unwinds the ring into the star (Spark.tsx owns `erase`).
    const erase = spark.erase;
    root.current.visible = erase < 0.999;
    const left = 1 - erase;
    const breathe = 0.85 + Math.sin(clock.getElapsedTime() * 0.8) * 0.15;
    portalCore.uniforms.uErase.value = erase;
    portalHalo.uniforms.uErase.value = erase;
    portalHalo.uniforms.uStrength.value = 0.45 * breathe;
    portalGlow.uniforms.uStrength.value = 0.5 * breathe * left;
    portalPool.uniforms.uStrength.value = 0.45 * left;
  });
  return (
    <group ref={root} position={PORTAL}>
      <group>
        <mesh material={portalCore}><torusGeometry args={[2.1, 0.02, 16, 256]} /></mesh>
        <mesh material={portalHalo}><torusGeometry args={[2.1, 0.14, 24, 256]} /></mesh>
      </group>
      <mesh material={portalGlow} position={[0, 0, -0.6]}><planeGeometry args={[7.5, 7.5]} /></mesh>
      <mesh material={portalPool} rotation-x={-Math.PI / 2} position={[0, -PORTAL.y + 0.01, 0.4]}><planeGeometry args={[9, 4]} /></mesh>
    </group>
  );
}

// ── Pipeline: sync → rebuild → self-improve, drawn on the floor ─────────
const puckMat = stoneMaterial({ color: '#16161b' });
const puckRims = [0, 1, 2].map(() => lightMaterial(AMBER, 1.2));
const PUCK_X = [-3.4, 0, 3.4];
const puckPos = PUCK_X.map(x => new THREE.Vector3(x, 0.1, PIPELINE_Z));
const trackMat = lightMaterial('#ffffff', 0.18);
const pulseMat = lightMaterial('#ffd6a0', 2.2);
const puckPool = glowMaterial(AMBER, 0.35);

export function Pipeline() {
  const pulse = useRef<THREE.Mesh>(null);
  const root = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!pulse.current || !root.current) return;
    root.current.visible = pastHero();
    // Each station flares as the star passes over it.
    puckRims.forEach((m, i) => m.color.copy(AMBER).multiplyScalar(0.7 + energyAt(puckPos[i], 2) * 2.4));
    const t = (clock.getElapsedTime() * 0.28) % 1;
    pulse.current.position.x = THREE.MathUtils.lerp(-3.4, 3.4, t);
    pulse.current.scale.x = 1 + Math.sin(t * Math.PI) * 2;
  });
  return (
    <group ref={root} position={[0, 0, PIPELINE_Z]}>
      <mesh material={trackMat} rotation-x={-Math.PI / 2} position={[0, 0.012, 0]}><planeGeometry args={[6.8, 0.03]} /></mesh>
      <mesh ref={pulse} material={pulseMat} rotation-x={-Math.PI / 2} position={[0, 0.02, 0]}><planeGeometry args={[0.35, 0.05]} /></mesh>
      {PUCK_X.map((x, i) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh material={puckMat} position={[0, 0.05, 0]}><cylinderGeometry args={[0.5, 0.5, 0.1, 64]} /></mesh>
          <mesh material={puckRims[i]} position={[0, 0.101, 0]} rotation-x={-Math.PI / 2}><ringGeometry args={[0.44, 0.47, 64]} /></mesh>
          <mesh material={puckPool} rotation-x={-Math.PI / 2} position={[0, 0.011, 0]}><planeGeometry args={[2.4, 2.4]} /></mesh>
        </group>
      ))}
    </group>
  );
}

// ── The path: a gate for each role, oldest first, then Now ──────────────
const gateMat = stoneMaterial();
const pathMat = lightMaterial(AMBER, 0.9);
const nowMat = lightMaterial('#ffd9a8', 1.8);
const nowGlow = glowMaterial(AMBER, 0.6);

const gateEdges = roles.map(r => lightMaterial(r.color, 1.1));
const gateCentre = roles.map((_, i) => new THREE.Vector3(0, 1.6, gateZ(i)));

function Gate({ z, edge }: { z: number; edge: THREE.Material }) {
  const w = 3.4, h = 3.2, t = 0.14;
  return (
    <group position={[0, 0, z]}>
      <mesh material={gateMat} position={[-w / 2, h / 2, 0]}><boxGeometry args={[t, h, t]} /></mesh>
      <mesh material={gateMat} position={[w / 2, h / 2, 0]}><boxGeometry args={[t, h, t]} /></mesh>
      <mesh material={gateMat} position={[0, h, 0]}><boxGeometry args={[w + t, t, t]} /></mesh>
      {/* a hairline of the role's colour on the inner face */}
      <mesh material={edge} position={[-w / 2 + t / 2 + 0.005, h / 2, 0]}><boxGeometry args={[0.012, h - 0.1, 0.04]} /></mesh>
      <mesh material={edge} position={[w / 2 - t / 2 - 0.005, h / 2, 0]}><boxGeometry args={[0.012, h - 0.1, 0.04]} /></mesh>
      <mesh material={edge} position={[0, h - t / 2 - 0.005, 0]}><boxGeometry args={[w - t, 0.012, 0.04]} /></mesh>
    </group>
  );
}

export function Path() {
  const start = gateZ(0) + 4, end = NOW_Z;
  const root = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!root.current) return;
    root.current.visible = pastHero();
    // A gate's edges light up as the star flies through it.
    gateEdges.forEach((m, i) => m.color.set(roles[i].color).multiplyScalar(0.8 + energyAt(gateCentre[i], 3) * 2.2));
  });
  return (
    <group ref={root}>
      <mesh material={pathMat} rotation-x={-Math.PI / 2} position={[0, 0.013, (start + end) / 2]}>
        <planeGeometry args={[0.05, start - end]} />
      </mesh>
      {roles.map((r, i) => <Gate key={r.company} z={gateZ(i)} edge={gateEdges[i]} />)}
      <group position={[0, 0, NOW_Z]}>
        <mesh material={nowMat} position={[0, 1.7, 0]}><cylinderGeometry args={[0.018, 0.018, 3.4, 12]} /></mesh>
        <mesh material={nowGlow} position={[0, 1.7, 0]}><planeGeometry args={[2.4, 5]} /></mesh>
        <mesh material={nowGlow} rotation-x={-Math.PI / 2} position={[0, 0.012, 0]}><planeGeometry args={[3, 3]} /></mesh>
      </group>
    </group>
  );
}

// ── Signal: a soft sun at the end of the walk ───────────────────────────
const orbMat = new THREE.ShaderMaterial({
  uniforms: { uTime: { value: 0 }, uIgnite: { value: 0 } },
  vertexShader: `
    varying vec3 vN; varying vec3 vV;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: `
    uniform float uTime; uniform float uIgnite; varying vec3 vN; varying vec3 vV;
    void main() {
      float f = clamp(dot(vN, vV), 0.0, 1.0);
      vec3 core = mix(vec3(1.0, 0.62, 0.28), vec3(1.0, 0.95, 0.86), pow(f, 3.0));
      float rim = pow(1.0 - f, 3.0);
      vec3 col = core * (0.55 + 0.45 * f) + vec3(1.0, 0.75, 0.45) * rim * 0.6;
      col *= 0.92 + 0.08 * sin(uTime * 1.3);
      // A dim ember until the star lands in it.
      col *= mix(0.22, 1.0, uIgnite);
      gl_FragColor = vec4(col, 1.0);
    }`,
  toneMapped: false,
});
const orbHalo = glowMaterial(AMBER, 0.8);
const orbPool = glowMaterial(AMBER, 0.4);

export function Orb() {
  const root = useRef<THREE.Group>(null);
  const ignite = useRef(0);
  useFrame(({ clock, camera }, dt) => {
    orbMat.uniforms.uTime.value = clock.getElapsedTime();
    const target = (1 - THREE.MathUtils.smoothstep(spark.pos.distanceTo(ORB), 0.6, 3)) * world.chapterWeight[6];
    ignite.current = THREE.MathUtils.lerp(ignite.current, target, 1 - Math.exp(-dt * 2));
    orbMat.uniforms.uIgnite.value = ignite.current;
    orbHalo.uniforms.uStrength.value = 0.2 + ignite.current * 0.7;
    orbPool.uniforms.uStrength.value = 0.1 + ignite.current * 0.35;
    // Only once the walk reaches the stack: earlier it sits right behind the
    // "Now" beam and crowds it.
    if (root.current) root.current.visible = camera.position.z < -52;
  });
  return (
    <group ref={root} position={ORB}>
      <mesh material={orbMat}><sphereGeometry args={[1, 64, 64]} /></mesh>
      <mesh material={orbHalo} position={[0, 0, -0.5]}><planeGeometry args={[7, 7]} /></mesh>
      <mesh material={orbPool} rotation-x={-Math.PI / 2} position={[0, -ORB.y + 0.01, 0]}><planeGeometry args={[8, 5]} /></mesh>
    </group>
  );
}
