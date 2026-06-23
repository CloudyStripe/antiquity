<script lang="ts" module>
  // Per-instance counter so multiple marks on one page never share <defs> ids.
  let seq = 0;
</script>

<script lang="ts">
  interface Props {
    /** Rendered square size in px. */
    size?: number;
  }
  let { size = 34 }: Props = $props();
  const uid = `bm${seq++}`;
</script>

<!-- The "Monument" mark — same composition as public/favicon.svg and the PWA
     icons: a lapis serif A standing on bold stratigraphy bands, on parchment. -->
<svg
  class="brand-mark"
  width={size}
  height={size}
  viewBox="0 0 64 64"
  role="img"
  aria-label="Antiquity"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="sky-{uid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F8F2E7" />
      <stop offset="1" stop-color="#EFE5D2" />
    </linearGradient>
    <clipPath id="tile-{uid}"><rect width="64" height="64" rx="14" /></clipPath>
  </defs>
  <g clip-path="url(#tile-{uid})">
    <rect width="64" height="64" fill="url(#sky-{uid})" />
    <rect x="0" y="47" width="64" height="6" fill="#E3CFA2" />
    <rect x="0" y="53" width="64" height="5" fill="#D2B582" />
    <rect x="0" y="58" width="64" height="6" fill="#BD9A63" />
    <path
      d="M32 13 L45 47 H38.6 L35.9 39 H28.1 L25.4 47 H19 L32 13 Z M30 33.2 H34 L32 26.6 Z"
      fill="#2E5A88"
    />
  </g>
</svg>

<style>
  .brand-mark {
    display: block;
    flex: none;
    /* Match the ~22% corner of the clipped tile so the shadow hugs the icon. */
    border-radius: 22%;
    box-shadow: var(--shadow-sm);
  }
</style>
