<script lang="ts">
  import type { ImageBlock } from '$lib/content/types';
  interface Props {
    block: ImageBlock;
  }
  let { block }: Props = $props();

  // Resolve against the PWA base path (e.g. "/antiquity/") so it works on Pages.
  const base = import.meta.env.BASE_URL;
  const src = $derived(base + block.src.replace(/^\//, ''));
</script>

<figure class="image">
  <div class="image__frame">
    <img
      {src}
      alt={block.alt}
      loading="lazy"
      decoding="async"
      width={block.width}
      height={block.height}
    />
  </div>
  {#if block.caption}<figcaption>{block.caption}</figcaption>{/if}
  {#if block.credit || block.license}
    <p class="credit">
      {#if block.sourceUrl}
        <a href={block.sourceUrl} target="_blank" rel="noopener noreferrer">
          {block.credit ?? 'Source'}{#if block.license}{' · '}{block.license}{/if}
        </a>
      {:else}
        {block.credit}{#if block.license}{' · '}{block.license}{/if}
      {/if}
    </p>
  {/if}
</figure>

<style>
  .image {
    margin: 0;
    animation: img-in var(--dur-base) var(--ease-out) both;
  }
  .image__frame {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    line-height: 0;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
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
  .credit {
    margin: var(--sp-1) 0 0;
    text-align: center;
    font-size: var(--fs-xs);
    color: var(--ink-faint);
  }
  .credit a {
    color: var(--ink-faint);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .credit a:hover {
    color: var(--accent-ink);
  }
  @keyframes img-in {
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
