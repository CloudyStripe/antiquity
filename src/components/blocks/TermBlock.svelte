<script lang="ts">
  import type { TermBlock } from '$lib/content/types';
  import MarkdownText from '../MarkdownText.svelte';
  import Icon from '$components/ui/Icon.svelte';
  interface Props {
    block: TermBlock;
    compact?: boolean;
  }
  let { block, compact = false }: Props = $props();
</script>

<div class="term" class:compact>
  <div class="term__head">
    <Icon name="book-open" size={18} />
    <span class="term__label">Key term</span>
  </div>
  <h3 class="term__word">
    {block.term}
    {#if block.pronunciation}<span class="term__pron">/{block.pronunciation}/</span>{/if}
  </h3>
  <p class="term__def"><MarkdownText text={block.definition} /></p>
  {#if block.etymology}
    <p class="term__etym"><MarkdownText text={block.etymology} /></p>
  {/if}
</div>

<style>
  .term {
    background: var(--surface);
    border: 1px solid var(--border);
    border-left: 4px solid var(--accent);
    border-radius: var(--r-md);
    padding: var(--sp-4);
    box-shadow: var(--shadow-sm);
  }
  .term.compact {
    box-shadow: none;
  }
  .term__head {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--accent-ink);
    font-size: var(--fs-xs);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
    margin-bottom: var(--sp-2);
  }
  .term__word {
    font-size: var(--fs-2xl);
    margin: 0 0 var(--sp-2);
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--sp-2);
  }
  .term__pron {
    font-family: var(--font-sans);
    font-size: var(--fs-base);
    font-weight: 400;
    color: var(--ink-faint);
    font-style: italic;
  }
  .term__def {
    margin: 0 0 var(--sp-2);
    font-size: var(--fs-lg);
    color: var(--ink);
  }
  .term__etym {
    margin: 0;
    font-size: var(--fs-sm);
    color: var(--ink-soft);
    padding-top: var(--sp-2);
    border-top: 1px dashed var(--border);
  }
</style>
