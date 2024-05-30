<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import type { IconLabel } from 'src/types/property-config';
  import Fa from 'svelte-fa';

  export let label: string | IconLabel;
</script>

<label
  class="
    flex
    items-center
    py-1
    px-2
    my-2
    font-medium
    text-gray-700
    focus-within:shadow-center-lg
    focus-within:!shadow-blue-500
    hover:shadow-center-lg
    hover:shadow-blue-300
    rounded-xl
    flex-wrap
  "
>
  {#if typeof label === 'string'}
    {label}
  {:else if label}
    <Fa icon={label.icon} size="sm" class="inline" />
  {/if}

  <slot />
</label>

{#if typeof label === 'object'}
  <Tooltip class="ring-0">{label.tooltip}</Tooltip>
{/if}
