<script>
  import { faHtml5 } from '@fortawesome/free-brands-svg-icons';
  import { Button, Tooltip } from 'flowbite-svelte';
  import { currentRoute } from 'src/stores/router';
  import Fa from 'svelte-fa';
</script>

<a href={
  import.meta.env.VITE_APP_API_ORIGIN +
  '/' + $currentRoute.split('/')[2] +
  '/template.html'
} target="_blank">
  <Button
    class="rounded-full w-12 h-12 p-3"
    color="light"
  >
    <Fa icon={faHtml5} size="lg" />
  </Button>
</a>

<Tooltip placement="left">View HTML</Tooltip>
