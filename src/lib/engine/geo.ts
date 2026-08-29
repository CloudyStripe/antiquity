/**
 * Geography helpers for the `maptap` question type. Coordinates are percentages
 * of the shared world map's width/height (0..100). Pure and side-effect-free so
 * the hit test is unit-testable independent of the SVG map.
 */
import type { MapTarget } from '../content/types';

export interface Point {
  x: number;
  y: number;
}

/** Percentage distance between two points on the map. */
export function mapDistance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** True if a tap lands within the target's tolerance radius. */
export function withinTolerance(tap: Point, target: MapTarget): boolean {
  return mapDistance(tap, target) <= target.tolerance;
}
