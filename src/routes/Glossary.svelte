<script lang="ts">
  import SubHeader from '$components/SubHeader.svelte';
  import BottomNav from '$components/BottomNav.svelte';
  import Icon from '$components/ui/Icon.svelte';
  import TermBlock from '$components/blocks/TermBlock.svelte';
  import { allTermBlocks } from '$lib/content/load';

  const entries = allTermBlocks();
  let query = $state('');

  const filtered = $derived(
    query.trim() === ''
      ? entries
      : entries.filter((e) => {
          const q = query.toLowerCase();
          return (
            e.block.term.toLowerCase().includes(q) ||
            e.block.definition.toLowerCase().includes(q)
          );
        }),
  );
</script>

<SubHeader title="Glossary" />

<main class="app-main with-bottomnav">
  <div class="search">
    <Icon name="search" size={18} />
    <input
      type="search"
      placeholder="Search {entries.length} terms…"
      bind:value={query}
      aria-label="Search glossary"
    />
  </div>

  {#if filtered.length === 0}
    <p class="empty">No terms match “{query}”.</p>
  {:else}
    <div class="list">
      {#each filtered as e (e.block.term)}
        <div class="entry">
          <TermBlock block={e.block} compact />
          <p class="source">from <em>{e.unitTitle}</em></p>
        </div>
      {/each}
    </div>
  {/if}
</main>

<BottomNav />

<style>
  .search {
    display: flex;
    align-items: center;
    gap: var(--sp-2);
    padding: 0 var(--sp-4);
    background: var(--surface-2);
    border: 1px solid var(--border-strong);
    border-radius: var(--r-pill);
    color: var(--ink-faint);
    margin-bottom: var(--sp-5);
  }
  .search input {
    flex: 1;
    border: none;
    background: transparent;
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: var(--fs-base);
    min-height: var(--tap);
    outline: none;
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
  }
  .source {
    margin: var(--sp-1) 0 0 var(--sp-4);
    font-size: var(--fs-sm);
    color: var(--ink-faint);
  }
  .empty {
    color: var(--ink-soft);
    text-align: center;
    padding: var(--sp-6) 0;
  }
</style>
