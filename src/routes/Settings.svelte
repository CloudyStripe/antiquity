<script lang="ts">
  import SubHeader from '$components/SubHeader.svelte';
  import Toggle from '$components/ui/Toggle.svelte';
  import Icon from '$components/ui/Icon.svelte';
  import { settings, updateSetting } from '$lib/stores/settings';
  import { toPrimer, toCredits } from '$lib/stores/router';
  import { sfx, unlockAudio } from '$lib/fx/audio';

  const themes = [
    { value: 'system', label: 'System', icon: 'monitor' },
    { value: 'light', label: 'Light', icon: 'sun' },
    { value: 'dark', label: 'Dark', icon: 'moon' },
  ] as const;

  const motions = [
    { value: 'system', label: 'System' },
    { value: 'full', label: 'Full' },
    { value: 'reduce', label: 'Reduced' },
  ] as const;

  const sizes = [
    { value: 0.9, label: 'A', size: 13 },
    { value: 1, label: 'A', size: 16 },
    { value: 1.15, label: 'A', size: 19 },
    { value: 1.3, label: 'A', size: 22 },
  ];

  const goals = [1, 2, 3, 5];
</script>

<SubHeader title="Settings" />

<main class="app-main">
  <section class="group">
    <div class="row">
      <div class="row__text">
        <strong>Sound effects</strong>
        <span>Gentle chimes for taps, correct answers, and celebrations.</span>
      </div>
      <Toggle
        checked={$settings.sound}
        label="Sound effects"
        onchange={(v) => {
          updateSetting('sound', v);
          if (v) {
            unlockAudio();
            sfx.correct();
          }
        }}
      />
    </div>
    <div class="row">
      <div class="row__text">
        <strong>Haptics</strong>
        <span>Subtle vibration feedback on supported devices.</span>
      </div>
      <Toggle
        checked={$settings.haptics}
        label="Haptics"
        onchange={(v) => updateSetting('haptics', v)}
      />
    </div>
  </section>

  <h2 class="section">Daily goal</h2>
  <div class="seg" role="group" aria-label="Daily lesson goal">
    {#each goals as g}
      <button
        class="seg__btn"
        class:on={$settings.goal === g}
        onclick={() => updateSetting('goal', g)}
      >
        {g}
      </button>
    {/each}
  </div>
  <p class="note">Lessons to finish each day. Hit it to keep your streak going.</p>

  <h2 class="section">Theme</h2>
  <div class="seg" role="group" aria-label="Theme">
    {#each themes as t}
      <button
        class="seg__btn"
        class:on={$settings.theme === t.value}
        onclick={() => updateSetting('theme', t.value)}
      >
        <Icon name={t.icon} size={18} />
        {t.label}
      </button>
    {/each}
  </div>

  <h2 class="section">Motion</h2>
  <div class="seg" role="group" aria-label="Motion">
    {#each motions as m}
      <button
        class="seg__btn"
        class:on={$settings.reducedMotion === m.value}
        onclick={() => updateSetting('reducedMotion', m.value)}
      >
        {m.label}
      </button>
    {/each}
  </div>
  <p class="note">“Reduced” disables confetti and large animations. “System” follows your device.</p>

  <h2 class="section">Text size</h2>
  <div class="seg" role="group" aria-label="Text size">
    {#each sizes as s}
      <button
        class="seg__btn"
        class:on={$settings.textScale === s.value}
        onclick={() => updateSetting('textScale', s.value)}
      >
        <span style="font-size:{s.size}px">{s.label}</span>
      </button>
    {/each}
  </div>

  <h2 class="section">Reference</h2>
  <button class="link-row" onclick={toPrimer}>
    <Icon name="info" size={18} />
    <span>Dating conventions primer (BCE / CE / “c.”)</span>
    <Icon name="chevron-right" size={18} />
  </button>
  <button class="link-row" onclick={toCredits}>
    <Icon name="image" size={18} />
    <span>Image credits &amp; licenses</span>
    <Icon name="chevron-right" size={18} />
  </button>

  <p class="version">Antiquity · content v0.1 · works offline</p>
</main>

<style>
  .group {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-4);
    padding: var(--sp-3) var(--sp-4);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
  }
  .row__text {
    display: flex;
    flex-direction: column;
  }
  .row__text strong {
    color: var(--ink);
  }
  .row__text span {
    font-size: var(--fs-sm);
    color: var(--ink-soft);
  }
  .section {
    font-size: var(--fs-lg);
    margin: var(--sp-5) 0 var(--sp-2);
  }
  .seg {
    display: flex;
    gap: 4px;
    background: var(--surface-2);
    border-radius: var(--r-md);
    padding: 4px;
  }
  .seg__btn {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 40px;
    border: none;
    border-radius: var(--r-sm);
    background: transparent;
    color: var(--ink-soft);
    font-weight: 600;
    font-size: var(--fs-sm);
    cursor: pointer;
    transition: all var(--dur-fast) var(--ease-standard);
  }
  .seg__btn.on {
    background: var(--surface);
    color: var(--accent-ink);
    box-shadow: var(--shadow-sm);
  }
  .note {
    font-size: var(--fs-sm);
    color: var(--ink-faint);
    margin: var(--sp-2) 0 0;
  }
  .link-row {
    display: flex;
    align-items: center;
    gap: var(--sp-3);
    width: 100%;
    text-align: left;
    padding: var(--sp-3) var(--sp-4);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    color: var(--ink);
    cursor: pointer;
    font-size: var(--fs-base);
  }
  .link-row span {
    flex: 1;
  }
  .version {
    margin-top: var(--sp-6);
    text-align: center;
    font-size: var(--fs-xs);
    color: var(--ink-faint);
  }
</style>
