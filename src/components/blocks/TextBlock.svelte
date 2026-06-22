<script lang="ts">
  import type { TextBlock } from '$lib/content/types';
  import MarkdownText from '../MarkdownText.svelte';
  interface Props {
    block: TextBlock;
  }
  let { block }: Props = $props();
</script>

<div class="text-block">
  {#if block.heading}<h2>{block.heading}</h2>{/if}
  {#each block.body as para, i}
    <p style="animation-delay:{i * 70}ms"><MarkdownText text={para} /></p>
  {/each}
</div>

<style>
  .text-block h2 {
    font-size: var(--fs-2xl);
  }
  .text-block p {
    font-size: var(--fs-lg);
    line-height: 1.65;
    color: var(--ink);
    max-width: var(--measure);
    animation: rise var(--dur-base) var(--ease-out) both;
  }
  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
