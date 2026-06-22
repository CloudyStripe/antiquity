<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { reducedMotionActive } from '$lib/stores/settings';
  import { sfx } from '$lib/fx/audio';

  interface Props {
    to: number;
    duration?: number;
  }
  let { to, duration = 900 }: Props = $props();
  let display = $state(0);

  onMount(() => {
    if (get(reducedMotionActive) || to <= 0) {
      display = to;
      return;
    }
    const startT = performance.now();
    let lastTick = 0;
    const step = Math.max(1, Math.floor(to / 12));
    const frame = (now: number) => {
      const t = Math.min(1, (now - startT) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      display = Math.round(to * eased);
      if (display - lastTick >= step) {
        sfx.xpTick();
        lastTick = display;
      }
      if (t < 1) requestAnimationFrame(frame);
      else display = to;
    };
    requestAnimationFrame(frame);
  });
</script>

<span class="xp">+{display} XP</span>

<style>
  .xp {
    font-family: var(--font-serif);
    font-size: var(--fs-3xl);
    font-weight: 600;
    color: var(--accent-ink);
    font-variant-numeric: tabular-nums;
  }
</style>
