<script lang="ts">
  interface Props {
    value: number; // 0..1
    label?: string;
    height?: number;
  }
  let { value, label, height = 8 }: Props = $props();
  const pct = $derived(Math.round(Math.min(1, Math.max(0, value)) * 100));
</script>

<div
  class="track"
  style="height:{height}px"
  role="progressbar"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={pct}
  aria-label={label ?? 'progress'}
>
  <div class="fill" style="width:{pct}%"></div>
</div>

<style>
  .track {
    width: 100%;
    background: var(--surface-2);
    border-radius: var(--r-pill);
    overflow: hidden;
  }
  .fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent-strong));
    border-radius: var(--r-pill);
    transition: width var(--dur-slow) var(--ease-out);
  }
</style>
