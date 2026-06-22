<script lang="ts">
  import Icon from '$components/ui/Icon.svelte';
  interface Props {
    alt?: string;
  }
  let { alt = '' }: Props = $props();
</script>

<!-- Neutral fallback when a figure id has no registered SVG component yet.
     Degrades gracefully (never blank) and still conveys the description. -->
<div class="missing">
  <Icon name="layers" size={28} />
  <p>{alt || 'Diagram coming soon.'}</p>
</div>

<style>
  .missing {
    display: grid;
    place-items: center;
    gap: var(--sp-2);
    padding: var(--sp-6) var(--sp-4);
    color: var(--ink-faint);
    background: var(--surface-2);
    border: 1px dashed var(--border-strong);
    border-radius: var(--r-md);
    text-align: center;
  }
  .missing p {
    margin: 0;
    font-size: var(--fs-sm);
  }
</style>
