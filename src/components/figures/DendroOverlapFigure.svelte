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
  <!-- Top band: living tree, positioned to the right -->
  <g class="band band-1">
    <rect x="170" y="22" width="170" height="34" rx="3"
      fill="var(--surface)" stroke="var(--border)" stroke-width="1" />
    <!-- ring lines (varying spacing/height) -->
    <g stroke-linecap="round">
      <line x1="176" y1="27" x2="176" y2="51" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="181" y1="30" x2="181" y2="48" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="188" y1="27" x2="188" y2="51" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="192" y1="31" x2="192" y2="47" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="195" y1="30" x2="195" y2="48" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="202" y1="27" x2="202" y2="51" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="208" y1="29" x2="208" y2="49" stroke="var(--ink-soft)" stroke-width="1.1" />
      <line x1="212" y1="31" x2="212" y2="47" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="219" y1="27" x2="219" y2="51" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="223" y1="30" x2="223" y2="48" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="230" y1="28" x2="230" y2="50" stroke="var(--ink)" stroke-width="1.3" />
      <line x1="234" y1="31" x2="234" y2="47" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="237" y1="30" x2="237" y2="48" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="244" y1="27" x2="244" y2="51" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="250" y1="30" x2="250" y2="48" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="257" y1="28" x2="257" y2="50" stroke="var(--ink)" stroke-width="1.3" />
      <line x1="261" y1="31" x2="261" y2="47" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="265" y1="30" x2="265" y2="48" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="272" y1="27" x2="272" y2="51" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="278" y1="30" x2="278" y2="48" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="285" y1="28" x2="285" y2="50" stroke="var(--ink)" stroke-width="1.3" />
      <line x1="290" y1="31" x2="290" y2="47" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="297" y1="27" x2="297" y2="51" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="303" y1="30" x2="303" y2="48" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="310" y1="28" x2="310" y2="50" stroke="var(--ink)" stroke-width="1.3" />
      <line x1="316" y1="30" x2="316" y2="48" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="323" y1="27" x2="323" y2="51" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="330" y1="29" x2="330" y2="49" stroke="var(--ink-soft)" stroke-width="1.1" />
      <line x1="335" y1="31" x2="335" y2="47" stroke="var(--ink-soft)" stroke-width="1" />
    </g>
    <text x="334" y="17" text-anchor="end"
      fill="var(--ink)" font-family="var(--font-sans)"
      font-size="11.5" font-weight="600">living tree (today)</text>
  </g>

  <!-- Middle band: old beam, shifted left -->
  <g class="band band-2">
    <rect x="95" y="84" width="170" height="34" rx="3"
      fill="var(--surface)" stroke="var(--border)" stroke-width="1" />
    <g stroke-linecap="round">
      <line x1="101" y1="89" x2="101" y2="113" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="106" y1="92" x2="106" y2="110" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="113" y1="89" x2="113" y2="113" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="117" y1="93" x2="117" y2="109" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="120" y1="92" x2="120" y2="110" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="127" y1="89" x2="127" y2="113" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="133" y1="91" x2="133" y2="111" stroke="var(--ink-soft)" stroke-width="1.1" />
      <line x1="137" y1="93" x2="137" y2="109" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="144" y1="89" x2="144" y2="113" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="148" y1="92" x2="148" y2="110" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="155" y1="90" x2="155" y2="112" stroke="var(--ink)" stroke-width="1.3" />
      <line x1="159" y1="93" x2="159" y2="109" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="162" y1="92" x2="162" y2="110" stroke="var(--ink-soft)" stroke-width="1" />
      <!-- overlap region with top band starts ~x170 -->
      <line x1="176" y1="89" x2="176" y2="113" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="181" y1="92" x2="181" y2="110" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="188" y1="89" x2="188" y2="113" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="192" y1="93" x2="192" y2="109" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="195" y1="92" x2="195" y2="110" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="202" y1="89" x2="202" y2="113" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="208" y1="91" x2="208" y2="111" stroke="var(--ink-soft)" stroke-width="1.1" />
      <line x1="212" y1="93" x2="212" y2="109" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="219" y1="89" x2="219" y2="113" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="223" y1="92" x2="223" y2="110" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="230" y1="90" x2="230" y2="112" stroke="var(--ink)" stroke-width="1.3" />
      <line x1="234" y1="93" x2="234" y2="109" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="237" y1="92" x2="237" y2="110" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="244" y1="89" x2="244" y2="113" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="250" y1="92" x2="250" y2="110" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="257" y1="90" x2="257" y2="112" stroke="var(--ink)" stroke-width="1.3" />
      <line x1="261" y1="93" x2="261" y2="109" stroke="var(--ink-soft)" stroke-width="1" />
    </g>
    <text x="99" y="79" text-anchor="start"
      fill="var(--ink)" font-family="var(--font-sans)"
      font-size="11.5" font-weight="600">old beam</text>
  </g>

  <!-- Bottom band: ancient log, shifted further left -->
  <g class="band band-3">
    <rect x="20" y="146" width="170" height="34" rx="3"
      fill="var(--surface)" stroke="var(--border)" stroke-width="1" />
    <g stroke-linecap="round">
      <line x1="26" y1="151" x2="26" y2="175" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="31" y1="154" x2="31" y2="172" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="38" y1="151" x2="38" y2="175" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="42" y1="155" x2="42" y2="171" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="45" y1="154" x2="45" y2="172" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="52" y1="151" x2="52" y2="175" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="58" y1="153" x2="58" y2="173" stroke="var(--ink-soft)" stroke-width="1.1" />
      <line x1="62" y1="155" x2="62" y2="171" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="69" y1="151" x2="69" y2="175" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="73" y1="154" x2="73" y2="172" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="80" y1="152" x2="80" y2="174" stroke="var(--ink)" stroke-width="1.3" />
      <line x1="84" y1="155" x2="84" y2="171" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="87" y1="154" x2="87" y2="172" stroke="var(--ink-soft)" stroke-width="1" />
      <!-- overlap region with middle band starts ~x95 -->
      <line x1="101" y1="151" x2="101" y2="175" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="106" y1="154" x2="106" y2="172" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="113" y1="151" x2="113" y2="175" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="117" y1="155" x2="117" y2="171" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="120" y1="154" x2="120" y2="172" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="127" y1="151" x2="127" y2="175" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="133" y1="153" x2="133" y2="173" stroke="var(--ink-soft)" stroke-width="1.1" />
      <line x1="137" y1="155" x2="137" y2="171" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="144" y1="151" x2="144" y2="175" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="148" y1="154" x2="148" y2="172" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="155" y1="152" x2="155" y2="174" stroke="var(--ink)" stroke-width="1.3" />
      <line x1="159" y1="155" x2="159" y2="171" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="162" y1="154" x2="162" y2="172" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="169" y1="151" x2="169" y2="175" stroke="var(--ink)" stroke-width="1.4" />
      <line x1="175" y1="153" x2="175" y2="173" stroke="var(--ink-soft)" stroke-width="1.1" />
      <line x1="179" y1="155" x2="179" y2="171" stroke="var(--ink-soft)" stroke-width="1" />
      <line x1="185" y1="151" x2="185" y2="175" stroke="var(--ink)" stroke-width="1.4" />
    </g>
    <text x="24" y="141" text-anchor="start"
      fill="var(--ink)" font-family="var(--font-sans)"
      font-size="11.5" font-weight="600">ancient log</text>
  </g>

  <!-- Overlap zone: top <-> middle (shared region x170..265) -->
  <g class="overlap overlap-1">
    <rect x="170" y="22" width="95" height="96"
      fill="color-mix(in srgb, var(--accent) 22%, transparent)"
      stroke="var(--accent)" stroke-width="1" stroke-dasharray="3 2" rx="3" />
    <!-- match ticks -->
    <line x1="202" y1="56" x2="202" y2="84" stroke="var(--accent-strong)" stroke-width="1.2" stroke-dasharray="2 2" />
    <line x1="244" y1="56" x2="244" y2="84" stroke="var(--accent-strong)" stroke-width="1.2" stroke-dasharray="2 2" />
  </g>

  <!-- Overlap zone: middle <-> bottom (shared region x95..190) -->
  <g class="overlap overlap-2">
    <rect x="95" y="84" width="95" height="96"
      fill="color-mix(in srgb, var(--accent) 22%, transparent)"
      stroke="var(--accent)" stroke-width="1" stroke-dasharray="3 2" rx="3" />
    <line x1="127" y1="118" x2="127" y2="146" stroke="var(--accent-strong)" stroke-width="1.2" stroke-dasharray="2 2" />
    <line x1="155" y1="118" x2="155" y2="146" stroke="var(--accent-strong)" stroke-width="1.2" stroke-dasharray="2 2" />
  </g>

  <text class="match-label match-1" x="217" y="73" text-anchor="middle"
    fill="var(--accent-ink)" font-family="var(--font-sans)"
    font-size="10.5" font-weight="600">match</text>
  <text class="match-label match-2" x="142" y="135" text-anchor="middle"
    fill="var(--accent-ink)" font-family="var(--font-sans)"
    font-size="10.5" font-weight="600">match</text>

  <!-- Arrow: chain backwards in time (right -> left) -->
  <g class="arrow">
    <line x1="340" y1="200" x2="24" y2="200"
      stroke="var(--ink-soft)" stroke-width="1.5" />
    <path d="M24 200 L32 196 L32 204 Z" fill="var(--ink-soft)" />
    <text x="182" y="214" text-anchor="middle"
      fill="var(--ink-soft)" font-family="var(--font-sans)"
      font-size="11" font-weight="600">chain backwards in time</text>
  </g>

  <style>
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(28px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .band {
      opacity: 0;
      animation: slideInRight 480ms ease-out forwards;
    }
    .band-1 { animation-delay: 60ms; }
    .band-2 { animation-delay: 200ms; }
    .band-3 { animation-delay: 340ms; }
    .overlap {
      opacity: 0;
      transform-box: fill-box;
      transform-origin: center;
      animation: fadeIn 420ms ease-out forwards;
    }
    .overlap-1 { animation-delay: 480ms; }
    .overlap-2 { animation-delay: 560ms; }
    .match-label {
      opacity: 0;
      animation: fadeIn 360ms ease-out forwards;
    }
    .match-1 { animation-delay: 540ms; }
    .match-2 { animation-delay: 620ms; }
    .arrow {
      opacity: 0;
      animation: fadeUp 440ms ease-out forwards;
      animation-delay: 700ms;
    }
  </style>
</svg>
