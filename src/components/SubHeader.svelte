<script lang="ts">
  import Icon from '$components/ui/Icon.svelte';
  import { toMap } from '$lib/stores/router';
  interface Props {
    title: string;
    back?: () => void;
  }
  let { title, back = toMap }: Props = $props();
</script>

<header class="sub">
  <button class="back" aria-label="Back" onclick={back}>
    <Icon name="chevron-left" size={22} />
  </button>
  <h1>{title}</h1>
</header>

<style>
  .sub {
    display: flex;
    align-items: center;
    gap: var(--sp-2);
    padding: var(--sp-3) var(--sp-4);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    background: color-mix(in srgb, var(--bg) 90%, transparent);
    backdrop-filter: blur(8px);
    z-index: 10;
  }
  .back {
    display: grid;
    place-items: center;
    width: var(--tap);
    height: var(--tap);
    flex: none;
    border: none;
    background: transparent;
    color: var(--ink-soft);
    border-radius: var(--r-md);
    cursor: pointer;
  }
  .back:hover {
    background: var(--surface-2);
  }
  h1 {
    font-size: var(--fs-xl);
    margin: 0;
  }
</style>
