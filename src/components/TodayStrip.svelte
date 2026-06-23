<script lang="ts">
  import { lessonsToday } from '$lib/stores/derived';
  import { settings } from '$lib/stores/settings';
  import { streak } from '$lib/stores/persist';
  import { dayString } from '$lib/engine/gamification';
  import { celebrate } from '$lib/fx/confetti';
  import { sfx } from '$lib/fx/audio';
  import { haptics } from '$lib/fx/haptics';
  import Icon from '$components/ui/Icon.svelte';
  import StreakFlame from '$components/StreakFlame.svelte';

  const goal = $derived(Math.max(1, $settings.goal));
  const done = $derived($lessonsToday);
  const frac = $derived(Math.min(done / goal, 1));
  const complete = $derived(done >= goal);
  const remaining = $derived(Math.max(0, goal - done));

  const C = 2 * Math.PI * 18; // ring circumference (r = 18)
  const offset = $derived(C * (1 - frac));

  const status = $derived(
    complete
      ? 'Today’s goal complete. Nice work.'
      : remaining === 1
        ? 'One more lesson to hit today’s goal.'
        : `${remaining} lessons to hit today’s goal.`,
  );

  // Celebrate the first time the goal is hit each day (once per day).
  $effect(() => {
    if (typeof localStorage === 'undefined') return;
    if (complete) {
      const key = 'antiquity:goal-celebrated';
      const today = dayString(new Date());
      if (localStorage.getItem(key) !== today) {
        localStorage.setItem(key, today);
        celebrate();
        sfx.complete();
        haptics.celebrate();
      }
    }
  });
</script>

<section class="today" aria-label="Today’s goal">
  <div class="ring" class:complete role="img" aria-label="{done} of {goal} lessons today">
    <svg viewBox="0 0 44 44" aria-hidden="true">
      <circle class="ring__track" cx="22" cy="22" r="18" />
      <circle
        class="ring__fill"
        cx="22"
        cy="22"
        r="18"
        stroke-dasharray={C}
        stroke-dashoffset={offset}
      />
    </svg>
    <span class="ring__label">
      {#if complete}
        <Icon name="check" size={18} strokeWidth={3} />
      {:else}
        <span class="ring__num">{done}<span class="ring__goal">/{goal}</span></span>
      {/if}
    </span>
  </div>

  <div class="today__text">
    <span class="today__eyebrow"><Icon name="target" size={13} strokeWidth={2.4} /> Today</span>
    <span class="today__status">{status}</span>
  </div>

  <div class="today__streak">
    <StreakFlame count={$streak.current} />
  </div>
</section>

<style>
  .today {
    display: flex;
    align-items: center;
    gap: var(--sp-3);
    padding: var(--sp-3) var(--sp-4);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--sp-4);
  }
  .ring {
    position: relative;
    flex: none;
    width: 44px;
    height: 44px;
  }
  .ring svg {
    width: 44px;
    height: 44px;
    transform: rotate(-90deg);
  }
  .ring__track {
    fill: none;
    stroke: var(--surface-2);
    stroke-width: 4;
  }
  .ring__fill {
    fill: none;
    stroke: var(--accent);
    stroke-width: 4;
    stroke-linecap: round;
    transition: stroke-dashoffset var(--dur-slow) var(--ease-out);
  }
  .ring.complete .ring__fill {
    stroke: var(--success);
  }
  .ring__label {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: var(--fs-sm);
    font-weight: 700;
    color: var(--ink);
  }
  .ring.complete .ring__label {
    color: var(--success-ink);
  }
  .ring__num {
    display: inline-flex;
    align-items: baseline;
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .ring__goal {
    color: var(--ink-faint);
    font-weight: 600;
  }
  .today__text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .today__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: var(--fs-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink-faint);
  }
  .today__status {
    font-size: var(--fs-sm);
    font-weight: 600;
    color: var(--ink);
  }
  .today__streak {
    flex: none;
  }
</style>
