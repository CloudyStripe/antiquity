/**
 * Celebration particles via canvas-confetti, globally disabled under reduced
 * motion. One call site so motion policy lives in exactly one place.
 */
import confetti from 'canvas-confetti';
import { get } from 'svelte/store';
import { reducedMotionActive } from '../stores/settings';

const LAPIS = ['#2e5a88', '#4c82b8', '#9cc0e3'];
const WARM = ['#c98a3c', '#d8b06a', '#b23a2e'];
const PALETTE = [...LAPIS, ...WARM, '#2f7d52'];

function suppressed(): boolean {
  return get(reducedMotionActive);
}

/** A small burst from a point (x/y in 0..1 viewport coords). */
export function burst(x = 0.5, y = 0.5): void {
  if (suppressed()) return;
  void confetti({
    particleCount: 40,
    spread: 60,
    startVelocity: 32,
    origin: { x, y },
    colors: PALETTE,
    scalar: 0.9,
    ticks: 140,
    disableForReducedMotion: true,
  });
}

/** A bigger, two-sided celebration for unit / challenge completion. */
export function celebrate(): void {
  if (suppressed()) return;
  const base = {
    particleCount: 70,
    spread: 75,
    startVelocity: 42,
    colors: PALETTE,
    ticks: 200,
    disableForReducedMotion: true,
  };
  void confetti({ ...base, origin: { x: 0.15, y: 0.7 }, angle: 60 });
  void confetti({ ...base, origin: { x: 0.85, y: 0.7 }, angle: 120 });
}
