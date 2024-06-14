<script>
  import { faHome } from '@fortawesome/free-solid-svg-icons';
  import { Button, Tooltip } from 'flowbite-svelte';
  import { navigate } from 'src/stores/router';
  import Fa from 'svelte-fa';
</script>

<Button
  class="rounded-full w-12 h-12 p-3"
  color="light"
  on:click={() => navigate('/')}
>
  <Fa icon={faHome} size="lg" />
</Button>

<Tooltip placement="left">Home</Tooltip>
