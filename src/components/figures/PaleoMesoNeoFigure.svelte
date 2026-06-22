<script lang="ts">
  interface Props { class?: string }
  let { class: klass = '' }: Props = $props();
</script>

<svg
  viewBox="0 0 360 220"
  class={klass}
  role="presentation"
  xmlns="http://www.w3.org/2000/svg"
  style="width:100%;height:auto;display:block"
>
  <!-- panel background -->
  <rect x="0.5" y="0.5" width="359" height="219" rx="10" fill="var(--surface)" stroke="var(--border)" />

  <!-- row label band -->
  <rect x="6" y="44" width="78" height="170" rx="6" fill="var(--surface-2)" />

  <!-- column headers -->
  <g class="col col1">
    <text x="128" y="24" text-anchor="middle" fill="var(--accent)" font-family="var(--font-sans)" font-size="12" font-weight="600">PALAEO-</text>
    <text x="128" y="37" text-anchor="middle" fill="var(--accent)" font-family="var(--font-sans)" font-size="12" font-weight="600">LITHIC</text>
  </g>
  <g class="col col2">
    <text x="220" y="24" text-anchor="middle" fill="var(--accent)" font-family="var(--font-sans)" font-size="12" font-weight="600">MESO-</text>
    <text x="220" y="37" text-anchor="middle" fill="var(--accent)" font-family="var(--font-sans)" font-size="12" font-weight="600">LITHIC</text>
  </g>
  <g class="col col3">
    <text x="312" y="24" text-anchor="middle" fill="var(--accent)" font-family="var(--font-sans)" font-size="12" font-weight="600">NEO-</text>
    <text x="312" y="37" text-anchor="middle" fill="var(--accent)" font-family="var(--font-sans)" font-size="12" font-weight="600">LITHIC</text>
  </g>

  <!-- header underline -->
  <line x1="10" y1="44" x2="350" y2="44" stroke="var(--accent)" stroke-width="1.5" />

  <!-- row separators -->
  <line x1="10" y1="100" x2="350" y2="100" stroke="var(--border)" stroke-width="1" />
  <line x1="10" y1="157" x2="350" y2="157" stroke="var(--border)" stroke-width="1" />

  <!-- column dividers -->
  <line x1="174" y1="44" x2="174" y2="214" stroke="var(--border)" stroke-width="1" />
  <line x1="266" y1="44" x2="266" y2="214" stroke="var(--border)" stroke-width="1" />

  <!-- ROW LABELS -->
  <text class="rowlab r1" x="45" y="76" text-anchor="middle" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="11" font-weight="600">Stone</text>
  <text class="rowlab r1" x="45" y="88" text-anchor="middle" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="11" font-weight="600">working</text>
  <text class="rowlab r2" x="45" y="134" text-anchor="middle" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="11" font-weight="600">Food</text>
  <text class="rowlab r3" x="45" y="189" text-anchor="middle" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="11" font-weight="600">Living</text>

  <!-- ============ COLUMN 1: PALAEOLITHIC ============ -->
  <g class="col col1">
    <!-- Stone working: chipped (rough flake) -->
    <g class="glyph">
      <polygon points="120,62 134,60 138,72 128,80 117,74" fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-linejoin="round" />
      <polyline points="120,62 126,68 117,74" fill="none" stroke="var(--ink)" stroke-width="1" />
      <polyline points="138,72 130,70 128,80" fill="none" stroke="var(--ink)" stroke-width="1" />
    </g>
    <text x="128" y="93" text-anchor="middle" fill="var(--ink)" font-family="var(--font-sans)" font-size="11">chipped</text>

    <!-- Food: hunt-gather (spear) -->
    <g class="glyph">
      <line x1="118" y1="130" x2="138" y2="116" stroke="var(--ink)" stroke-width="1.5" />
      <polygon points="138,116 132,117 137,122" fill="var(--ink)" />
    </g>
    <text x="128" y="146" text-anchor="middle" fill="var(--ink)" font-family="var(--font-sans)" font-size="11">hunt-gather</text>

    <!-- Living: mobile bands (tent) -->
    <g class="glyph">
      <polygon points="128,172 138,188 118,188" fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-linejoin="round" />
      <line x1="128" y1="172" x2="128" y2="188" stroke="var(--ink)" stroke-width="1" />
    </g>
    <text x="128" y="201" text-anchor="middle" fill="var(--ink)" font-family="var(--font-sans)" font-size="11">mobile bands</text>
  </g>

  <!-- ============ COLUMN 2: MESOLITHIC ============ -->
  <g class="col col2">
    <!-- Stone working: fine small blades (microliths) -->
    <g class="glyph">
      <polygon points="208,64 214,62 215,76 209,78" fill="none" stroke="var(--ink)" stroke-width="1.3" stroke-linejoin="round" />
      <polygon points="220,62 226,64 224,78 218,76" fill="none" stroke="var(--ink)" stroke-width="1.3" stroke-linejoin="round" />
      <polygon points="230,64 236,62 237,76 231,77" fill="none" stroke="var(--ink)" stroke-width="1.3" stroke-linejoin="round" />
    </g>
    <text x="220" y="91" text-anchor="middle" fill="var(--ink)" font-family="var(--font-sans)" font-size="11">fine small blades</text>
    <text x="220" y="103" text-anchor="middle" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="10">(microliths)</text>

    <!-- Food: broad-spectrum foraging (berries + fish) -->
    <g class="glyph">
      <circle cx="214" cy="120" r="3.2" fill="none" stroke="var(--ink)" stroke-width="1.3" />
      <circle cx="220" cy="125" r="3.2" fill="none" stroke="var(--ink)" stroke-width="1.3" />
      <ellipse cx="229" cy="121" rx="5" ry="3" fill="none" stroke="var(--ink)" stroke-width="1.3" />
      <path d="M234,121 l4,-2 v4 z" fill="var(--ink)" />
    </g>
    <text x="220" y="140" text-anchor="middle" fill="var(--ink)" font-family="var(--font-sans)" font-size="11">broad-spectrum</text>
    <text x="220" y="152" text-anchor="middle" fill="var(--ink)" font-family="var(--font-sans)" font-size="11">foraging</text>

    <!-- Living: mobile camps (two small tents) -->
    <g class="glyph">
      <polygon points="214,174 222,186 206,186" fill="none" stroke="var(--ink)" stroke-width="1.3" stroke-linejoin="round" />
      <polygon points="230,176 236,186 224,186" fill="none" stroke="var(--ink)" stroke-width="1.3" stroke-linejoin="round" />
    </g>
    <text x="220" y="201" text-anchor="middle" fill="var(--ink)" font-family="var(--font-sans)" font-size="11">mobile camps</text>
  </g>

  <!-- ============ COLUMN 3: NEOLITHIC ============ -->
  <g class="col col3">
    <!-- Stone working: ground & polished (smooth axe head) -->
    <g class="glyph">
      <path d="M305,62 q8,-2 13,4 q4,6 -2,12 q-7,4 -12,-2 q-4,-7 1,-14 z" fill="color-mix(in srgb, var(--accent) 22%, transparent)" stroke="var(--ink)" stroke-width="1.5" stroke-linejoin="round" />
    </g>
    <text x="312" y="93" text-anchor="middle" fill="var(--ink)" font-family="var(--font-sans)" font-size="11">ground &amp;</text>
    <text x="312" y="105" text-anchor="middle" fill="var(--ink)" font-family="var(--font-sans)" font-size="11">polished</text>

    <!-- Food: farming (sprout) -->
    <g class="glyph">
      <line x1="312" y1="116" x2="312" y2="130" stroke="var(--ink)" stroke-width="1.5" />
      <path d="M312,124 q-7,-1 -9,-8 q7,-1 9,8 z" fill="var(--success)" stroke="var(--ink)" stroke-width="1" stroke-linejoin="round" />
      <path d="M312,121 q7,-2 9,-9 q-7,1 -9,9 z" fill="var(--success)" stroke="var(--ink)" stroke-width="1" stroke-linejoin="round" />
    </g>
    <text x="312" y="146" text-anchor="middle" fill="var(--ink)" font-family="var(--font-sans)" font-size="11">farming</text>

    <!-- Living: settled villages (house) -->
    <g class="glyph">
      <rect x="305" y="178" width="14" height="10" fill="none" stroke="var(--ink)" stroke-width="1.4" />
      <polygon points="304,178 312,170 320,178" fill="none" stroke="var(--ink)" stroke-width="1.4" stroke-linejoin="round" />
    </g>
    <text x="312" y="201" text-anchor="middle" fill="var(--ink)" font-family="var(--font-sans)" font-size="11">settled</text>
    <text x="312" y="213" text-anchor="middle" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="10">villages</text>
  </g>

  <style>
    .col {
      opacity: 0;
      animation: colIn 480ms ease-out forwards;
    }
    .col1 { animation-delay: 80ms; }
    .col2 { animation-delay: 220ms; }
    .col3 { animation-delay: 360ms; }

    .rowlab {
      opacity: 0;
      animation: rowIn 420ms ease-out forwards;
    }
    .r1 { animation-delay: 120ms; }
    .r2 { animation-delay: 200ms; }
    .r3 { animation-delay: 280ms; }

    @keyframes colIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes rowIn {
      from { opacity: 0; transform: translateX(-6px); }
      to   { opacity: 1; transform: translateX(0); }
    }
  </style>
</svg>
