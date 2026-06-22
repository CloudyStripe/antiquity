import { describe, it, expect } from 'vitest';
import { bumpStreak, dayString } from '../src/lib/engine/gamification';
import type { StreakState } from '../src/lib/stores/persist';

const base: StreakState = { current: 0, longest: 0, lastActiveDay: null };

describe('bumpStreak', () => {
  it('starts a streak at 1 on first activity', () => {
    const s = bumpStreak(base, '2026-06-22');
    expect(s).toEqual({ current: 1, longest: 1, lastActiveDay: '2026-06-22' });
  });

  it('is a no-op on the same day', () => {
    const s1 = bumpStreak(base, '2026-06-22');
    const s2 = bumpStreak(s1, '2026-06-22');
    expect(s2).toBe(s1);
  });

  it('increments on a consecutive day', () => {
    const s1 = bumpStreak(base, '2026-06-22');
    const s2 = bumpStreak(s1, '2026-06-23');
    expect(s2.current).toBe(2);
    expect(s2.longest).toBe(2);
  });

  it('resets to 1 after a gap but keeps the longest', () => {
    let s = bumpStreak(base, '2026-06-20');
    s = bumpStreak(s, '2026-06-21');
    s = bumpStreak(s, '2026-06-22'); // current 3, longest 3
    s = bumpStreak(s, '2026-06-25'); // gap
    expect(s.current).toBe(1);
    expect(s.longest).toBe(3);
  });

  it('handles month boundaries', () => {
    const s1 = bumpStreak(base, '2026-06-30');
    const s2 = bumpStreak(s1, '2026-07-01');
    expect(s2.current).toBe(2);
  });

  it('dayString formats local YYYY-MM-DD', () => {
    expect(dayString(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});
