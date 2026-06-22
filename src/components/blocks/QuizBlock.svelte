<script lang="ts">
  import type { QuizBlock } from '$lib/content/types';
  import QuestionCard from '../QuestionCard.svelte';
  import ComboMeter from '../ComboMeter.svelte';
  import { answerInline } from '$lib/stores/progress';
  import { sfx } from '$lib/fx/audio';
  import { haptics } from '$lib/fx/haptics';

  interface Props {
    block: QuizBlock;
    unitId: string;
    /** Notifies the player whether every question has been answered (gates Next). */
    onState?: (allAnswered: boolean) => void;
    /** Bubbles each first-time answer so the player can score the run. */
    onAnswer?: (correct: boolean) => void;
  }
  let { block, unitId, onState, onAnswer }: Props = $props();

  let answered = $state(new Set<string>());
  let combo = $state(0);
  let correctCount = $state(0);

  const multi = $derived(block.questions.length > 1);

  // Tell the player the gate starts closed.
  $effect(() => {
    onState?.(answered.size >= block.questions.length);
  });

  function handle(qId: string, correct: boolean): void {
    if (correct) {
      correctCount += 1;
      combo += 1;
      if (combo >= 2) {
        sfx.combo(combo);
        haptics.success();
      }
    } else {
      combo = 0;
    }
    answered = new Set(answered).add(qId);
  }
</script>

<div class="quiz">
  <div class="quiz__top">
    <span class="quiz__count">
      {answered.size} / {block.questions.length} answered
      {#if answered.size > 0}<span class="quiz__tally">· {correctCount} correct</span>{/if}
    </span>
    <ComboMeter count={combo} />
  </div>

  {#each block.questions as q, i}
    <QuestionCard
      question={q}
      prompt={i === 0 ? block.prompt : undefined}
      position={multi ? `Question ${i + 1} of ${block.questions.length}` : undefined}
      onAnswered={(correct) => {
        answerInline(unitId, q, correct);
        handle(q.id, correct);
        onAnswer?.(correct);
      }}
    />
  {/each}
</div>

<style>
  .quiz {
    display: flex;
    flex-direction: column;
    gap: var(--sp-6);
  }
  .quiz__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-3);
    min-height: 28px;
  }
  .quiz__count {
    font-size: var(--fs-sm);
    color: var(--ink-faint);
    font-weight: 600;
  }
  .quiz__tally {
    color: var(--success-ink);
  }
</style>
