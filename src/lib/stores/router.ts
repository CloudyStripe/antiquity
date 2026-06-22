/**
 * A tiny hash-based router (zero deps). Hash routing is deliberate: GitHub Pages
 * serves under /<repo>/ with no SPA fallback, so History-API deep links would
 * 404 on refresh. Hashes sidestep that and behave correctly in an installed PWA.
 */
import { readable } from 'svelte/store';

export type Route =
  | { name: 'map' }
  | { name: 'unit'; unitId: string }
  | { name: 'complete'; unitId: string }
  | { name: 'challenge' }
  | { name: 'stats' }
  | { name: 'settings' }
  | { name: 'glossary' }
  | { name: 'primer' };

export function parseHash(hash: string): Route {
  const path = hash.replace(/^#/, '');
  const parts = path.split('/').filter(Boolean); // e.g. ['unit','intro-01','complete']
  if (parts.length === 0) return { name: 'map' };
  switch (parts[0]) {
    case 'unit':
      if (parts[1] && parts[2] === 'complete') return { name: 'complete', unitId: parts[1] };
      if (parts[1]) return { name: 'unit', unitId: parts[1] };
      return { name: 'map' };
    case 'challenge':
      return { name: 'challenge' };
    case 'stats':
      return { name: 'stats' };
    case 'settings':
      return { name: 'settings' };
    case 'glossary':
      return { name: 'glossary' };
    case 'primer':
      return { name: 'primer' };
    default:
      return { name: 'map' };
  }
}

export const route = readable<Route>(parseHash(location.hash), (set) => {
  const update = () => set(parseHash(location.hash));
  window.addEventListener('hashchange', update);
  return () => window.removeEventListener('hashchange', update);
});

export function navigate(path: string, opts: { replace?: boolean } = {}): void {
  const hash = path.startsWith('#') ? path : `#${path}`;
  if (opts.replace) {
    history.replaceState(null, '', hash);
    // replaceState doesn't fire hashchange — nudge the store.
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  } else {
    location.hash = hash;
  }
}

export function back(): void {
  history.back();
}

// Route helpers
export const toMap = () => navigate('/');
export const toUnit = (id: string) => navigate(`/unit/${id}`);
export const toComplete = (id: string) => navigate(`/unit/${id}/complete`, { replace: true });
export const toChallenge = () => navigate('/challenge');
export const toStats = () => navigate('/stats');
export const toSettings = () => navigate('/settings');
export const toGlossary = () => navigate('/glossary');
export const toPrimer = () => navigate('/primer');
