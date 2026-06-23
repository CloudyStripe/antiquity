<script lang="ts">
  interface Props { class?: string }
  let { class: klass = '' }: Props = $props();
</script>

<svg viewBox="0 0 360 220" class={klass} role="presentation" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
  <style>
    .oa-land { animation: oa-land-in 600ms ease-out both; }
    .oa-d1 { animation-delay: 300ms; }
    .oa-d2 { animation-delay: 380ms; }
    .oa-d3 { animation-delay: 460ms; }
    .oa-star { animation: oa-pop 600ms ease-out both; animation-delay: 520ms; transform-box: fill-box; transform-origin: center; }
    .oa-arrow { animation: oa-draw 600ms ease-out both; }
    .oa-a1 { animation-delay: 600ms; }
    .oa-a2 { animation-delay: 760ms; }
    .oa-a3 { animation-delay: 920ms; }
    .oa-a4 { animation-delay: 1100ms; }
    @keyframes oa-land-in {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes oa-pop {
      from { opacity: 0; transform: scale(0.5); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes oa-draw {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>

  <!-- ============ LANDMASSES (schematic blobs) ============ -->
  <!-- Americas -->
  <path class="oa-land oa-d1" d="M50 60 C40 70 44 86 54 92 C48 104 58 120 66 132 C60 150 70 168 82 176 C90 162 78 150 84 138 C92 130 86 116 92 104 C84 92 88 78 78 70 C72 60 60 54 50 60 Z"
    fill="var(--surface-2)" stroke="var(--border)" stroke-width="1.2"/>

  <!-- Europe -->
  <path class="oa-land oa-d2" d="M168 64 C160 60 152 66 154 74 C148 78 152 88 162 88 C170 92 182 88 186 80 C192 74 184 64 176 64 Z"
    fill="var(--surface-2)" stroke="var(--border)" stroke-width="1.2"/>

  <!-- Asia -->
  <path class="oa-land oa-d2" d="M196 70 C188 64 192 56 204 56 C228 50 270 54 296 66 C312 70 320 82 312 92 C300 100 280 98 262 96 C244 102 222 100 206 92 C194 88 192 78 196 70 Z"
    fill="var(--surface-2)" stroke="var(--border)" stroke-width="1.2"/>

  <!-- Africa -->
  <path class="oa-land oa-d1" d="M168 96 C160 92 156 102 160 110 C156 122 166 136 174 144 C176 156 188 162 196 156 C204 150 200 138 204 128 C212 120 210 106 200 100 C190 94 178 92 168 96 Z"
    fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.4"/>

  <!-- Australia -->
  <path class="oa-land oa-d3" d="M292 150 C284 146 276 152 280 160 C286 170 302 172 312 166 C320 160 312 150 302 150 Z"
    fill="var(--surface-2)" stroke="var(--border)" stroke-width="1.2"/>

  <!-- ============ ORIGIN STAR over NE Africa ============ -->
  <g class="oa-star">
    <path d="M178 104 l3.2 6.6 7.2 1 -5.2 5.1 1.2 7.2 -6.4 -3.4 -6.4 3.4 1.2 -7.2 -5.2 -5.1 7.2 -1 Z"
      fill="var(--accent-strong)" stroke="var(--accent-strong)" stroke-width="0.6"/>
  </g>

  <!-- ============ DISPERSAL ARROWS ============ -->
  <defs>
    <marker id="oa-head" markerWidth="7" markerHeight="7" refX="5.4" refY="3" orient="auto">
      <path d="M0 0 L6 3 L0 6 Z" fill="var(--accent)"/>
    </marker>
    <marker id="oa-head-faint" markerWidth="7" markerHeight="7" refX="5.4" refY="3" orient="auto">
      <path d="M0 0 L6 3 L0 6 Z" fill="var(--accent)" opacity="0.55"/>
    </marker>
  </defs>

  <!-- main trunk leaving Africa -->
  <path class="oa-arrow oa-a1" d="M180 112 C176 96 178 84 188 78"
    fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" marker-end="url(#oa-head)"/>

  <!-- branch into Europe -->
  <path class="oa-arrow oa-a2" d="M188 80 C182 72 176 70 172 74"
    fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" marker-end="url(#oa-head)"/>

  <!-- across Asia to Australia -->
  <path class="oa-arrow oa-a3" d="M190 80 C228 70 278 88 296 148"
    fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" marker-end="url(#oa-head)"/>

  <!-- later FAINT dashed branch to the Americas -->
  <path class="oa-arrow oa-a4" d="M300 70 C260 40 130 36 92 80"
    fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-dasharray="5 4" opacity="0.55" marker-end="url(#oa-head-faint)"/>

  <!-- ============ LABELS ============ -->
  <!-- origin -->
  <text class="oa-arrow oa-a1" x="152" y="170" text-anchor="middle" fill="var(--ink)" font-family="var(--font-sans)" font-size="10" font-weight="600">Homo sapiens</text>
  <text class="oa-arrow oa-a1" x="152" y="182" text-anchor="middle" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="9" font-weight="600">~300,000 yrs</text>

  <!-- out of africa timing -->
  <text class="oa-arrow oa-a1" x="246" y="124" text-anchor="middle" fill="var(--accent-ink)" font-family="var(--font-sans)" font-size="9.5" font-weight="600">~60–70k years ago</text>

  <!-- Europe -->
  <text class="oa-land oa-d2" x="168" y="58" text-anchor="middle" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="9" font-weight="600">Europe</text>

  <!-- Asia -->
  <text class="oa-land oa-d2" x="262" y="78" text-anchor="middle" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="9" font-weight="600">Asia</text>

  <!-- Africa -->
  <text class="oa-land oa-d1" x="182" y="138" text-anchor="middle" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="9" font-weight="600">Africa</text>

  <!-- Australia + ~50k branch label -->
  <text class="oa-arrow oa-a3" x="296" y="186" text-anchor="middle" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="9" font-weight="600">Australia</text>
  <text class="oa-arrow oa-a3" x="298" y="144" text-anchor="middle" fill="var(--accent-ink)" font-family="var(--font-sans)" font-size="9.5" font-weight="600">~50k</text>

  <!-- Americas (faint, last) -->
  <text class="oa-land oa-d1" x="66" y="46" text-anchor="middle" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="9" font-weight="600">Americas</text>
  <text class="oa-arrow oa-a4" x="66" y="192" text-anchor="middle" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="9" font-weight="600" font-style="italic">later · reached last</text>
</svg>
