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
// Era 1 (Before Cities) + Bronze Age Round 1
import OutOfAfricaFigure from './OutOfAfricaFigure.svelte';
import CaveArtTimelineFigure from './CaveArtTimelineFigure.svelte';
import GobekliFigure from './GobekliFigure.svelte';
import CatalhoyukFigure from './CatalhoyukFigure.svelte';
import StonehengePhasesFigure from './StonehengePhasesFigure.svelte';
import CuneiformFigure from './CuneiformFigure.svelte';
import NarmerFigure from './NarmerFigure.svelte';
import CaralFigure from './CaralFigure.svelte';
import MissingFigure from './MissingFigure.svelte';

export const FIGURES: Record<string, Component<{ class?: string }>> = {
  'fig-deep-time': DeepTimeFigure,
  'fig-three-age': ThreeAgeFigure,
  'fig-paleo-meso-neo': PaleoMesoNeoFigure,
  'fig-strata': StrataFigure,
  'fig-c14-decay': C14DecayFigure,
  'fig-dendro-overlap': DendroOverlapFigure,
  'fig-out-of-africa': OutOfAfricaFigure,
  'fig-cave-art-timeline': CaveArtTimelineFigure,
  'fig-gobekli': GobekliFigure,
  'fig-catalhoyuk': CatalhoyukFigure,
  'fig-stonehenge-phases': StonehengePhasesFigure,
  'fig-cuneiform': CuneiformFigure,
  'fig-narmer': NarmerFigure,
  'fig-caral': CaralFigure,
};

export function getFigure(id: string): Component<{ class?: string }> | null {
  return FIGURES[id] ?? null;
}

export { MissingFigure };
