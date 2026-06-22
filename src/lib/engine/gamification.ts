/**
 * XP, streaks, and badges — pure logic. Tasteful and supportive: a broken
 * streak is never punished, and deep-dive completions reward the curious on the
 * same footing as core units.
 */
import type { Difficulty, Unit } from '../content/types';
import type { StreakState, UnitProgress } from '../stores/persist';

export const XP_BY_DIFFICULTY: Record<Difficulty, number> = {
  easy: 10,
  medium: 15,
  hard: 25,
};
export const UNIT_COMPLETE_BONUS = 50;
export const CHALLENGE_ROUND_BONUS = 20;

export function xpForQuestion(difficulty: Difficulty): number {
  return XP_BY_DIFFICULTY[difficulty];
}

// --- Streak ----------------------------------------------------------------

/** Local-day string YYYY-MM-DD. */
export function dayString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function previousDay(day: string): string {
  const d = new Date(`${day}T00:00:00`);
  d.setDate(d.getDate() - 1);
  return dayString(d);
}

/**
 * Advance the streak for activity on `today`. Same day → unchanged; consecutive
 * day → increment; any gap → reset to 1. Tracks the longest ever. Never shames.
 */
export function bumpStreak(streak: StreakState, today: string): StreakState {
  if (streak.lastActiveDay === today) return streak;
  let current: number;
  if (streak.lastActiveDay && previousDay(today) === streak.lastActiveDay) {
    current = streak.current + 1;
  } else {
    current = 1;
  }
  return {
    current,
    longest: Math.max(streak.longest, current),
    lastActiveDay: today,
  };
}

// --- Badges ----------------------------------------------------------------

export interface BadgeMeta {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
}

export const BADGES: BadgeMeta[] = [
  { id: 'first-steps', title: 'First Steps', description: 'Complete your first unit.', icon: 'footprints' },
  { id: 'foundations-complete', title: 'Foundations', description: 'Complete every core Foundations unit.', icon: 'library' },
  { id: 'perfect-quiz', title: 'Flawless', description: 'Score 100% on a unit quiz.', icon: 'sparkles' },
  { id: 'streak-3', title: 'Three-Day Streak', description: 'Learn three days in a row.', icon: 'flame' },
  { id: 'streak-7', title: 'Week-Long Streak', description: 'Learn seven days in a row.', icon: 'flame' },
  { id: 'streak-30', title: 'Month-Long Streak', description: 'Learn thirty days in a row.', icon: 'flame' },
  { id: 'deep-diver-5', title: 'Deep Diver', description: 'Finish five optional deep-dive modules.', icon: 'compass' },
  { id: 'challenge-100', title: 'Challenge Master', description: 'Score 100% in a Challenge round.', icon: 'trophy' },
];

export const BADGE_BY_ID: Record<string, BadgeMeta> = Object.fromEntries(
  BADGES.map((b) => [b.id, b]),
);

export interface BadgeContext {
  units: Unit[];
  progress: Record<string, UnitProgress>;
  streakLongest: number;
  challengePerfectEver: boolean; // sticky flag (already-earned or just earned)
  existing: string[];
}

/** The full cumulative set of earned badges given current state. */
export function computeEarnedBadges(ctx: BadgeContext): string[] {
  const earned = new Set(ctx.existing);
  const completed = (id: string) => ctx.progress[id]?.completed === true;

  const anyCompleted = ctx.units.some((u) => completed(u.id));
  if (anyCompleted) earned.add('first-steps');

  const foundationsCore = ctx.units.filter(
    (u) => u.eraId === 'foundations' && u.kind === 'core',
  );
  if (foundationsCore.length > 0 && foundationsCore.every((u) => completed(u.id))) {
    earned.add('foundations-complete');
  }

  const anyPerfect = Object.values(ctx.progress).some(
    (p) => p.completed && p.bestScore >= 1,
  );
  if (anyPerfect) earned.add('perfect-quiz');

  if (ctx.streakLongest >= 3) earned.add('streak-3');
  if (ctx.streakLongest >= 7) earned.add('streak-7');
  if (ctx.streakLongest >= 30) earned.add('streak-30');

  const deepDiveDone = ctx.units.filter(
    (u) => u.kind === 'deepdive' && completed(u.id),
  ).length;
  if (deepDiveDone >= 5) earned.add('deep-diver-5');

  if (ctx.challengePerfectEver) earned.add('challenge-100');

  return [...earned];
}

/** Badges in `next` that aren't in `prev` — the ones to celebrate. */
export function newlyEarned(prev: string[], next: string[]): string[] {
  const before = new Set(prev);
  return next.filter((b) => !before.has(b));
}
