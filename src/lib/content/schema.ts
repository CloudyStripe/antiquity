/**
 * The content schema — the single contract between `content/curriculum.json`
 * and everything that renders it. Defined once with zod; the TypeScript types
 * are inferred from it (no type/validator drift). Parsing fails loudly in dev.
 */
import { z } from 'zod';

export const Confidence = z.enum(['established', 'contested', 'open']);
export const Difficulty = z.enum(['easy', 'medium', 'hard']);
export const QuestionType = z.enum(['single', 'truefalse']);

export const QuestionSchema = z
  .object({
    id: z.string().min(1),
    stem: z.string().min(1),
    type: QuestionType,
    choices: z.array(z.string().min(1)).min(2),
    answer: z.number().int().min(0),
    explanation: z.string().min(1),
    difficulty: Difficulty,
  })
  .refine((q) => q.answer < q.choices.length, {
    message: 'answer index is out of range for choices',
    path: ['answer'],
  })
  .refine((q) => q.type !== 'truefalse' || q.choices.length === 2, {
    message: 'a truefalse question must have exactly 2 choices',
    path: ['choices'],
  });

// --- Block types (one per screen) -----------------------------------------

export const TextBlockSchema = z.object({
  type: z.literal('text'),
  heading: z.string().optional(),
  body: z.array(z.string().min(1)).min(1),
});

export const TermBlockSchema = z.object({
  type: z.literal('term'),
  term: z.string().min(1),
  pronunciation: z.string().optional(),
  definition: z.string().min(1),
  etymology: z.string().optional(),
});

export const EvidenceBlockSchema = z.object({
  type: z.literal('evidence'),
  heading: z.string().optional(),
  body: z.array(z.string().min(1)).min(1),
  confidence: Confidence,
});

export const DebatePositionSchema = z.object({
  name: z.string().min(1),
  claim: z.string().min(1),
  support: z.array(z.string().min(1)),
  weaknesses: z.array(z.string().min(1)),
});

export const DebateBlockSchema = z.object({
  type: z.literal('debate'),
  heading: z.string().min(1),
  intro: z.string().optional(),
  confidence: Confidence,
  positions: z.array(DebatePositionSchema).min(2),
  whereItStands: z.string().min(1),
});

export const FigureBlockSchema = z.object({
  type: z.literal('figure'),
  id: z.string().min(1),
  intent: z.string(),
  spec: z.string(),
  caption: z.string(),
  alt: z.string().min(1),
});

export const QuizBlockSchema = z.object({
  type: z.literal('quiz'),
  prompt: z.string().optional(),
  questions: z.array(QuestionSchema).min(1),
});

export const BlockSchema = z.discriminatedUnion('type', [
  TextBlockSchema,
  TermBlockSchema,
  EvidenceBlockSchema,
  DebateBlockSchema,
  FigureBlockSchema,
  QuizBlockSchema,
]);

// --- Units / eras / meta ---------------------------------------------------

export const UnitStatus = z.enum(['available', 'planned']);
export const UnitKind = z.enum(['core', 'deepdive']);

export const UnitSchema = z
  .object({
    id: z.string().min(1),
    eraId: z.string().min(1),
    order: z.number().int(),
    title: z.string().min(1),
    subtitle: z.string().optional(),
    estMinutes: z.number().int().positive(),
    status: UnitStatus,
    kind: UnitKind,
    extends: z.string().nullable().optional(),
    track: z.string().nullable().optional(),
    tags: z.array(z.string()).default([]),
    screens: z.array(BlockSchema).default([]),
    completion: z
      .object({ takeaway: z.string(), teaser: z.string() })
      .optional(),
  })
  .refine((u) => u.kind !== 'deepdive' || typeof u.extends === 'string', {
    message: 'a deepdive unit must set `extends` to its parent core unit id',
    path: ['extends'],
  })
  .refine((u) => u.status !== 'available' || u.screens.length > 0, {
    message: 'an available unit must have at least one screen',
    path: ['screens'],
  });

export const EraSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  order: z.number().int(),
});

export const MetaSchema = z.object({
  title: z.string().min(1),
  version: z.string().min(1),
  datingConventionNote: z.string().min(1),
});

export const CurriculumSchema = z.object({
  meta: MetaSchema,
  eras: z.array(EraSchema).min(1),
  units: z.array(UnitSchema).min(1),
});

// --- Inferred types --------------------------------------------------------

export type Confidence = z.infer<typeof Confidence>;
export type Difficulty = z.infer<typeof Difficulty>;
export type QuestionType = z.infer<typeof QuestionType>;
export type Question = z.infer<typeof QuestionSchema>;

export type TextBlock = z.infer<typeof TextBlockSchema>;
export type TermBlock = z.infer<typeof TermBlockSchema>;
export type EvidenceBlock = z.infer<typeof EvidenceBlockSchema>;
export type DebatePosition = z.infer<typeof DebatePositionSchema>;
export type DebateBlock = z.infer<typeof DebateBlockSchema>;
export type FigureBlock = z.infer<typeof FigureBlockSchema>;
export type QuizBlock = z.infer<typeof QuizBlockSchema>;
export type Block = z.infer<typeof BlockSchema>;
export type BlockType = Block['type'];

export type UnitStatus = z.infer<typeof UnitStatus>;
export type UnitKind = z.infer<typeof UnitKind>;
export type Unit = z.infer<typeof UnitSchema>;
export type Era = z.infer<typeof EraSchema>;
export type Meta = z.infer<typeof MetaSchema>;
export type Curriculum = z.infer<typeof CurriculumSchema>;

/** Narrow a Block to a specific type (handy in renderers/selectors). */
export type BlockOf<T extends BlockType> = Extract<Block, { type: T }>;
