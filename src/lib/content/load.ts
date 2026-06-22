/**
 * Loads, validates, and exposes the curriculum. `content/curriculum.json` is the
 * single source of truth; it is imported (and therefore bundled + precached for
 * offline). To split into per-era files later, change ONLY this module to use
 * `import.meta.glob('../../../content/*.json')` — nothing else needs to know.
 */
import rawCurriculum from '../../../content/curriculum.json';
import { CurriculumSchema, type Curriculum, type Unit, type Era } from './schema';
import type { Question, TermBlock } from './types';

function prettyZodError(error: unknown): string {
  if (error && typeof error === 'object' && 'issues' in error) {
    const issues = (error as { issues: Array<{ path: (string | number)[]; message: string }> })
      .issues;
    return issues
      .map((i) => `  • ${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('\n');
  }
  return String(error);
}

/** Cross-reference checks that a per-object schema can't express. Throws in dev. */
function assertIntegrity(c: Curriculum): void {
  const problems: string[] = [];
  const eraIds = new Set(c.eras.map((e) => e.id));
  const coreIds = new Set(c.units.filter((u) => u.kind === 'core').map((u) => u.id));

  const seenUnitIds = new Set<string>();
  const seenQuestionIds = new Set<string>();

  for (const u of c.units) {
    if (seenUnitIds.has(u.id)) problems.push(`duplicate unit id: ${u.id}`);
    seenUnitIds.add(u.id);

    if (!eraIds.has(u.eraId)) problems.push(`unit ${u.id} references unknown eraId "${u.eraId}"`);

    if (u.kind === 'deepdive' && u.extends && !coreIds.has(u.extends)) {
      problems.push(`deepdive ${u.id} extends unknown core unit "${u.extends}"`);
    }

    for (const s of u.screens) {
      if (s.type === 'quiz') {
        for (const q of s.questions) {
          if (seenQuestionIds.has(q.id)) problems.push(`duplicate question id: ${q.id}`);
          seenQuestionIds.add(q.id);
        }
      }
    }
  }

  if (problems.length) {
    throw new Error(`Curriculum integrity errors:\n${problems.join('\n')}`);
  }
}

function loadCurriculum(): Curriculum {
  const parsed = CurriculumSchema.safeParse(rawCurriculum);
  if (!parsed.success) {
    const msg = `content/curriculum.json failed schema validation:\n${prettyZodError(parsed.error)}`;
    throw new Error(msg);
  }
  assertIntegrity(parsed.data);
  return parsed.data;
}

export const curriculum: Curriculum = loadCurriculum();
export const meta = curriculum.meta;

// --- Selectors -------------------------------------------------------------

export const erasInOrder: Era[] = [...curriculum.eras].sort((a, b) => a.order - b.order);

export function getEra(id: string): Era | undefined {
  return curriculum.eras.find((e) => e.id === id);
}

export function getUnit(id: string): Unit | undefined {
  return curriculum.units.find((u) => u.id === id);
}

/** Core units of an era, in interleaved teaching order (by `order`). */
export function coreUnitsOfEra(eraId: string): Unit[] {
  return curriculum.units
    .filter((u) => u.eraId === eraId && u.kind === 'core')
    .sort((a, b) => a.order - b.order);
}

/** Deep-dive units that extend a given core unit, in order. */
export function deepDivesOf(coreUnitId: string): Unit[] {
  return curriculum.units
    .filter((u) => u.kind === 'deepdive' && u.extends === coreUnitId)
    .sort((a, b) => a.order - b.order);
}

export function allUnits(): Unit[] {
  return curriculum.units;
}

/** Every distinct civilization track referenced by units in an era. */
export function tracksOfEra(eraId: string): string[] {
  const set = new Set<string>();
  for (const u of curriculum.units) {
    if (u.eraId === eraId && u.track) set.add(u.track);
  }
  return [...set];
}

/** Every quiz question inside a unit (the unit's contribution to Challenge). */
export function questionsForUnit(unitId: string): Question[] {
  const unit = getUnit(unitId);
  if (!unit) return [];
  const out: Question[] = [];
  for (const s of unit.screens) {
    if (s.type === 'quiz') out.push(...s.questions);
  }
  return out;
}

export interface GlossaryEntry {
  block: TermBlock;
  unitId: string;
  unitTitle: string;
}

/** All `term` blocks across available units, sorted alphabetically by term. */
export function allTermBlocks(): GlossaryEntry[] {
  const entries: GlossaryEntry[] = [];
  for (const u of curriculum.units) {
    if (u.status !== 'available') continue;
    for (const s of u.screens) {
      if (s.type === 'term') {
        entries.push({ block: s, unitId: u.id, unitTitle: u.title });
      }
    }
  }
  return entries.sort((a, b) => a.block.term.localeCompare(b.block.term));
}
