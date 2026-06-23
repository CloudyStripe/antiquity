<script lang="ts">
  interface Props { class?: string }
  let { class: klass = '' }: Props = $props();
</script>

<svg viewBox="0 0 380 230" class={klass} role="presentation" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
  <style>
    @keyframes shp-in {
      from { opacity: 0; transform: translateY(6px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes shp-draw {
      from { opacity: 0; transform: translateX(-6px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .shp-p1 { animation: shp-in 600ms ease-out both; animation-delay: 300ms; transform-box: fill-box; transform-origin: center; }
    .shp-p2 { animation: shp-in 600ms ease-out both; animation-delay: 420ms; transform-box: fill-box; transform-origin: center; }
    .shp-p3 { animation: shp-in 600ms ease-out both; animation-delay: 540ms; transform-box: fill-box; transform-origin: center; }
    .shp-map { animation: shp-in 600ms ease-out both; animation-delay: 480ms; transform-box: fill-box; transform-origin: center; }
    .shp-arrow { animation: shp-draw 600ms ease-out both; animation-delay: 640ms; transform-box: fill-box; transform-origin: center; }
  </style>

  <!-- ============ LEFT: three-step build sequence ============ -->

  <!-- Panel 1: ~3000 BCE ditch-and-bank ring -->
  <g class="shp-p1">
    <rect x="8" y="14" width="70" height="62" rx="6" fill="var(--surface)" stroke="var(--border)" stroke-width="1"/>
    <circle cx="43" cy="42" r="22" fill="none" stroke="var(--ink-soft)" stroke-width="2"/>
    <circle cx="43" cy="42" r="15" fill="none" stroke="var(--ink-faint)" stroke-width="1.5" stroke-dasharray="3 3"/>
    <text x="43" y="71" text-anchor="middle" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="9" font-weight="600">~3000 BCE</text>
  </g>

  <!-- Panel 2: ~2500 BCE sarsen circle with trilithons -->
  <g class="shp-p2">
    <rect x="86" y="14" width="70" height="62" rx="6" fill="var(--surface)" stroke="var(--border)" stroke-width="1"/>
    <ellipse cx="121" cy="42" rx="24" ry="14" fill="none" stroke="var(--ink-faint)" stroke-width="1" stroke-dasharray="2 3"/>
    <!-- front trilithon: two uprights + lintel -->
    <rect x="110" y="34" width="5" height="16" rx="1" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.3"/>
    <rect x="127" y="34" width="5" height="16" rx="1" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.3"/>
    <rect x="108" y="29" width="26" height="5" rx="1" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.3"/>
    <!-- side stones in ring -->
    <rect x="96" y="38" width="4" height="11" rx="1" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.1"/>
    <rect x="142" y="38" width="4" height="11" rx="1" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.1"/>
    <rect x="106" y="48" width="4" height="9" rx="1" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.1"/>
    <rect x="132" y="48" width="4" height="9" rx="1" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.1"/>
    <text x="121" y="71" text-anchor="middle" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="9" font-weight="600">~2500 BCE</text>
  </g>

  <!-- Panel 3: later rearrangement -->
  <g class="shp-p3">
    <rect x="164" y="14" width="70" height="62" rx="6" fill="var(--surface)" stroke="var(--border)" stroke-width="1"/>
    <ellipse cx="199" cy="42" rx="24" ry="14" fill="none" stroke="var(--ink-faint)" stroke-width="1" stroke-dasharray="2 3"/>
    <!-- trilithon shifted, horseshoe-like rearrangement -->
    <rect x="190" y="32" width="5" height="16" rx="1" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.3"/>
    <rect x="205" y="36" width="5" height="16" rx="1" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.3"/>
    <rect x="188" y="27" width="24" height="5" rx="1" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.3" transform="rotate(7 200 29.5)"/>
    <rect x="183" y="45" width="4" height="10" rx="1" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.1"/>
    <rect x="213" y="43" width="4" height="10" rx="1" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.1"/>
    <rect x="198" y="50" width="4" height="8" rx="1" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.1"/>
    <text x="199" y="71" text-anchor="middle" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="9" font-weight="600">later</text>
  </g>

  <!-- connectors between panels -->
  <g class="shp-p3">
    <path d="M78 42 L86 42" fill="none" stroke="var(--ink-faint)" stroke-width="1.2" marker-end="url(#shp-tip)"/>
    <path d="M156 42 L164 42" fill="none" stroke="var(--ink-faint)" stroke-width="1.2" marker-end="url(#shp-tip)"/>
  </g>

  <defs>
    <marker id="shp-tip" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0 0 L6 3 L0 6 Z" fill="var(--ink-faint)"/>
    </marker>
    <marker id="shp-arrowtip" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)"/>
    </marker>
  </defs>

  <!-- ============ RIGHT: map of Britain + bluestone journey ============ -->
  <g class="shp-map">
    <!-- simple Britain outline -->
    <path d="M300 96
             C293 92 290 100 294 106
             C288 110 292 118 297 117
             C294 124 300 131 305 128
             C302 138 311 144 314 137
             C314 150 322 154 324 146
             C331 152 340 148 337 140
             C346 140 350 132 343 128
             C351 124 348 114 341 116
             C346 109 340 101 334 105
             C336 96 328 90 323 95
             C322 87 312 88 311 95
             C306 90 299 91 300 96 Z"
          fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.5" stroke-linejoin="round"/>

    <!-- Preseli Hills (Wales) dot -->
    <circle cx="306" cy="123" r="3" fill="var(--accent)" stroke="var(--surface)" stroke-width="1"/>
    <!-- Salisbury Plain dot -->
    <circle cx="333" cy="135" r="3" fill="var(--ink)" stroke="var(--surface)" stroke-width="1"/>
  </g>

  <!-- journey arrow -->
  <g class="shp-arrow">
    <path d="M308 121 C318 110 330 116 332 131" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" marker-end="url(#shp-arrowtip)"/>
  </g>

  <!-- map labels -->
  <g class="shp-map">
    <text x="306" y="160" text-anchor="middle" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="9" font-weight="600">Preseli Hills</text>
    <text x="306" y="170" text-anchor="middle" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="8.5" font-weight="600">(Wales)</text>
    <text x="333" y="186" text-anchor="middle" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="9" font-weight="600">Salisbury Plain</text>
  </g>

  <!-- caption strip -->
  <g class="shp-arrow">
    <text x="121" y="100" text-anchor="middle" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="9.5" font-weight="600">Phased build over centuries</text>
    <text x="306" y="86" text-anchor="middle" fill="var(--accent-strong)" font-family="var(--font-sans)" font-size="9.5" font-weight="600">bluestones, ~225 km</text>
  </g>
</svg>
