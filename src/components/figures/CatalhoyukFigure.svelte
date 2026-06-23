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
    fig-catalhoyuk: rooftop-entry, street-less town.
    Mud-brick houses packed against each other (shared walls, no streets).
    People walk on flat roofs, one climbs a ladder; entry holes in roofs.
    Rightmost house is a cutaway showing a burial beneath the floor.
  -->

  <!-- Ground line -->
  <line
    x1="8" y1="196" x2="352" y2="196"
    stroke="var(--border-strong)" stroke-width="1.4" stroke-linecap="round"
  />

  <!-- ===== HOUSE BLOCK: packed mud-brick rooms, shared walls, no gaps ===== -->
  <!-- Each house drawn as a rect; they abut directly so walls are shared. -->
  <g class="houses">
    <!-- House A (back-left, slightly taller roof) -->
    <rect class="h h1" x="24" y="118" width="74" height="78"
      fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.6" />
    <!-- House B -->
    <rect class="h h2" x="98" y="130" width="70" height="66"
      fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.6" />
    <!-- House C -->
    <rect class="h h3" x="168" y="122" width="64" height="74"
      fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.6" />
    <!-- House D (cutaway, right) -->
    <rect class="h h4" x="232" y="132" width="80" height="64"
      fill="var(--surface-2)" stroke="var(--border-strong)" stroke-width="1.6" />

    <!-- Brick courses (faint) to read as mud-brick -->
    <g stroke="var(--border)" stroke-width="0.8" opacity="0.7">
      <line x1="24" y1="142" x2="98" y2="142" />
      <line x1="24" y1="166" x2="98" y2="166" />
      <line x1="98" y1="154" x2="168" y2="154" />
      <line x1="168" y1="146" x2="232" y2="146" />
      <line x1="168" y1="170" x2="232" y2="170" />
    </g>
  </g>

  <!-- ===== ROOF ENTRY HOLES (dark openings in flat roofs) ===== -->
  <g class="holes">
    <rect class="hole" x="44" y="116" width="20" height="6" rx="1.5"
      fill="var(--ink)" stroke="var(--border-strong)" stroke-width="0.8" />
    <rect class="hole" x="120" y="128" width="20" height="6" rx="1.5"
      fill="var(--ink)" stroke="var(--border-strong)" stroke-width="0.8" />
    <!-- entry hole on the cutaway house (the ladder descends into it) -->
    <rect class="hole" x="262" y="130" width="20" height="6" rx="1.5"
      fill="var(--ink)" stroke="var(--border-strong)" stroke-width="0.8" />
  </g>

  <!-- ===== PEOPLE WALKING ON ROOFS ===== -->
  <g class="people" stroke="var(--ink)" stroke-width="2" stroke-linecap="round" fill="none">
    <!-- Person 1 (roof A) -->
    <g class="p p1">
      <circle cx="78" cy="104" r="3.4" fill="var(--ink)" stroke="none" />
      <line x1="78" y1="107" x2="78" y2="115" />
      <line x1="78" y1="110" x2="73" y2="113" />
      <line x1="78" y1="110" x2="83" y2="112" />
      <line x1="78" y1="115" x2="74" y2="121" />
      <line x1="78" y1="115" x2="82" y2="121" />
    </g>
    <!-- Person 2 (roof C) -->
    <g class="p p2">
      <circle cx="196" cy="108" r="3.4" fill="var(--ink)" stroke="none" />
      <line x1="196" y1="111" x2="196" y2="119" />
      <line x1="196" y1="114" x2="201" y2="116" />
      <line x1="196" y1="114" x2="191" y2="117" />
      <line x1="196" y1="119" x2="192" y2="125" />
      <line x1="196" y1="119" x2="200" y2="125" />
    </g>
  </g>

  <!-- ===== LADDER (one person climbing, on cutaway house) ===== -->
  <g class="ladder">
    <!-- ladder rails leaning into the roof entry hole -->
    <line x1="290" y1="186" x2="278" y2="130" stroke="var(--ink)" stroke-width="2" stroke-linecap="round" />
    <line x1="298" y1="186" x2="286" y2="130" stroke="var(--ink)" stroke-width="2" stroke-linecap="round" />
    <!-- rungs -->
    <g stroke="var(--ink)" stroke-width="1.5" stroke-linecap="round">
      <line x1="288" y1="174" x2="296" y2="174" />
      <line x1="286" y1="162" x2="294" y2="162" />
      <line x1="284" y1="150" x2="292" y2="150" />
      <line x1="282" y1="138" x2="290" y2="138" />
    </g>
  </g>

  <!-- person climbing the ladder -->
  <g class="climber" stroke="var(--ink)" stroke-width="2" stroke-linecap="round" fill="none">
    <circle cx="306" cy="150" r="3.4" fill="var(--ink)" stroke="none" />
    <line x1="306" y1="153" x2="303" y2="162" />
    <line x1="305" y1="156" x2="294" y2="151" />
    <line x1="304" y1="158" x2="296" y2="162" />
    <line x1="303" y1="162" x2="293" y2="160" />
    <line x1="303" y1="162" x2="298" y2="171" />
  </g>

  <!-- ===== CUTAWAY INTERIOR OF HOUSE D: floor line + burial beneath ===== -->
  <g class="cut">
    <!-- interior floor line -->
    <line x1="234" y1="176" x2="310" y2="176"
      stroke="var(--ink-soft)" stroke-width="1.4" stroke-dasharray="4 3" />
    <!-- buried figure (skeleton) below the floor, faint -->
    <g class="burial" stroke="var(--ink-faint)" stroke-width="1.6" stroke-linecap="round" fill="none">
      <circle cx="252" cy="186" r="3.2" fill="var(--ink-faint)" stroke="none" />
      <line x1="255" y1="187" x2="288" y2="190" />
      <!-- ribs / limbs -->
      <line x1="263" y1="186" x2="266" y2="182" />
      <line x1="270" y1="187" x2="273" y2="183" />
      <line x1="277" y1="188" x2="280" y2="192" />
      <line x1="284" y1="189" x2="287" y2="185" />
    </g>
  </g>

  <!-- ===== LABELS ===== -->
  <!-- roof entry label (points to a roof hole) -->
  <g class="lbl lbl-roof">
    <line x1="130" y1="118" x2="130" y2="100" stroke="var(--ink-soft)" stroke-width="1" />
    <text x="130" y="94"
      fill="var(--ink-soft)" font-family="var(--font-sans)"
      font-size="11" font-weight="600" text-anchor="middle">roof entry</text>
  </g>

  <!-- burial beneath floor label -->
  <g class="lbl lbl-burial">
    <line x1="270" y1="190" x2="270" y2="210" stroke="var(--ink-soft)" stroke-width="1" />
    <text x="270" y="223"
      fill="var(--ink-soft)" font-family="var(--font-sans)"
      font-size="11" font-weight="600" text-anchor="middle">burial beneath floor</text>
  </g>

  <!-- caption: no streets between houses -->
  <text class="cap" x="24" y="223"
    fill="var(--ink-faint)" font-family="var(--font-sans)"
    font-size="10" font-style="italic" text-anchor="start">no streets — shared walls</text>

  <style>
    .houses, .holes, .people, .ladder, .climber, .cut, .lbl, .cap {
      animation: ch-rise 460ms ease-out both;
    }
    .houses { animation-delay: 60ms; }
    .holes  { animation-delay: 200ms; }
    .p1 { animation: ch-rise 460ms ease-out both; animation-delay: 300ms; }
    .p2 { animation: ch-rise 460ms ease-out both; animation-delay: 360ms; }
    .ladder  { animation-delay: 380ms; }
    .climber { animation-delay: 460ms; }
    .cut     { animation: ch-fade 560ms ease-out both; animation-delay: 520ms; }
    .lbl-roof   { animation: ch-fade 460ms ease-out both; animation-delay: 440ms; }
    .lbl-burial { animation: ch-fade 460ms ease-out both; animation-delay: 600ms; }
    .cap { animation: ch-fade 460ms ease-out both; animation-delay: 640ms; }

    @keyframes ch-rise {
      from { opacity: 0; transform: translateY(8px) scale(0.99); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes ch-fade {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  </style>
</svg>
