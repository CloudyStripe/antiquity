<script lang="ts">
  import type { Question } from '$lib/content/types';
  import WorldMap from './WorldMap.svelte';
  import QuestionCard from './QuestionCard.svelte';
  import MarkdownText from './MarkdownText.svelte';
  import Icon from './ui/Icon.svelte';
  import { withinTolerance } from '$lib/engine/geo';
  import { sfx, unlockAudio } from '$lib/fx/audio';
  import { haptics } from '$lib/fx/haptics';
  import { burst } from '$lib/fx/confetti';
  import { announce } from '$lib/a11y/liveRegion';

  interface Props {
    /** A `maptap` question (carries `target`; `choices`/`answer` are the fallback). */
    question: Question;
    onAnswered?: (correct: boolean, choiceIndex: number) => void;
    prompt?: string;
    position?: string;
  }
  let { question, onAnswered, prompt, position }: Props = $props();

  let useMap = $state(true);
  let pin = $state<{ x: number; y: number } | null>(null);
  let answered = $state(false);
  let correct = $state(false);

  function report(isCorrect: boolean): void {
    answered = true;
    correct = isCorrect;
    onAnswered?.(isCorrect, 0);
  }

  function drop(t: { x: number; y: number; clientX: number; clientY: number }): void {
    if (answered || !question.target) return;
    pin = { x: t.x, y: t.y };
    const isCorrect = withinTolerance(pin, question.target);
    unlockAudio();
    if (isCorrect) {
      sfx.correct();
      haptics.success();
      burst(t.clientX / window.innerWidth, t.clientY / window.innerHeight);
      announce('Correct location.');
    } else {
      sfx.wrong();
      haptics.soft();
      announce(`Not quite. ${question.explanation}`);
    }
    report(isCorrect);
  }
</script>

<div class="qcard">
  {#if position || prompt}
    <div class="qhead">
      {#if position}<span class="qpos">{position}</span>{/if}
      {#if prompt}<span class="prompt">{prompt}</span>{/if}
    </div>
  {/if}

  <p class="stem"><MarkdownText text={question.stem} /></p>

  {#if useMap}
    <p class="hint" id="maptap-hint-{question.id}">
      <Icon name="map-pin" size={14} /> Tap the map where it belongs.
    </p>
    <WorldMap
      {pin}
      target={answered ? question.target : null}
      revealed={answered}
      disabled={answered}
      onTap={drop}
    />
    {#if !answered}
      <button class="toggle" onclick={() => (useMap = false)}>
        <Icon name="list-checks" size={15} /> Can’t use the map? Choose from a list
      </button>
    {/if}

    {#if answered}
      <div class="explain" class:good={correct}>
        <strong>{correct ? 'Correct!' : 'Close, here’s where it is'}</strong>
        <p><MarkdownText text={question.explanation} /></p>
      </div>
    {/if}
  {:else}
    <QuestionCard {question} onAnswered={(c) => report(c)} />
    {#if !answered}
      <button class="toggle" onclick={() => (useMap = true)}>
        <Icon name="map" size={15} /> Back to the map
      </button>
    {/if}
  {/if}
</div>

<style>
  .qcard {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
  }
  .qhead {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--sp-2);
  }
  .qpos {
    font-size: var(--fs-xs);
    font-weight: 700;
    color: var(--accent-ink);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
    padding: 2px 10px;
    border-radius: var(--r-pill);
  }
  .prompt {
    margin: 0;
    font-size: var(--fs-sm);
    color: var(--ink-faint);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 600;
  }
  .stem {
    font-family: var(--font-serif);
    font-size: var(--fs-xl);
    line-height: 1.3;
    color: var(--ink);
    margin: 0;
  }
  .hint {
    display: flex;
    align-items: center;
    gap: var(--sp-2);
    margin: 0;
    font-size: var(--fs-sm);
    color: var(--ink-faint);
  }
  .toggle {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: var(--tap);
    padding: var(--sp-2) var(--sp-3);
    background: none;
    border: none;
    color: var(--accent-ink);
    font-family: var(--font-sans);
    font-size: var(--fs-sm);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;
    cursor: pointer;
  }

  .explain {
    border-left: 4px solid var(--error);
    background: var(--surface-2);
    border-radius: 0 var(--r-md) var(--r-md) 0;
    padding: var(--sp-3) var(--sp-4);
    animation: slidein var(--dur-base) var(--ease-out);
  }
  .explain.good {
    border-left-color: var(--success);
  }
  .explain strong {
    display: block;
    margin-bottom: var(--sp-1);
    font-size: var(--fs-sm);
  }
  .explain p {
    margin: 0;
    color: var(--ink-soft);
    font-size: var(--fs-sm);
  }
  @keyframes slidein {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
