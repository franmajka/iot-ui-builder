<script lang="ts">
  import { faCheck, faSave, faXmark } from '@fortawesome/free-solid-svg-icons';
  import { Button, Spinner, Tooltip } from 'flowbite-svelte';
  import { saveStore } from 'src/stores/save';
  import Fa from 'svelte-fa';

  let { isLoading, isResponseSuccess, save } = saveStore;
</script>

<Button
  class="rounded-full w-12 h-12 p-3"
  color={$isResponseSuccess === false ? 'red' : 'light'}
  on:click={save}
>
  {#if $isLoading}
    <Spinner />
  {:else}
    {#if $isResponseSuccess === null}
      <Fa icon={faSave} size="lg" />
    {:else if $isResponseSuccess}
      <Fa icon={faCheck} size="lg" />
    {:else}
      <Fa icon={faXmark} size="lg" />
    {/if}
  {/if}
</Button>

<Tooltip placement="left">
  {$isResponseSuccess === null ? 'Save' : $isResponseSuccess ? 'Saved' : 'Failed'}
</Tooltip>
