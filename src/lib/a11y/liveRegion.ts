/**
 * A single polite ARIA live region for announcing transient state changes
 * (e.g. quiz correct/incorrect) to screen readers. The region is created once
 * and reused; messages are cleared briefly so repeats re-announce.
 */
let region: HTMLElement | null = null;

function ensureRegion(): HTMLElement | null {
  if (typeof document === 'undefined') return null;
  if (!region) {
    region = document.createElement('div');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    region.id = 'a11y-live-region';
    document.body.appendChild(region);
  }
  return region;
}

export function announce(message: string): void {
  const el = ensureRegion();
  if (!el) return;
  el.textContent = '';
  // next tick so AT registers the change
  window.setTimeout(() => {
    if (el) el.textContent = message;
  }, 30);
}
