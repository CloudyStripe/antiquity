import { describe, it, expect } from 'vitest';
import { allUnits, erasInOrder } from '../src/lib/content/load';
import { unitState, nextCoreUnit } from '../src/lib/engine/unlock';
import { getUnit } from '../src/lib/content/load';
import type { UnitProgress } from '../src/lib/stores/persist';

const units = allUnits();
const eras = erasInOrder;

function done(): UnitProgress {
  return { completed: true, bestScore: 1, lastScreen: 9, completedAt: '2026-01-01' };
}

const u = (id: string) => getUnit(id)!;

describe('unlock rules', () => {
  it('first Foundations core is available with no progress', () => {
    expect(unitState(u('intro-01-what-is-ancient-history'), eras, units, {})).toBe('available');
  });

  it('the second core is locked until the first is complete', () => {
    expect(unitState(u('intro-02-three-age-system'), eras, units, {})).toBe('locked');
    const progress = { 'intro-01-what-is-ancient-history': done() };
    expect(unitState(u('intro-02-three-age-system'), eras, units, progress)).toBe('available');
  });

  it('a deep-dive is locked until its parent core is complete', () => {
    // dd-three-age-americas extends intro-02-three-age-system
    expect(unitState(u('dd-three-age-americas'), eras, units, {})).toBe('locked');
    const progress = { 'intro-02-three-age-system': done() };
    expect(unitState(u('dd-three-age-americas'), eras, units, progress)).toBe('available');
  });

  it('planned units (later eras) stay locked', () => {
    expect(unitState(u('e1-out-of-africa'), eras, units, {})).toBe('locked');
  });

  it('a completed unit reports completed', () => {
    const progress = { 'intro-01-what-is-ancient-history': done() };
    expect(unitState(u('intro-01-what-is-ancient-history'), eras, units, progress)).toBe(
      'completed',
    );
  });

  it('nextCoreUnit returns the following core in the era', () => {
    const next = nextCoreUnit(u('intro-01-what-is-ancient-history'), units, {});
    expect(next?.id).toBe('intro-02-three-age-system');
  });
});
