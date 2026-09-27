import { skills } from './resume';

/**
 * The skills from resume.ts, arranged as the layers of a system rather than a
 * list: the Stack section and the 3D stack both render from
 * this, bottom layer first.
 */
export const stackLayers = [
  { name: 'Cloud & infra', role: 'Where it all runs', color: '#60a5fa', skills: skills.cloud },
  { name: 'Data', role: 'What has to be right tomorrow', color: '#34d399', skills: skills.databases },
  { name: 'Messaging', role: 'How services talk without waiting on each other', color: '#fbbf24', skills: skills.messaging },
  { name: 'Services', role: 'Where requests land', color: '#5ce1ff', skills: [...skills.backend, ...skills.languages] },
  { name: 'Interface', role: 'What people touch', color: '#a78bfa', skills: skills.frontend },
  { name: 'AI & LLM', role: 'Gateways, evaluation and retrieval around the models', color: '#f472b6', skills: skills.ai },
];

/** Concerns that cut through every layer instead of sitting in one. */
export const crossCutting = [
  { name: 'Delivery', skills: skills.devops },
  { name: 'Observability', skills: skills.observability },
  { name: 'Testing', skills: skills.testing },
  { name: 'Security', skills: skills.security },
];
