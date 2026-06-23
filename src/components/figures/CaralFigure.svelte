<script lang="ts">
  interface Props { class?: string }
  let { class: klass = '' }: Props = $props();
</script>

<svg viewBox="0 0 360 230" class={klass} role="presentation" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
  <style>
    .fig-in { opacity: 0; animation: figIn 600ms ease-out forwards; }
    @keyframes figIn {
      from { opacity: 0; transform: translateY(8px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .d1 { animation-delay: 300ms; }
    .d2 { animation-delay: 380ms; }
    .d3 { animation-delay: 460ms; }
    .d4 { animation-delay: 540ms; }
    .d5 { animation-delay: 600ms; }
  </style>

  <!-- ground line -->
  <line x1="14" y1="186" x2="346" y2="186" stroke="var(--border)" stroke-width="1.5" />

  <!-- ===== STEPPED PLATFORM MOUND (stepped pyramid) ===== -->
  <g class="fig-in d1">
    <!-- tier 1 (base) -->
    <rect x="36" y="150" width="150" height="36" fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.6" />
    <!-- tier 2 -->
    <rect x="52" y="118" width="118" height="32" fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.6" />
    <!-- tier 3 -->
    <rect x="68" y="90" width="86" height="28" fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.6" />
    <!-- tier 4 (top platform) -->
    <rect x="84" y="68" width="54" height="22" fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.6" />
    <!-- central stair -->
    <path d="M105 186 L105 68 L117 68 L117 186 Z" fill="color-mix(in srgb, var(--accent) 14%, transparent)" stroke="var(--border-strong)" stroke-width="1" />
    <line x1="105" y1="96" x2="117" y2="96" stroke="var(--border-strong)" stroke-width="0.8" />
    <line x1="105" y1="124" x2="117" y2="124" stroke="var(--border-strong)" stroke-width="0.8" />
    <line x1="105" y1="152" x2="117" y2="152" stroke="var(--border-strong)" stroke-width="0.8" />
    <text x="111" y="204" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="11" font-weight="600" text-anchor="middle">platform mound</text>
  </g>

  <!-- ===== SUNKEN CIRCULAR PLAZA (concentric rings going down) ===== -->
  <g class="fig-in d2">
    <ellipse cx="232" cy="170" rx="52" ry="20" fill="color-mix(in srgb, var(--accent) 10%, transparent)" stroke="var(--border-strong)" stroke-width="1.6" />
    <ellipse cx="232" cy="166" rx="39" ry="15" fill="none" stroke="var(--border-strong)" stroke-width="1.2" />
    <ellipse cx="232" cy="162" rx="26" ry="10.5" fill="none" stroke="var(--border-strong)" stroke-width="1.2" />
    <ellipse cx="232" cy="159" rx="13" ry="6" fill="color-mix(in srgb, var(--accent) 18%, transparent)" stroke="var(--border-strong)" stroke-width="1" />
    <!-- down arrows showing recession -->
    <path d="M232 142 L232 154 M229 150 L232 154 L235 150" fill="none" stroke="var(--ink-faint)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
    <text x="232" y="204" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="11" font-weight="600" text-anchor="middle">sunken plaza</text>
  </g>

  <!-- ===== COASTAL STRIP (shoreline / water) with NET + FISH ===== -->
  <g class="fig-in d3">
    <!-- water band -->
    <rect x="298" y="58" width="50" height="118" rx="4" fill="color-mix(in srgb, var(--accent) 16%, transparent)" stroke="var(--border)" stroke-width="1" />
    <!-- wavy shoreline -->
    <path d="M298 70 q6 -5 12 0 t12 0 t12 0 t12 0" fill="none" stroke="var(--accent)" stroke-width="1.4" stroke-linecap="round" opacity="0.85" />
    <path d="M298 88 q6 -5 12 0 t12 0 t12 0 t12 0" fill="none" stroke="var(--accent)" stroke-width="1.4" stroke-linecap="round" opacity="0.85" />
    <path d="M298 158 q6 -5 12 0 t12 0 t12 0 t12 0" fill="none" stroke="var(--accent)" stroke-width="1.4" stroke-linecap="round" opacity="0.85" />

    <!-- fishing net (diamond mesh in a half-round) -->
    <g class="fig-in d4">
      <path d="M306 108 a17 17 0 0 1 34 0 Z" fill="none" stroke="var(--ink-soft)" stroke-width="1.3" />
      <line x1="313" y1="108" x2="313" y2="124" stroke="var(--ink-soft)" stroke-width="0.8" />
      <line x1="323" y1="108" x2="323" y2="125" stroke="var(--ink-soft)" stroke-width="0.8" />
      <line x1="333" y1="108" x2="333" y2="124" stroke="var(--ink-soft)" stroke-width="0.8" />
      <line x1="307" y1="114" x2="339" y2="114" stroke="var(--ink-soft)" stroke-width="0.8" />
      <line x1="309" y1="120" x2="337" y2="120" stroke="var(--ink-soft)" stroke-width="0.8" />
      <text x="323" y="139" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="9.5" font-weight="600" text-anchor="middle">net</text>
    </g>

    <!-- fish motif -->
    <g class="fig-in d5">
      <path d="M308 168 q9 -7 18 0 q-9 7 -18 0 Z" fill="none" stroke="var(--ink-soft)" stroke-width="1.3" stroke-linejoin="round" />
      <path d="M326 168 l8 -5 l0 10 Z" fill="none" stroke="var(--ink-soft)" stroke-width="1.3" stroke-linejoin="round" />
      <circle cx="313" cy="167.5" r="1" fill="var(--ink-soft)" />
    </g>

    <text x="323" y="200" fill="var(--ink-soft)" font-family="var(--font-sans)" font-size="11" font-weight="600" text-anchor="middle">coast</text>
  </g>

  <!-- ===== SHICRA TAG with pointer to the mound ===== -->
  <g class="fig-in d4">
    <rect x="30" y="20" width="178" height="22" rx="5" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.4" />
    <text x="119" y="35" fill="var(--ink)" font-family="var(--font-sans)" font-size="10.5" font-weight="600" text-anchor="middle">shicra reed bags = datable fill</text>
    <!-- pointer line to mound tier -->
    <path d="M119 42 L113 78" fill="none" stroke="var(--ink)" stroke-width="1.3" />
    <circle cx="113" cy="78" r="2.2" fill="var(--ink)" />
  </g>
</svg>
