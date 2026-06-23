<script lang="ts">
  import Icon from '$components/ui/Icon.svelte';
  import BrandMark from '$components/BrandMark.svelte';
  import { toSettings } from '$lib/stores/router';
</script>

<header class="hdr">
  <a class="brand" href="#/" aria-label="Antiquity home">
    <BrandMark size={34} />
    <span class="brand__name">Antiquity</span>
  </a>
  <button class="gear" aria-label="Settings" onclick={toSettings}>
    <Icon name="settings" size={20} />
  </button>
</header>

<style>
  .hdr {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-3);
    background: color-mix(in srgb, var(--bg) 88%, transparent);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
    padding: var(--sp-3) var(--sp-4);
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2);
    text-decoration: none;
    color: var(--ink);
  }
  .brand__name {
    font-family: var(--font-serif);
    font-size: var(--fs-xl);
    font-weight: 600;
  }
  .gear {
    display: grid;
    place-items: center;
    width: var(--tap);
    height: var(--tap);
    border: none;
    background: transparent;
    color: var(--ink-soft);
    border-radius: var(--r-md);
    cursor: pointer;
    transition: background var(--dur-fast) var(--ease-standard), color var(--dur-fast);
  }
  .gear:hover {
    background: var(--surface-2);
    color: var(--accent-ink);
  }
</style>
