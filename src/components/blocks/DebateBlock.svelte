<script lang="ts">
  import type { DebateBlock } from '$lib/content/types';
  import MarkdownText from '../MarkdownText.svelte';
  import Icon from '$components/ui/Icon.svelte';
  import Chip from '$components/ui/Chip.svelte';
  interface Props {
    block: DebateBlock;
  }
  let { block }: Props = $props();
</script>

<section class="debate" aria-label="Debate: {block.heading}">
  <header class="debate__head">
    <span class="debate__brand">
      <Icon name="scale" size={18} />
      <span class="debate__kicker">Open debate</span>
    </span>
    <Chip confidence={block.confidence} />
  </header>
  <h2 class="debate__title">{block.heading}</h2>
  {#if block.intro}<p class="debate__intro"><MarkdownText text={block.intro} /></p>{/if}

  <!-- Positions are rendered as equal-weight cards. No position is styled as the
       "right answer": identical layout, identical neutral colors throughout. -->
  <ol class="positions">
    {#each block.positions as pos}
      <li class="position">
        <h3 class="position__name">{pos.name}</h3>
        <p class="position__claim"><MarkdownText text={pos.claim} /></p>
        {#if pos.support.length}
          <div class="lines">
            <span class="lines__label">Supports</span>
            <ul>
              {#each pos.support as s}
                <li><span class="mark plus" aria-hidden="true">+</span><MarkdownText text={s} /></li>
              {/each}
            </ul>
          </div>
        {/if}
        {#if pos.weaknesses.length}
          <div class="lines">
            <span class="lines__label">Weaknesses</span>
            <ul>
              {#each pos.weaknesses as w}
                <li><span class="mark minus" aria-hidden="true">−</span><MarkdownText text={w} /></li>
              {/each}
            </ul>
          </div>
        {/if}
      </li>
    {/each}
  </ol>

  <footer class="where">
    <span class="where__label"><Icon name="info" size={15} /> Where it stands</span>
    <p><MarkdownText text={block.whereItStands} /></p>
  </footer>
</section>

<style>
  .debate {
    background: var(--surface);
    border: 1px solid var(--border-strong);
    border-radius: var(--r-lg);
    padding: var(--sp-4);
    box-shadow: var(--shadow-sm);
  }
  .debate__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-3);
    margin-bottom: var(--sp-2);
  }
  .debate__brand {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--ink-soft);
    font-size: var(--fs-xs);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
  }
  .debate__title {
    font-size: var(--fs-xl);
    margin: 0 0 var(--sp-2);
  }
  .debate__intro {
    color: var(--ink-soft);
    margin: 0 0 var(--sp-4);
  }

  .positions {
    list-style: none;
    margin: 0 0 var(--sp-4);
    padding: 0;
    display: grid;
    gap: var(--sp-3);
    grid-template-columns: 1fr;
  }
  @media (min-width: 620px) {
    .positions {
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }
  }
  .position {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: var(--sp-3) var(--sp-4);
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
  }
  .position__name {
    font-family: var(--font-sans);
    font-size: var(--fs-sm);
    font-weight: 700;
    color: var(--accent-ink);
    text-transform: uppercase;
    letter-spacing: 0.03em;
    margin: 0;
    line-height: 1.3;
  }
  .position__claim {
    margin: 0;
    font-family: var(--font-serif);
    font-size: var(--fs-lg);
    color: var(--ink);
    line-height: 1.35;
  }
  .lines__label {
    display: block;
    font-size: var(--fs-xs);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink-faint);
    font-weight: 700;
    margin-bottom: 2px;
  }
  .lines ul {
    list-style: none;
    margin: 0 0 var(--sp-1);
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .lines li {
    display: flex;
    gap: var(--sp-2);
    font-size: var(--fs-sm);
    color: var(--ink-soft);
    line-height: 1.4;
  }
  .mark {
    flex: none;
    font-weight: 800;
    color: var(--ink-faint);
  }

  .where {
    border-top: 1px solid var(--border);
    padding-top: var(--sp-3);
  }
  .where__label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: var(--fs-xs);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 700;
    color: var(--ink-soft);
    margin-bottom: var(--sp-1);
  }
  .where p {
    margin: 0;
    color: var(--ink);
  }
</style>
