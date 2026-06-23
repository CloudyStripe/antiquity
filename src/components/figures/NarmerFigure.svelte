<script lang="ts">
  interface Props { class?: string }
  let { class: klass = '' }: Props = $props();
</script>

<svg viewBox="0 0 380 240" class={klass} role="presentation" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
  <style>
    .fig-in { opacity: 0; animation: figIn 600ms ease-out forwards; }
    .d1 { animation-delay: 300ms; }
    .d2 { animation-delay: 400ms; }
    .d3 { animation-delay: 500ms; }
    .d4 { animation-delay: 600ms; }
    @keyframes figIn {
      from { opacity: 0; transform: translateY(8px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
  </style>

  <!-- ===================== LEFT FACE ===================== -->
  <g class="fig-in d1">
    <!-- palette panel (shield shape) -->
    <path d="M 30 30
             Q 22 30 22 42
             L 22 150
             Q 22 178 75 200
             Q 128 178 128 150
             L 128 42
             Q 128 30 120 30 Z"
          fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="2" />
  </g>

  <!-- LEFT king figure: smiting pose, mace overhead -->
  <g class="fig-in d2" fill="none" stroke="var(--ink)" stroke-width="2.4"
     stroke-linecap="round" stroke-linejoin="round">
    <!-- head -->
    <circle cx="70" cy="92" r="9" fill="var(--ink)" stroke="none" />
    <!-- torso -->
    <path d="M 70 101 L 70 138" />
    <!-- raised mace arm -->
    <path d="M 70 110 L 86 96 L 92 80" />
    <!-- mace head -->
    <circle cx="92" cy="74" r="6" fill="var(--ink)" stroke="none" />
    <!-- forward arm -->
    <path d="M 70 112 L 54 122" />
    <!-- legs (striding) -->
    <path d="M 70 138 L 60 162" />
    <path d="M 70 138 L 82 160" />
  </g>

  <!-- LEFT white crown (tall conical / bowling-pin) of Upper Egypt -->
  <g class="fig-in d3">
    <path d="M 62 84
             Q 60 62 70 50
             Q 80 62 78 84 Z"
          fill="color-mix(in srgb, var(--accent) 30%, transparent)"
          stroke="var(--accent)" stroke-width="2.4" stroke-linejoin="round" />
    <circle cx="70" cy="49" r="2.6" fill="var(--accent)" />
  </g>

  <!-- ===================== RIGHT FACE ===================== -->
  <g class="fig-in d1">
    <path d="M 260 30
             Q 252 30 252 42
             L 252 150
             Q 252 178 305 200
             Q 358 178 358 150
             L 358 42
             Q 358 30 350 30 Z"
          fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="2" />
  </g>

  <!-- RIGHT king figure: standing -->
  <g class="fig-in d2" fill="none" stroke="var(--ink)" stroke-width="2.4"
     stroke-linecap="round" stroke-linejoin="round">
    <!-- head -->
    <circle cx="305" cy="100" r="9" fill="var(--ink)" stroke="none" />
    <!-- torso -->
    <path d="M 305 109 L 305 144" />
    <!-- arms -->
    <path d="M 305 118 L 290 130" />
    <path d="M 305 118 L 320 130" />
    <!-- legs (striding) -->
    <path d="M 305 144 L 295 168" />
    <path d="M 305 144 L 317 166" />
  </g>

  <!-- RIGHT red crown (flatter, chair-like bowl) of Lower Egypt -->
  <g class="fig-in d3">
    <path d="M 292 92
             L 292 78
             L 318 78
             L 318 92 Z"
          fill="color-mix(in srgb, var(--chip-contested-ink) 30%, transparent)"
          stroke="var(--chip-contested-ink)" stroke-width="2.4" stroke-linejoin="round" />
    <!-- curling tall back of red crown -->
    <path d="M 318 78 L 318 64 Q 318 58 312 60"
          fill="none" stroke="var(--chip-contested-ink)" stroke-width="2.4"
          stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <!-- ===================== LABELS ===================== -->
  <g class="fig-in d4" font-family="var(--font-sans)" font-weight="600">
    <!-- crown leader lines -->
    <path d="M 70 44 L 70 24" fill="none" stroke="var(--accent)" stroke-width="1.4" />
    <path d="M 312 58 L 312 24" fill="none" stroke="var(--chip-contested-ink)" stroke-width="1.4" />

    <text x="75" y="20" text-anchor="middle" fill="var(--ink-soft)" font-size="11">white crown</text>
    <text x="75" y="218" text-anchor="middle" fill="var(--ink-faint)" font-size="11">(Upper Egypt)</text>

    <text x="305" y="20" text-anchor="middle" fill="var(--ink-soft)" font-size="11">red crown</text>
    <text x="305" y="218" text-anchor="middle" fill="var(--ink-faint)" font-size="11">(Lower Egypt)</text>

    <!-- unification join -->
    <text x="190" y="118" text-anchor="middle" fill="var(--ink-soft)" font-size="11">one king,</text>
    <text x="190" y="132" text-anchor="middle" fill="var(--ink-soft)" font-size="11">two lands</text>
    <path d="M 134 124 L 168 124" fill="none" stroke="var(--ink-faint)" stroke-width="1.4" />
    <path d="M 212 124 L 246 124" fill="none" stroke="var(--ink-faint)" stroke-width="1.4" />
    <path d="M 246 124 l -7 -4 m 7 4 l -7 4" fill="none" stroke="var(--ink-faint)" stroke-width="1.4" stroke-linecap="round" />
  </g>
</svg>
