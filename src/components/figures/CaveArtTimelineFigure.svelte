<script lang="ts">
  interface Props { class?: string }
  let { class: klass = '' }: Props = $props();
</script>

<svg viewBox="0 0 360 200" class={klass} role="presentation" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
  <style>
    @keyframes caveFade {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes caveGrow {
      from { opacity: 0; transform: scaleX(0); }
      to   { opacity: 1; transform: scaleX(1); }
    }
    .axis  { animation: caveGrow 600ms ease-out both; transform-origin: 18px 132px; }
    .pt     { animation: caveFade 500ms ease-out both; }
    .p1 { animation-delay: 300ms; }
    .p2 { animation-delay: 400ms; }
    .p3 { animation-delay: 500ms; }
    .p4 { animation-delay: 600ms; }
  </style>

  <!-- Direction caption -->
  <text x="18" y="20" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="10" font-weight="600" text-anchor="start">older</text>
  <text x="342" y="20" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="10" font-weight="600" text-anchor="end">years ago &#8594; more recent</text>

  <!-- Baseline axis -->
  <g class="axis">
    <line x1="18" y1="132" x2="342" y2="132" stroke="var(--ink)" stroke-width="2" stroke-linecap="round" />
    <path d="M338 128 L344 132 L338 136" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <!-- Point 1: Sulawesi pig ~45,500 (oldest, far left) -->
  <g class="pt p1">
    <line x1="50" y1="126" x2="50" y2="138" stroke="var(--ink)" stroke-width="2" stroke-linecap="round" />
    <!-- pig icon -->
    <g transform="translate(50,92)" fill="none" stroke="var(--ink-soft)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="0" cy="2" rx="13" ry="8" />
      <path d="M9 -2 q6 -1 8 3 q-3 3 -7 2" />
      <circle cx="14" cy="1" r="0.9" fill="var(--ink-soft)" stroke="none" />
      <path d="M2 -6 l3 -3 M5 -6 l3 -3" />
      <path d="M-7 9 v4 M-1 10 v4 M4 10 v4 M9 9 v4" />
      <path d="M-13 2 q-3 0 -3 2" />
    </g>
    <text x="50" y="154" fill="var(--ink)" font-family="var(--font-sans)" font-size="10" font-weight="600" text-anchor="middle">Sulawesi pig</text>
    <text x="50" y="167" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="10" font-weight="600" text-anchor="middle">~45,500</text>
  </g>

  <!-- Point 2: El Castillo, Spain ~40,800 -->
  <g class="pt p2">
    <line x1="130" y1="126" x2="130" y2="138" stroke="var(--ink)" stroke-width="2" stroke-linecap="round" />
    <!-- hand stencil icon -->
    <g transform="translate(130,92)" fill="none" stroke="var(--ink-soft)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M-6 12 v-9 M-2 12 v-13 M2 12 v-14 M6 12 v-11 M9 12 v-6
               M-6 3 q-3 1 -3 5 M9 12 q3 -1 3 -5 l-1 -2
               M-6 12 q0 3 7 3 q8 0 8 -3" />
    </g>
    <text x="130" y="154" fill="var(--ink)" font-family="var(--font-sans)" font-size="10" font-weight="600" text-anchor="middle">El Castillo, Spain</text>
    <text x="130" y="167" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="10" font-weight="600" text-anchor="middle">~40,800</text>
  </g>

  <!-- Point 3: Chauvet ~36,000 -->
  <g class="pt p3">
    <line x1="210" y1="126" x2="210" y2="138" stroke="var(--ink)" stroke-width="2" stroke-linecap="round" />
    <!-- horse/rhino icon -->
    <g transform="translate(210,94)" fill="none" stroke="var(--ink-soft)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M-14 0 q-3 -6 2 -8 q3 -6 9 -5 q7 0 11 5 q4 1 4 4" />
      <path d="M12 -4 q3 1 4 4" />
      <path d="M-12 0 q-2 8 1 12 M-4 2 q-1 8 1 11 M6 2 q1 8 3 10 M13 0 q2 7 1 11" />
      <path d="M-7 -4 q3 -2 8 0" />
      <circle cx="12" cy="-2" r="0.8" fill="var(--ink-soft)" stroke="none" />
    </g>
    <text x="210" y="154" fill="var(--ink)" font-family="var(--font-sans)" font-size="10" font-weight="600" text-anchor="middle">Chauvet</text>
    <text x="210" y="167" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="10" font-weight="600" text-anchor="middle">~36,000</text>
  </g>

  <!-- Point 4: Lascaux ~17,000 (most recent, accent) -->
  <g class="pt p4">
    <line x1="300" y1="126" x2="300" y2="138" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" />
    <circle cx="300" cy="132" r="3" fill="var(--accent)" />
    <!-- bull icon -->
    <g transform="translate(300,94)" fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M-14 2 q-2 -7 4 -9 q5 -5 12 -3 q6 1 9 6 q3 1 2 4" />
      <path d="M-12 -7 q-6 -4 -9 -1 q4 2 7 4" />
      <path d="M-2 -9 q5 -5 10 -3 q-3 4 -7 4" />
      <path d="M-11 2 q-1 8 2 12 M-3 4 q-1 7 1 10 M6 3 q1 7 2 10 M14 2 q1 6 0 10" />
      <circle cx="13" cy="-1" r="0.8" fill="var(--accent)" stroke="none" />
    </g>
    <text x="300" y="154" fill="var(--accent-strong)" font-family="var(--font-sans)" font-size="10" font-weight="600" text-anchor="middle">Lascaux</text>
    <text x="300" y="167" fill="var(--accent)" font-family="var(--font-sans)" font-size="10" font-weight="600" text-anchor="middle">~17,000</text>
  </g>

  <!-- Footnote -->
  <text x="180" y="190" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="9" font-weight="600" text-anchor="middle">cave art, dated in years ago</text>
</svg>
