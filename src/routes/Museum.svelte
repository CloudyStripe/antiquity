<script lang="ts">
  import SubHeader from '$components/SubHeader.svelte';
  import BottomNav from '$components/BottomNav.svelte';
  import Icon from '$components/ui/Icon.svelte';
  import { unitsWithArtifact, getEra } from '$lib/content/load';
  import { progress } from '$lib/stores/persist';

  const cases = unitsWithArtifact();
  const base = import.meta.env.BASE_URL;
  const srcOf = (p: string) => base + p.replace(/^\//, '');

  const recovered = $derived(cases.filter((u) => $progress[u.id]?.completed).length);
</script>

<SubHeader title="Museum" />

<main class="app-main with-bottomnav">
  <p class="count">
    <Icon name="landmark" size={16} />
    {recovered} of {cases.length} artifacts recovered
  </p>
  <p class="lede">Finish a unit to recover its artifact. Locked cases stay in shadow until you do.</p>

  <div class="grid">
    {#each cases as u (u.id)}
      {@const earned = $progress[u.id]?.completed === true}
      {#if earned && u.artifact}
        <figure class="case earned">
          <div class="frame">
            <img src={srcOf(u.artifact.image)} alt={u.artifact.title} loading="lazy" decoding="async" />
          </div>
          <figcaption>
            <h2 class="title">{u.artifact.title}</h2>
            <p class="caption">{u.artifact.caption}</p>
            {#if u.artifact.credit}<p class="credit">{u.artifact.credit}</p>{/if}
          </figcaption>
        </figure>
      {:else if u.artifact}
        <figure class="case locked">
          <div class="frame">
            <img class="silhouette" src={srcOf(u.artifact.image)} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <span class="lock"><Icon name="lock" size={18} /></span>
          </div>
          <figcaption>
            <p class="era">{getEra(u.eraId)?.title}</p>
            <p class="tease">Undiscovered</p>
          </figcaption>
        </figure>
      {/if}
    {/each}
  </div>
</main>

<BottomNav />

<style>
  .count {
    display: flex;
    align-items: center;
    gap: var(--sp-2);
    margin: 0 0 var(--sp-1);
    font-family: var(--font-serif);
    font-size: var(--fs-lg);
    color: var(--ink);
  }
  .count :global(svg) {
    color: var(--accent-ink);
  }
  .lede {
    margin: 0 0 var(--sp-5);
    color: var(--ink-soft);
    font-size: var(--fs-sm);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: var(--sp-3);
  }
  .case {
    margin: 0;
    display: flex;
    flex-direction: column;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    overflow: hidden;
    box-shadow: var(--shadow-md);
  }
  .frame {
    position: relative;
    aspect-ratio: 3 / 2;
    background: var(--surface-2);
    line-height: 0;
  }
  .frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .silhouette {
    filter: grayscale(1) brightness(0.4) contrast(0.85);
  }
  .lock {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: var(--on-accent);
    background: color-mix(in srgb, var(--overlay) 55%, transparent);
  }
  figcaption {
    padding: var(--sp-2) var(--sp-3) var(--sp-3);
  }
  .title {
    margin: 0 0 2px;
    font-family: var(--font-serif);
    font-size: var(--fs-base);
    font-weight: 600;
    color: var(--ink);
    line-height: 1.25;
  }
  .caption {
    margin: 0;
    font-size: var(--fs-sm);
    color: var(--ink-soft);
    line-height: 1.4;
  }
  .credit {
    margin: var(--sp-2) 0 0;
    font-size: var(--fs-xs);
    color: var(--ink-faint);
  }
  .era {
    margin: 0;
    font-size: var(--fs-xs);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 700;
    color: var(--ink-faint);
  }
  .tease {
    margin: 2px 0 0;
    font-size: var(--fs-sm);
    color: var(--ink-faint);
  }
</style>
