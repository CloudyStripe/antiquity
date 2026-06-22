import { describe, it, expect } from 'vitest';
import rawCurriculum from '../content/curriculum.json';
import {
  CurriculumSchema,
  QuestionSchema,
  UnitSchema,
} from '../src/lib/content/schema';

describe('content schema', () => {
  it('the shipped curriculum.json validates', () => {
    const r = CurriculumSchema.safeParse(rawCurriculum);
    expect(r.success).toBe(true);
  });

  it('rejects a question whose answer index is out of range', () => {
    const r = QuestionSchema.safeParse({
      id: 'q',
      stem: 'x',
      type: 'single',
      choices: ['a', 'b'],
      answer: 2,
      explanation: 'e',
      difficulty: 'easy',
    });
    expect(r.success).toBe(false);
  });

  it('rejects a truefalse question without exactly 2 choices', () => {
    const r = QuestionSchema.safeParse({
      id: 'q',
      stem: 'x',
      type: 'truefalse',
      choices: ['a', 'b', 'c'],
      answer: 0,
      explanation: 'e',
      difficulty: 'easy',
    });
    expect(r.success).toBe(false);
  });

  it('rejects a deepdive unit without `extends`', () => {
    const r = UnitSchema.safeParse({
      id: 'dd',
      eraId: 'foundations',
      order: 1,
      title: 'X',
      estMinutes: 5,
      status: 'available',
      kind: 'deepdive',
      extends: null,
      track: null,
      tags: [],
      screens: [{ type: 'text', body: ['hi'] }],
    });
    expect(r.success).toBe(false);
  });

  it('rejects an available unit with no screens', () => {
    const r = UnitSchema.safeParse({
      id: 'u',
      eraId: 'foundations',
      order: 1,
      title: 'X',
      estMinutes: 5,
      status: 'available',
      kind: 'core',
      extends: null,
      track: null,
      tags: [],
      screens: [],
    });
    expect(r.success).toBe(false);
  });
});
