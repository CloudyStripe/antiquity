<script lang="ts">
  import { onMount } from 'svelte';
  import { route, navigate } from '$lib/stores/router';
  import { settings } from '$lib/stores/settings';
  import CourseMap from './routes/CourseMap.svelte';
  import UnitPlayer from './routes/UnitPlayer.svelte';
  import UnitComplete from './routes/UnitComplete.svelte';
  import Challenge from './routes/Challenge.svelte';
  import Stats from './routes/Stats.svelte';
  import Settings from './routes/Settings.svelte';
  import Glossary from './routes/Glossary.svelte';
  import DatingPrimer from './routes/DatingPrimer.svelte';
  import Credits from './routes/Credits.svelte';

  // One-time dating-conventions primer on first run.
  onMount(() => {
    if (!$settings.primerSeen && $route.name === 'map') {
      navigate('/primer');
    }
  });
</script>

{#if $route.name === 'map'}
  <CourseMap />
{:else if $route.name === 'unit'}
  {#key $route.unitId}
    <UnitPlayer unitId={$route.unitId} />
  {/key}
{:else if $route.name === 'complete'}
  {#key $route.unitId}
    <UnitComplete unitId={$route.unitId} />
  {/key}
{:else if $route.name === 'challenge'}
  <Challenge />
{:else if $route.name === 'stats'}
  <Stats />
{:else if $route.name === 'settings'}
  <Settings />
{:else if $route.name === 'glossary'}
  <Glossary />
{:else if $route.name === 'primer'}
  <DatingPrimer />
{:else if $route.name === 'credits'}
  <Credits />
{/if}
