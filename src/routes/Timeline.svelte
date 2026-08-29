<script lang="ts">
  import SubHeader from '$components/SubHeader.svelte';
  import BottomNav from '$components/BottomNav.svelte';
  import Icon from '$components/ui/Icon.svelte';
  import { unitsWithTimeAnchor } from '$lib/content/load';
  import { unitStates } from '$lib/stores/derived';
  import { toUnit } from '$lib/stores/router';
  import { haptics } from '$lib/fx/haptics';
  import { yearToFraction, TICKS, BANDS } from '$lib/engine/timescale';
  import type { Unit } from '$lib/content/types';
  import type { UnitState } from '$lib/content/types';

  const anchored = unitsWithTimeAnchor();

  // Geometry (pixel space; the SVG viewBox matches its rendered size 1:1).
  const H = 1500;
  const TOP_PAD = 24;
  const BOT_PAD = 52;
  const SPAN = H - TOP_PAD - BOT_PAD;
  const LANE_OFFSET = 48;
  const CLUSTER_GAP = 56; // trueY closer than this => same cluster
  const MIN_SPACING = 54; // min vertical gap between nudged dots in a cluster
  const DOT_R = 7;

  const yOf = (frac: number) => TOP_PAD + frac * SPAN;

  let vizW = $state(0);
  let activeId = $state<string | null>(null);

  interface Node {
    unit: Unit;
    state: UnitState;
    trueY: number;
    yStart: number;
    yEnd: number | null;
    dotX: number;
    dotY: number;
    hasLeader: boolean;
  }

  function navigable(s: UnitState): boolean {
    return s !== 'locked';
  }

  function computeNodes(states: Map<string, UnitState>, width: number): Node[] {
    const spineX = Math.max(width, 1) / 2;
    const base = anchored.map((unit) => {
      const a = unit.timeAnchor!;
      const yStart = yOf(yearToFraction(a.start));
      const yEnd = a.end != null ? yOf(yearToFraction(a.end)) : null;
      return { unit, state: states.get(unit.id) ?? 'locked', trueY: yStart, yStart, yEnd };
    });

    // Group consecutive nodes whose true positions crowd together.
    const clusters: (typeof base)[] = [];
    for (const n of base) {
      const last = clusters[clusters.length - 1];
      if (last && n.trueY - last[last.length - 1].trueY < CLUSTER_GAP) last.push(n);
      else clusters.push([n]);
    }

    const nodes: Node[] = [];
    for (const group of clusters) {
      if (group.length === 1) {
        const n = group[0];
        nodes.push({ ...n, dotX: spineX, dotY: n.trueY, hasLeader: false });
        continue;
      }
      // Spread the cluster onto two lanes (left / right of the spine), each dot
      // nudged to a legible position with a leader tick back to its true spot.
      const center = group.reduce((s, n) => s + n.trueY, 0) / group.length;
      const startY = center - ((group.length - 1) * MIN_SPACING) / 2;
      group.forEach((n, i) => {
        const right = i % 2 === 0;
        nodes.push({
          ...n,
          dotX: spineX + (right ? LANE_OFFSET : -LANE_OFFSET),
          dotY: startY + i * MIN_SPACING,
          hasLeader: true,
        });
      });
    }
    return nodes;
  }

  const spineX = $derived(Math.max(vizW, 1) / 2);
  const nodes = $derived(computeNodes($unitStates, vizW));
  const bandRects = $derived(
    BANDS.map((b, i) => ({
      y: yOf(b.fromFrac),
      h: yOf(b.toFrac) - yOf(b.fromFrac),
      alt: i % 2 === 1,
    })),
  );
  const active = $derived(nodes.find((n) => n.unit.id === activeId) ?? null);

  const stateLabel: Record<UnitState, string> = {
    completed: 'Completed',
    'in-progress': 'In progress',
    available: 'Available',
    locked: 'Locked',
  };

  function tapNode(n: Node): void {
    haptics.tick();
    activeId = activeId === n.unit.id ? null : n.unit.id;
  }

  function open(n: Node): void {
    if (!navigable(n.state)) return;
    activeId = null;
    toUnit(n.unit.id);
  }
</script>

<SubHeader title="Deep Time Line" />

<main class="app-main with-bottomnav">
  <p class="lede">
    Every anchored lesson on one scale. The bands are squeezed unequally on purpose, so the deep
    past and the first cities can share a screen.
  </p>

  <!-- Decorative visualization: pointer-tappable. The ordered list below is the accessible truth. -->
  <div class="viz" bind:clientWidth={vizW} aria-hidden="true" style="height:{H}px">
    <svg width={Math.max(vizW, 1)} height={H} viewBox="0 0 {Math.max(vizW, 1)} {H}">
      {#each bandRects as b}
        <rect class="band" class:alt={b.alt} x="0" y={b.y} width={Math.max(vizW, 1)} height={b.h} />
      {/each}
      {#each TICKS as t}
        <line class="tick" x1="0" y1={yOf(t.fraction)} x2={Math.max(vizW, 1)} y2={yOf(t.fraction)} />
      {/each}
      <line class="spine" x1={spineX} y1={TOP_PAD} x2={spineX} y2={yOf(1)} />

      {#each nodes as n (n.unit.id)}
        {#if n.hasLeader}
          <line class="leader" x1={spineX} y1={n.trueY} x2={n.dotX} y2={n.dotY} />
          <circle class="true-tick" cx={spineX} cy={n.trueY} r="2.5" />
        {/if}
        {#if n.yEnd != null}
          <rect
            class="bar {n.state}"
            x={spineX - 4}
            y={Math.min(n.yStart, n.yEnd)}
            width="8"
            height={Math.abs(n.yEnd - n.yStart)}
            rx="4"
          />
        {/if}
        <circle class="node {n.state}" cx={n.dotX} cy={n.dotY} r={DOT_R} />
      {/each}

      <circle class="today" cx={spineX} cy={yOf(1)} r="6" />
    </svg>

    <!-- Tick labels + tap targets + popover, positioned in the same pixel space. -->
    {#each TICKS as t}
      <span class="tick-label" style="top:{yOf(t.fraction)}px">{t.label}</span>
    {/each}

    {#each nodes as n (n.unit.id)}
      <button
        class="hit"
        tabindex="-1"
        aria-label={n.unit.title}
        style="left:{n.dotX}px; top:{n.dotY}px"
        onclick={() => tapNode(n)}
      ></button>
    {/each}

    {#if active}
      <div
        class="pop"
        class:below={active.dotY < 140}
        style="left:{Math.min(Math.max(active.dotX, 120), Math.max(vizW, 1) - 120)}px; top:{active.dotY}px"
      >
        <span class="pop__state {active.state}">{stateLabel[active.state]}</span>
        <strong class="pop__title">{active.unit.title}</strong>
        <span class="pop__when">{active.unit.timeAnchor?.label}</span>
        {#if navigable(active.state)}
          <button class="pop__go" onclick={() => open(active)}>
            Open unit <Icon name="arrow-right" size={15} />
          </button>
        {/if}
      </div>
    {/if}

    <span class="today-label" style="top:{yOf(1)}px">Today</span>
  </div>

  <p class="scale-note">
    Our species existed for roughly 288,000 years before Göbekli Tepe was built. That gap is about
    25 times the span from Göbekli Tepe to today.
  </p>

  <!-- Accessible source of truth. -->
  <h2 class="list-head">The anchors in order</h2>
  <ol class="list">
    {#each nodes as n (n.unit.id)}
      <li>
        {#if navigable(n.state)}
          <button class="row" onclick={() => open(n)}>
            <span class="row__dot {n.state}" aria-hidden="true"></span>
            <span class="row__main">
              <span class="row__title">{n.unit.title}</span>
              <span class="row__when">{n.unit.timeAnchor?.label}</span>
            </span>
            <span class="row__state {n.state}">{stateLabel[n.state]}</span>
            <Icon name="chevron-right" size={18} />
          </button>
        {:else}
          <div class="row row--locked">
            <span class="row__dot locked" aria-hidden="true"></span>
            <span class="row__main">
              <span class="row__title">{n.unit.title}</span>
              <span class="row__when">{n.unit.timeAnchor?.label}</span>
            </span>
            <span class="row__state locked"><Icon name="lock" size={14} /> Locked</span>
          </div>
        {/if}
      </li>
    {/each}
  </ol>
</main>

<BottomNav />

<style>
  .lede {
    margin: 0 0 var(--sp-4);
    color: var(--ink-soft);
    font-size: var(--fs-sm);
    line-height: var(--lh-body);
  }

  .viz {
    position: relative;
    width: 100%;
    margin: 0 auto var(--sp-4);
  }
  .viz svg {
    display: block;
  }

  /* SVG marks (all theme tokens; the container is aria-hidden). */
  .band {
    fill: transparent;
  }
  .band.alt {
    fill: color-mix(in srgb, var(--surface-2) 55%, transparent);
  }
  .tick {
    stroke: var(--border);
    stroke-width: 1;
    stroke-dasharray: 2 4;
  }
  .spine {
    stroke: var(--border-strong);
    stroke-width: 2;
  }
  .leader {
    stroke: var(--border-strong);
    stroke-width: 1.5;
  }
  .true-tick {
    fill: var(--border-strong);
  }
  .node {
    stroke-width: 2.5;
  }
  .node.completed {
    fill: var(--accent);
    stroke: var(--accent);
  }
  .node.in-progress {
    fill: color-mix(in srgb, var(--accent) 35%, var(--surface));
    stroke: var(--accent);
  }
  .node.available {
    fill: var(--surface);
    stroke: var(--accent-ink);
  }
  .node.locked {
    fill: var(--surface-2);
    stroke: var(--border-strong);
    opacity: 0.55;
  }
  .bar {
    opacity: 0.4;
  }
  .bar.completed {
    fill: var(--accent);
  }
  .bar.in-progress {
    fill: var(--accent);
    opacity: 0.3;
  }
  .bar.available {
    fill: var(--accent-ink);
    opacity: 0.28;
  }
  .bar.locked {
    fill: var(--border-strong);
    opacity: 0.28;
  }
  .today {
    fill: var(--accent-ink);
  }

  .tick-label {
    position: absolute;
    left: 6px;
    transform: translateY(-50%);
    padding: 1px 6px;
    background: var(--bg);
    color: var(--ink-faint);
    font-size: var(--fs-xs);
    font-weight: 600;
    letter-spacing: 0.02em;
    border-radius: var(--r-pill);
  }
  .today-label {
    position: absolute;
    right: 6px;
    transform: translateY(-50%);
    padding: 1px 8px;
    background: var(--accent-ink);
    color: var(--on-accent);
    font-size: var(--fs-xs);
    font-weight: 700;
    border-radius: var(--r-pill);
  }

  .hit {
    position: absolute;
    width: var(--tap);
    height: var(--tap);
    transform: translate(-50%, -50%);
    padding: 0;
    border: none;
    background: transparent;
    border-radius: var(--r-pill);
    cursor: pointer;
  }

  .pop {
    position: absolute;
    z-index: 2;
    transform: translate(-50%, calc(-100% - 16px));
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: max-content;
    max-width: 220px;
    padding: var(--sp-2) var(--sp-3);
    background: var(--surface);
    border: 1px solid var(--border-strong);
    border-radius: var(--r-md);
    box-shadow: var(--shadow-md);
    text-align: left;
  }
  .pop.below {
    transform: translate(-50%, 16px);
  }
  .pop__title {
    font-family: var(--font-serif);
    font-size: var(--fs-base);
    color: var(--ink);
    line-height: 1.25;
  }
  .pop__when {
    font-size: var(--fs-sm);
    color: var(--ink-soft);
  }
  .pop__state {
    align-self: flex-start;
    font-size: var(--fs-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--ink-faint);
  }
  .pop__state.completed {
    color: var(--success-ink);
  }
  .pop__go {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    align-self: flex-start;
    margin-top: 2px;
    min-height: 32px;
    padding: 2px 10px;
    color: var(--on-accent);
    background: var(--accent);
    border: none;
    border-radius: var(--r-pill);
    font-family: var(--font-sans);
    font-size: var(--fs-sm);
    font-weight: 600;
    cursor: pointer;
  }

  .scale-note {
    margin: 0 0 var(--sp-6);
    padding: var(--sp-3) var(--sp-4);
    background: var(--surface-2);
    border-radius: var(--r-md);
    color: var(--ink-soft);
    font-size: var(--fs-sm);
    line-height: var(--lh-body);
  }

  .list-head {
    margin: 0 0 var(--sp-3);
    font-family: var(--font-serif);
    font-size: var(--fs-lg);
    color: var(--ink);
  }
  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
  }
  .row {
    display: flex;
    align-items: center;
    gap: var(--sp-3);
    width: 100%;
    min-height: var(--tap);
    padding: var(--sp-2) var(--sp-3);
    text-align: left;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    color: var(--ink);
    font-family: var(--font-sans);
    cursor: pointer;
  }
  .row--locked {
    cursor: default;
    opacity: 0.7;
  }
  button.row:hover {
    border-color: var(--accent);
  }
  .row__dot {
    flex: none;
    width: 12px;
    height: 12px;
    border-radius: var(--r-pill);
    border: 2px solid var(--accent-ink);
  }
  .row__dot.completed {
    background: var(--accent);
    border-color: var(--accent);
  }
  .row__dot.available {
    background: var(--surface);
  }
  .row__dot.locked {
    background: var(--surface-2);
    border-color: var(--border-strong);
  }
  .row__main {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }
  .row__title {
    font-weight: 600;
    line-height: 1.25;
  }
  .row__when {
    font-size: var(--fs-sm);
    color: var(--ink-faint);
  }
  .row__state {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    flex: none;
    font-size: var(--fs-xs);
    font-weight: 600;
    color: var(--ink-faint);
  }
  .row__state.completed {
    color: var(--success-ink);
  }

  .today {
    animation: none;
  }
  :global(html.allow-motion) .today {
    animation: today-pulse 2.4s var(--ease-standard) infinite;
    transform-box: fill-box;
    transform-origin: center;
  }
  @keyframes today-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>
