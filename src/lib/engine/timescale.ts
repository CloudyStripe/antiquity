/**
 * The Deep Time Line's scale. Piecewise-linear compression so a ~300,000-year
 * span and a ~2,600 BCE date both fit on one screen without the recent past
 * collapsing to a sliver. Years are astronomical (negative = BCE; a "X years
 * ago" date is passed as its negative). Oldest maps to fraction 0 (top), today
 * to fraction 1 (bottom). Pure and deterministic (no Date), so the scale is
 * unit-testable and stable across renders.
 */

/** A fixed "now" for the foot of the axis (the label reads "Today"). */
export const TODAY = 2026;

export interface Band {
  /** Older edge of the band (more negative year). */
  fromYear: number;
  /** Younger edge of the band. */
  toYear: number;
  /** Axis fraction at the older edge (0 = top / oldest). */
  fromFrac: number;
  /** Axis fraction at the younger edge. */
  toFrac: number;
}

/**
 * Four equal-height bands. Equal visual height for very unequal spans is the
 * whole point: it buys the deep past room to breathe next to the crowded
 * millennia before writing.
 */
export const BANDS: readonly Band[] = [
  { fromYear: -300000, toYear: -50000, fromFrac: 0.0, toFrac: 0.25 },
  { fromYear: -50000, toYear: -10000, fromFrac: 0.25, toFrac: 0.5 },
  { fromYear: -10000, toYear: -3000, fromFrac: 0.5, toFrac: 0.75 },
  { fromYear: -3000, toYear: TODAY, fromFrac: 0.75, toFrac: 1.0 },
];

export const OLDEST_YEAR = BANDS[0].fromYear;

/**
 * Map an astronomical year to its vertical axis fraction (0 = oldest/top,
 * 1 = today/bottom). Monotonic non-decreasing in `year`; clamped to [0, 1]
 * outside the modeled range.
 */
export function yearToFraction(year: number): number {
  if (year <= BANDS[0].fromYear) return 0;
  const last = BANDS[BANDS.length - 1];
  if (year >= last.toYear) return 1;
  for (const b of BANDS) {
    if (year >= b.fromYear && year <= b.toYear) {
      const t = (year - b.fromYear) / (b.toYear - b.fromYear);
      return b.fromFrac + t * (b.toFrac - b.fromFrac);
    }
  }
  return 1; // unreachable given the clamps above
}

export interface Tick {
  year: number;
  label: string;
  fraction: number;
}

/**
 * Band-edge ticks, labeled to match the curriculum's own phrasing: the two
 * oldest edges read "years ago"; from 10,000 BCE downward we use BCE; the foot
 * is "Today".
 */
export const TICKS: readonly Tick[] = [
  { year: -300000, label: '300,000 years ago' },
  { year: -50000, label: '50,000 years ago' },
  { year: -10000, label: '10,000 BCE' },
  { year: -3000, label: '3,000 BCE' },
  { year: TODAY, label: 'Today' },
].map((t) => ({ ...t, fraction: yearToFraction(t.year) }));
