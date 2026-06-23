<script lang="ts">
  interface Props { class?: string }
  let { class: klass = '' }: Props = $props();
</script>

<svg viewBox="0 0 360 220" class={klass} role="presentation" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
  <style>
    .fig-in { opacity: 0; animation: fig-in 520ms ease-out forwards; }
    @keyframes fig-in {
      from { opacity: 0; transform: translateY(6px) scale(0.985); }
      to   { opacity: 1; transform: translateY(0)    scale(1); }
    }
    .d1 { animation-delay: 300ms; }
    .d2 { animation-delay: 380ms; }
    .d3 { animation-delay: 440ms; }
    .d4 { animation-delay: 500ms; }
    .d5 { animation-delay: 560ms; }
  </style>

  <!-- ===== CLAY TABLET ===== -->
  <g class="fig-in d1">
    <rect x="22" y="32" width="206" height="150" rx="22" ry="22"
          fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="2.5"/>
    <!-- inner bevel -->
    <rect x="32" y="42" width="186" height="130" rx="15" ry="15"
          fill="none" stroke="var(--border)" stroke-width="1"/>

    <!-- grid dividing the tablet into cells -->
    <line x1="125" y1="48" x2="125" y2="166" stroke="var(--border-strong)" stroke-width="1.5"/>
    <line x1="38"  y1="107" x2="212" y2="107" stroke="var(--border-strong)" stroke-width="1.5"/>
  </g>

  <!-- ===== NUMERAL CLUSTER (top-left cell): wedges + round measure marks ===== -->
  <g class="fig-in d2" fill="var(--ink)" stroke="var(--ink)">
    <!-- impressed round "measure" pits -->
    <circle cx="58" cy="66" r="4.2" fill="none" stroke-width="2"/>
    <circle cx="74" cy="66" r="4.2" fill="none" stroke-width="2"/>
    <circle cx="90" cy="66" r="4.2" fill="none" stroke-width="2"/>
    <!-- vertical wedge numerals -->
    <path d="M56 80 l3 9 l-6 0 z"/>
    <path d="M67 80 l3 9 l-6 0 z"/>
    <path d="M78 80 l3 9 l-6 0 z"/>
    <path d="M89 80 l3 9 l-6 0 z"/>
    <path d="M100 80 l3 9 l-6 0 z"/>
    <!-- second wedge row -->
    <path d="M61 92 l3 8 l-6 0 z"/>
    <path d="M72 92 l3 8 l-6 0 z"/>
    <path d="M83 92 l3 8 l-6 0 z"/>
  </g>

  <!-- ===== GRAIN-EAR SIGN (top-right cell): ear of barley ===== -->
  <g class="fig-in d3" stroke="var(--ink)" stroke-width="2" fill="none" stroke-linecap="round">
    <!-- stalk -->
    <line x1="168" y1="98" x2="168" y2="60"/>
    <!-- paired barley grains up the stalk -->
    <path d="M168 64 q-9 -1 -12 -8"/>
    <path d="M168 64 q9 -1 12 -8"/>
    <path d="M168 73 q-9 -1 -12 -8"/>
    <path d="M168 73 q9 -1 12 -8"/>
    <path d="M168 82 q-9 -1 -12 -8"/>
    <path d="M168 82 q9 -1 12 -8"/>
    <!-- awns at the top -->
    <line x1="168" y1="60" x2="164" y2="52"/>
    <line x1="168" y1="60" x2="172" y2="52"/>
    <line x1="168" y1="60" x2="168" y2="50"/>
  </g>

  <!-- ===== ANIMAL-HEAD SIGN (bottom-right cell): ox / sheep head ===== -->
  <g class="fig-in d4" stroke="var(--ink)" stroke-width="2" fill="none" stroke-linejoin="round" stroke-linecap="round">
    <!-- head outline -->
    <path d="M168 122 q-16 2 -16 18 q0 14 16 16 q16 -2 16 -16 q0 -16 -16 -18 z"/>
    <!-- horns -->
    <path d="M156 124 q-9 -6 -14 -2"/>
    <path d="M180 124 q9 -6 14 -2"/>
    <!-- ears -->
    <path d="M153 134 q-7 1 -8 5"/>
    <path d="M183 134 q7 1 8 5"/>
    <!-- eyes -->
    <circle cx="162" cy="142" r="1.6" fill="var(--ink)" stroke="none"/>
    <circle cx="174" cy="142" r="1.6" fill="var(--ink)" stroke="none"/>
    <!-- muzzle -->
    <path d="M163 154 q5 4 10 0"/>
  </g>

  <!-- ===== CAPTION TAG + POINTER ===== -->
  <g class="fig-in d5">
    <!-- pointer from tablet edge to caption -->
    <path d="M210 150 L246 178" fill="none" stroke="var(--ink-soft)" stroke-width="1.5"/>
    <circle cx="210" cy="150" r="2.4" fill="var(--ink-soft)"/>

    <!-- caption panel -->
    <rect x="234" y="46" width="118" height="120" rx="10" ry="10"
          fill="var(--surface)" stroke="var(--border)" stroke-width="1.5"/>

    <text x="248" y="68" text-anchor="start" fill="var(--ink-soft)"
          font-family="var(--font-sans)" font-size="11" font-weight="600">a receipt:</text>
    <text x="248" y="90" text-anchor="start" fill="var(--ink-soft)"
          font-family="var(--font-sans)" font-size="11">so many</text>
    <text x="248" y="105" text-anchor="start" fill="var(--ink-soft)"
          font-family="var(--font-sans)" font-size="11">measures of</text>
    <text x="248" y="120" text-anchor="start" fill="var(--ink-soft)"
          font-family="var(--font-sans)" font-size="11" font-weight="600">barley,</text>
    <text x="248" y="140" text-anchor="start" fill="var(--ink-soft)"
          font-family="var(--font-sans)" font-size="11">so many</text>
    <text x="248" y="155" text-anchor="start" fill="var(--ink-soft)"
          font-family="var(--font-sans)" font-size="11" font-weight="600">sheep</text>
  </g>

  <!-- ===== FIGURE LABEL ===== -->
  <text x="22" y="206" text-anchor="start" fill="var(--ink-faint)"
        font-family="var(--font-sans)" font-size="10" font-weight="600">proto-cuneiform accounting tablet</text>
</svg>
