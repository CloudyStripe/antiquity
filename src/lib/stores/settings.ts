/**
 * Settings store (re-exported from persist) plus the derived "resolved" values
 * the app actually renders with: effective theme and whether motion is reduced,
 * each folding the user's choice together with the OS preference.
 */
import { readable, derived } from 'svelte/store';
import { settings, type SettingsState } from './persist';

export { settings };
export type { SettingsState };

function mediaStore(query: string, initial: boolean) {
  return readable(initial, (set) => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    set(mql.matches);
    const onChange = (e: MediaQueryListEvent) => set(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  });
}

export const systemDark = mediaStore('(prefers-color-scheme: dark)', false);
export const systemReduce = mediaStore('(prefers-reduced-motion: reduce)', false);

/** Effective theme to apply to <html data-theme>. */
export const resolvedTheme = derived(
  [settings, systemDark],
  ([$s, $dark]): 'light' | 'dark' =>
    $s.theme === 'system' ? ($dark ? 'dark' : 'light') : $s.theme,
);

/** Whether motion should be reduced right now. */
export const reducedMotionActive = derived(
  [settings, systemReduce],
  ([$s, $reduce]): boolean =>
    $s.reducedMotion === 'reduce' ? true : $s.reducedMotion === 'full' ? false : $reduce,
);

export function updateSetting<K extends keyof SettingsState>(
  key: K,
  value: SettingsState[K],
): void {
  settings.update((s) => ({ ...s, [key]: value }));
}
