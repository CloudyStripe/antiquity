/**
 * A deliberately tiny inline-markdown tokenizer. We support exactly what the
 * content uses — **bold**, *italic*, and [label](https://url) — and nothing
 * else. No raw HTML is ever interpreted; everything renders through Svelte
 * elements, so there is no XSS surface. Links are source citations and open in
 * a new tab (handled by the renderer).
 */
export type InlineToken =
  | { kind: 'text'; value: string }
  | { kind: 'bold'; value: string }
  | { kind: 'italic'; value: string }
  | { kind: 'link'; value: string; href: string };

// link | bold | italic — order matters so ** is matched before *.
const PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+?)\*\*|\*([^*]+?)\*/g;

/** Only allow safe link schemes; anything else falls back to plain text. */
function safeHref(href: string): string | null {
  if (/^https?:\/\//i.test(href)) return href;
  if (/^mailto:/i.test(href)) return href;
  return null;
}

export function parseInline(input: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  PATTERN.lastIndex = 0;

  while ((m = PATTERN.exec(input)) !== null) {
    if (m.index > lastIndex) {
      tokens.push({ kind: 'text', value: input.slice(lastIndex, m.index) });
    }
    const [, linkLabel, linkUrl, boldText, italicText] = m;
    if (linkLabel !== undefined && linkUrl !== undefined) {
      const href = safeHref(linkUrl);
      if (href) tokens.push({ kind: 'link', value: linkLabel, href });
      else tokens.push({ kind: 'text', value: m[0] });
    } else if (boldText !== undefined) {
      tokens.push({ kind: 'bold', value: boldText });
    } else if (italicText !== undefined) {
      tokens.push({ kind: 'italic', value: italicText });
    }
    lastIndex = m.index + m[0].length;
  }

  if (lastIndex < input.length) {
    tokens.push({ kind: 'text', value: input.slice(lastIndex) });
  }
  return tokens;
}
