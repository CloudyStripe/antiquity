<script lang="ts">
  import type { Question } from '$lib/content/types';
  import MarkdownText from './MarkdownText.svelte';
  import { sfx, unlockAudio } from '$lib/fx/audio';
  import { haptics } from '$lib/fx/haptics';
  import { burst } from '$lib/fx/confetti';
  import { announce } from '$lib/a11y/liveRegion';

  interface Props {
    question: Question;
    /** Called once, the first time this question is answered. */
    onAnswered?: (correct: boolean, choiceIndex: number) => void;
    prompt?: string;
    /** e.g. "Question 2 of 3" — shown only on multi-question quiz screens. */
    position?: string;
  }
  let { question, onAnswered, prompt, position }: Props = $props();

  let selected = $state<number | null>(null);
  let answered = $derived(selected !== null);
  const isCorrect = (i: number) => i === question.answer;

  function choose(i: number, e: MouseEvent): void {
    if (answered) return;
    selected = i;
    const correct = isCorrect(i);
    unlockAudio();
    if (correct) {
      sfx.correct();
      haptics.success();
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      burst(
        (r.left + r.width / 2) / window.innerWidth,
        (r.top + r.height / 2) / window.innerHeight,
      );
      announce('Correct.');
    } else {
      sfx.wrong();
      haptics.soft();
      announce(`Not quite. ${question.explanation}`);
    }
    onAnswered?.(correct, i);
  }

  function optionClass(i: number): string {
    if (!answered) return 'idle';
    if (isCorrect(i)) return 'correct';
    if (i === selected) return 'wrong';
    return 'faded';
  }
</script>

<div class="qcard">
  {#if position || prompt}
    <div class="qhead">
      {#if position}<span class="qpos">{position}</span>{/if}
      {#if prompt}<span class="prompt">{prompt}</span>{/if}
    </div>
  {/if}
  <fieldset>
    <legend class="stem"><MarkdownText text={question.stem} /></legend>
    <div class="options" role="group">
      {#each question.choices as choice, i}
        <button
          class="option {optionClass(i)}"
          disabled={answered}
          aria-pressed={selected === i}
          onclick={(e) => choose(i, e)}
        >
          <span class="option__text">{choice}</span>
          {#if answered && isCorrect(i)}
            <svg class="tick" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 13l4 4L19 7" />
            </svg>
          {/if}
        </button>
      {/each}
    </div>
  </fieldset>

  {#if answered}
    <div class="explain" class:good={isCorrect(selected ?? -1)}>
      <strong>{isCorrect(selected ?? -1) ? 'Correct!' : 'Close, here’s why'}</strong>
      <p><MarkdownText text={question.explanation} /></p>
    </div>
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
  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
    min-width: 0;
  }
  .stem {
    font-family: var(--font-serif);
    font-size: var(--fs-xl);
    line-height: 1.3;
    color: var(--ink);
    padding: 0;
    margin-bottom: var(--sp-4);
  }
  .options {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
  }
  .option {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-3);
    width: 100%;
    min-height: var(--tap);
    padding: var(--sp-3) var(--sp-4);
    text-align: left;
    font-size: var(--fs-base);
    font-family: var(--font-sans);
    color: var(--ink);
    background: var(--surface);
    border: 2px solid var(--border);
    border-radius: var(--r-md);
    cursor: pointer;
    transition:
      transform var(--dur-fast) var(--ease-spring),
      background var(--dur-base) var(--ease-standard),
      border-color var(--dur-base) var(--ease-standard),
      opacity var(--dur-base) var(--ease-standard);
  }
  .option.idle:hover {
    border-color: var(--accent);
  }
  .option.idle:active {
    transform: scale(0.98);
  }
  .option:disabled {
    cursor: default;
  }
  .option.correct {
    background: var(--success-bg);
    border-color: var(--success);
    color: var(--success-ink);
    animation: pop var(--dur-base) var(--ease-spring);
  }
  .option.wrong {
    background: var(--error-bg);
    border-color: var(--error);
    color: var(--error-ink);
    animation: shake 0.4s var(--ease-standard);
  }
  .option.faded {
    opacity: 0.55;
  }
  .option__text {
    flex: 1;
  }

  .tick {
    width: 22px;
    height: 22px;
    flex: none;
    fill: none;
    stroke: var(--success);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
    animation: draw 0.4s var(--ease-out) forwards;
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

  @keyframes pop {
    0% {
      transform: scale(1);
    }
    45% {
      transform: scale(1.04);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(-6px);
    }
    40% {
      transform: translateX(6px);
    }
    60% {
      transform: translateX(-4px);
    }
    80% {
      transform: translateX(4px);
    }
  }
  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
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
