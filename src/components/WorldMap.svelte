<script lang="ts">
  import type { MapTarget } from '$lib/content/types';
  import Icon from './ui/Icon.svelte';

  interface Tap {
    x: number;
    y: number;
    clientX: number;
    clientY: number;
  }

  interface Props {
    /** The learner's dropped pin, in map percentages (0..100). */
    pin?: { x: number; y: number } | null;
    /** The true location, revealed after answering. */
    target?: MapTarget | null;
    revealed?: boolean;
    disabled?: boolean;
    onTap?: (t: Tap) => void;
  }
  let { pin = null, target = null, revealed = false, disabled = false, onTap }: Props = $props();

  // Simplified equirectangular outlines (viewBox 200 x 100, so x = 2 * xPercent,
  // y = yPercent). Hand-drawn and schematic: this is a quiz aid, not an atlas.
  const LAND = [
    'M 20 22 L 30 16 L 46 16 L 54 22 L 50 30 L 46 33 L 52 40 L 46 47 L 40 50 L 36 42 L 32 40 L 30 30 L 24 30 Z',
    'M 46 47 L 52 46 L 56 52 L 52 54 L 48 51 Z',
    'M 52 54 L 62 50 L 68 56 L 66 66 L 60 78 L 55 74 L 54 64 L 52 58 Z',
    'M 66 10 L 76 8 L 80 14 L 74 20 L 68 16 Z',
    'M 96 16 L 108 13 L 118 15 L 122 20 L 116 24 L 108 27 L 100 24 L 96 20 Z',
    'M 96 34 L 106 31 L 116 33 L 122 40 L 120 50 L 112 64 L 106 70 L 101 66 L 98 54 L 94 44 Z',
    'M 116 27 L 128 26 L 133 31 L 129 37 L 120 37 L 115 32 Z',
    'M 122 14 L 150 9 L 176 12 L 192 20 L 188 30 L 176 36 L 160 40 L 146 42 L 136 40 L 130 34 L 126 26 L 122 20 Z',
    'M 138 42 L 146 42 L 148 50 L 142 52 L 138 46 Z',
    'M 160 40 L 172 42 L 176 48 L 168 50 L 162 46 Z',
    'M 166 56 L 182 55 L 187 62 L 181 70 L 169 71 L 164 63 Z',
  ];

  function handleClick(e: MouseEvent): void {
    if (disabled || e.detail === 0) return; // e.detail === 0 => keyboard; use the list instead
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onTap?.({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
      clientX: e.clientX,
      clientY: e.clientY,
    });
  }
</script>

<div class="map" class:disabled>
  <svg viewBox="0 0 200 100" preserveAspectRatio="none" class="map__svg" aria-hidden="true">
    <rect class="ocean" x="0" y="0" width="200" height="100" />
    <g class="land">
      {#each LAND as d}<path {d} />{/each}
    </g>
    {#if revealed && target}
      <ellipse class="tol" cx={2 * target.x} cy={target.y} rx={2 * target.tolerance} ry={target.tolerance} />
      <circle class="truept" cx={2 * target.x} cy={target.y} r="1.4" />
    {/if}
  </svg>

  <button
    class="map__hit"
    onclick={handleClick}
    {disabled}
    aria-label="World map. Tap where the answer belongs, or use the list option below."
  ></button>

  {#if pin}
    <span class="pin pin--you" style="left:{pin.x}%; top:{pin.y}%"><Icon name="map-pin" size={24} /></span>
  {/if}
  {#if revealed && target}
    <span class="pin pin--true" style="left:{target.x}%; top:{target.y}%"><Icon name="map-pin" size={24} /></span>
  {/if}
</div>

<style>
  .map {
    position: relative;
    aspect-ratio: 2 / 1;
    width: 100%;
    border: 1px solid var(--border-strong);
    border-radius: var(--r-md);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }
  .map__svg {
    display: block;
    width: 100%;
    height: 100%;
  }
  /* Once answered, the map is disabled; dim its base so the revealed pins stand out.
     (No transition: Chrome will not animate `filter` from `none`, so it is applied instantly.) */
  .map.disabled .map__svg {
    filter: brightness(0.95) saturate(0.82);
  }
  .ocean {
    fill: color-mix(in srgb, var(--accent) 10%, var(--surface-2));
  }
  .land path {
    fill: var(--surface);
    stroke: var(--border-strong);
    stroke-width: 0.6;
    stroke-linejoin: round;
  }
  .tol {
    fill: color-mix(in srgb, var(--success) 22%, transparent);
    stroke: var(--success);
    stroke-width: 0.5;
  }
  :global(html.allow-motion) .tol {
    transform-box: fill-box;
    transform-origin: center;
    animation: ring-pulse 1.8s var(--ease-standard) infinite;
  }
  .truept {
    fill: var(--success);
  }

  .map__hit {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    background: transparent;
    border: none;
    cursor: crosshair;
  }
  .map__hit:disabled {
    cursor: default;
  }

  .pin {
    position: absolute;
    transform: translate(-50%, -100%);
    pointer-events: none;
    line-height: 0;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.35));
  }
  .pin--you {
    color: var(--accent);
  }
  .pin--true {
    color: var(--success);
  }

  @keyframes ring-pulse {
    0%,
    100% {
      opacity: 0.9;
    }
    50% {
      opacity: 0.4;
    }
  }
</style>
