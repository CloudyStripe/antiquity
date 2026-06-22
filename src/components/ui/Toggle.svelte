<script lang="ts">
  import { haptics } from '$lib/fx/haptics';
  interface Props {
    checked: boolean;
    label: string;
    onchange: (value: boolean) => void;
  }
  let { checked, label, onchange }: Props = $props();
</script>

<button
  type="button"
  role="switch"
  aria-checked={checked}
  aria-label={label}
  class="toggle"
  class:on={checked}
  onclick={() => {
    haptics.tick();
    onchange(!checked);
  }}
>
  <span class="knob"></span>
</button>

<style>
  .toggle {
    width: 52px;
    height: 30px;
    flex: none;
    border-radius: var(--r-pill);
    border: none;
    background: var(--surface-2);
    border: 1px solid var(--border-strong);
    position: relative;
    cursor: pointer;
    transition: background var(--dur-base) var(--ease-standard);
  }
  .toggle.on {
    background: var(--accent);
    border-color: var(--accent);
  }
  .knob {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fff;
    box-shadow: var(--shadow-sm);
    transition: transform var(--dur-base) var(--ease-spring);
  }
  .toggle.on .knob {
    transform: translateX(22px);
  }
</style>
