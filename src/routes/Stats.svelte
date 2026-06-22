<script lang="ts">
  import SubHeader from '$components/SubHeader.svelte';
  import Icon from '$components/ui/Icon.svelte';
  import Button from '$components/ui/Button.svelte';
  import { statsSummary } from '$lib/stores/derived';
  import { badges } from '$lib/stores/persist';
  import { BADGES } from '$lib/engine/gamification';
  import { downloadProgress, importProgressFromText } from '$lib/stores/persist';

  let importMsg = $state('');
  let fileInput: HTMLInputElement;

  const earned = $derived(new Set($badges));

  async function onFile(e: Event): Promise<void> {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      importProgressFromText(text);
      importMsg = 'Progress imported ✓';
    } catch {
      importMsg = 'That file could not be read as Antiquity progress.';
    }
    input.value = '';
  }

  const tiles = $derived([
    { icon: 'star', label: 'XP', value: `${$statsSummary.xp}` },
    { icon: 'graduation-cap', label: 'Units done', value: `${$statsSummary.unitsCompleted}` },
    {
      icon: 'list-checks',
      label: 'Accuracy',
      value: $statsSummary.questionsAnswered
        ? `${Math.round($statsSummary.accuracy * 100)}%`
        : '—',
    },
    { icon: 'flame', label: 'Streak', value: `${$statsSummary.streakCurrent}d` },
    { icon: 'trophy', label: 'Longest streak', value: `${$statsSummary.streakLongest}d` },
    { icon: 'award', label: 'Badges', value: `${$statsSummary.badgeCount}` },
  ]);
</script>

<SubHeader title="Your progress" />

<main class="app-main">
  <div class="tiles">
    {#each tiles as t}
      <div class="tile">
        <span class="tile__icon"><Icon name={t.icon} size={20} /></span>
        <span class="tile__value">{t.value}</span>
        <span class="tile__label">{t.label}</span>
      </div>
    {/each}
  </div>

  <h2 class="section">Badges</h2>
  <div class="badges">
    {#each BADGES as b}
      <div class="badge" class:got={earned.has(b.id)}>
        <span class="badge__ring"><Icon name={earned.has(b.id) ? b.icon : 'lock'} size={20} /></span>
        <div class="badge__text">
          <strong>{b.title}</strong>
          <span>{b.description}</span>
        </div>
      </div>
    {/each}
  </div>

  <h2 class="section">Back up your progress</h2>
  <p class="hint">No account needed. Export to a file to back up or move devices.</p>
  <div class="backup">
    <Button variant="secondary" onclick={downloadProgress}>
      <Icon name="download" size={18} /> Export
    </Button>
    <Button variant="secondary" onclick={() => fileInput.click()}>
      <Icon name="upload" size={18} /> Import
    </Button>
    <input
      bind:this={fileInput}
      type="file"
      accept="application/json,.json"
      class="sr-only"
      onchange={onFile}
    />
  </div>
  {#if importMsg}<p class="import-msg">{importMsg}</p>{/if}
</main>

<style>
  .tiles {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--sp-3);
    margin-bottom: var(--sp-6);
  }
  @media (max-width: 380px) {
    .tiles {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: var(--sp-4) var(--sp-2);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    text-align: center;
  }
  .tile__icon {
    color: var(--accent-ink);
  }
  .tile__value {
    font-family: var(--font-serif);
    font-size: var(--fs-2xl);
    font-weight: 600;
    color: var(--ink);
  }
  .tile__label {
    font-size: var(--fs-xs);
    color: var(--ink-faint);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-weight: 600;
  }
  .section {
    font-size: var(--fs-xl);
    margin: var(--sp-5) 0 var(--sp-3);
  }
  .badges {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
  }
  .badge {
    display: flex;
    align-items: center;
    gap: var(--sp-3);
    padding: var(--sp-3);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    background: var(--surface);
    opacity: 0.6;
  }
  .badge.got {
    opacity: 1;
    border-color: var(--accent);
  }
  .badge__ring {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    flex: none;
    border-radius: 50%;
    background: var(--surface-2);
    color: var(--ink-faint);
  }
  .badge.got .badge__ring {
    background: color-mix(in srgb, var(--accent) 14%, transparent);
    color: var(--accent-ink);
  }
  .badge__text {
    display: flex;
    flex-direction: column;
  }
  .badge__text strong {
    color: var(--ink);
  }
  .badge__text span {
    font-size: var(--fs-sm);
    color: var(--ink-soft);
  }
  .hint {
    color: var(--ink-soft);
    font-size: var(--fs-sm);
    margin: 0 0 var(--sp-3);
  }
  .backup {
    display: flex;
    gap: var(--sp-3);
  }
  .import-msg {
    margin-top: var(--sp-3);
    font-size: var(--fs-sm);
    color: var(--ink-soft);
  }
</style>
