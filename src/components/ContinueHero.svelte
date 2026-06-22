<script lang="ts">
  import { getUnit } from '$lib/content/load';
  import { progress } from '$lib/stores/persist';
  import { toUnit } from '$lib/stores/router';
  import Icon from '$components/ui/Icon.svelte';
  import Button from '$components/ui/Button.svelte';

  interface Props {
    unitId: string;
  }
  let { unitId }: Props = $props();

  const unit = $derived(getUnit(unitId));
  const p = $derived($progress[unitId]);
  const total = $derived(unit?.screens.length ?? 0);
  const started = $derived(p && !p.completed ? p.lastScreen : 0);
  const screen = $derived(Math.min(started + 1, Math.max(total, 1)));
  const frac = $derived(total > 0 ? started / total : 0);
</script>

{#if unit}
  <section class="hero" aria-label="Continue learning">
    <span class="hero__eyebrow"><Icon name="play" size={13} strokeWidth={2.6} /> Continue learning</span>
    <h2 class="hero__title">{unit.title}</h2>
    <div class="hero__track" role="presentation">
      <div class="hero__fill" style="width:{frac * 100}%"></div>
    </div>
    <span class="hero__meta">Screen {screen} of {total}</span>
    <div class="hero__action">
      <Button variant="secondary" full onclick={() => toUnit(unitId)}>
        Resume <Icon name="arrow-right" size={18} />
      </Button>
    </div>
  </section>
{/if}

<style>
  .hero {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
    padding: var(--sp-5);
    border-radius: var(--r-lg);
    background: linear-gradient(135deg, var(--accent), var(--accent-strong));
    color: var(--on-accent);
    box-shadow: var(--shadow-md);
    margin-bottom: var(--sp-6);
  }
  .hero__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: var(--fs-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.9;
  }
  .hero__title {
    font-family: var(--font-serif);
    font-size: var(--fs-2xl);
    color: var(--on-accent);
    margin: 0;
    line-height: 1.2;
  }
  .hero__track {
    height: 6px;
    width: 100%;
    margin-top: var(--sp-1);
    border-radius: var(--r-pill);
    background: color-mix(in srgb, var(--on-accent) 28%, transparent);
    overflow: hidden;
  }
  .hero__fill {
    height: 100%;
    border-radius: var(--r-pill);
    background: var(--on-accent);
    transition: width var(--dur-slow) var(--ease-out);
  }
  .hero__meta {
    font-size: var(--fs-sm);
    font-weight: 600;
    opacity: 0.9;
  }
  .hero__action {
    margin-top: var(--sp-3);
  }
</style>
