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
  <!--
    Plot geometry:
    X axis: 0 .. ~17190 yrs mapped to px 44 .. 332
    Y axis: 0 .. 100%      mapped to px 184 .. 22
    x(yr) = 44 + (yr/17190)*288
    y(%)  = 184 - (pct/100)*162
    Half-lives: 5730 -> x=140, 11460 -> x=236, 17190 -> x=332
    Levels: 100% -> y=22, 50% -> y=103, 25% -> y=143.5, 12.5% -> y=163.75
  -->

  <!-- Y grid band -->
  <rect class="panel" x="44" y="22" width="288" height="162" rx="3"
        fill="var(--surface-2)" opacity="0.35" stroke="var(--border)" stroke-width="0.75" />

  <!-- Axes -->
  <g class="axes" stroke="var(--ink)" stroke-width="1.1" stroke-linecap="round" fill="none">
    <line x1="44" y1="22" x2="44" y2="184" />
    <line x1="44" y1="184" x2="332" y2="184" />
  </g>

  <!-- Y ticks + labels: 100, 50, 25, 0 -->
  <g class="yticks" stroke="var(--ink)" stroke-width="1" fill="none">
    <line x1="40" y1="22" x2="44" y2="22" />
    <line x1="40" y1="103" x2="44" y2="103" />
    <line x1="40" y1="143.5" x2="44" y2="143.5" />
    <line x1="40" y1="184" x2="44" y2="184" />
  </g>
  <g font-family="var(--font-sans)" font-size="11" fill="var(--ink-soft)" text-anchor="end">
    <text class="ylab" x="37" y="25.5">100</text>
    <text class="ylab" x="37" y="106.5">50</text>
    <text class="ylab" x="37" y="147">25</text>
    <text class="ylab" x="37" y="187.5">0</text>
  </g>

  <!-- X ticks + labels: 0, ~5730, ~11460, ~17000 -->
  <g class="xticks" stroke="var(--ink)" stroke-width="1" fill="none">
    <line x1="44" y1="184" x2="44" y2="188" />
    <line x1="140" y1="184" x2="140" y2="188" />
    <line x1="236" y1="184" x2="236" y2="188" />
    <line x1="332" y1="184" x2="332" y2="188" />
  </g>
  <g font-family="var(--font-sans)" font-size="10.5" fill="var(--ink-soft)" text-anchor="middle">
    <text class="xlab" x="44" y="200">0</text>
    <text class="xlab" x="140" y="200">5,730</text>
    <text class="xlab" x="236" y="200">11,460</text>
    <text class="xlab" x="332" y="200">17,000</text>
  </g>

  <!-- Axis titles -->
  <text class="axtitle" x="188" y="218" font-family="var(--font-sans)" font-size="11.5"
        font-weight="600" fill="var(--ink)" text-anchor="middle">years since death</text>
  <text class="axtitle" x="14" y="103" font-family="var(--font-sans)" font-size="11.5"
        font-weight="600" fill="var(--ink)" text-anchor="middle"
        transform="rotate(-90 14 103)">carbon-14 remaining (%)</text>

  <!-- Dashed guides at 1 half-life (5730 -> 50%) -->
  <g class="guide guide1" stroke="var(--ink-faint)" stroke-width="1" stroke-dasharray="3 3" fill="none">
    <line x1="44" y1="103" x2="140" y2="103" />
    <line x1="140" y1="103" x2="140" y2="184" />
  </g>
  <!-- Dashed guides at 2 half-lives (11460 -> 25%) -->
  <g class="guide guide2" stroke="var(--ink-faint)" stroke-width="1" stroke-dasharray="3 3" fill="none">
    <line x1="44" y1="143.5" x2="236" y2="143.5" />
    <line x1="236" y1="143.5" x2="236" y2="184" />
  </g>

  <!-- Exponential decay curve y = 100 * 0.5^(x/5730) -->
  <path class="curve"
        d="M 44 22
           C 68 50, 92 78, 140 103
           C 164 115.5, 188 124, 236 143.5
           C 260 152, 284 158, 332 168"
        fill="none" stroke="var(--accent)" stroke-width="2.4"
        stroke-linecap="round" stroke-linejoin="round" />

  <!-- Marker dots -->
  <circle class="dot dot1" cx="140" cy="103" r="3.4"
          fill="var(--accent)" stroke="var(--surface)" stroke-width="1.4" />
  <circle class="dot dot2" cx="236" cy="143.5" r="3.4"
          fill="var(--accent)" stroke="var(--surface)" stroke-width="1.4" />

  <!-- Point labels -->
  <text class="ptlab lab1" x="148" y="96" font-family="var(--font-sans)" font-size="11"
        font-weight="600" fill="var(--ink-soft)" text-anchor="start">1 half-life</text>
  <text class="ptlab lab2" x="244" y="136" font-family="var(--font-sans)" font-size="11"
        font-weight="600" fill="var(--ink-soft)" text-anchor="start">2 half-lives</text>

  <style>
    .panel { animation: fadeIn 420ms ease-out both; }
    .axes  { animation: fadeIn 360ms ease-out both; }

    .ylab, .yticks line { animation: fadeIn 360ms ease-out both; }
    .xlab, .xticks line { animation: rise 380ms ease-out both; }
    .axtitle { animation: fadeIn 420ms ease-out both; animation-delay: 120ms; }

    .yticks line { animation-delay: 60ms; }
    .xlab:nth-of-type(1), .xticks line:nth-of-type(1) { animation-delay: 80ms; }
    .xlab:nth-of-type(2), .xticks line:nth-of-type(2) { animation-delay: 140ms; }
    .xlab:nth-of-type(3), .xticks line:nth-of-type(3) { animation-delay: 200ms; }
    .xlab:nth-of-type(4), .xticks line:nth-of-type(4) { animation-delay: 260ms; }

    .curve {
      stroke-dasharray: 360;
      stroke-dashoffset: 360;
      animation: draw 600ms ease-out both;
      animation-delay: 300ms;
    }

    .guide  { animation: fadeIn 400ms ease-out both; }
    .guide1 { animation-delay: 720ms; }
    .guide2 { animation-delay: 820ms; }

    .dot, .ptlab { animation: pop 360ms ease-out both; }
    .dot1 { animation-delay: 780ms; }
    .lab1 { animation-delay: 820ms; }
    .dot2 { animation-delay: 880ms; }
    .lab2 { animation-delay: 920ms; }

    @keyframes draw {
      to { stroke-dashoffset: 0; }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes rise {
      from { opacity: 0; transform: translateY(4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pop {
      from { opacity: 0; transform: scale(0.7); }
      to   { opacity: 1; transform: scale(1); }
    }
  </style>
</svg>
