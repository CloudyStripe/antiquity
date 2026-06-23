/**
 * Pure progress-insight helpers used by the Course Map: which unit to "Continue,"
 * and how many lessons were completed on a given day. Side-effect-free and tested.
 */
import type { Unit, UnitState } from '../content/types';
import type { UnitProgress } from '../stores/persist';
import { dayString } from './gamification';

function touchTime(p: UnitProgress | undefined): number {
  if (!p) return 0;
  const t = p.lastTouchedAt ?? p.completedAt;
  return t ? Date.parse(t) : 0;
}

/**
 * The unit for the "Continue learning" hero:
 *  1. the most recently touched in-progress unit, else
 *  2. if the learner has completed anything, the next available unit
 *     (preferring a core unit), else
 *  3. null — hide the hero (nothing started, or everything done).
 */
export function pickContinue(
  units: Unit[],
  progress: Record<string, UnitProgress>,
  stateOf: (id: string) => UnitState,
): string | null {
  const inProgress = units.filter((u) => stateOf(u.id) === 'in-progress');
  if (inProgress.length) {
    inProgress.sort((a, b) => touchTime(progress[b.id]) - touchTime(progress[a.id]));
    return inProgress[0].id;
  }
  const anyCompleted = units.some((u) => progress[u.id]?.completed);
  if (!anyCompleted) return null;
  const nextCore = units.find((u) => u.kind === 'core' && stateOf(u.id) === 'available');
  if (nextCore) return nextCore.id;
  const nextAny = units.find((u) => stateOf(u.id) === 'available');
  return nextAny?.id ?? null;
}

/** How many units were completed on the given local day (YYYY-MM-DD). */
export function lessonsCompletedOn(
  progress: Record<string, UnitProgress>,
  day: string,
): number {
  let n = 0;
  for (const p of Object.values(progress)) {
    if (p.completed && p.completedAt && dayString(new Date(p.completedAt)) === day) n++;
  }
  return n;
}
