<script lang="ts">
import Scene from './components/Scene.svelte';
  import TemplatePicker from './components/TemplatePicker.svelte';
  import { currentRoute } from './stores/router';

</script>

{#if $currentRoute === '/'}
  <TemplatePicker />
{:else if new RegExp('^/?template/.+?/?$').test($currentRoute)}
  <Scene />
{:else}
  <p>404 Not Found</p>
{/if}
