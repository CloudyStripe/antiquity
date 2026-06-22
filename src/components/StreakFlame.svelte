<script lang="ts">
  import Icon from '$components/ui/Icon.svelte';
  interface Props {
    count: number;
    big?: boolean;
  }
  let { count, big = false }: Props = $props();
</script>

<span class="flame" class:big class:lit={count > 0}>
  <Icon name="flame" size={big ? 26 : 18} strokeWidth={2.2} />
  <span class="flame__n">{count}</span>
  <span class="flame__label">day{count === 1 ? '' : 's'}</span>
</span>

<style>
  .flame {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: 700;
    color: var(--ink-faint);
  }
  .flame.lit {
    color: var(--chip-contested-ink);
  }
  .flame.lit :global(svg) {
    animation: flicker 1.4s var(--ease-standard) infinite;
  }
  .flame__n {
    font-variant-numeric: tabular-nums;
    font-size: var(--fs-lg);
  }
  .flame.big .flame__n {
    font-size: var(--fs-2xl);
  }
  .flame__label {
    font-weight: 600;
    font-size: var(--fs-sm);
  }
  @keyframes flicker {
    0%,
    100% {
      transform: scale(1) rotate(0deg);
    }
    50% {
      transform: scale(1.08) rotate(-3deg);
    }
  }
</style>
