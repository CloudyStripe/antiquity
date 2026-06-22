<script lang="ts">
  import { parseInline } from '$lib/content/markdown';

  interface Props {
    text: string;
  }
  let { text }: Props = $props();
  const tokens = $derived(parseInline(text));
</script>

{#each tokens as t}{#if t.kind === 'text'}{t.value}{:else if t.kind === 'bold'}<strong
      >{t.value}</strong
    >{:else if t.kind === 'italic'}<em>{t.value}</em>{:else if t.kind === 'link'}<a
      href={t.href}
      target="_blank"
      rel="noopener noreferrer">{t.value}</a
    >{/if}{/each}

<style>
  a {
    color: var(--accent-ink);
    font-weight: 500;
  }
</style>
