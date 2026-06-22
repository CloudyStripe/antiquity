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
  <defs>
    <!-- Band tints: STONE lightest -> IRON strongest accent -->
    <linearGradient id="ta-stone" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="color-mix(in srgb, var(--accent) 8%, var(--surface-2))" />
      <stop offset="100%" stop-color="color-mix(in srgb, var(--accent) 4%, var(--surface-2))" />
    </linearGradient>
    <linearGradient id="ta-bronze" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="color-mix(in srgb, var(--accent) 24%, var(--surface-2))" />
      <stop offset="100%" stop-color="color-mix(in srgb, var(--accent) 16%, var(--surface-2))" />
    </linearGradient>
    <linearGradient id="ta-iron" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="color-mix(in srgb, var(--accent) 42%, var(--surface-2))" />
      <stop offset="100%" stop-color="color-mix(in srgb, var(--accent) 30%, var(--surface-2))" />
    </linearGradient>

    <!-- Fuzzy boundary gradients: blurred transition stone->bronze -->
    <linearGradient id="ta-edge1" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="color-mix(in srgb, var(--accent) 8%, var(--surface-2))" />
      <stop offset="50%" stop-color="color-mix(in srgb, var(--accent) 16%, var(--surface-2))" />
      <stop offset="100%" stop-color="color-mix(in srgb, var(--accent) 24%, var(--surface-2))" />
    </linearGradient>
    <!-- Fuzzy boundary bronze->iron -->
    <linearGradient id="ta-edge2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="color-mix(in srgb, var(--accent) 24%, var(--surface-2))" />
      <stop offset="50%" stop-color="color-mix(in srgb, var(--accent) 33%, var(--surface-2))" />
      <stop offset="100%" stop-color="color-mix(in srgb, var(--accent) 42%, var(--surface-2))" />
    </linearGradient>

    <filter id="ta-soft" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3" />
    </filter>
  </defs>

  <!-- Bands -->
  <g class="band b1">
    <rect x="8" y="28" width="118" height="120" rx="8" fill="url(#ta-stone)" stroke="var(--border)" stroke-width="1" />
  </g>
  <g class="band b2">
    <rect x="120" y="28" width="120" height="120" rx="8" fill="url(#ta-bronze)" stroke="var(--border)" stroke-width="1" />
  </g>
  <g class="band b3">
    <rect x="234" y="28" width="118" height="120" rx="8" fill="url(#ta-iron)" stroke="var(--border)" stroke-width="1" />
  </g>

  <!-- Fuzzy blurred boundaries between bands (no hard lines) -->
  <g class="edges">
    <rect x="110" y="28" width="26" height="120" rx="6" fill="url(#ta-edge1)" filter="url(#ta-soft)" opacity="0.85" />
    <rect x="224" y="28" width="26" height="120" rx="6" fill="url(#ta-edge2)" filter="url(#ta-soft)" opacity="0.85" />
  </g>

  <!-- Sequence arrow across the top -->
  <g class="arrow">
    <line x1="20" y1="18" x2="332" y2="18" stroke="var(--ink-soft)" stroke-width="1.5" />
    <path d="M332 18 l-7 -3.5 v7 z" fill="var(--ink-soft)" />
    <text x="20" y="13" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="9.5" text-anchor="start">technological sequence</text>
  </g>

  <!-- STONE icon: chipped hand-axe (teardrop with flake notches) -->
  <g class="icon i1">
    <path
      d="M67 50
         C 84 56, 90 78, 80 96
         C 74 108, 60 112, 52 102
         C 44 92, 46 70, 56 58
         C 59 54, 63 51, 67 50 Z"
      fill="color-mix(in srgb, var(--ink) 14%, transparent)"
      stroke="var(--ink)"
      stroke-width="1.6"
      stroke-linejoin="round"
    />
    <path d="M62 60 l5 5" stroke="var(--ink)" stroke-width="1.2" stroke-linecap="round" />
    <path d="M74 66 l5 4" stroke="var(--ink)" stroke-width="1.2" stroke-linecap="round" />
    <path d="M56 78 l5 4" stroke="var(--ink)" stroke-width="1.2" stroke-linecap="round" />
    <path d="M70 86 l5 4" stroke="var(--ink)" stroke-width="1.2" stroke-linecap="round" />
    <path d="M60 96 l4 4" stroke="var(--ink)" stroke-width="1.2" stroke-linecap="round" />
  </g>

  <!-- BRONZE icon: cast axe head on a haft -->
  <g class="icon i2">
    <line x1="180" y1="48" x2="180" y2="108" stroke="var(--ink)" stroke-width="2.4" stroke-linecap="round" />
    <path
      d="M180 58
         C 196 56, 206 64, 206 74
         C 206 84, 196 92, 180 90
         L 180 58 Z"
      fill="color-mix(in srgb, var(--accent) 38%, transparent)"
      stroke="var(--accent-strong)"
      stroke-width="1.6"
      stroke-linejoin="round"
    />
    <path d="M180 64 L 199 74 L 180 84"
      fill="none" stroke="var(--accent-ink)" stroke-width="1.1" opacity="0.7" />
  </g>

  <!-- IRON icon: forged dagger / blade -->
  <g class="icon i3">
    <path
      d="M293 46
         L 299 92
         L 293 104
         L 287 92
         L 293 46 Z"
      fill="color-mix(in srgb, var(--ink) 22%, transparent)"
      stroke="var(--ink)"
      stroke-width="1.6"
      stroke-linejoin="round"
    />
    <line x1="293" y1="52" x2="293" y2="96" stroke="var(--ink)" stroke-width="1" opacity="0.6" />
    <!-- crossguard -->
    <line x1="280" y1="106" x2="306" y2="106" stroke="var(--ink)" stroke-width="2.6" stroke-linecap="round" />
    <!-- grip + pommel -->
    <line x1="293" y1="106" x2="293" y2="120" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" />
    <circle cx="293" cy="124" r="3" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.6" />
  </g>

  <!-- Age names -->
  <g class="label l1">
    <text x="67" y="142" fill="var(--ink)" font-family="var(--font-sans)" font-size="13" font-weight="600" text-anchor="middle">STONE</text>
  </g>
  <g class="label l2">
    <text x="180" y="142" fill="var(--ink)" font-family="var(--font-sans)" font-size="13" font-weight="600" text-anchor="middle">BRONZE</text>
  </g>
  <g class="label l3">
    <text x="293" y="142" fill="var(--ink)" font-family="var(--font-sans)" font-size="13" font-weight="600" text-anchor="middle">IRON</text>
  </g>

  <!-- Note beneath the bands -->
  <g class="note">
    <text x="180" y="172" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="11" font-style="italic" text-anchor="middle">
      boundaries fall at different dates
    </text>
    <text x="180" y="187" fill="var(--ink-faint)" font-family="var(--font-sans)" font-size="11" font-style="italic" text-anchor="middle">
      in different regions
    </text>
  </g>

  <style>
    .band, .icon, .label, .edges, .arrow, .note {
      animation: ta-rise 460ms ease-out both;
    }
    .b1 { animation-delay: 40ms; }
    .b2 { animation-delay: 140ms; }
    .b3 { animation-delay: 240ms; }
    .edges { animation: ta-fade 600ms ease-out both; animation-delay: 340ms; }
    .arrow { animation-delay: 0ms; }
    .i1 { animation-delay: 200ms; }
    .i2 { animation-delay: 300ms; }
    .i3 { animation-delay: 400ms; }
    .l1 { animation-delay: 240ms; }
    .l2 { animation-delay: 340ms; }
    .l3 { animation-delay: 440ms; }
    .note { animation: ta-fade 520ms ease-out both; animation-delay: 520ms; }

    @keyframes ta-rise {
      from { opacity: 0; transform: translateY(8px) scale(0.985); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes ta-fade {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  </style>
</svg>
