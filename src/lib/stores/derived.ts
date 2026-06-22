/**
 * Reactive selectors derived from progress + content. The Challenge pool here is
 * the cumulative quiz: the union of every question from units the user has
 * actually completed — nothing else.
 */
import { derived } from 'svelte/store';
import { progress, xp, streak, badges, questionStats } from './persist';
import { allUnits, erasInOrder, questionsForUnit } from '../content/load';
import type { Question } from '../content/types';
import { computeUnitStates } from '../engine/unlock';

/** Map of unitId → lifecycle state, recomputed when progress changes. */
export const unitStates = derived(progress, ($progress) =>
  computeUnitStates(allUnits(), erasInOrder, $progress),
);

/** The cumulative Challenge pool: deduped questions from completed units only. */
export const challengePool = derived(progress, ($progress): Question[] => {
  const seen = new Set<string>();
  const pool: Question[] = [];
  for (const u of allUnits()) {
    if (!$progress[u.id]?.completed) continue;
    for (const q of questionsForUnit(u.id)) {
      if (seen.has(q.id)) continue;
      seen.add(q.id);
      pool.push(q);
    }
  }
  return pool;
});

export interface StatsSummary {
  xp: number;
  unitsCompleted: number;
  questionsAnswered: number;
  accuracy: number; // 0..1
  badgeCount: number;
  streakCurrent: number;
  streakLongest: number;
}

export const statsSummary = derived(
  [progress, xp, streak, badges, questionStats],
  ([$progress, $xp, $streak, $badges, $stats]): StatsSummary => {
    const unitsCompleted = Object.values($progress).filter((p) => p.completed).length;
    let seen = 0;
    let correct = 0;
    for (const s of Object.values($stats)) {
      seen += s.seen;
      correct += s.correct;
    }
    return {
      xp: $xp,
      unitsCompleted,
      questionsAnswered: seen,
      accuracy: seen > 0 ? correct / seen : 0,
      badgeCount: $badges.length,
      streakCurrent: $streak.current,
      streakLongest: $streak.longest,
    };
  },
);
