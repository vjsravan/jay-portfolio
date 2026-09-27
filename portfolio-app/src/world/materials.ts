import * as THREE from 'three';

/** The one warm accent, and the page colour everything fades into. */
export const AMBER = new THREE.Color('#ffb454');
export const BG = new THREE.Color('#07070a');

/** Soft radial glow, drawn additively: light pools on the floor, halos. */
export function glowMaterial(color: THREE.ColorRepresentation, strength = 1) {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(color) }, uStrength: { value: strength } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `
      uniform vec3 uColor; uniform float uStrength; varying vec2 vUv;
      void main() {
        float d = length(vUv - 0.5) * 2.0;
        float a = pow(max(0.0, 1.0 - d), 2.2) * uStrength;
        gl_FragColor = vec4(uColor * a, 1.0);
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
}

/** Emissive light-line material that ignores tone mapping, so it reads as light. */
export function lightMaterial(color: THREE.ColorRepresentation, intensity = 1) {
  return new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), toneMapped: false });
}

/** The polished dark stone used for slabs and gates. */
export function stoneMaterial(extra: THREE.MeshPhysicalMaterialParameters = {}) {
  return new THREE.MeshPhysicalMaterial({
    color: '#121216',
    roughness: 0.28,
    metalness: 0.35,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
    ...extra,
  });
}

/** The floor: near-black with a fine survey grid and the amber line of the walk. */
export const floorMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uCam: { value: new THREE.Vector3() },
    uBg: { value: BG },
    uAccent: { value: AMBER },
  },
  vertexShader: `
    varying vec3 vWorld;
    void main() {
      vec4 w = modelMatrix * vec4(position, 1.0);
      vWorld = w.xyz;
      gl_Position = projectionMatrix * viewMatrix * w;
    }`,
  fragmentShader: `
    uniform vec3 uCam; uniform vec3 uBg; uniform vec3 uAccent;
    varying vec3 vWorld;
    float grid(vec2 p, float scale) {
      vec2 q = p / scale;
      vec2 g = abs(fract(q - 0.5) - 0.5) / fwidth(q);
      return 1.0 - min(min(g.x, g.y), 1.0);
    }
    void main() {
      vec2 p = vWorld.xz;
      float d = distance(vWorld, uCam);
      float fade = 1.0 - smoothstep(6.0, 40.0, d);
      float lines = grid(p, 1.0) * 0.045 + grid(p, 5.0) * 0.09;
      float walk = (1.0 - smoothstep(0.0, 0.035, abs(p.x))) * step(p.y, 1.5) * 0.55;
      // The floor's slight lift over the page colour fades with distance too,
      // so there's no visible horizon band.
      vec3 col = uBg * mix(1.0, 1.25, fade) + vec3(0.78, 0.82, 0.95) * lines * fade + uAccent * walk * fade;
      gl_FragColor = vec4(col, 1.0);
    }`,
});
