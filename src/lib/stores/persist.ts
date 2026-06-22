/**
 * Canonical persisted state + the Svelte stores that hold it. Everything lives
 * under one versioned localStorage key. Stores are created here and re-exported
 * with behavior by settings.ts / progress.ts so there is a single autosave path
 * and no store-ownership cycles.
 */
import { writable, get } from 'svelte/store';

export const STORAGE_KEY = 'antiquity:v1';
export const SCHEMA_VERSION = 1;

export type ThemeSetting = 'system' | 'light' | 'dark';
export type MotionSetting = 'system' | 'reduce' | 'full';

export interface UnitProgress {
  completed: boolean;
  bestScore: number; // 0..1, best inline-quiz fraction
  lastScreen: number;
  completedAt: string | null;
  lastTouchedAt?: string | null; // ISO of the most recent visit (for "Continue")
}

export interface QuestionStat {
  seen: number;
  correct: number;
  lastSeenAt: string | null;
}

export interface StreakState {
  current: number;
  longest: number;
  lastActiveDay: string | null; // YYYY-MM-DD
}

export interface SettingsState {
  sound: boolean;
  haptics: boolean;
  theme: ThemeSetting;
  reducedMotion: MotionSetting;
  textScale: number;
  primerSeen: boolean;
}

export interface PersistState {
  version: number;
  progress: Record<string, UnitProgress>;
  questionStats: Record<string, QuestionStat>;
  xp: number;
  streak: StreakState;
  badges: string[];
  settings: SettingsState;
}

export function defaultState(): PersistState {
  return {
    version: SCHEMA_VERSION,
    progress: {},
    questionStats: {},
    xp: 0,
    streak: { current: 0, longest: 0, lastActiveDay: null },
    badges: [],
    settings: {
      sound: true,
      haptics: true,
      theme: 'system',
      reducedMotion: 'system',
      textScale: 1,
      primerSeen: false,
    },
  };
}

/** Forward-compatible migration seam. Today: merge over defaults. */
function migrate(raw: unknown): PersistState {
  const base = defaultState();
  if (!raw || typeof raw !== 'object') return base;
  const r = raw as Partial<PersistState>;
  return {
    version: SCHEMA_VERSION,
    progress: { ...base.progress, ...(r.progress ?? {}) },
    questionStats: { ...base.questionStats, ...(r.questionStats ?? {}) },
    xp: typeof r.xp === 'number' ? r.xp : base.xp,
    streak: { ...base.streak, ...(r.streak ?? {}) },
    badges: Array.isArray(r.badges) ? [...new Set(r.badges)] : base.badges,
    settings: { ...base.settings, ...(r.settings ?? {}) },
  };
}

function readPersisted(): PersistState {
  if (typeof localStorage === 'undefined') return defaultState();
  try {
    const txt = localStorage.getItem(STORAGE_KEY);
    if (!txt) return defaultState();
    return migrate(JSON.parse(txt));
  } catch {
    return defaultState(); // corrupt JSON → never crash
  }
}

const initial = readPersisted();

// --- Stores (created once from the loaded state) ---------------------------
export const progress = writable<Record<string, UnitProgress>>(initial.progress);
export const questionStats = writable<Record<string, QuestionStat>>(initial.questionStats);
export const xp = writable<number>(initial.xp);
export const streak = writable<StreakState>(initial.streak);
export const badges = writable<string[]>(initial.badges);
export const settings = writable<SettingsState>(initial.settings);

export function snapshot(): PersistState {
  return {
    version: SCHEMA_VERSION,
    progress: get(progress),
    questionStats: get(questionStats),
    xp: get(xp),
    streak: get(streak),
    badges: get(badges),
    settings: get(settings),
  };
}

let saveTimer: ReturnType<typeof setTimeout> | null = null;
function scheduleSave(): void {
  if (typeof localStorage === 'undefined') return;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot()));
    } catch {
      /* quota / private mode — ignore */
    }
  }, 150);
}

// Wire autosave after initial construction so the first subscribe call (which
// fires synchronously with the current value) doesn't thrash.
let wired = false;
for (const store of [progress, questionStats, xp, streak, badges, settings]) {
  store.subscribe(() => {
    if (wired) scheduleSave();
  });
}
wired = true;

/** Replace every store at once (used by import). */
export function replaceAll(state: PersistState): void {
  progress.set(state.progress);
  questionStats.set(state.questionStats);
  xp.set(state.xp);
  streak.set(state.streak);
  badges.set(state.badges);
  settings.set(state.settings);
  scheduleSave();
}

// --- Export / import -------------------------------------------------------
export function serializeState(): string {
  return JSON.stringify(snapshot(), null, 2);
}

export function downloadProgress(): void {
  const blob = new Blob([serializeState()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const day = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `antiquity-progress-${day}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Parse + migrate imported text and replace state. Throws on invalid JSON. */
export function importProgressFromText(text: string): void {
  const parsed = JSON.parse(text); // throws → caller shows friendly error
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Not a valid Antiquity progress file.');
  }
  replaceAll(migrate(parsed));
}
