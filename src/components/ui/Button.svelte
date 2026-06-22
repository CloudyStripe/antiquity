<script lang="ts">
  import type { Snippet } from 'svelte';
  import { sfx, unlockAudio } from '$lib/fx/audio';
  import { haptics } from '$lib/fx/haptics';

  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit';
    disabled?: boolean;
    full?: boolean;
    ariaLabel?: string;
    quiet?: boolean; // suppress the tap SFX (for elements with their own sound)
    onclick?: (e: MouseEvent) => void;
    class?: string;
    children: Snippet;
  }
  let {
    variant = 'primary',
    size = 'md',
    type = 'button',
    disabled = false,
    full = false,
    ariaLabel,
    quiet = false,
    onclick,
    class: klass = '',
    children,
  }: Props = $props();

  let ripples = $state<{ id: number; x: number; y: number }[]>([]);
  let seed = 0;

  function press(e: PointerEvent): void {
    if (disabled) return;
    unlockAudio();
    if (!quiet) sfx.tap();
    haptics.tick();
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const id = seed++;
    ripples = [...ripples, { id, x: e.clientX - r.left, y: e.clientY - r.top }];
    setTimeout(() => {
      ripples = ripples.filter((rp) => rp.id !== id);
    }, 600);
  }
</script>

<button
  {type}
  class="btn {variant} {size} {klass}"
  class:full
  {disabled}
  aria-label={ariaLabel}
  onpointerdown={press}
  {onclick}
>
  <span class="btn__label">{@render children()}</span>
  {#each ripples as r (r.id)}
    <span class="ripple" style="left:{r.x}px; top:{r.y}px"></span>
  {/each}
</button>

<style>
  .btn {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--sp-2);
    min-height: var(--tap);
    padding: 0 var(--sp-5);
    border: 1px solid transparent;
    border-radius: var(--r-pill);
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: var(--fs-base);
    line-height: 1;
    cursor: pointer;
    user-select: none;
    transition:
      transform var(--dur-fast) var(--ease-spring),
      box-shadow var(--dur-fast) var(--ease-standard),
      background var(--dur-fast) var(--ease-standard),
      filter var(--dur-fast) var(--ease-standard);
  }
  .btn:active:not(:disabled) {
    transform: scale(0.96);
  }
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .btn__label {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2);
    z-index: 1;
  }

  .sm {
    min-height: 36px;
    padding: 0 var(--sp-3);
    font-size: var(--fs-sm);
  }
  .lg {
    min-height: 52px;
    padding: 0 var(--sp-6);
    font-size: var(--fs-lg);
  }
  .full {
    width: 100%;
  }

  .primary {
    background: var(--accent);
    color: var(--on-accent);
    box-shadow: var(--shadow-sm);
  }
  .primary:hover:not(:disabled) {
    background: var(--accent-strong);
    box-shadow: var(--shadow-md);
  }
  .secondary {
    background: var(--surface);
    color: var(--ink);
    border-color: var(--border-strong);
    box-shadow: var(--shadow-sm);
  }
  .secondary:hover:not(:disabled) {
    background: var(--surface-2);
  }
  .ghost {
    background: transparent;
    color: var(--ink);
  }
  .ghost:hover:not(:disabled) {
    background: var(--surface-2);
  }
  .danger {
    background: var(--error);
    color: #fff;
  }

  .ripple {
    position: absolute;
    width: 12px;
    height: 12px;
    margin: -6px 0 0 -6px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.35;
    transform: scale(0);
    animation: ripple 0.6s var(--ease-out) forwards;
    pointer-events: none;
    z-index: 0;
  }
  @keyframes ripple {
    to {
      transform: scale(14);
      opacity: 0;
    }
  }
  :global(html.reduce-motion) .ripple {
    display: none;
  }
</style>
