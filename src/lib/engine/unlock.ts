/**
 * Unlock rules — pure. The first era (Foundations) is fully open; completing a
 * core unit unlocks the next core in its era. Deep-dives unlock when their
 * parent core is complete and NEVER gate core progression. Later eras open once
 * the prior era's core is mostly complete.
 */
import type { Era, Unit, UnitState } from '../content/types';
import type { UnitProgress } from '../stores/persist';

const ERA_OPEN_THRESHOLD = 0.7;

type ProgressMap = Record<string, UnitProgress>;

function completed(progress: ProgressMap, id: string): boolean {
  return progress[id]?.completed === true;
}

function coreOfEra(units: Unit[], eraId: string): Unit[] {
  return units
    .filter((u) => u.eraId === eraId && u.kind === 'core')
    .sort((a, b) => a.order - b.order);
}

/** Fraction of an era's *available* core units that are completed. */
function eraCoreFraction(units: Unit[], eraId: string, progress: ProgressMap): number {
  const core = coreOfEra(units, eraId).filter((u) => u.status === 'available');
  if (core.length === 0) return 0;
  const done = core.filter((u) => completed(progress, u.id)).length;
  return done / core.length;
}

function isEraOpen(eras: Era[], units: Unit[], eraId: string, progress: ProgressMap): boolean {
  const ordered = [...eras].sort((a, b) => a.order - b.order);
  const idx = ordered.findIndex((e) => e.id === eraId);
  if (idx <= 0) return true; // first era is always open
  const prev = ordered[idx - 1];
  return eraCoreFraction(units, prev.id, progress) >= ERA_OPEN_THRESHOLD;
}

function isUnlocked(
  unit: Unit,
  eras: Era[],
  units: Unit[],
  progress: ProgressMap,
): boolean {
  if (unit.kind === 'deepdive') {
    return typeof unit.extends === 'string' && completed(progress, unit.extends);
  }
  // core
  if (!isEraOpen(eras, units, unit.eraId, progress)) return false;
  const core = coreOfEra(units, unit.eraId);
  const idx = core.findIndex((u) => u.id === unit.id);
  if (idx <= 0) return true; // first core in the era
  return completed(progress, core[idx - 1].id);
}

export function unitState(
  unit: Unit,
  eras: Era[],
  units: Unit[],
  progress: ProgressMap,
): UnitState {
  if (completed(progress, unit.id)) return 'completed';
  if (unit.status === 'planned') return 'locked';
  if (!isUnlocked(unit, eras, units, progress)) return 'locked';
  const p = progress[unit.id];
  if (p && p.lastScreen > 0) return 'in-progress';
  return 'available';
}

export function computeUnitStates(
  units: Unit[],
  eras: Era[],
  progress: ProgressMap,
): Map<string, UnitState> {
  const map = new Map<string, UnitState>();
  for (const u of units) map.set(u.id, unitState(u, eras, units, progress));
  return map;
}

/** The next available core unit in the same era, after the given unit. */
export function nextCoreUnit(
  unit: Unit,
  units: Unit[],
  progress: ProgressMap,
): Unit | undefined {
  const core = coreOfEra(units, unit.eraId);
  const idx = core.findIndex((u) => u.id === unit.id);
  if (idx === -1) return undefined;
  return core.slice(idx + 1).find((u) => u.status === 'available' && !completed(progress, u.id));
}
