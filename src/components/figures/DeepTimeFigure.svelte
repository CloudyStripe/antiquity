<script lang="ts">
  interface Props { class?: string }
  let { class: klass = '' }: Props = $props();
</script>

<svg
  viewBox="0 0 360 208"
  class={klass}
  role="presentation"
  xmlns="http://www.w3.org/2000/svg"
  style="width:100%;height:auto;display:block"
>
  <!-- ROW 1: the full 300,000-year bar — almost all of it prehistory -->
  <g class="row-top">
    <rect x="24" y="34" width="312" height="22" fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.1" />
    <!-- the tiny recent sliver at the far right -->
    <rect x="330" y="34" width="6" height="22" fill="var(--accent)" />
    <text x="177" y="49" text-anchor="middle" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="11" font-weight="600">foragers, no writing</text>
    <text x="24" y="72" text-anchor="start" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="10">300,000 years ago</text>
    <text x="336" y="72" text-anchor="end" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="10">now</text>
  </g>

  <!-- magnifier: the final sliver fans out into the zoomed bar below -->
  <g class="zoom">
    <polygon points="330,56 336,56 336,116 24,116" fill="color-mix(in srgb, var(--accent) 7%, transparent)" />
    <line x1="330" y1="56" x2="24" y2="116" stroke="var(--accent)" stroke-width="1" stroke-dasharray="3 3" opacity="0.7" />
    <line x1="336" y1="56" x2="336" y2="116" stroke="var(--accent)" stroke-width="1" stroke-dasharray="3 3" opacity="0.7" />
    <text x="180" y="110" text-anchor="middle" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="10" font-style="italic">the final sliver, up close</text>
  </g>

  <!-- ROW 2: the last ~13,000 years, magnified, with room to breathe -->
  <g class="row-zoom">
    <rect x="24" y="118" width="312" height="24" fill="var(--surface)" stroke="var(--border-strong)" stroke-width="1.1" />
    <!-- ancient-history band (writing -> ~1,500 yrs ago) -->
    <rect x="216" y="118" width="84" height="24" fill="color-mix(in srgb, var(--accent) 30%, transparent)" />
    <text x="258" y="134" text-anchor="middle" fill="var(--accent-ink)" font-family="var(--font-sans)" font-size="9" font-weight="700">Ancient history</text>

    <!-- Farming tick -->
    <line x1="48" y1="118" x2="48" y2="150" stroke="var(--ink)" stroke-width="1.2" />
    <text x="48" y="165" text-anchor="middle" fill="var(--ink)" font-family="var(--font-sans)" font-size="11" font-weight="600">Farming</text>
    <text x="48" y="178" text-anchor="middle" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="9.5">~12,000 yrs ago</text>

    <!-- Writing tick -->
    <line x1="216" y1="118" x2="216" y2="150" stroke="var(--ink)" stroke-width="1.2" />
    <text x="216" y="165" text-anchor="middle" fill="var(--ink)" font-family="var(--font-sans)" font-size="11" font-weight="600">Writing</text>
    <text x="216" y="178" text-anchor="middle" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="9.5">~5,000 yrs ago</text>

    <text x="336" y="165" text-anchor="end" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="10">today</text>
    <text x="180" y="198" text-anchor="middle" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="9.5" font-style="italic">the last ~13,000 years</text>
  </g>

  <style>
    .row-top { animation: dt-rise 460ms ease-out both; }
    .zoom { animation: dt-fade 520ms ease-out both; animation-delay: 320ms; }
    .row-zoom { animation: dt-rise 480ms ease-out both; animation-delay: 440ms; }
    @keyframes dt-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes dt-fade { from { opacity: 0; } to { opacity: 1; } }
  </style>
</svg>
