import { describe, it, expect } from 'vitest';
import { yearToFraction, BANDS, TICKS, TODAY } from '../src/lib/engine/timescale';

describe('timescale', () => {
  it('maps band edges to their expected axis fractions', () => {
    expect(yearToFraction(-300000)).toBeCloseTo(0);
    expect(yearToFraction(-50000)).toBeCloseTo(0.25);
    expect(yearToFraction(-10000)).toBeCloseTo(0.5);
    expect(yearToFraction(-3000)).toBeCloseTo(0.75);
    expect(yearToFraction(TODAY)).toBeCloseTo(1);
  });

  it('is monotonic non-decreasing across the whole range', () => {
    let prev = -Infinity;
    for (let y = -320000; y <= TODAY + 1000; y += 250) {
      const f = yearToFraction(y);
      expect(f).toBeGreaterThanOrEqual(prev);
      prev = f;
    }
  });

  it('clamps outside the modeled range', () => {
    expect(yearToFraction(-1_000_000)).toBe(0);
    expect(yearToFraction(5000)).toBe(1);
  });

  it('interpolates linearly within a band', () => {
    // Midpoint of band A (-300000..-50000) sits at fraction 0.125.
    expect(yearToFraction(-175000)).toBeCloseTo(0.125);
    // A quarter into band D (-3000..2026) => 0.75 + 0.25 * 0.25 wide bands.
    const b = BANDS[3];
    const quarterYear = b.fromYear + 0.25 * (b.toYear - b.fromYear);
    expect(yearToFraction(quarterYear)).toBeCloseTo(0.75 + 0.25 * 0.25);
  });

  it('keeps a real cluster distinguishable (Uruk end vs Caral vs Egypt)', () => {
    // These crowd together near the C/D boundary — the reason for two-lane layout.
    const uruk = yearToFraction(-3100);
    const egypt = yearToFraction(-3100);
    const megaliths = yearToFraction(-3000);
    const caral = yearToFraction(-2600);
    expect(uruk).toBeCloseTo(egypt);
    expect(caral).toBeGreaterThan(megaliths);
    expect(caral - uruk).toBeLessThan(0.05); // genuinely clustered
  });

  it('publishes five labeled ticks with matching phrasing', () => {
    expect(TICKS).toHaveLength(5);
    expect(TICKS[0].label).toBe('300,000 years ago');
    expect(TICKS[1].label).toBe('50,000 years ago');
    expect(TICKS[2].label).toBe('10,000 BCE');
    expect(TICKS[4].label).toBe('Today');
    expect(TICKS[0].fraction).toBeCloseTo(0);
    expect(TICKS[4].fraction).toBeCloseTo(1);
  });
});
