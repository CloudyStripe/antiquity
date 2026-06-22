<script lang="ts">
  interface Props { class?: string }
  let { class: klass = '' }: Props = $props();
</script>

<svg
  viewBox="0 0 376 200"
  class={klass}
  role="presentation"
  xmlns="http://www.w3.org/2000/svg"
  style="width:100%;height:auto;display:block"
>
  <!-- The long bar: foragers (shaded) on the left, recent sliver on the right -->
  <!-- Bar geometry: x 20 -> 340 (width 320), y 92, height 28 -->
  <g class="bar">
    <!-- shaded forager portion: leftmost ~95% -->
    <rect class="forager" x="20" y="92" width="304" height="28" fill="var(--surface-2)" />
    <!-- recent sliver (rightmost ~5%) -->
    <rect class="recent" x="324" y="92" width="16" height="28" fill="var(--surface)" />
    <!-- ancient-history bracket highlight at far right edge -->
    <rect
      class="ancientband"
      x="334"
      y="92"
      width="6"
      height="28"
      fill="color-mix(in srgb, var(--accent) 35%, transparent)"
    />
    <!-- bar outline -->
    <rect
      class="frame"
      x="20"
      y="92"
      width="320"
      height="28"
      fill="none"
      stroke="var(--border-strong)"
      stroke-width="1.2"
    />
  </g>

  <!-- centered label inside forager region -->
  <text
    class="lbl forager-lbl"
    x="172"
    y="110"
    text-anchor="middle"
    dominant-baseline="middle"
    fill="var(--ink-soft)"
    font-family="var(--font-sans)"
    font-size="12"
    font-weight="600"
  >foragers, no writing</text>

  <!-- axis labels -->
  <text
    class="axis ax-left"
    x="20"
    y="138"
    text-anchor="start"
    fill="var(--ink-faint)"
    font-family="var(--font-sans)"
    font-size="11"
  >300,000 years ago</text>
  <text
    class="axis ax-right"
    x="340"
    y="138"
    text-anchor="end"
    fill="var(--ink-faint)"
    font-family="var(--font-sans)"
    font-size="11"
  >today</text>

  <!-- Farming tick ~12,000 yrs ago : near right end, label above -->
  <g class="tick tick-farm">
    <line x1="318" y1="74" x2="318" y2="92" stroke="var(--ink)" stroke-width="1.2" />
    <text
      x="318"
      y="68"
      text-anchor="middle"
      fill="var(--ink)"
      font-family="var(--font-sans)"
      font-size="11"
      font-weight="600"
    >Farming</text>
    <text
      x="318"
      y="56"
      text-anchor="middle"
      fill="var(--ink-soft)"
      font-family="var(--font-sans)"
      font-size="10"
    >~12,000 yrs ago</text>
  </g>

  <!-- Writing tick ~5,000 yrs ago : closer to right, label below -->
  <g class="tick tick-write">
    <line x1="330" y1="120" x2="330" y2="140" stroke="var(--ink)" stroke-width="1.2" />
    <text
      x="322"
      y="153"
      text-anchor="middle"
      fill="var(--ink)"
      font-family="var(--font-sans)"
      font-size="11"
      font-weight="600"
    >Writing</text>
    <text
      x="322"
      y="165"
      text-anchor="middle"
      fill="var(--ink-soft)"
      font-family="var(--font-sans)"
      font-size="10"
    >~5,000 yrs ago</text>
  </g>

  <!-- Ancient history bracket at far right edge -->
  <g class="tick tick-anc">
    <!-- bracket spanning the highlighted region, above the bar -->
    <path
      d="M334 86 L334 80 L340 80 L340 86"
      fill="none"
      stroke="var(--accent-strong)"
      stroke-width="1.4"
    />
    <line x1="337" y1="80" x2="337" y2="74" stroke="var(--accent-strong)" stroke-width="1.4" />
    <text
      x="343"
      y="34"
      text-anchor="end"
      fill="var(--accent-ink)"
      font-family="var(--font-sans)"
      font-size="11"
      font-weight="600"
    >Ancient</text>
    <text
      x="343"
      y="46"
      text-anchor="end"
      fill="var(--accent-ink)"
      font-family="var(--font-sans)"
      font-size="11"
      font-weight="600"
    >history</text>
    <!-- connector from label to bracket -->
    <line x1="337" y1="74" x2="337" y2="52" stroke="var(--accent)" stroke-width="1" stroke-dasharray="2 2" />
  </g>

  <!-- summarizing caption -->
  <text
    class="caption"
    x="188"
    y="188"
    text-anchor="middle"
    fill="var(--ink-faint)"
    font-family="var(--font-sans)"
    font-size="11"
  >Farming, writing &amp; ancient history fit in the final sliver.</text>

  <style>
    .bar rect.forager,
    .bar rect.recent,
    .bar rect.ancientband {
      transform-box: fill-box;
      transform-origin: left center;
      animation: wipe 520ms ease-out both;
    }
    .bar rect.frame {
      transform-box: fill-box;
      transform-origin: left center;
      animation: wipe 560ms ease-out both;
    }
    .forager-lbl {
      animation: fade-up 420ms ease-out both;
      animation-delay: 360ms;
    }
    .axis {
      animation: fade-up 380ms ease-out both;
      animation-delay: 420ms;
    }
    .tick {
      animation: fade-up 420ms ease-out both;
    }
    .tick-farm { animation-delay: 460ms; }
    .tick-write { animation-delay: 540ms; }
    .tick-anc { animation-delay: 620ms; }
    .caption {
      animation: fade-up 420ms ease-out both;
      animation-delay: 700ms;
    }

    @keyframes wipe {
      from { transform: scaleX(0); opacity: 0.4; }
      to { transform: scaleX(1); opacity: 1; }
    }
    @keyframes fade-up {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</svg>
