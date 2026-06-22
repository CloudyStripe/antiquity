<script lang="ts">
  interface Props { class?: string }
  let { class: klass = '' }: Props = $props();
</script>

<svg
  viewBox="0 0 360 230"
  class={klass}
  role="presentation"
  xmlns="http://www.w3.org/2000/svg"
  style="width:100%;height:auto;display:block"
>
  <!-- ground surface caption -->
  <text
    class="cap"
    x="20"
    y="20"
    fill="var(--ink-faint)"
    font-family="var(--font-sans)"
    font-size="11"
    font-weight="600"
    text-anchor="start"
  >ground surface</text>

  <!-- stratified layers (bottom = older, top = younger) -->
  <g>
    <!-- Layer 5 (top / youngest) -->
    <rect
      class="layer l5"
      x="20"
      y="28"
      width="280"
      height="28"
      fill="color-mix(in srgb, var(--accent) 12%, var(--surface-2))"
      stroke="var(--border)"
      stroke-width="1"
    />
    <!-- Layer 4 -->
    <rect
      class="layer l4"
      x="20"
      y="56"
      width="280"
      height="30"
      fill="color-mix(in srgb, var(--ink) 10%, var(--surface-2))"
      stroke="var(--border)"
      stroke-width="1"
    />
    <!-- Layer 3 -->
    <rect
      class="layer l3"
      x="20"
      y="86"
      width="280"
      height="30"
      fill="color-mix(in srgb, var(--ink) 20%, var(--surface-2))"
      stroke="var(--border)"
      stroke-width="1"
    />
    <!-- Layer 2 -->
    <rect
      class="layer l2"
      x="20"
      y="116"
      width="280"
      height="30"
      fill="color-mix(in srgb, var(--ink) 30%, var(--surface-2))"
      stroke="var(--border)"
      stroke-width="1"
    />
    <!-- Layer 1 (bottom / oldest) -->
    <rect
      class="layer l1"
      x="20"
      y="146"
      width="280"
      height="32"
      fill="color-mix(in srgb, var(--ink) 42%, var(--surface-2))"
      stroke="var(--border-strong)"
      stroke-width="1"
    />
  </g>

  <!-- embedded finds -->
  <!-- potsherd (curved fragment) in layer 4 -->
  <g class="find find-sherd">
    <path
      d="M 70 70 q 12 -9 24 0 q -3 5 -12 5 q -9 0 -12 -5 z"
      fill="color-mix(in srgb, var(--accent) 35%, var(--surface))"
      stroke="var(--ink-soft)"
      stroke-width="1.2"
      stroke-linejoin="round"
    />
  </g>

  <!-- bone in layer 3 -->
  <g class="find find-bone">
    <g stroke="var(--ink)" stroke-width="2.4" stroke-linecap="round" fill="var(--surface)">
      <line x1="150" y1="98" x2="172" y2="106" />
      <circle cx="149" cy="96" r="2.6" />
      <circle cx="151" cy="100" r="2.6" />
      <circle cx="173" cy="104" r="2.6" />
      <circle cx="173" cy="108" r="2.6" />
    </g>
  </g>

  <!-- coin (small circle) in layer 2 -->
  <g class="find find-coin">
    <circle
      cx="245"
      cy="131"
      r="6"
      fill="color-mix(in srgb, var(--accent) 45%, var(--surface))"
      stroke="var(--accent-strong)"
      stroke-width="1.3"
    />
    <circle cx="245" cy="131" r="2.4" fill="none" stroke="var(--accent-strong)" stroke-width="0.9" />
  </g>

  <!-- later intrusion: vertical pit cutting down from upper layer -->
  <g class="pit">
    <path
      d="M 180 56 L 198 56 L 196 168 L 182 168 Z"
      fill="color-mix(in srgb, var(--accent) 40%, var(--surface-2))"
      stroke="var(--accent-strong)"
      stroke-width="1.4"
      stroke-dasharray="3 2.5"
    />
  </g>

  <!-- younger / older labels with arrows -->
  <g class="ax">
    <!-- younger (top) -->
    <text
      x="328"
      y="44"
      fill="var(--ink-soft)"
      font-family="var(--font-sans)"
      font-size="12"
      font-weight="600"
      text-anchor="start"
    >younger</text>
    <!-- older (bottom) -->
    <text
      x="328"
      y="165"
      fill="var(--ink-soft)"
      font-family="var(--font-sans)"
      font-size="12"
      font-weight="600"
      text-anchor="start"
    >older</text>
    <!-- vertical time arrow on the right edge -->
    <g stroke="var(--ink-soft)" stroke-width="1.4" fill="none" stroke-linecap="round">
      <line x1="312" y1="56" x2="312" y2="150" />
      <polyline points="308,62 312,52 316,62" stroke-linejoin="round" />
      <polyline points="308,144 312,154 316,144" stroke-linejoin="round" />
    </g>
  </g>

  <!-- intrusion label -->
  <g class="pit-label">
    <line
      x1="189"
      y1="170"
      x2="189"
      y2="196"
      stroke="var(--chip-contested-ink)"
      stroke-width="1.2"
    />
    <text
      x="20"
      y="212"
      fill="var(--chip-contested-ink)"
      font-family="var(--font-sans)"
      font-size="12"
      font-weight="600"
      text-anchor="start"
    >later intrusion &#8212; mixes the record</text>
  </g>

  <style>
    .layer {
      transform-box: fill-box;
      transform-origin: center;
      opacity: 0;
      animation: layerIn 480ms ease-out forwards;
    }
    .l1 { animation-delay: 60ms; }
    .l2 { animation-delay: 150ms; }
    .l3 { animation-delay: 240ms; }
    .l4 { animation-delay: 330ms; }
    .l5 { animation-delay: 420ms; }

    .find {
      opacity: 0;
      animation: fadeIn 420ms ease-out forwards;
    }
    .find-sherd { animation-delay: 480ms; }
    .find-bone { animation-delay: 540ms; }
    .find-coin { animation-delay: 600ms; }

    .ax {
      opacity: 0;
      animation: fadeIn 420ms ease-out forwards;
      animation-delay: 520ms;
    }

    .cap {
      opacity: 0;
      animation: fadeIn 400ms ease-out forwards;
      animation-delay: 80ms;
    }

    .pit {
      opacity: 0;
      transform: translateY(-8px);
      animation: pitIn 520ms ease-out forwards;
      animation-delay: 720ms;
    }

    .pit-label {
      opacity: 0;
      animation: fadeIn 400ms ease-out forwards;
      animation-delay: 880ms;
    }

    @keyframes layerIn {
      from { opacity: 0; transform: translateY(10px) scaleY(0.92); }
      to   { opacity: 1; transform: translateY(0) scaleY(1); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes pitIn {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  </style>
</svg>
