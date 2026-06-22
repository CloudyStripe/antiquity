<script lang="ts" module>
  import type { Confidence } from '$lib/content/types';
  const CHIP: Record<Confidence, { label: string; icon: string }> = {
    established: { label: 'Established', icon: 'circle-check' },
    contested: { label: 'Contested', icon: 'scale' },
    open: { label: 'Open question', icon: 'telescope' },
  };
</script>

<script lang="ts">
  import Icon from './Icon.svelte';
  interface Props {
    confidence: Confidence;
  }
  let { confidence }: Props = $props();
  const meta = $derived(CHIP[confidence]);
</script>

<span class="chip {confidence}" title="Confidence: {meta.label}">
  <Icon name={meta.icon} size={14} strokeWidth={2.4} />
  <span class="chip__label">{meta.label}</span>
</span>

<style>
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 10px 3px 8px;
    border-radius: var(--r-pill);
    font-size: var(--fs-xs);
    font-weight: 600;
    letter-spacing: 0.01em;
    white-space: nowrap;
    border: 1px solid transparent;
  }
  .established {
    color: var(--chip-established-ink);
    background: var(--chip-established-bg);
    border-color: color-mix(in srgb, var(--chip-established-ink) 25%, transparent);
  }
  .contested {
    color: var(--chip-contested-ink);
    background: var(--chip-contested-bg);
    border-color: color-mix(in srgb, var(--chip-contested-ink) 25%, transparent);
  }
  .open {
    color: var(--chip-open-ink);
    background: var(--chip-open-bg);
    border-color: color-mix(in srgb, var(--chip-open-ink) 25%, transparent);
  }
</style>
