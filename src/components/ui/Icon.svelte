<script lang="ts" module>
  import Flame from '@lucide/svelte/icons/flame';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import Trophy from '@lucide/svelte/icons/trophy';
  import Compass from '@lucide/svelte/icons/compass';
  import Library from '@lucide/svelte/icons/library';
  import Footprints from '@lucide/svelte/icons/footprints';
  import MapIcon from '@lucide/svelte/icons/map';
  import Search from '@lucide/svelte/icons/search';
  import SettingsIcon from '@lucide/svelte/icons/settings';
  import BookOpen from '@lucide/svelte/icons/book-open';
  import ListChecks from '@lucide/svelte/icons/list-checks';
  import Check from '@lucide/svelte/icons/check';
  import X from '@lucide/svelte/icons/x';
  import ChevronLeft from '@lucide/svelte/icons/chevron-left';
  import ChevronRight from '@lucide/svelte/icons/chevron-right';
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import Lock from '@lucide/svelte/icons/lock';
  import Download from '@lucide/svelte/icons/download';
  import Upload from '@lucide/svelte/icons/upload';
  import Sun from '@lucide/svelte/icons/sun';
  import Moon from '@lucide/svelte/icons/moon';
  import Monitor from '@lucide/svelte/icons/monitor';
  import Volume2 from '@lucide/svelte/icons/volume-2';
  import VolumeX from '@lucide/svelte/icons/volume-x';
  import Vibrate from '@lucide/svelte/icons/vibrate';
  import Info from '@lucide/svelte/icons/info';
  import Star from '@lucide/svelte/icons/star';
  import Award from '@lucide/svelte/icons/award';
  import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
  import Scale from '@lucide/svelte/icons/scale';
  import Layers from '@lucide/svelte/icons/layers';
  import Microscope from '@lucide/svelte/icons/microscope';
  import Telescope from '@lucide/svelte/icons/telescope';
  import GraduationCap from '@lucide/svelte/icons/graduation-cap';
  import ChartColumn from '@lucide/svelte/icons/chart-no-axes-column';
  import Ruler from '@lucide/svelte/icons/ruler';
  import TreePine from '@lucide/svelte/icons/tree-pine';
  import Landmark from '@lucide/svelte/icons/landmark';
  import Scroll from '@lucide/svelte/icons/scroll';
  import CircleCheck from '@lucide/svelte/icons/circle-check';
  import CircleX from '@lucide/svelte/icons/circle-x';
  import Lightbulb from '@lucide/svelte/icons/lightbulb';
  import House from '@lucide/svelte/icons/house';
  import ImageIcon from '@lucide/svelte/icons/image';
  import Play from '@lucide/svelte/icons/play';
  import Target from '@lucide/svelte/icons/target';
  import type { Component } from 'svelte';

  export const ICONS: Record<string, Component> = {
    flame: Flame,
    sparkles: Sparkles,
    trophy: Trophy,
    compass: Compass,
    library: Library,
    footprints: Footprints,
    map: MapIcon,
    search: Search,
    settings: SettingsIcon,
    'book-open': BookOpen,
    'list-checks': ListChecks,
    check: Check,
    x: X,
    'chevron-left': ChevronLeft,
    'chevron-right': ChevronRight,
    'arrow-right': ArrowRight,
    lock: Lock,
    download: Download,
    upload: Upload,
    sun: Sun,
    moon: Moon,
    monitor: Monitor,
    'volume-2': Volume2,
    'volume-x': VolumeX,
    vibrate: Vibrate,
    info: Info,
    star: Star,
    award: Award,
    'rotate-ccw': RotateCcw,
    scale: Scale,
    layers: Layers,
    microscope: Microscope,
    telescope: Telescope,
    'graduation-cap': GraduationCap,
    chart: ChartColumn,
    ruler: Ruler,
    'tree-pine': TreePine,
    landmark: Landmark,
    scroll: Scroll,
    'circle-check': CircleCheck,
    'circle-x': CircleX,
    lightbulb: Lightbulb,
    house: House,
    image: ImageIcon,
    play: Play,
    target: Target,
  };
</script>

<script lang="ts">
  interface Props {
    name: string;
    size?: number;
    strokeWidth?: number;
    class?: string;
  }
  let { name, size = 20, strokeWidth = 2, class: klass = '' }: Props = $props();
  const Cmp = $derived(ICONS[name]);
</script>

{#if Cmp}
  <Cmp {size} strokeWidth={strokeWidth} class={klass} aria-hidden="true" />
{/if}
