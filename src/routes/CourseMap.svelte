<script lang="ts">
  import AppHeader from '$components/AppHeader.svelte';
  import UnitCard from '$components/UnitCard.svelte';
  import Icon from '$components/ui/Icon.svelte';
  import ProgressBar from '$components/ui/ProgressBar.svelte';
  import { erasInOrder, coreUnitsOfEra, deepDivesOf } from '$lib/content/load';
  import { unitStates } from '$lib/stores/derived';
  import { progress } from '$lib/stores/persist';
  import { toPrimer } from '$lib/stores/router';

  // Per-era "follow one civilization" filter (default: all = interleaved order).
  let trackFilter = $state<Record<string, string>>({});

  function coreTracks(eraId: string): string[] {
    const set = new Set<string>();
    for (const u of coreUnitsOfEra(eraId)) if (u.track) set.add(u.track);
    return [...set];
  }

  function eraProgress(eraId: string): number {
    const core = coreUnitsOfEra(eraId).filter((u) => u.status === 'available');
    if (core.length === 0) return 0;
    const done = core.filter((u) => $progress[u.id]?.completed).length;
    return done / core.length;
  }

  function visibleCore(eraId: string) {
    const sel = trackFilter[eraId] ?? 'all';
    const core = coreUnitsOfEra(eraId);
    return sel === 'all' ? core : core.filter((u) => u.track === sel);
  }

  const score = (id: string) => $progress[id]?.bestScore ?? null;
</script>

<AppHeader />

<main class="app-main">
  <p class="intro">
    Short, rigorous modules on the ancient world, built around <strong>how we know</strong>.
    Find a spare five minutes and pick up where you left off.
  </p>

  {#each erasInOrder as era}
    {@const tracks = coreTracks(era.id)}
    {@const available = coreUnitsOfEra(era.id).some((u) => u.status === 'available')}
    <section class="era">
      <div class="era__head">
        <div>
          <h2 class="era__title">{era.title}</h2>
          {#if era.subtitle}<p class="era__sub">{era.subtitle}</p>{/if}
        </div>
        {#if !available}
          <span class="era__soon"><Icon name="lock" size={14} /> Coming soon</span>
        {/if}
      </div>

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

      <div class="units">
        {#each visibleCore(era.id) as unit (unit.id)}
          {@const dives = deepDivesOf(unit.id)}
          <UnitCard {unit} state={$unitStates.get(unit.id) ?? 'locked'} score={score(unit.id)} />
          {#if dives.length}
            <details class="dives" open={$progress[unit.id]?.completed}>
              <summary>
                <Icon name="compass" size={15} />
                Optional deep dives ({dives.length})
              </summary>
              <div class="dives__list">
                {#each dives as dd (dd.id)}
                  <UnitCard
                    unit={dd}
                    state={$unitStates.get(dd.id) ?? 'locked'}
                    score={score(dd.id)}
                    optional
                  />
                {/each}
              </div>
            </details>
          {/if}
        {/each}
      </div>
    </section>
  {/each}

  <footer class="map-foot">
    <button class="link" onclick={toPrimer}>
      <Icon name="info" size={15} /> Dating conventions (BCE / CE / “c.”)
    </button>
  </footer>
</main>

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
  .units {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
    margin-top: var(--sp-4);
  }
  .dives {
    margin: calc(var(--sp-1) * -1) 0 0 var(--sp-4);
    padding-left: var(--sp-3);
    border-left: 2px dashed var(--border-strong);
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
  .dives__list {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
    padding: var(--sp-2) 0;
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
