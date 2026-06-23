<script lang="ts">
  interface Props { class?: string }
  let { class: klass = '' }: Props = $props();
</script>

<svg viewBox="0 0 380 220" class={klass} role="presentation" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
  <style>
    .gk-fade { opacity: 0; animation: gk-fade 560ms ease-out forwards; }
    .gk-rise { opacity: 0; animation: gk-rise 560ms ease-out forwards; }
    .gk-pop  { opacity: 0; animation: gk-pop 520ms ease-out forwards; transform-box: fill-box; transform-origin: center; }
    @keyframes gk-fade { to { opacity: 1; } }
    @keyframes gk-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes gk-pop  { from { opacity: 0; transform: scale(0.82); } to { opacity: 1; transform: scale(1); } }
    .gk-d1 { animation-delay: 300ms; }
    .gk-d2 { animation-delay: 380ms; }
    .gk-d3 { animation-delay: 460ms; }
    .gk-d4 { animation-delay: 540ms; }
  </style>

  <!-- ===== LEFT: T-shaped pillar + human scale ===== -->

  <!-- ground line -->
  <line class="gk-fade gk-d1" x1="18" y1="186" x2="210" y2="186" stroke="var(--ink-faint)" stroke-width="1.5" stroke-linecap="round"/>

  <!-- T-pillar: horizontal top -->
  <g class="gk-rise gk-d1">
    <rect x="44" y="36" width="86" height="22" rx="3" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="2"/>
    <!-- vertical shaft -->
    <rect x="68" y="56" width="38" height="130" rx="2" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="2"/>
  </g>

  <!-- low-relief carvings on the shaft face -->
  <g class="gk-fade gk-d3" fill="none" stroke="var(--ink-soft)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <!-- FOX (upper carving): profile animal with snout, ear, bushy tail, legs -->
    <path d="M74 84 q3 -8 12 -7 q5 0 8 3 l5 -3 q1 3 -2 5"/>
    <path d="M90 79 l1 -5 l4 3 z" fill="var(--ink-soft)"/>
    <path d="M74 84 q-5 -1 -7 -7 q2 5 4 8"/>
    <path d="M80 87 l0 6 M88 87 l0 6"/>
    <!-- SNAKE (lower carving): wavy serpent -->
    <path d="M73 118 q6 -7 12 0 t12 0 t12 0"/>
    <path d="M73 118 l-2 -3 l3 1 z" fill="var(--ink-soft)"/>
  </g>

  <!-- carving labels -->
  <text class="gk-fade gk-d3" x="118" y="84" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="10" font-weight="600" text-anchor="start">fox</text>
  <text class="gk-fade gk-d3" x="118" y="120" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="10" font-weight="600" text-anchor="start">snake</text>

  <!-- human silhouette for SCALE (clearly shorter) -->
  <g class="gk-rise gk-d2" fill="var(--ink-faint)">
    <circle cx="162" cy="146" r="6"/>
    <path d="M162 152 q-9 2 -9 16 l0 12 q0 4 4 4 l10 0 q4 0 4 -4 l0 -12 q0 -14 -9 -16 z"/>
  </g>
  <text class="gk-fade gk-d2" x="162" y="200" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="10" font-weight="600" text-anchor="middle">human (scale)</text>

  <!-- pillar caption -->
  <text class="gk-fade gk-d1" x="87" y="30" fill="var(--ink)" font-family="var(--font-sans)" font-size="11" font-weight="600" text-anchor="middle">T-pillar</text>

  <!-- ===== divider ===== -->
  <line class="gk-fade gk-d2" x1="222" y1="24" x2="222" y2="196" stroke="var(--border)" stroke-width="1" stroke-dasharray="3 4"/>

  <!-- ===== RIGHT: top-down inset of the ring enclosure ===== -->
  <g class="gk-pop gk-d3">
    <rect x="236" y="40" width="132" height="132" rx="8" fill="var(--surface)" stroke="var(--border-strong)" stroke-width="1.5"/>

    <!-- concentric rings -->
    <circle cx="302" cy="106" r="50" fill="none" stroke="var(--ink-faint)" stroke-width="1.5"/>
    <circle cx="302" cy="106" r="30" fill="none" stroke="var(--ink-faint)" stroke-width="1.5"/>
    <circle cx="302" cy="106" r="12" fill="color-mix(in srgb, var(--accent) 22%, transparent)" stroke="var(--ink-faint)" stroke-width="1.5"/>

    <!-- outer ring pillars: little T marks around the circle -->
    <g fill="none" stroke="var(--ink)" stroke-width="1.8" stroke-linecap="round">
      <path d="M302 50 l0 6 M297 50 l10 0"/>
      <path d="M337 64 l5 -4 M338 60 l6 8"/>
      <path d="M352 106 l-6 0 M352 101 l0 10"/>
      <path d="M337 148 l5 4 M338 152 l6 -8"/>
      <path d="M302 162 l0 -6 M297 162 l10 0"/>
      <path d="M267 148 l-5 4 M266 152 l-6 -8"/>
      <path d="M252 106 l6 0 M252 101 l0 10"/>
      <path d="M267 64 l-5 -4 M266 60 l-6 8"/>
    </g>

    <!-- inner ring pillars: dot marks -->
    <g fill="var(--accent-strong)">
      <circle cx="302" cy="76" r="2.4"/>
      <circle cx="323" cy="91" r="2.4"/>
      <circle cx="323" cy="121" r="2.4"/>
      <circle cx="302" cy="136" r="2.4"/>
      <circle cx="281" cy="121" r="2.4"/>
      <circle cx="281" cy="91" r="2.4"/>
    </g>

    <!-- two central twin pillars -->
    <rect x="298" y="100" width="3.5" height="12" rx="1.5" fill="var(--accent-ink)"/>
    <rect x="303" y="100" width="3.5" height="12" rx="1.5" fill="var(--accent-ink)"/>
  </g>

  <!-- inset caption -->
  <text class="gk-fade gk-d4" x="302" y="34" fill="var(--ink)" font-family="var(--font-sans)" font-size="11" font-weight="600" text-anchor="middle">ring enclosure</text>
  <text class="gk-fade gk-d4" x="302" y="190" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="9.5" font-weight="600" text-anchor="middle">top-down · concentric rings</text>
</svg>
