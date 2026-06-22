/**
 * Runtime-synthesized sound effects via the Web Audio API — no audio files.
 * All SFX are short, soft, and tasteful; everything respects the master `sound`
 * setting. The AudioContext is created lazily on the first user gesture (browser
 * autoplay policy) via `unlockAudio()`.
 */
import { get } from 'svelte/store';
import { settings } from '../stores/settings';

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function ensureCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
  }
  return ctx;
}

/** Call from a user gesture so the context can start (autoplay policy). */
export function unlockAudio(): void {
  const c = ensureCtx();
  if (c && c.state === 'suspended') void c.resume();
}

function enabled(): boolean {
  return get(settings).sound;
}

/** A single shaped tone. */
function tone(
  freq: number,
  start: number,
  durSec: number,
  {
    type = 'sine',
    gain = 0.2,
    glideTo,
  }: { type?: OscillatorType; gain?: number; glideTo?: number } = {},
): void {
  if (!ctx || !master) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, start + durSec);
  // Quick attack, smooth exponential release — soft, never clicky.
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, start + durSec);
  osc.connect(g);
  g.connect(master);
  osc.start(start);
  osc.stop(start + durSec + 0.02);
}

function play(build: (c: AudioContext) => void): void {
  if (!enabled()) return;
  const c = ensureCtx();
  if (!c) return;
  if (c.state === 'suspended') void c.resume();
  build(c);
}

export const sfx = {
  tap(): void {
    play((c) => tone(220, c.currentTime, 0.06, { type: 'triangle', gain: 0.08 }));
  },
  correct(): void {
    play((c) => {
      const t = c.currentTime;
      tone(523.25, t, 0.12, { type: 'sine', gain: 0.16 }); // C5
      tone(659.25, t + 0.07, 0.16, { type: 'sine', gain: 0.16 }); // E5
      tone(783.99, t + 0.14, 0.22, { type: 'sine', gain: 0.16 }); // G5
    });
  },
  combo(level: number): void {
    // Rising pitch with the combo level for an escalating "on a roll" feel.
    play((c) => {
      const base = 523.25 * Math.pow(1.08, Math.min(level, 8));
      tone(base, c.currentTime, 0.16, { type: 'triangle', gain: 0.16, glideTo: base * 1.5 });
    });
  },
  wrong(): void {
    // Soft, muted, restrained — never harsh.
    play((c) => tone(196, c.currentTime, 0.22, { type: 'sine', gain: 0.12, glideTo: 146.83 }));
  },
  xpTick(): void {
    play((c) => tone(880, c.currentTime, 0.04, { type: 'square', gain: 0.05 }));
  },
  complete(): void {
    play((c) => {
      const t = c.currentTime;
      // A little fanfare arpeggio.
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
        tone(f, t + i * 0.1, 0.32, { type: 'sine', gain: 0.16 }),
      );
    });
  },
};
