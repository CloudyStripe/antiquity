/**
 * Stable barrel for content types so components import from one place
 * (`$lib/content/types`) rather than reaching into the schema module.
 */
export type {
  Confidence,
  Difficulty,
  QuestionType,
  Question,
  TextBlock,
  TermBlock,
  EvidenceBlock,
  DebatePosition,
  DebateBlock,
  FigureBlock,
  QuizBlock,
  Block,
  BlockType,
  BlockOf,
  UnitStatus,
  UnitKind,
  Unit,
  Era,
  Meta,
  Curriculum,
} from './schema';

/** Lifecycle state of a unit on the course map. */
export type UnitState = 'locked' | 'available' | 'in-progress' | 'completed';
