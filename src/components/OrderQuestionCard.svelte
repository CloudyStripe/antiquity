<script lang="ts">
  import { flip } from 'svelte/animate';
  import type { Question } from '$lib/content/types';
  import MarkdownText from './MarkdownText.svelte';
  import { sfx, unlockAudio } from '$lib/fx/audio';
  import { haptics } from '$lib/fx/haptics';
  import { burst } from '$lib/fx/confetti';
  import { announce } from '$lib/a11y/liveRegion';
  import { reducedMotionActive } from '$lib/stores/settings';
  import { shuffle } from '$lib/engine/quiz';
  import Icon from './ui/Icon.svelte';

  interface Props {
    /** An `order`-type question: `choices` are the items in CORRECT order. */
    question: Question;
    /** Called once, when the learner checks their sequence. */
    onAnswered?: (correct: boolean, choiceIndex: number) => void;
    prompt?: string;
    position?: string;
  }
  let { question, onAnswered, prompt, position }: Props = $props();

  interface Item {
    /** Index into question.choices — i.e. the item's correct position. */
    key: number;
    label: string;
  }

  /** Shuffled presentation; reshuffle if it lands pre-solved. */
  function deal(): Item[] {
    const items = question.choices.map((label, key) => ({ key, label }));
    for (let tries = 0; tries < 8; tries++) {
      const s = shuffle(items);
      if (s.some((it, i) => it.key !== i)) return s;
    }
    return items.slice().reverse();
  }

  let bank = $state<Item[]>(deal());
  let placed = $state<Item[]>([]);
  let checked = $state(false);
  let allCorrect = $state(false);

  const complete = $derived(placed.length === question.choices.length);
  const flipDur = $derived($reducedMotionActive ? 0 : 260);

  function place(item: Item): void {
    if (checked) return;
    unlockAudio();
    haptics.tick();
    bank = bank.filter((i) => i.key !== item.key);
    placed = [...placed, item];
  }

  function unplace(item: Item): void {
    if (checked) return;
    placed = placed.filter((i) => i.key !== item.key);
    bank = [...bank, item];
  }

  function slotCorrect(i: number): boolean {
    return placed[i]?.key === i;
  }

  function check(e: MouseEvent): void {
    if (checked || !complete) return;
    checked = true;
    allCorrect = placed.every((it, i) => it.key === i);
    unlockAudio();
    if (allCorrect) {
      sfx.correct();
      haptics.success();
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      burst(
        (r.left + r.width / 2) / window.innerWidth,
        (r.top + r.height / 2) / window.innerHeight,
      );
      announce('Correct — perfect sequence.');
    } else {
      sfx.wrong();
      haptics.soft();
      announce(
        `Not quite. The correct order is: ${question.choices.join(', then ')}. ${question.explanation}`,
      );
    }
    onAnswered?.(allCorrect, 0);
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
  <p class="hint" id="order-hint-{question.id}">
    <Icon name="layers" size={14} /> Tap the items in order — earliest first.
    Tap a placed item to take it back.
  </p>

  <ol class="slots" aria-describedby="order-hint-{question.id}">
    {#each placed as item, i (item.key)}
      <li animate:flip={{ duration: flipDur }}>
        <button
          class="option placed {checked ? (slotCorrect(i) ? 'correct' : 'wrong') : 'idle'}"
          disabled={checked}
          onclick={() => unplace(item)}
          aria-label="Position {i + 1}: {item.label}. Tap to remove."
        >
          <span class="num" aria-hidden="true">{i + 1}</span>
          <span class="option__text">{item.label}</span>
          {#if checked && slotCorrect(i)}
            <svg class="tick" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 13l4 4L19 7" />
            </svg>
          {:else if !checked}
            <Icon name="x" size={16} />
          {/if}
        </button>
      </li>
    {/each}
    {#each Array(question.choices.length - placed.length) as _, i}
      <li class="ghost" aria-hidden="true">
        <span class="num">{placed.length + i + 1}</span>
        <span class="ghost__label">
          {placed.length + i === 0
            ? 'Earliest'
            : placed.length + i === question.choices.length - 1
              ? 'Latest'
              : ''}
        </span>
      </li>
    {/each}
  </ol>

  {#if bank.length}
    <div class="bank" role="group" aria-label="Items to place">
      {#each bank as item (item.key)}
        <button
          class="chip"
          animate:flip={{ duration: flipDur }}
          onclick={() => place(item)}
          aria-label="Place {item.label} at position {placed.length + 1}"
        >
          {item.label}
        </button>
      {/each}
    </div>
  {/if}

  {#if !checked}
    <button class="checkbtn" disabled={!complete} onclick={check}>
      <Icon name="check" size={18} />
      {complete ? 'Check my order' : `Place ${question.choices.length - placed.length} more`}
    </button>
  {/if}

  {#if checked}
    <div class="explain" class:good={allCorrect}>
      <strong>{allCorrect ? 'Correct!' : 'Close, here’s the real sequence'}</strong>
      {#if !allCorrect}
        <ol class="truth">
          {#each question.choices as c}
            <li>{c}</li>
          {/each}
        </ol>
      {/if}
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

  .slots {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
  }
  .num {
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    flex: none;
    border-radius: var(--r-pill);
    background: var(--surface-2);
    color: var(--ink-faint);
    font-size: var(--fs-xs);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .option {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--sp-3);
    width: 100%;
    min-height: var(--tap);
    padding: var(--sp-2) var(--sp-3);
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
      border-color var(--dur-base) var(--ease-standard);
  }
  .option.idle:hover {
    border-color: var(--accent);
  }
  .option:disabled {
    cursor: default;
  }
  .option.placed .num {
    background: color-mix(in srgb, var(--accent) 14%, var(--surface-2));
    color: var(--accent-ink);
  }
  .option__text {
    flex: 1;
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

  .ghost {
    display: flex;
    align-items: center;
    gap: var(--sp-3);
    min-height: var(--tap);
    padding: var(--sp-2) var(--sp-3);
    border: 2px dashed var(--border-strong);
    border-radius: var(--r-md);
    color: var(--ink-faint);
  }
  .ghost__label {
    font-size: var(--fs-xs);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 600;
  }

  .bank {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-2);
  }
  .chip {
    min-height: var(--tap);
    padding: var(--sp-2) var(--sp-4);
    font-size: var(--fs-base);
    font-family: var(--font-sans);
    color: var(--ink);
    background: var(--surface-2);
    border: 2px solid var(--border-strong);
    border-radius: var(--r-pill);
    cursor: pointer;
    transition:
      transform var(--dur-fast) var(--ease-spring),
      border-color var(--dur-base) var(--ease-standard);
  }
  .chip:hover {
    border-color: var(--accent);
  }
  .chip:active {
    transform: scale(0.96);
  }

  .checkbtn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--sp-2);
    min-height: var(--tap);
    padding: var(--sp-2) var(--sp-5);
    align-self: flex-start;
    font-size: var(--fs-base);
    font-weight: 600;
    font-family: var(--font-sans);
    color: var(--on-accent);
    background: var(--accent);
    border: none;
    border-radius: var(--r-pill);
    cursor: pointer;
    transition:
      background var(--dur-base) var(--ease-standard),
      transform var(--dur-fast) var(--ease-spring),
      opacity var(--dur-base) var(--ease-standard);
  }
  .checkbtn:hover:not(:disabled) {
    background: var(--accent-strong);
  }
  .checkbtn:active:not(:disabled) {
    transform: scale(0.97);
  }
  .checkbtn:disabled {
    opacity: 0.55;
    cursor: default;
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
  .truth {
    margin: 0 0 var(--sp-2);
    padding-left: var(--sp-5);
    color: var(--ink-soft);
    font-size: var(--fs-sm);
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

  @keyframes pop {
    0% {
      transform: scale(1);
    }
    45% {
      transform: scale(1.02);
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
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
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
