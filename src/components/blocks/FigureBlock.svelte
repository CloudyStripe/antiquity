<script lang="ts">
  import type { FigureBlock } from '$lib/content/types';
  import { getFigure, MissingFigure } from '$components/figures/registry';
  interface Props {
    block: FigureBlock;
  }
  let { block }: Props = $props();
  const Fig = $derived(getFigure(block.id));
</script>

<figure class="figure" role="img" aria-label={block.alt}>
  <div class="figure__canvas">
    {#if Fig}
      <Fig />
    {:else}
      <MissingFigure alt={block.alt} />
    {/if}
  </div>
  {#if block.caption}<figcaption>{block.caption}</figcaption>{/if}
</figure>

<style>
  .figure {
    margin: 0;
  }
  .figure__canvas {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: var(--sp-4);
    box-shadow: var(--shadow-sm);
  }
  figcaption {
    margin-top: var(--sp-2);
    font-size: var(--fs-sm);
    color: var(--ink-soft);
    text-align: center;
    font-style: italic;
    max-width: var(--measure);
    margin-inline: auto;
  }
</style>
