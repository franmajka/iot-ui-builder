<script lang="ts">
  import { onMount } from 'svelte';
  import { getTemplatesRequest } from 'src/api/templates';
  import { createAsyncRequestStore } from 'src/stores/async-requests';
  import { Button, Spinner, Tooltip } from 'flowbite-svelte';
  import { navigate } from 'src/stores/router';
  import { v4 } from 'uuid';
  import Fa from 'svelte-fa';
  import { faPlus } from '@fortawesome/free-solid-svg-icons';

  let { isLoading, isResponseSuccess, response, sendRequest: getTemplates } = createAsyncRequestStore(getTemplatesRequest);

  onMount(() => {
    getTemplates();
  });

  const handleCardClick = (templateId: string) => () => {
    navigate(`/template/${templateId}`);
  };

  const handleCreateNewTemplate = () => {
    navigate(`/template/${v4()}`);
  };
</script>


{#if $isLoading}
  <div class="w-full h-screen flex justify-center items-center">
    <Spinner size={32} />
  </div>
{:else if $isResponseSuccess}
  {#if $response && $response.length}
    <h2 class="text-4xl mt-8 text-center">Your Templates</h2>
    <div class="flex flex-wrap gap-10 p-10">
      {#each $response as template (template.id)}
        <div class="flex justify-center h-64 p-4 min-w-80 rounded-xl shadow-center-lg hover:shadow-center-2xl">
          <div>
            <a href={template.id} on:click|preventDefault={handleCardClick(template.id)}>
              <img
                src={`${import.meta.env.VITE_APP_API_ORIGIN}/${template.preview}`}
                alt={`Template ${template.id}`}
                class="h-full"
              />
            </a>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="w-full h-screen flex justify-center items-center">
      <div class="text-center">
        <h2 class="text-4xl">You do not have templates</h2>
        <p class="text-xl text-gray-600 my-4">Click on the button below to create a new template</p>
        <Button
          class="btn btn-primary text-center"
          color="green"
          on:click={handleCreateNewTemplate}
        >
          <Fa icon={faPlus} size="lg" class="mr-2" />
          Create new template
        </Button>
      </div>
    </div>
  {/if}

  <Button class='fixed end-6 bottom-6 rounded-full w-12 h-12' color="green" shadow on:click={handleCreateNewTemplate}>
    <Fa icon={faPlus} size='lg' />
  </Button>

  <Tooltip placement="left">Create new template</Tooltip>
{:else}
  <div class="w-full flex justify-center items-center p-8">
    <p class="text-red-500">Failed to load templates</p>
  </div>
{/if}
