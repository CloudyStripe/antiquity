<script lang="ts">
  import AppHeader from '$components/AppHeader.svelte';
  import BottomNav from '$components/BottomNav.svelte';
  import TodayStrip from '$components/TodayStrip.svelte';
  import ContinueHero from '$components/ContinueHero.svelte';
  import UnitCard from '$components/UnitCard.svelte';
  import Icon from '$components/ui/Icon.svelte';
  import ProgressBar from '$components/ui/ProgressBar.svelte';
  import { erasInOrder, coreUnitsOfEra, deepDivesOf } from '$lib/content/load';
  import { unitStates, continueUnitId } from '$lib/stores/derived';
  import { progress } from '$lib/stores/persist';
  import { toPrimer } from '$lib/stores/router';
  import type { UnitState } from '$lib/content/types';

  // Per-era "follow one civilization" filter (default: all = interleaved order).
  let trackFilter = $state<Record<string, string>>({});

  function coreTracks(eraId: string): string[] {
    const set = new Set<string>();
    for (const u of coreUnitsOfEra(eraId)) if (u.track) set.add(u.track);
    return [...set];
  }

  function eraProgress(eraId: string): number {
    const c = eraCounts(eraId);
    return c.total === 0 ? 0 : c.done / c.total;
  }

  function eraCounts(eraId: string): { done: number; total: number } {
    const core = coreUnitsOfEra(eraId).filter((u) => u.status === 'available');
    const done = core.filter((u) => $progress[u.id]?.completed).length;
    return { done, total: core.length };
  }

  function visibleCore(eraId: string) {
    const sel = trackFilter[eraId] ?? 'all';
    const core = coreUnitsOfEra(eraId);
    return sel === 'all' ? core : core.filter((u) => u.track === sel);
  }

  function nodeIcon(state: UnitState): string {
    return state === 'completed'
      ? 'check'
      : state === 'in-progress'
        ? 'play'
        : state === 'available'
          ? 'arrow-right'
          : 'lock';
  }

  const score = (id: string) => $progress[id]?.bestScore ?? null;
</script>

<AppHeader />

<main class="app-main with-bottomnav">
  <TodayStrip />

  {#if $continueUnitId}
    <ContinueHero unitId={$continueUnitId} />
  {:else}
    <p class="intro">
      Short, rigorous modules on the ancient world, built around <strong>how we know</strong>.
      Find a spare five minutes and pick up where you left off.
    </p>
  {/if}

  {#each erasInOrder as era}
    {@const tracks = coreTracks(era.id)}
    {@const available = coreUnitsOfEra(era.id).some((u) => u.status === 'available')}
    {@const counts = eraCounts(era.id)}
    <section class="era">
      <header class="era__head">
        <div class="era__heading">
          <h2 class="era__title">{era.title}</h2>
          {#if era.subtitle}<p class="era__sub">{era.subtitle}</p>{/if}
        </div>
        {#if available}
          <span class="era__count">{counts.done} of {counts.total} complete</span>
        {:else}
          <span class="era__soon"><Icon name="lock" size={14} /> Coming soon</span>
        {/if}
      </header>

      {#if available}
        <div class="era__progress">
          <ProgressBar value={eraProgress(era.id)} label="{era.title} progress" />
        </div>
      {/if}

      {#if tracks.length > 1}
        <div class="filter" role="group" aria-label="Follow one civilization">
          <button
            class="chip-btn"
            class:on={(trackFilter[era.id] ?? 'all') === 'all'}
            onclick={() => (trackFilter = { ...trackFilter, [era.id]: 'all' })}
          >
            Interleaved
          </button>
          {#each tracks as t}
            <button
              class="chip-btn"
              class:on={trackFilter[era.id] === t}
              onclick={() => (trackFilter = { ...trackFilter, [era.id]: t })}
            >
              {t}
            </button>
          {/each}
        </div>
      {/if}

      <ol class="timeline">
        {#each visibleCore(era.id) as unit (unit.id)}
          {@const st = $unitStates.get(unit.id) ?? 'locked'}
          {@const dives = deepDivesOf(unit.id)}
          <li class="tl-item">
            <span class="tl-node n-{st}" aria-hidden="true">
              <Icon name={nodeIcon(st)} size={15} strokeWidth={2.6} />
            </span>
            <div class="tl-body">
              <UnitCard {unit} state={st} score={score(unit.id)} timeline />
              {#if dives.length}
                <details class="dives" open={$progress[unit.id]?.completed}>
                  <summary>
                    <Icon name="compass" size={15} />
                    Optional deep dives ({dives.length})
                  </summary>
                  <ol class="tl-sub">
                    {#each dives as dd (dd.id)}
                      {@const dst = $unitStates.get(dd.id) ?? 'locked'}
                      <li class="tl-sub-item">
                        <span class="tl-pip n-{dst}" aria-hidden="true">
                          <Icon name={nodeIcon(dst)} size={10} strokeWidth={2.8} />
                        </span>
                        <UnitCard unit={dd} state={dst} score={score(dd.id)} optional timeline />
                      </li>
                    {/each}
                  </ol>
                </details>
              {/if}
            </div>
          </li>
        {/each}
      </ol>
    </section>
  {/each}

  <footer class="map-foot">
    <button class="link" onclick={toPrimer}>
      <Icon name="info" size={15} /> Dating conventions (BCE / CE / “c.”)
    </button>
  </footer>
</main>

<BottomNav />

<style>
  .intro {
    font-size: var(--fs-lg);
    color: var(--ink-soft);
    max-width: var(--measure);
    margin: var(--sp-2) 0 var(--sp-6);
  }
  .era {
    margin-bottom: var(--sp-7);
  }
  .era__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--sp-3);
  }
  .era__title {
    font-size: var(--fs-2xl);
    margin: 0;
  }
  .era__sub {
    margin: 2px 0 0;
    color: var(--ink-soft);
    font-size: var(--fs-sm);
  }
  .era__count {
    flex: none;
    font-size: var(--fs-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent-ink);
    background: color-mix(in srgb, var(--accent) 10%, transparent);
    padding: 4px 10px;
    border-radius: var(--r-pill);
    white-space: nowrap;
  }
  .era__soon {
    flex: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: var(--fs-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--ink-faint);
    background: var(--surface-2);
    padding: 4px 10px;
    border-radius: var(--r-pill);
  }
  .era__progress {
    margin: var(--sp-3) 0;
  }
  .filter {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-2);
    margin: var(--sp-3) 0;
  }
  .chip-btn {
    padding: 6px 12px;
    border-radius: var(--r-pill);
    border: 1px solid var(--border-strong);
    background: var(--surface);
    color: var(--ink-soft);
    font-size: var(--fs-sm);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--dur-fast) var(--ease-standard);
  }
  .chip-btn.on {
    background: var(--accent);
    color: var(--on-accent);
    border-color: var(--accent);
  }

  /* ---- Timeline ---- */
  .timeline {
    list-style: none;
    margin: var(--sp-4) 0 0;
    padding: 0;
    position: relative;
  }
  .timeline::before {
    content: '';
    position: absolute;
    left: 13px;
    top: 18px;
    bottom: 18px;
    width: 2px;
    background: var(--border-strong);
    z-index: 0;
  }
  .tl-item {
    position: relative;
    display: grid;
    grid-template-columns: 28px 1fr;
    gap: var(--sp-3);
    align-items: start;
    padding-bottom: var(--sp-3);
  }
  .tl-node {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    margin-top: 14px;
    border-radius: 50%;
    background: var(--surface);
    border: 2px solid var(--border-strong);
    color: var(--ink-faint);
  }
  .tl-node.n-completed {
    background: var(--success);
    border-color: var(--success);
    color: #fff;
  }
  .tl-node.n-in-progress {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--on-accent);
  }
  .tl-node.n-available {
    background: var(--surface);
    border-color: var(--accent);
    color: var(--accent-ink);
  }
  .tl-node.n-in-progress::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 2px solid var(--accent);
    opacity: 0.45;
  }
  :global(html.allow-motion) .tl-node.n-in-progress::after {
    animation: tl-pulse 1.8s var(--ease-out) infinite;
  }
  @keyframes tl-pulse {
    0% {
      transform: scale(0.85);
      opacity: 0.7;
    }
    70% {
      transform: scale(1.4);
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
  .tl-body {
    min-width: 0;
  }

  /* Deep-dive disclosure → smaller pips off the parent unit */
  .dives {
    margin-top: var(--sp-2);
  }
  .dives summary {
    cursor: pointer;
    list-style: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: var(--sp-2) 0;
    font-size: var(--fs-sm);
    font-weight: 600;
    color: var(--accent-ink);
  }
  .dives summary::-webkit-details-marker {
    display: none;
  }
  .tl-sub {
    list-style: none;
    margin: var(--sp-1) 0 0;
    padding: 0;
    position: relative;
  }
  .tl-sub::before {
    content: '';
    position: absolute;
    left: 9px;
    top: 14px;
    bottom: 14px;
    width: 2px;
    background: var(--border);
    z-index: 0;
  }
  .tl-sub-item {
    position: relative;
    display: grid;
    grid-template-columns: 20px 1fr;
    gap: var(--sp-2);
    align-items: start;
    padding-bottom: var(--sp-2);
  }
  .tl-pip {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 20px;
    height: 20px;
    margin-top: 14px;
    border-radius: 50%;
    background: var(--bg);
    border: 2px solid var(--border-strong);
    color: var(--ink-faint);
  }
  .tl-pip.n-completed {
    background: var(--success);
    border-color: var(--success);
    color: #fff;
  }
  .tl-pip.n-available {
    border-color: var(--accent);
    color: var(--accent-ink);
  }
  .tl-pip.n-in-progress {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--on-accent);
  }

  .map-foot {
    margin-top: var(--sp-6);
    padding-top: var(--sp-4);
    border-top: 1px solid var(--border);
  }
  .link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    color: var(--ink-soft);
    font-size: var(--fs-sm);
    font-weight: 600;
    cursor: pointer;
    padding: var(--sp-2);
  }
  .link:hover {
    color: var(--accent-ink);
  }
</style>
