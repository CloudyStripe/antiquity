import { describe, it, expect } from 'vitest';
import { computeEarnedBadges } from '../src/lib/engine/gamification';
import { allUnits } from '../src/lib/content/load';
import type { UnitProgress } from '../src/lib/stores/persist';

function done(): UnitProgress {
  return { completed: true, bestScore: 1, lastScreen: 9, completedAt: '2026-01-01' };
}

const artifactUnitIds = allUnits()
  .filter((u) => u.artifact != null)
  .map((u) => u.id);

function ctxWith(ids: string[]) {
  const progress: Record<string, UnitProgress> = {};
  for (const id of ids) progress[id] = done();
  return {
    units: allUnits(),
    progress,
    streakLongest: 0,
    challengePerfectEver: false,
    existing: [] as string[],
  };
}

describe('curator badge', () => {
  it('the curriculum offers at least ten artifacts to recover', () => {
    expect(artifactUnitIds.length).toBeGreaterThanOrEqual(10);
  });

  it('is not earned with nine artifacts recovered', () => {
    expect(computeEarnedBadges(ctxWith(artifactUnitIds.slice(0, 9)))).not.toContain('curator');
  });

  it('is earned with ten artifacts recovered', () => {
    expect(computeEarnedBadges(ctxWith(artifactUnitIds.slice(0, 10)))).toContain('curator');
  });

  it('does not fire on completed units that have no artifact', () => {
    // Complete a planned/undefined-artifact unit set: use ids known to lack artifacts.
    const noArtifact = allUnits()
      .filter((u) => u.artifact == null)
      .slice(0, 12)
      .map((u) => u.id);
    expect(computeEarnedBadges(ctxWith(noArtifact))).not.toContain('curator');
  });
});
