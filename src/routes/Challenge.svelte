<script lang="ts">
  import { get } from 'svelte/store';
  import type { Question } from '$lib/content/types';
  import { challengePool } from '$lib/stores/derived';
  import { questionStats } from '$lib/stores/persist';
  import { answerChallenge, recordChallengeResult } from '$lib/stores/progress';
  import { sampleChallenge, shuffleQuestion } from '$lib/engine/quiz';
  import { xpForQuestion, CHALLENGE_ROUND_BONUS } from '$lib/engine/gamification';
  import { toMap } from '$lib/stores/router';
  import { celebrate } from '$lib/fx/confetti';
  import { sfx, unlockAudio } from '$lib/fx/audio';
  import { haptics } from '$lib/fx/haptics';
  import SubHeader from '$components/SubHeader.svelte';
  import QuestionCard from '$components/QuestionCard.svelte';
  import ComboMeter from '$components/ComboMeter.svelte';
  import MarkdownText from '$components/MarkdownText.svelte';
  import ProgressBar from '$components/ui/ProgressBar.svelte';
  import Button from '$components/ui/Button.svelte';
  import Icon from '$components/ui/Icon.svelte';

  const ROUND_SIZE = 10;

  type Phase = 'intro' | 'playing' | 'done';
  let phase = $state<Phase>('intro');
  let questions = $state<Question[]>([]);
  let index = $state(0);
  let answered = $state(false);
  let combo = $state(0);
  let correctCount = $state(0);
  let roundXp = $state(0);
  let missed = $state<Question[]>([]);
  let bonus = $state(0);
  let newBadges = $state<string[]>([]);

  const poolSize = $derived($challengePool.length);

  function startRound(): void {
    unlockAudio();
    const sampled = sampleChallenge($challengePool, ROUND_SIZE, get(questionStats), Date.now());
    questions = sampled.map((q) => shuffleQuestion(q));
    index = 0;
    answered = false;
    combo = 0;
    correctCount = 0;
    roundXp = 0;
    missed = [];
    phase = 'playing';
  }

  const current = $derived(questions[index]);

  function onAnswered(correct: boolean): void {
    answered = true;
    answerChallenge(current, correct);
    if (correct) {
      correctCount += 1;
      roundXp += xpForQuestion(current.difficulty);
      combo += 1;
      if (combo >= 2) {
        sfx.combo(combo);
        haptics.success();
      }
    } else {
      combo = 0;
      missed = [...missed, current];
    }
  }

  function advance(): void {
    if (index < questions.length - 1) {
      index += 1;
      answered = false;
    } else {
      finishRound();
    }
  }

  function finishRound(): void {
    const res = recordChallengeResult(correctCount, questions.length);
    bonus = res.xpGained;
    newBadges = res.newBadges;
    phase = 'done';
    if (correctCount === questions.length) {
      celebrate();
      sfx.complete();
      haptics.celebrate();
    } else {
      sfx.complete();
    }
  }
</script>

<SubHeader title="Challenge" />

<main class="app-main challenge">
  {#if phase === 'intro'}
    {#if poolSize === 0}
      <div class="locked">
        <Icon name="lock" size={32} />
        <h2>No questions yet</h2>
        <p>
          Complete a unit or two first. Challenge mode reviews questions drawn
          <strong>only</strong> from units you’ve finished.
        </p>
        <Button onclick={toMap}><Icon name="map" size={18} /> Go to the map</Button>
      </div>
    {:else}
      <div class="intro">
        <div class="intro__icon"><Icon name="trophy" size={40} /></div>
        <h2>Cumulative Challenge</h2>
        <p>
          {Math.min(ROUND_SIZE, poolSize)} questions, drawn from the
          {poolSize} you’ve unlocked across completed units. No timer — just a satisfying
          round of review.
        </p>
        <Button variant="primary" size="lg" onclick={startRound}>
          Start round <Icon name="arrow-right" size={18} />
        </Button>
      </div>
    {/if}
  {:else if phase === 'playing'}
    <div class="play__top">
      <div class="play__bar">
        <ProgressBar value={(index + (answered ? 1 : 0)) / questions.length} label="Round progress" height={6} />
      </div>
      <span class="play__count">{index + 1}/{questions.length}</span>
    </div>
    <div class="play__combo"><ComboMeter count={combo} /></div>

    {#key index}
      <QuestionCard question={current} {onAnswered} />
    {/key}

    {#if answered}
      <div class="play__next">
        <Button variant="primary" size="lg" full onclick={advance}>
          {index < questions.length - 1 ? 'Next question' : 'See results'}
          <Icon name="arrow-right" size={18} />
        </Button>
      </div>
    {/if}
  {:else}
    <div class="result">
      <div class="result__score" class:perfect={correctCount === questions.length}>
        <span class="result__big">{correctCount}/{questions.length}</span>
        <span class="result__pct">{Math.round((correctCount / questions.length) * 100)}%</span>
      </div>
      <p class="result__xp">
        +{roundXp + bonus} XP earned
        <span class="result__bonus">({roundXp} correct · {CHALLENGE_ROUND_BONUS} round bonus)</span>
      </p>

      {#if newBadges.length}
        <p class="result__badge"><Icon name="award" size={16} /> New badge unlocked!</p>
      {/if}

      {#if missed.length}
        <section class="misses">
          <h3>Review the misses</h3>
          {#each missed as q}
            <div class="miss">
              <p class="miss__stem"><MarkdownText text={q.stem} /></p>
              <p class="miss__ans">
                <Icon name="check" size={14} /> {q.choices[q.answer]}
              </p>
              <p class="miss__exp"><MarkdownText text={q.explanation} /></p>
            </div>
          {/each}
        </section>
      {:else}
        <p class="clean"><Icon name="sparkles" size={16} /> Flawless round — nothing missed!</p>
      {/if}

      <div class="result__actions">
        <Button variant="primary" size="lg" full onclick={startRound}>
          <Icon name="rotate-ccw" size={18} /> Play again
        </Button>
        <Button variant="ghost" full onclick={toMap}>
          <Icon name="map" size={18} /> Back to map
        </Button>
      </div>
    </div>
  {/if}
</main>

<style>
  .challenge {
    max-width: 640px;
  }
  .locked,
  .intro {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--sp-3);
    padding: var(--sp-7) var(--sp-3);
    color: var(--ink-soft);
  }
  .intro__icon,
  .locked :global(svg):first-child {
    color: var(--accent-ink);
  }
  .intro__icon {
    display: grid;
    place-items: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: var(--surface);
    border: 2px solid var(--accent);
    color: var(--accent-ink);
  }
  .intro h2,
  .locked h2 {
    margin: 0;
    color: var(--ink);
  }
  .intro p,
  .locked p {
    max-width: 38ch;
    margin: 0 0 var(--sp-2);
  }

  .play__top {
    display: flex;
    align-items: center;
    gap: var(--sp-3);
    margin-bottom: var(--sp-2);
  }
  .play__bar {
    flex: 1;
  }
  .play__count {
    font-size: var(--fs-sm);
    color: var(--ink-faint);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .play__combo {
    min-height: 28px;
    margin-bottom: var(--sp-4);
  }
  .play__next {
    margin-top: var(--sp-5);
  }

  .result {
    text-align: center;
  }
  .result__score {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: var(--sp-4) 0 var(--sp-2);
  }
  .result__big {
    font-family: var(--font-serif);
    font-size: var(--fs-4xl);
    font-weight: 600;
    color: var(--ink);
  }
  .result__score.perfect .result__big {
    color: var(--success-ink);
  }
  .result__pct {
    color: var(--ink-faint);
    font-weight: 600;
  }
  .result__xp {
    font-size: var(--fs-lg);
    font-weight: 700;
    color: var(--accent-ink);
    margin: 0 0 var(--sp-1);
  }
  .result__bonus {
    display: block;
    font-size: var(--fs-sm);
    font-weight: 500;
    color: var(--ink-faint);
  }
  .result__badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--chip-contested-ink);
    font-weight: 700;
  }
  .misses {
    text-align: left;
    margin-top: var(--sp-5);
  }
  .misses h3 {
    font-size: var(--fs-lg);
  }
  .miss {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: var(--sp-3) var(--sp-4);
    margin-bottom: var(--sp-3);
  }
  .miss__stem {
    margin: 0 0 var(--sp-2);
    font-weight: 600;
    color: var(--ink);
  }
  .miss__ans {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin: 0 0 var(--sp-2);
    color: var(--success-ink);
    font-weight: 600;
    font-size: var(--fs-sm);
  }
  .miss__exp {
    margin: 0;
    font-size: var(--fs-sm);
    color: var(--ink-soft);
  }
  .clean {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--success-ink);
    font-weight: 600;
    margin: var(--sp-4) 0;
  }
  .result__actions {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
    margin-top: var(--sp-5);
  }
</style>
