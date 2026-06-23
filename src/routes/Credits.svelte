<script lang="ts">
  import SubHeader from '$components/SubHeader.svelte';
  import { allImageBlocks } from '$lib/content/load';

  const base = import.meta.env.BASE_URL;
  const entries = allImageBlocks();
  const srcOf = (s: string) => base + s.replace(/^\//, '');
</script>

<SubHeader title="Image credits" />

<main class="app-main">
  <p class="intro">
    Every photograph in Antiquity is openly licensed (Public Domain, CC0, CC BY, or
    CC BY-SA) and bundled for offline use. Thank you to the photographers, museums,
    and archives who share their work.
  </p>

  {#if entries.length === 0}
    <p class="empty">No photographs are bundled yet.</p>
  {:else}
    <ul class="list">
      {#each entries as e (e.block.id)}
        <li class="row">
          <img
            class="thumb"
            src={srcOf(e.block.src)}
            alt={e.block.alt}
            loading="lazy"
            decoding="async"
            width={e.block.width}
            height={e.block.height}
          />
          <div class="meta">
            <p class="cap">{e.block.caption ?? e.block.alt}</p>
            <p class="sub">
              {#if e.block.credit}{e.block.credit}{/if}{#if e.block.license}{' · '}{e.block.license}{/if}
            </p>
            {#if e.block.sourceUrl}
              <a class="src" href={e.block.sourceUrl} target="_blank" rel="noopener noreferrer">
                Source ↗
              </a>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</main>

<style>
  .intro {
    color: var(--ink-soft);
    max-width: var(--measure);
    margin: var(--sp-2) 0 var(--sp-5);
  }
  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
  }
  .row {
    display: flex;
    gap: var(--sp-3);
    align-items: flex-start;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: var(--sp-3);
  }
  .thumb {
    flex: none;
    width: 72px;
    height: 72px;
    object-fit: cover;
    border-radius: var(--r-sm);
    background: var(--surface-2);
  }
  .meta {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .cap {
    margin: 0;
    font-size: var(--fs-sm);
    color: var(--ink);
    font-weight: 600;
    line-height: 1.3;
  }
  .sub {
    margin: 0;
    font-size: var(--fs-xs);
    color: var(--ink-soft);
  }
  .src {
    font-size: var(--fs-xs);
    font-weight: 600;
    color: var(--accent-ink);
  }
  .empty {
    color: var(--ink-soft);
    text-align: center;
    padding: var(--sp-6) 0;
  }
</style>
