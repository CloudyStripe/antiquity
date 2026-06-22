<script lang="ts">
  import type { Unit, UnitState } from '$lib/content/types';
  import Icon from '$components/ui/Icon.svelte';
  import { toUnit } from '$lib/stores/router';
  import { sfx, unlockAudio } from '$lib/fx/audio';
  import { haptics } from '$lib/fx/haptics';

  interface Props {
    unit: Unit;
    state: UnitState;
    score?: number | null;
    optional?: boolean;
  }
  let { unit, state, score = null, optional = false }: Props = $props();

  const clickable = $derived(state !== 'locked');
  const planned = $derived(unit.status === 'planned');

  function open(): void {
    if (!clickable) return;
    unlockAudio();
    sfx.tap();
    haptics.tick();
    toUnit(unit.id);
  }
</script>

<button
  class="card {state}"
  class:optional
  class:clickable
  disabled={!clickable}
  onclick={open}
  aria-label="{unit.title}, {planned && state === 'locked' ? 'coming soon' : state}"
>
  <div class="card__main">
    <div class="card__badges">
      {#if unit.track}<span class="track">{unit.track}</span>{/if}
      {#if optional}<span class="opt">Optional deep dive</span>{/if}
    </div>
    <h3 class="card__title">{unit.title}</h3>
    {#if unit.subtitle}<p class="card__sub">{unit.subtitle}</p>{/if}
    <div class="card__meta">
      <span><Icon name="book-open" size={14} /> {unit.estMinutes} min</span>
      {#if state === 'completed' && score != null}
        <span class="score"><Icon name="check" size={14} /> {Math.round(score * 100)}%</span>
      {/if}
    </div>
  </div>

  <div class="card__state" aria-hidden="true">
    {#if state === 'completed'}
      <span class="pill done"><Icon name="check" size={18} /></span>
    {:else if state === 'in-progress'}
      <span class="pill prog"><Icon name="arrow-right" size={18} /></span>
    {:else if state === 'available'}
      <span class="pill go"><Icon name="arrow-right" size={18} /></span>
    {:else if planned}
      <span class="pill soon">Soon</span>
    {:else}
      <span class="pill locked"><Icon name="lock" size={16} /></span>
    {/if}
  </div>
</button>

<style>
  .card {
    display: flex;
    align-items: center;
    gap: var(--sp-3);
    width: 100%;
    text-align: left;
    padding: var(--sp-4);
    border-radius: var(--r-md);
    border: 1px solid var(--border);
    background: var(--surface);
    box-shadow: var(--shadow-sm);
    cursor: pointer;
    transition:
      transform var(--dur-fast) var(--ease-spring),
      box-shadow var(--dur-base) var(--ease-standard),
      border-color var(--dur-base) var(--ease-standard);
  }
  .card.clickable:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--accent);
  }
  .card.clickable:active {
    transform: scale(0.99);
  }
  .card.optional {
    background: var(--bg);
    border-style: dashed;
  }
  .card.completed {
    border-left: 4px solid var(--success);
  }
  .card.in-progress {
    border-left: 4px solid var(--accent);
  }
  .card.available {
    border-left: 4px solid var(--accent);
  }
  .card.locked {
    opacity: 0.7;
    cursor: not-allowed;
    box-shadow: none;
  }

  .card__main {
    flex: 1;
    min-width: 0;
  }
  .card__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 4px;
  }
  .track {
    font-size: var(--fs-xs);
    font-weight: 700;
    color: var(--accent-ink);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
    padding: 2px 8px;
    border-radius: var(--r-pill);
  }
  .opt {
    font-size: var(--fs-xs);
    font-weight: 700;
    color: var(--ink-faint);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .card__title {
    font-size: var(--fs-lg);
    margin: 0 0 2px;
    line-height: 1.25;
  }
  .card__sub {
    margin: 0 0 var(--sp-2);
    font-size: var(--fs-sm);
    color: var(--ink-soft);
  }
  .card__meta {
    display: flex;
    gap: var(--sp-3);
    font-size: var(--fs-sm);
    color: var(--ink-faint);
  }
  .card__meta span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .score {
    color: var(--success-ink);
    font-weight: 600;
  }

  .card__state {
    flex: none;
  }
  .pill {
    display: grid;
    place-items: center;
    min-width: 40px;
    height: 40px;
    padding: 0 10px;
    border-radius: var(--r-pill);
    font-size: var(--fs-xs);
    font-weight: 700;
  }
  .pill.done {
    background: var(--success);
    color: #fff;
  }
  .pill.go,
  .pill.prog {
    background: var(--accent);
    color: var(--on-accent);
  }
  .pill.locked {
    background: var(--surface-2);
    color: var(--ink-faint);
  }
  .pill.soon {
    background: var(--surface-2);
    color: var(--ink-soft);
  }
</style>
