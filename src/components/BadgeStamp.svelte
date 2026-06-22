<script lang="ts">
  import Icon from '$components/ui/Icon.svelte';
  import { BADGE_BY_ID } from '$lib/engine/gamification';
  interface Props {
    id: string;
    delay?: number;
  }
  let { id, delay = 0 }: Props = $props();
  const meta = $derived(BADGE_BY_ID[id]);
</script>

{#if meta}
  <div class="stamp" style="animation-delay:{delay}ms" title={meta.description}>
    <span class="stamp__ring"><Icon name={meta.icon} size={22} /></span>
    <span class="stamp__title">{meta.title}</span>
  </div>
{/if}

<style>
  .stamp {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    width: 92px;
    text-align: center;
    animation: stampin 0.5s var(--ease-spring) both;
  }
  .stamp__ring {
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    color: var(--accent-ink);
    background: var(--surface);
    border: 2px solid var(--accent);
    box-shadow: var(--shadow-sm);
  }
  .stamp__title {
    font-size: var(--fs-xs);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.2;
  }
  @keyframes stampin {
    0% {
      opacity: 0;
      transform: scale(1.6) rotate(-8deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0);
    }
  }
</style>
