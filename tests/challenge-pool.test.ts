import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { progress } from '../src/lib/stores/persist';
import { challengePool } from '../src/lib/stores/derived';
import type { UnitProgress } from '../src/lib/stores/persist';

function done(): UnitProgress {
  return { completed: true, bestScore: 1, lastScreen: 9, completedAt: '2026-01-01' };
}

describe('cumulative Challenge pool', () => {
  beforeEach(() => progress.set({}));

  it('is empty when no units are completed', () => {
    expect(get(challengePool)).toHaveLength(0);
  });

  it('contains only questions from completed units', () => {
    progress.set({ 'intro-01-what-is-ancient-history': done() });
    const pool = get(challengePool);
    const ids = pool.map((q) => q.id).sort();
    expect(ids).toEqual(['q-intro01-circa', 'q-intro01-deeptime', 'q-intro01-line']);
  });

  it('unions multiple completed units and dedupes by id', () => {
    progress.set({
      'intro-01-what-is-ancient-history': done(),
      'intro-02-three-age-system': done(),
    });
    const pool = get(challengePool);
    const ids = pool.map((q) => q.id);
    expect(ids).toContain('q-intro01-line');
    expect(ids).toContain('q-intro02-origin');
    // no duplicates
    expect(new Set(ids).size).toBe(ids.length);
    // nothing from an uncompleted unit
    expect(ids).not.toContain('q-intro03-change');
  });
});
