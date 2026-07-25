/**
 * Live visitor counter backed by Abacus (https://abacus.jasoncameron.dev) —
 * a free, open-source hit counter. No key or account needed; the counter is
 * namespaced to this portfolio. Works from a static GitHub Pages deploy.
 *
 * Increments at most once per browser session (sessionStorage flag); every
 * other load just reads the current value.
 */

const API = 'https://abacus.jasoncameron.dev';
const NAMESPACE = 'vjsravan-jay-portfolio';
const COUNTER = 'profile-views';
const SESSION_FLAG = 'nx-visit-counted';

let cached: number | null = null;
let inflight: Promise<number | null> | null = null;

export function getCachedVisitorCount(): number | null {
  return cached;
}

export function fetchVisitorCount(): Promise<number | null> {
  if (cached !== null) return Promise.resolve(cached);
  if (inflight) return inflight;

  const alreadyCounted = sessionStorage.getItem(SESSION_FLAG) === '1';
  const action = alreadyCounted ? 'get' : 'hit';

  inflight = fetch(`${API}/${action}/${NAMESPACE}/${COUNTER}`)
    .then(res => (res.ok ? res.json() : Promise.reject(new Error(`${res.status}`))))
    .then((data: { value: number }) => {
      if (!alreadyCounted) sessionStorage.setItem(SESSION_FLAG, '1');
      cached = data.value;
      return cached;
    })
    .catch(() => {
      inflight = null; // allow a retry on next call
      return null;
    });

  return inflight;
}
