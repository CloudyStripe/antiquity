<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { getUnit, allUnits, deepDivesOf } from '$lib/content/load';
  import { progress, streak } from '$lib/stores/persist';
  import { lastCompletion } from '$lib/stores/progress';
  import { nextCoreUnit } from '$lib/engine/unlock';
  import { toMap, toUnit } from '$lib/stores/router';
  import { celebrate } from '$lib/fx/confetti';
  import { sfx, unlockAudio } from '$lib/fx/audio';
  import { haptics } from '$lib/fx/haptics';
  import Button from '$components/ui/Button.svelte';
  import Icon from '$components/ui/Icon.svelte';
  import XpCounter from '$components/XpCounter.svelte';
  import StreakFlame from '$components/StreakFlame.svelte';
  import BadgeStamp from '$components/BadgeStamp.svelte';

  interface Props {
    unitId: string;
  }
  let { unitId }: Props = $props();

  const unit = getUnit(unitId);
  const result = get(lastCompletion);
  const matched = result?.unitId === unitId;
  const next = unit ? nextCoreUnit(unit, allUnits(), get(progress)) : undefined;
  const dives = unit ? deepDivesOf(unitId) : [];
  const streakNow = get(streak).current;

  onMount(() => {
    if (!unit) {
      toMap();
      return;
    }
    unlockAudio();
    celebrate();
    sfx.complete();
    haptics.celebrate();
  });
</script>

{#if unit}
  <main class="done">
    <div class="done__card">
      <div class="done__badge"><Icon name="award" size={40} /></div>
      <p class="done__kicker">Unit complete</p>
      <h1 class="done__title">{unit.title}</h1>

      {#if matched && result}
        <div class="done__reward">
          <XpCounter to={result.xpGained} />
          {#if result.score >= 1}<span class="perfect"><Icon name="sparkles" size={16} /> Perfect quiz!</span>{/if}
        </div>
      {/if}

      <div class="done__streak">
        <StreakFlame count={streakNow} big />
      </div>

      {#if matched && result && result.newBadges.length}
        <div class="done__badges">
          <p class="done__sub">New badge{result.newBadges.length > 1 ? 's' : ''} earned</p>
          <div class="stamps">
            {#each result.newBadges as b, i}
              <BadgeStamp id={b} delay={i * 120} />
            {/each}
          </div>
        </div>
      {/if}

      {#if unit.completion?.takeaway}
        <blockquote class="takeaway">
          <Icon name="lightbulb" size={18} />
          <span>{unit.completion.takeaway}</span>
        </blockquote>
      {/if}

      {#if dives.length}
        <p class="unlocked"><Icon name="compass" size={15} /> {dives.length} optional deep dive{dives.length > 1 ? 's' : ''} unlocked</p>
      {/if}

      <div class="done__actions">
        {#if next}
          <Button variant="primary" size="lg" full onclick={() => toUnit(next.id)}>
            Next: {next.title}
            <Icon name="arrow-right" size={18} />
          </Button>
        {/if}
        <Button variant={next ? 'ghost' : 'primary'} full onclick={toMap}>
          <Icon name="map" size={18} /> Back to map
        </Button>
      </div>
    </div>
  </main>
{/if}

<style>
  .done {
    min-height: 100dvh;
    display: grid;
    place-items: center;
    padding: var(--sp-5) var(--sp-4);
  }
  .done__card {
    width: 100%;
    max-width: 480px;
    text-align: center;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-xl);
    padding: var(--sp-6) var(--sp-5);
    box-shadow: var(--shadow-lg);
    animation: rise var(--dur-slow) var(--ease-out) both;
  }
  .done__badge {
    display: grid;
    place-items: center;
    width: 76px;
    height: 76px;
    margin: 0 auto var(--sp-3);
    border-radius: 50%;
    background: var(--accent);
    color: var(--on-accent);
    box-shadow: var(--shadow-md);
    animation: stampin 0.6s var(--ease-spring) both;
  }
  .done__kicker {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: var(--fs-xs);
    font-weight: 700;
    color: var(--ink-faint);
  }
  .done__title {
    font-size: var(--fs-2xl);
    margin: var(--sp-1) 0 var(--sp-4);
  }
  .done__reward {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--sp-2);
    margin-bottom: var(--sp-4);
  }
  .perfect {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--chip-contested-ink);
    font-weight: 700;
    font-size: var(--fs-sm);
  }
  .done__streak {
    margin-bottom: var(--sp-4);
  }
  .done__sub {
    margin: 0 0 var(--sp-2);
    font-size: var(--fs-sm);
    color: var(--ink-soft);
    font-weight: 600;
  }
  .stamps {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--sp-3);
    margin-bottom: var(--sp-4);
  }
  .takeaway {
    display: flex;
    gap: var(--sp-2);
    text-align: left;
    margin: 0 0 var(--sp-3);
    padding: var(--sp-3) var(--sp-4);
    background: var(--surface-2);
    border-radius: var(--r-md);
    color: var(--ink);
    font-family: var(--font-serif);
    font-size: var(--fs-lg);
    line-height: 1.4;
  }
  .takeaway :global(svg) {
    flex: none;
    margin-top: 3px;
    color: var(--accent-ink);
  }
  .unlocked {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: var(--fs-sm);
    color: var(--accent-ink);
    font-weight: 600;
    margin: 0 0 var(--sp-4);
  }
  .done__actions {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
  }
  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes stampin {
    0% {
      opacity: 0;
      transform: scale(1.5) rotate(-10deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0);
    }
  }
</style>
