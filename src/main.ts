import '@fontsource-variable/inter';
// Serif is used only for English headings — Latin subset keeps the bundle lean.
import '@fontsource/eb-garamond/latin-500.css';
import '@fontsource/eb-garamond/latin-600.css';
import './app.css';

import { resolvedTheme, reducedMotionActive, settings } from '$lib/stores/settings';

const root = document.documentElement;

// Apply environment synchronously (stores fire immediately) → no flash of the
// wrong theme / motion state before the app mounts.
resolvedTheme.subscribe((t) => root.setAttribute('data-theme', t));
reducedMotionActive.subscribe((reduced) => {
  root.classList.toggle('reduce-motion', reduced);
  root.classList.toggle('allow-motion', !reduced);
});
settings.subscribe((s) => root.style.setProperty('--text-scale', String(s.textScale)));

function renderFatal(err: unknown): void {
  const target = document.getElementById('app');
  if (!target) return;
  const message = err instanceof Error ? err.message : String(err);
  target.innerHTML = '';
  const box = document.createElement('pre');
  box.style.cssText =
    'margin:0;min-height:100dvh;padding:2rem;white-space:pre-wrap;font:14px/1.5 ui-monospace,monospace;background:#3a201c;color:#f0a89e;overflow:auto';
  box.textContent = `Antiquity failed to start.\n\n${message}`;
  target.appendChild(box);
}

async function boot(): Promise<void> {
  const target = document.getElementById('app');
  if (!target) return;
  try {
    const { mount } = await import('svelte');
    const { default: App } = await import('./App.svelte');
    target.innerHTML = ''; // remove boot splash
    mount(App, { target });
  } catch (err) {
    renderFatal(err);
    return;
  }

  // Register the service worker for offline/install (autoUpdate).
  try {
    const { registerSW } = await import('virtual:pwa-register');
    registerSW({ immediate: true });
  } catch {
    /* SW unavailable (e.g. dev) — app still works */
  }
}

void boot();
