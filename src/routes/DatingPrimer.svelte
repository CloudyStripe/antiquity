<script lang="ts">
  import Button from '$components/ui/Button.svelte';
  import Icon from '$components/ui/Icon.svelte';
  import { meta } from '$lib/content/load';
  import { settings, updateSetting } from '$lib/stores/settings';
  import { toMap } from '$lib/stores/router';

  const firstRun = $derived(!$settings.primerSeen);

  function dismiss(): void {
    if (!$settings.primerSeen) updateSetting('primerSeen', true);
    toMap();
  }

  const points = [
    {
      icon: 'ruler',
      title: 'BCE / CE',
      body: '“Before Common Era” and “Common Era” count the same years as BC/AD without the religious framing. 500 BCE = 500 BC.',
    },
    {
      icon: 'arrow-right',
      title: 'No year zero',
      body: 'Years BCE count down toward the year 1; the next year is 1 CE. There is no year 0 in between.',
    },
    {
      icon: 'telescope',
      title: '“c.” means circa',
      body: '“c. 3000 BCE” means around 3000 BCE — an honest flag that a date is approximate.',
    },
    {
      icon: 'scale',
      title: 'Relative vs. absolute',
      body: 'A relative date says this came before that. An absolute date pins a calendar year — usually with an error range, not a single number.',
    },
  ];
</script>

<main class="primer">
  <div class="primer__card">
    <div class="primer__icon"><Icon name="info" size={32} /></div>
    <h1>How dates work here</h1>
    <p class="lead">{meta.datingConventionNote}</p>

    <ul class="points">
      {#each points as p}
        <li>
          <span class="points__icon"><Icon name={p.icon} size={18} /></span>
          <div>
            <strong>{p.title}</strong>
            <p>{p.body}</p>
          </div>
        </li>
      {/each}
    </ul>

    <Button variant="primary" size="lg" full onclick={dismiss}>
      {firstRun ? 'Got it — start learning' : 'Back to map'}
      <Icon name="arrow-right" size={18} />
    </Button>
  </div>
</main>

<style>
  .primer {
    min-height: 100dvh;
    display: grid;
    place-items: center;
    padding: var(--sp-5) var(--sp-4);
  }
  .primer__card {
    width: 100%;
    max-width: 520px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-xl);
    padding: var(--sp-6) var(--sp-5);
    box-shadow: var(--shadow-lg);
  }
  .primer__icon {
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    margin: 0 auto var(--sp-3);
    border-radius: 50%;
    background: var(--surface-2);
    color: var(--accent-ink);
  }
  h1 {
    text-align: center;
    font-size: var(--fs-2xl);
    margin: 0 0 var(--sp-2);
  }
  .lead {
    text-align: center;
    color: var(--ink-soft);
    margin: 0 0 var(--sp-5);
  }
  .points {
    list-style: none;
    margin: 0 0 var(--sp-5);
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--sp-4);
  }
  .points li {
    display: flex;
    gap: var(--sp-3);
  }
  .points__icon {
    flex: none;
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent) 12%, transparent);
    color: var(--accent-ink);
  }
  .points strong {
    color: var(--ink);
  }
  .points p {
    margin: 2px 0 0;
    font-size: var(--fs-sm);
    color: var(--ink-soft);
  }
</style>
