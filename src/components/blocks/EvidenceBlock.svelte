<script lang="ts">
  import type { EvidenceBlock } from '$lib/content/types';
  import MarkdownText from '../MarkdownText.svelte';
  import Icon from '$components/ui/Icon.svelte';
  import Chip from '$components/ui/Chip.svelte';
  interface Props {
    block: EvidenceBlock;
  }
  let { block }: Props = $props();
</script>

<aside class="evidence" aria-label="How we know: evidence panel">
  <div class="evidence__head">
    <span class="evidence__brand">
      <span class="evidence__glass"><Icon name="microscope" size={18} strokeWidth={2.2} /></span>
      <span>
        <span class="evidence__kicker">How we know</span>
        {#if block.heading}<span class="evidence__title">{block.heading}</span>{/if}
      </span>
    </span>
    <Chip confidence={block.confidence} />
  </div>
  <div class="evidence__body">
    {#each block.body as para}
      <p><MarkdownText text={para} /></p>
    {/each}
  </div>
</aside>

<style>
  .evidence {
    background: var(--surface);
    border: 1px solid var(--border-strong);
    border-radius: var(--r-md);
    padding: var(--sp-4);
    box-shadow: var(--shadow-sm);
    position: relative;
    overflow: hidden;
  }
  .evidence::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 5px;
    background: linear-gradient(var(--accent), var(--accent-strong));
  }
  .evidence__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--sp-3);
    flex-wrap: wrap;
    margin-bottom: var(--sp-3);
  }
  .evidence__brand {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2);
  }
  .evidence__glass {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    flex: none;
    border-radius: 50%;
    background: var(--surface-2);
    color: var(--accent-ink);
  }
  .evidence__kicker {
    display: block;
    font-size: var(--fs-xs);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
    color: var(--accent-ink);
  }
  .evidence__title {
    display: block;
    font-family: var(--font-serif);
    font-size: var(--fs-lg);
    color: var(--ink);
    line-height: 1.2;
  }
  .evidence__body p {
    margin: 0 0 var(--sp-2);
    color: var(--ink);
  }
  .evidence__body p:last-child {
    margin-bottom: 0;
  }
</style>
