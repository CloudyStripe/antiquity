import { describe, it, expect } from 'vitest';
import { parseInline } from '../src/lib/content/markdown';

describe('parseInline', () => {
  it('parses bold, italic, and links', () => {
    const t = parseInline('a **b** c *d* e [f](https://x.com)');
    expect(t).toEqual([
      { kind: 'text', value: 'a ' },
      { kind: 'bold', value: 'b' },
      { kind: 'text', value: ' c ' },
      { kind: 'italic', value: 'd' },
      { kind: 'text', value: ' e ' },
      { kind: 'link', value: 'f', href: 'https://x.com' },
    ]);
  });

  it('never creates a link for unsafe schemes (and preserves the text)', () => {
    const input = '[x](javascript:alert(1))';
    const t = parseInline(input);
    expect(t.some((tok) => tok.kind === 'link')).toBe(false);
    expect(t.map((tok) => tok.value).join('')).toBe(input);
  });

  it('leaves plain text untouched (no HTML interpretation)', () => {
    const t = parseInline('1 < 2 & 3 > 0');
    expect(t).toEqual([{ kind: 'text', value: '1 < 2 & 3 > 0' }]);
  });

  it('prefers bold over italic for **', () => {
    const t = parseInline('**strong**');
    expect(t).toEqual([{ kind: 'bold', value: 'strong' }]);
  });
});
