/**
 * The write path for progress: all mutations go through these actions so XP,
 * streak, badges, and per-question stats stay consistent. Components never poke
 * the raw stores directly.
 */
import { get } from 'svelte/store';
import {
  progress,
  questionStats,
  xp,
  streak,
  badges,
  type UnitProgress,
} from './persist';
import { allUnits, getUnit } from '../content/load';
import type { Question } from '../content/types';
import {
  xpForQuestion,
  bumpStreak,
  dayString,
  computeEarnedBadges,
  newlyEarned,
  UNIT_COMPLETE_BONUS,
  CHALLENGE_ROUND_BONUS,
} from '../engine/gamification';
import { writable } from 'svelte/store';

export { progress, questionStats, xp, streak, badges };

function nowIso(): string {
  return new Date().toISOString();
}

const blankUnit = (): UnitProgress => ({
  completed: false,
  bestScore: 0,
  lastScreen: 0,
  completedAt: null,
});

/** Result of completing a unit, surfaced to the celebration screen. */
export interface CompletionResult {
  unitId: string;
  score: number;
  xpGained: number;
  newBadges: string[];
  alreadyComplete: boolean;
}

/** Transient: the most recent completion, read by the Unit Complete screen. */
export const lastCompletion = writable<CompletionResult | null>(null);

function recordQuestionStat(qId: string, correct: boolean): void {
  questionStats.update((m) => {
    const prev = m[qId] ?? { seen: 0, correct: 0, lastSeenAt: null };
    return {
      ...m,
      [qId]: {
        seen: prev.seen + 1,
        correct: prev.correct + (correct ? 1 : 0),
        lastSeenAt: nowIso(),
      },
    };
  });
}

/** Persist the furthest screen reached in a unit (for resume). */
export function setLastScreen(unitId: string, index: number): void {
  progress.update((m) => {
    const prev = m[unitId] ?? blankUnit();
    return { ...m, [unitId]: { ...prev, lastScreen: index } };
  });
}

/** Answer an inline quiz question. Awards XP live, but only before the unit is
 *  first completed (so replays don't farm XP). Always updates SR stats. */
export function answerInline(unitId: string, q: Question, correct: boolean): void {
  recordQuestionStat(q.id, correct);
  const unitDone = get(progress)[unitId]?.completed === true;
  if (correct && !unitDone) {
    xp.update((v) => v + xpForQuestion(q.difficulty));
  }
}

/** Answer a Challenge question (always awards XP — review is its own reward). */
export function answerChallenge(q: Question, correct: boolean): void {
  recordQuestionStat(q.id, correct);
  if (correct) xp.update((v) => v + xpForQuestion(q.difficulty));
}

function refreshBadges(challengePerfectEver: boolean): string[] {
  const prev = get(badges);
  const next = computeEarnedBadges({
    units: allUnits(),
    progress: get(progress),
    streakLongest: get(streak).longest,
    challengePerfectEver,
    existing: prev,
  });
  const fresh = newlyEarned(prev, next);
  if (fresh.length) badges.set(next);
  return fresh;
}

/** Mark a unit complete; award the completion bonus, bump the streak, evaluate
 *  badges, and record the result for the celebration screen. Idempotent on XP. */
export function completeUnit(unitId: string, score: number): CompletionResult {
  const unit = getUnit(unitId);
  const lastIndex = unit ? Math.max(unit.screens.length - 1, 0) : 0;
  const before = get(progress)[unitId];
  const alreadyComplete = before?.completed === true;

  progress.update((m) => {
    const prev = m[unitId] ?? blankUnit();
    return {
      ...m,
      [unitId]: {
        completed: true,
        bestScore: Math.max(prev.bestScore, score),
        lastScreen: lastIndex,
        completedAt: alreadyComplete ? prev.completedAt : nowIso(),
      },
    };
  });

  let xpGained = 0;
  if (!alreadyComplete) {
    xpGained += UNIT_COMPLETE_BONUS;
    xp.update((v) => v + UNIT_COMPLETE_BONUS);
    streak.update((s) => bumpStreak(s, dayString(new Date())));
  }

  const challengePerfectEver = get(badges).includes('challenge-100');
  const newBadges = refreshBadges(challengePerfectEver);

  const result: CompletionResult = {
    unitId,
    score,
    xpGained,
    newBadges,
    alreadyComplete,
  };
  lastCompletion.set(result);
  return result;
}

/** Record a finished Challenge round: round bonus, streak bump, badge check. */
export interface ChallengeResult {
  correct: number;
  total: number;
  xpGained: number;
  newBadges: string[];
}

export function recordChallengeResult(correct: number, total: number): ChallengeResult {
  let xpGained = 0;
  if (total > 0) {
    xpGained += CHALLENGE_ROUND_BONUS;
    xp.update((v) => v + CHALLENGE_ROUND_BONUS);
    streak.update((s) => bumpStreak(s, dayString(new Date())));
  }
  const perfect = total > 0 && correct === total;
  const challengePerfectEver = perfect || get(badges).includes('challenge-100');
  const newBadges = refreshBadges(challengePerfectEver);
  return { correct, total, xpGained, newBadges };
}
