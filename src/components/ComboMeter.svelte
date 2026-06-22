<script lang="ts">
  import Icon from '$components/ui/Icon.svelte';
  interface Props {
    count: number;
  }
  let { count }: Props = $props();
</script>

{#if count >= 2}
  {#key count}
    <span class="combo">
      <Icon name="flame" size={16} strokeWidth={2.4} />
      {count} in a row!
    </span>
  {/key}
{/if}

<style>
  .combo {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: var(--r-pill);
    background: var(--chip-contested-bg);
    color: var(--chip-contested-ink);
    font-weight: 700;
    font-size: var(--fs-sm);
    animation: bounce 0.45s var(--ease-spring);
  }
  @keyframes bounce {
    0% {
      transform: scale(0.6);
      opacity: 0;
    }
    60% {
      transform: scale(1.12);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
