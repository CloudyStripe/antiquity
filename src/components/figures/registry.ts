/**
 * Maps a figure `id` from the content to its bespoke SVG component. Each figure
 * is hand-authored to fulfill its `spec`; unknown ids fall back to MissingFigure
 * so future content never renders blank.
 */
import type { Component } from 'svelte';
import DeepTimeFigure from './DeepTimeFigure.svelte';
import ThreeAgeFigure from './ThreeAgeFigure.svelte';
import PaleoMesoNeoFigure from './PaleoMesoNeoFigure.svelte';
import StrataFigure from './StrataFigure.svelte';
import C14DecayFigure from './C14DecayFigure.svelte';
import DendroOverlapFigure from './DendroOverlapFigure.svelte';
import MissingFigure from './MissingFigure.svelte';

export const FIGURES: Record<string, Component<{ class?: string }>> = {
  'fig-deep-time': DeepTimeFigure,
  'fig-three-age': ThreeAgeFigure,
  'fig-paleo-meso-neo': PaleoMesoNeoFigure,
  'fig-strata': StrataFigure,
  'fig-c14-decay': C14DecayFigure,
  'fig-dendro-overlap': DendroOverlapFigure,
};

export function getFigure(id: string): Component<{ class?: string }> | null {
  return FIGURES[id] ?? null;
}

export { MissingFigure };
