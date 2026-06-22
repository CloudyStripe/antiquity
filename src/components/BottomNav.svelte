<script lang="ts">
  import Icon from '$components/ui/Icon.svelte';
  import { route, toMap, toChallenge, toGlossary, toStats } from '$lib/stores/router';
  import { haptics } from '$lib/fx/haptics';

  const tabs = [
    { name: 'map', label: 'Learn', icon: 'compass', go: toMap },
    { name: 'challenge', label: 'Challenge', icon: 'trophy', go: toChallenge },
    { name: 'glossary', label: 'Glossary', icon: 'book-open', go: toGlossary },
    { name: 'stats', label: 'Stats', icon: 'chart', go: toStats },
  ] as const;

  function tap(go: () => void): void {
    haptics.tick();
    go();
  }
</script>

<nav class="bnav" aria-label="Primary">
  {#each tabs as t}
    {@const active = $route.name === t.name}
    <button
      class="tab"
      class:active
      aria-current={active ? 'page' : undefined}
      aria-label={t.label}
      onclick={() => tap(t.go)}
    >
      <Icon name={t.icon} size={22} strokeWidth={active ? 2.4 : 2} />
      <span class="tab__label">{t.label}</span>
    </button>
  {/each}
</nav>

<style>
  .bnav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
    display: flex;
    background: color-mix(in srgb, var(--surface) 92%, transparent);
    backdrop-filter: blur(10px);
    border-top: 1px solid var(--border);
    padding-bottom: env(safe-area-inset-bottom);
  }
  .tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    min-height: 56px;
    padding: 6px 4px;
    border: none;
    background: transparent;
    color: var(--ink-faint);
    cursor: pointer;
    transition: color var(--dur-fast) var(--ease-standard);
  }
  .tab__label {
    font-size: var(--fs-xs);
    font-weight: 600;
    letter-spacing: 0.01em;
  }
  .tab.active {
    color: var(--accent-ink);
  }
  .tab:hover {
    color: var(--accent-ink);
  }
  .tab:active {
    transform: scale(0.94);
  }
</style>
