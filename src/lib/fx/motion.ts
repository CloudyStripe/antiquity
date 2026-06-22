/**
 * The motion system: a single source of durations/easings so every animated
 * component feels consistent, plus reduced-motion-aware helpers and a couple of
 * custom Svelte transitions used for the "juice".
 */
import { cubicOut, backOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export const DUR = { fast: 120, base: 220, slow: 420 } as const;
export const EASE = { standard: cubicOut, spring: backOut } as const;

/** Returns 0 when motion is reduced, else the given duration. */
export function dur(ms: number, reduced: boolean): number {
  return reduced ? 0 : ms;
}

/** A small scale + fade "pop" for correct-answer / unlock moments. */
export function pop(
  _node: Element,
  { reduced = false, duration = DUR.base }: { reduced?: boolean; duration?: number } = {},
): TransitionConfig {
  if (reduced) return { duration: 0 };
  return {
    duration,
    easing: EASE.spring,
    css: (t) => `transform: scale(${0.85 + 0.15 * t}); opacity: ${t};`,
  };
}

/** Direction-aware horizontal slide + fade for the unit player screens. */
export function slideFade(
  _node: Element,
  {
    dx = 28,
    reduced = false,
    duration = DUR.base,
  }: { dx?: number; reduced?: boolean; duration?: number } = {},
): TransitionConfig {
  if (reduced) return { duration: dur(120, false), css: (t) => `opacity: ${t};` };
  return {
    duration,
    easing: EASE.standard,
    css: (t, u) => `transform: translateX(${u * dx}px); opacity: ${t};`,
  };
}
