import { describe, it, expect } from 'vitest';
import { shuffleQuestion } from '../src/lib/engine/quiz';
import { withinTolerance, mapDistance } from '../src/lib/engine/geo';
import type { Question } from '../src/lib/content/types';

const maptap: Question = {
  id: 'q-map',
  stem: 'Tap the place.',
  type: 'maptap',
  choices: ['Anatolia', 'The Nile Valley', 'The Andes'],
  answer: 0,
  target: { x: 61, y: 29, tolerance: 5 },
  explanation: 'there',
  difficulty: 'medium',
};

describe('shuffleQuestion with maptap', () => {
  it('leaves a maptap question untouched (choices, answer, target preserved)', () => {
    const s = shuffleQuestion(maptap, () => 0.99);
    expect(s.choices).toEqual(maptap.choices);
    expect(s.answer).toBe(0);
    expect(s.originalAnswer).toBe(0);
    expect(s.target).toEqual(maptap.target);
  });

  it('still shuffles an ordinary single-choice question', () => {
    const single: Question = {
      id: 'q-single',
      stem: 'Pick one.',
      type: 'single',
      choices: ['a', 'b', 'c', 'd'],
      answer: 0,
      explanation: 'e',
      difficulty: 'easy',
    };
    const s = shuffleQuestion(single, () => 0.99);
    expect(s.choices[s.answer]).toBe('a'); // answer index still points to the correct choice
  });
});

describe('withinTolerance', () => {
  const target = { x: 61, y: 29, tolerance: 5 };

  it('accepts a tap inside the radius', () => {
    expect(withinTolerance({ x: 62, y: 30 }, target)).toBe(true);
    expect(withinTolerance({ x: 61, y: 29 }, target)).toBe(true);
  });

  it('rejects a tap outside the radius', () => {
    expect(withinTolerance({ x: 70, y: 40 }, target)).toBe(false);
    // The Nile Valley distractor must fall outside Anatolia's tolerance.
    expect(withinTolerance({ x: 58.6, y: 35 }, target)).toBe(false);
  });

  it('mapDistance is symmetric and zero at a point', () => {
    expect(mapDistance({ x: 10, y: 10 }, { x: 10, y: 10 })).toBe(0);
    expect(mapDistance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBeCloseTo(5);
  });
});
