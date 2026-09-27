import * as THREE from 'three';
import { stackLayers } from '../data/stack';
import { liveProjects } from '../data/live';
import { NOW_Z, PIPELINE_Z, gateZ, roles, slabX, slabZ } from './layout';
import { world } from './store';

/**
 * Text that belongs to the 3D world: crisp DOM spans the render loop pins to
 * world positions each frame. Positions are live Vector3s, so an object that
 * moves (the stack's layers) just updates its label's `pos`.
 */
export interface WorldLabel {
  text: string;
  sub?: string;
  pos: THREE.Vector3;
  color: string;
  align: 'center' | 'left' | 'right';
  /** Index into CHAPTERS: the label only shows while that section is on screen. */
  chapter: number;
  visible?: () => number;
}

const short = (company: string) => /\(([^)]+)\)/.exec(company)?.[1] ?? company.replace(' Financial Services', '');

export const pipelineLabels: WorldLabel[] = ['Sync', 'Rebuild', 'Self-improve'].map((text, i) => ({
  text,
  sub: ['daily · GitHub + Medium', 'every sync · redeploy', 'weekly · Claude PR'][i],
  pos: new THREE.Vector3((i - 1) * 3.4, 0, PIPELINE_Z + 0.9),
  color: '#ededf0',
  align: 'center',
  chapter: 2,
}));

export const pathLabels: WorldLabel[] = [
  ...roles.map((r, i) => ({
    text: short(r.company),
    sub: r.period,
    // At eye level beside the right post: clear of the role cards on the
    // left, and never riding up into the headings as the camera walks through.
    pos: new THREE.Vector3(1.95, 1.9, gateZ(i)),
    color: '#ededf0',
    align: 'left' as const,
    chapter: 3,
  })),
  { text: 'Now', sub: 'open to senior roles', pos: new THREE.Vector3(0.3, 1.5, NOW_Z), color: '#ffb454', align: 'left', chapter: 3 },
];

export const stackLabels: WorldLabel[] = stackLayers.map((l, k) => ({
  text: l.name,
  sub: `${l.skills.length} tools`,
  pos: new THREE.Vector3(),
  color: l.color,
  align: 'left',
  chapter: 5,
  // Only the ring that has swung round to face the visitor is named.
  visible: () => ((world.hoveredLayer >= 0 ? world.hoveredLayer : world.activeLayer) === k ? 1 : 0),
}));

/** Each sculpture's name, set on the floor in front of its plinth. */
export const galleryLabels: WorldLabel[] = liveProjects.map((p, i) => ({
  text: p.title.split(/ — | – /)[0],
  sub: p.metric,
  pos: new THREE.Vector3(slabX(i), 0.02, slabZ(i) + 0.95),
  color: '#ededf0',
  align: 'center',
  chapter: 1,
  visible: () => (world.project === i ? 1 : 0.4),
}));

export const allLabels: WorldLabel[] = [...galleryLabels, ...pipelineLabels, ...pathLabels, ...stackLabels];
