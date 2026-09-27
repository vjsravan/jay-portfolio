export type SymbolKind = 'shatter' | 'packets' | 'gateway' | 'bell' | 'nested' | 'lens' | 'knot' | 'portal' | 'default';

/** Which symbol a project gets, from its repository name. */
export function symbolFor(repo?: string): SymbolKind {
  const name = repo?.replace(/\/$/, '').split('/').pop()?.toLowerCase() ?? '';
  const map: Record<string, SymbolKind> = {
    'blast-radius': 'shatter', 'shipment-flow': 'packets', 'llm-gateway': 'gateway', 'llm-eval': 'bell',
    flowsim: 'nested', 'context-lens': 'lens', 'agent-replay': 'knot', 'jay-portfolio': 'portal',
  };
  return map[name] ?? 'default';
}
