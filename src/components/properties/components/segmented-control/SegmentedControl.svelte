<script lang="ts" generics="V">
  import type { IconLabel } from 'src/types/property-config';
  import type { OptionT } from 'src/types/utils';

  import { Tooltip } from 'flowbite-svelte';
  import Fa from 'svelte-fa';

  type Value = V extends (infer T)[] ? T : V;
  type Option = OptionT<Value, string | IconLabel>;

  export let options: Option[];
  export let value: V;
  export let setValue: (value: V) => void;
  export let className: string = '';

  const sharedClasses =
    'p-3 w-full group-first:rounded-s-lg group-last:rounded-e-lg focus:outline-none';

  const getClasses = (option: Option) => {
    const isActive = Array.isArray(value) ? value.includes(option.value) : value === option.value;
    return isActive
      ? `${sharedClasses} text-gray-900 bg-gray-200 focus:bg-gray-300`
      : `${sharedClasses} text-gray-500 bg-white hover:text-gray-700 hover:bg-gray-50 focus:bg-gray-100`;
  };

  const handleButtonClick = (option: Option) => () => {
    if (Array.isArray(value)) {
      if (value.includes(option.value)) {
        setValue(value.filter((value) => value !== option.value) as V);
      } else {
        setValue([...value, option.value] as V);
      }
    } else {
      setValue(option.value as V);
    }
  };
</script>

<ul class={`inline-flex rounded-lg shadow divide-x ${className}`}>
  {#each options as option}
    <li class="group" role="presentation">
      {#if typeof option.label === 'string'}
        <button type="button" class={getClasses(option)} on:click={handleButtonClick(option)}>
          {option.label}
        </button>
      {:else}
        <button type="button" class={getClasses(option)} on:click={handleButtonClick(option)}>
          <Fa icon={option.label.icon} />
        </button>
        <Tooltip class="ring-0">{option.label.tooltip}</Tooltip>
      {/if}
    </li>
  {/each}
</ul>
