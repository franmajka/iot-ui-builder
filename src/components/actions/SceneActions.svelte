<script lang="ts">
  import { SpeedDial } from 'flowbite-svelte';
  import SaveButton from './SaveButton.svelte';
  import HomeButton from './HomeButton.svelte';
  import HtmlButton from './HTMLButton.svelte';

</script>

<SpeedDial shadow color="green">
  <HomeButton />
  <HtmlButton />
  <SaveButton />
</SpeedDial>
