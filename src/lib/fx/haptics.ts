/**
 * Haptic feedback via `navigator.vibrate`, gated by the `haptics` setting and
 * feature detection. No-ops on desktop / unsupported devices.
 */
import { get } from 'svelte/store';
import { settings } from '../stores/settings';

function canVibrate(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    typeof navigator.vibrate === 'function' &&
    get(settings).haptics
  );
}

function buzz(pattern: number | number[]): void {
  if (!canVibrate()) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* ignore */
  }
}

export const haptics = {
  tick(): void {
    buzz(8);
  },
  success(): void {
    buzz([14, 40, 22]);
  },
  soft(): void {
    buzz(18);
  },
  celebrate(): void {
    buzz([20, 50, 20, 50, 40]);
  },
};
