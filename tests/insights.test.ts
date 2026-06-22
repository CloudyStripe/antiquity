import { describe, it, expect } from 'vitest';
import { pickContinue, lessonsCompletedOn } from '../src/lib/engine/insights';
import { allUnits } from '../src/lib/content/load';
import type { UnitState } from '../src/lib/content/types';
import type { UnitProgress } from '../src/lib/stores/persist';

const units = allUnits();
const prog = (over: Partial<UnitProgress> = {}): UnitProgress => ({
  completed: false,
  bestScore: 0,
  lastScreen: 0,
  completedAt: null,
  lastTouchedAt: null,
  ...over,
});

function stater(map: Record<string, UnitState>) {
  return (id: string): UnitState => map[id] ?? 'locked';
}

describe('pickContinue', () => {
  it('returns null when nothing is started', () => {
    const state = stater({ 'intro-01-what-is-ancient-history': 'available' });
    expect(pickContinue(units, {}, state)).toBeNull();
  });

  it('returns the in-progress unit', () => {
    const progress = {
      'intro-02-three-age-system': prog({ lastScreen: 2, lastTouchedAt: '2026-06-22T10:00:00Z' }),
    };
    const state = stater({ 'intro-02-three-age-system': 'in-progress' });
    expect(pickContinue(units, progress, state)).toBe('intro-02-three-age-system');
  });

  it('prefers the most recently touched in-progress unit', () => {
    const progress = {
      'intro-02-three-age-system': prog({ lastScreen: 2, lastTouchedAt: '2026-06-22T10:00:00Z' }),
      'intro-03-paleo-meso-neolithic': prog({ lastScreen: 1, lastTouchedAt: '2026-06-22T18:00:00Z' }),
    };
    const state = stater({
      'intro-02-three-age-system': 'in-progress',
      'intro-03-paleo-meso-neolithic': 'in-progress',
    });
    expect(pickContinue(units, progress, state)).toBe('intro-03-paleo-meso-neolithic');
  });

  it('falls back to the next available core unit when something is completed', () => {
    const progress = { 'intro-01-what-is-ancient-history': prog({ completed: true }) };
    const state = stater({
      'intro-01-what-is-ancient-history': 'completed',
      'intro-02-three-age-system': 'available',
    });
    expect(pickContinue(units, progress, state)).toBe('intro-02-three-age-system');
  });

  it('returns null when everything reachable is completed', () => {
    const progress = { 'intro-01-what-is-ancient-history': prog({ completed: true }) };
    const state = stater({ 'intro-01-what-is-ancient-history': 'completed' }); // nothing available
    expect(pickContinue(units, progress, state)).toBeNull();
  });
});

describe('lessonsCompletedOn', () => {
  it('counts units completed on the given local day', () => {
    const today = new Date(2026, 5, 22, 9, 0, 0); // local
    const other = new Date(2026, 5, 21, 9, 0, 0);
    const progress = {
      a: prog({ completed: true, completedAt: today.toISOString() }),
      b: prog({ completed: true, completedAt: today.toISOString() }),
      c: prog({ completed: true, completedAt: other.toISOString() }),
      d: prog({ completed: false }),
    };
    expect(lessonsCompletedOn(progress, '2026-06-22')).toBe(2);
  });
});
