/**
 * Pure quiz logic: shuffling, scoring, and the Challenge sampler (with the
 * spaced-repetition weighting seam). Kept side-effect-free and dependency-light
 * so it is straightforward to unit test and to upgrade (e.g. to SM-2) later.
 */
import type { Question } from '../content/types';
import type { QuestionStat } from '../stores/persist';

export type Rng = () => number;

/** Fisher–Yates shuffle (returns a new array; does not mutate input). */
export function shuffle<T>(arr: readonly T[], rng: Rng = Math.random): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export interface ShuffledQuestion extends Question {
  /** Mapping so callers can relate a shuffled choice back to the original. */
  originalAnswer: number;
}

/** Shuffle a question's choices and remap the correct-answer index. */
export function shuffleQuestion(q: Question, rng: Rng = Math.random): ShuffledQuestion {
  const indices = shuffle(
    q.choices.map((_, i) => i),
    rng,
  );
  const choices = indices.map((i) => q.choices[i]);
  const answer = indices.indexOf(q.answer);
  return { ...q, choices, answer, originalAnswer: q.answer };
}

/** Fraction (0..1) of questions answered correctly. */
export function scoreFraction(correctCount: number, total: number): number {
  if (total <= 0) return 0;
  return correctCount / total;
}

/**
 * Spaced-repetition weighting seam. Higher weight = more likely to be drawn.
 * Lightly favors unseen questions and ones answered incorrectly; mildly favors
 * questions not seen recently. Intentionally simple and self-contained.
 */
export function questionWeight(stat: QuestionStat | undefined, now: number): number {
  let w = 1;
  if (!stat || stat.seen === 0) {
    w += 1.5; // unseen bonus
    return w;
  }
  const accuracy = stat.correct / stat.seen;
  w += (1 - accuracy) * 1.5; // wrong-answer bias
  if (stat.lastSeenAt) {
    const days = (now - Date.parse(stat.lastSeenAt)) / 86_400_000;
    if (Number.isFinite(days)) w += Math.min(Math.max(days, 0) / 7, 1) * 0.6;
  }
  return Math.max(w, 0.05);
}

/**
 * Sample up to `n` questions from a pool, weighted by `questionWeight`, without
 * replacement. Returns fewer than `n` only if the pool is smaller.
 */
export function sampleChallenge(
  pool: readonly Question[],
  n: number,
  stats: Record<string, QuestionStat>,
  now: number,
  rng: Rng = Math.random,
): Question[] {
  const candidates = pool.map((q) => ({ q, w: questionWeight(stats[q.id], now) }));
  const picked: Question[] = [];
  const take = Math.min(n, candidates.length);
  for (let k = 0; k < take; k++) {
    const total = candidates.reduce((s, c) => s + c.w, 0);
    let r = rng() * total;
    let idx = 0;
    for (let i = 0; i < candidates.length; i++) {
      r -= candidates[i].w;
      if (r <= 0) {
        idx = i;
        break;
      }
    }
    picked.push(candidates[idx].q);
    candidates.splice(idx, 1);
  }
  return picked;
}
