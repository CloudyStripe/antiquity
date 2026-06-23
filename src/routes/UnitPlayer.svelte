<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { getUnit } from '$lib/content/load';
  import { progress } from '$lib/stores/persist';
  import { setLastScreen, completeUnit } from '$lib/stores/progress';
  import { toMap, toComplete } from '$lib/stores/router';
  import { reducedMotionActive } from '$lib/stores/settings';
  import { slideFade } from '$lib/fx/motion';
  import BlockRenderer from '$components/blocks/BlockRenderer.svelte';
  import Button from '$components/ui/Button.svelte';
  import Icon from '$components/ui/Icon.svelte';

  interface Props {
    unitId: string;
  }
  let { unitId }: Props = $props();

  const unit = getUnit(unitId);
  const screens = unit?.screens ?? [];

  let index = $state(0);
  let dir = $state(1);
  let quizAnswered = $state(false);
  let runCorrect = 0;
  let runTotal = 0;

  onMount(() => {
    if (!unit || screens.length === 0) {
      toMap();
      return;
    }
    const p = get(progress)[unitId];
    const start = p && !p.completed ? Math.min(p.lastScreen, screens.length - 1) : 0;
    index = Math.max(0, start);
  });

  const current = $derived(screens[index]);
  const isQuiz = $derived(current?.type === 'quiz');
  const canNext = $derived(!isQuiz || quizAnswered);
  const atFirst = $derived(index === 0);
  const atLast = $derived(index === screens.length - 1);

  // Reset the quiz gate whenever the screen changes, and persist resume point.
  $effect(() => {
    index; // track
    quizAnswered = false;
    if (unit) setLastScreen(unitId, index);
  });

  function next(): void {
    if (!canNext) return;
    if (atLast) {
      finish();
      return;
    }
    dir = 1;
    index += 1;
  }

  function prev(): void {
    if (atFirst) {
      toMap();
      return;
    }
    dir = -1;
    index -= 1;
  }

  function finish(): void {
    const score = runTotal > 0 ? runCorrect / runTotal : 1;
    completeUnit(unitId, score);
    toComplete(unitId);
  }

  // Swipe handling
  let startX = 0;
  let startY = 0;
  let tracking = false;
  function down(e: PointerEvent): void {
    tracking = true;
    startX = e.clientX;
    startY = e.clientY;
  }
  function up(e: PointerEvent): void {
    if (!tracking) return;
    tracking = false;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
  }
</script>

{#if unit && screens.length}
  <div class="player">
    <header class="player__bar">
      <button class="iconbtn" aria-label="Back to map" onclick={toMap}>
        <Icon name="x" size={22} />
      </button>
      <div
        class="segs"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={screens.length}
        aria-valuenow={index + 1}
        aria-label="Unit progress"
      >
        {#each screens as _, i}
          <span class="seg" class:done={i < index} class:current={i === index}></span>
        {/each}
      </div>
      <span class="player__count">{index + 1}/{screens.length}</span>
    </header>

    <section
      class="player__stage"
      role="group"
      aria-label="Lesson screen (swipe left or right to navigate)"
      onpointerdown={down}
      onpointerup={up}
      onpointercancel={() => (tracking = false)}
    >
      {#key index}
        <div class="screen" in:slideFade={{ dx: 28 * dir, reduced: $reducedMotionActive }}>
          <BlockRenderer
            block={current}
            {unitId}
            onQuizState={(answered) => (quizAnswered = answered)}
            onQuizAnswer={(correct) => {
              runTotal += 1;
              if (correct) runCorrect += 1;
            }}
          />
        </div>
      {/key}
    </section>

    <footer class="player__controls" class:quiz={isQuiz}>
      {#if isQuiz}
        <button
          class="backmini"
          aria-label={atFirst ? 'Back to map' : 'Previous screen'}
          onclick={prev}
        >
          <Icon name="chevron-left" size={20} />
        </button>
        <div class="grow">
          <Button variant="primary" full disabled={!quizAnswered} onclick={next}>
            {#if !quizAnswered}
              Pick an answer
            {:else}
              {atLast ? 'Finish' : 'Continue'}
              <Icon name={atLast ? 'check' : 'arrow-right'} size={18} />
            {/if}
          </Button>
        </div>
      {:else}
        <Button variant="ghost" onclick={prev}>
          <Icon name="chevron-left" size={18} />
          {atFirst ? 'Map' : 'Back'}
        </Button>
        <Button variant="primary" onclick={next}>
          {atLast ? 'Finish' : 'Next'}
          <Icon name={atLast ? 'check' : 'chevron-right'} size={18} />
        </Button>
      {/if}
    </footer>
  </div>
{/if}

<style>
  .player {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }
  .player__bar {
    display: flex;
    align-items: center;
    gap: var(--sp-3);
    padding: var(--sp-3) var(--sp-4);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    background: var(--bg);
    z-index: 5;
  }
  .iconbtn {
    display: grid;
    place-items: center;
    width: var(--tap);
    height: var(--tap);
    flex: none;
    border: none;
    background: transparent;
    color: var(--ink-soft);
    border-radius: var(--r-md);
    cursor: pointer;
  }
  .iconbtn:hover {
    background: var(--surface-2);
  }
  .segs {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .seg {
    flex: 1;
    height: 6px;
    border-radius: var(--r-pill);
    background: var(--surface-2);
    transition: background var(--dur-base) var(--ease-standard);
  }
  .seg.done {
    background: color-mix(in srgb, var(--accent) 45%, var(--surface-2));
  }
  .seg.current {
    background: var(--accent);
  }
  .player__count {
    flex: none;
    font-size: var(--fs-sm);
    color: var(--ink-faint);
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }
  .player__stage {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    touch-action: pan-y;
  }
  .screen {
    width: 100%;
    max-width: 760px;
    margin: 0 auto;
    padding: var(--sp-5) var(--sp-4) var(--sp-7);
  }
  .player__controls {
    display: flex;
    justify-content: space-between;
    gap: var(--sp-3);
    padding: var(--sp-3) var(--sp-4);
    padding-bottom: max(var(--sp-3), env(safe-area-inset-bottom));
    border-top: 1px solid var(--border);
    background: var(--bg);
    position: sticky;
    bottom: 0;
  }
  .player__controls.quiz {
    justify-content: flex-start;
  }
  .player__controls.quiz .grow {
    flex: 1;
  }
  .backmini {
    display: grid;
    place-items: center;
    width: var(--tap);
    height: var(--tap);
    flex: none;
    border: 1px solid var(--border-strong);
    background: var(--surface);
    color: var(--ink-soft);
    border-radius: var(--r-pill);
    cursor: pointer;
    transition: background var(--dur-fast) var(--ease-standard);
  }
  .backmini:hover {
    background: var(--surface-2);
  }
</style>
