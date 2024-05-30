<script
  lang="ts"
  generics="
    Key extends KeyOf<_Frame>,
    Type extends SupportedTypes,
    _Frame extends FrameT = FrameByKey<Key>,
  "
>
	import type { KeyOf } from 'src/types/utils';
	import type { ChangeEventHandler, FocusEventHandler } from 'svelte/elements';
	import type { FrameByKey, FrameT } from 'src/types/frame';
  import { framesStore } from 'src/stores/frames'
	import type { PropertyConfig, SupportedTypes } from 'src/types/property-config';
	import PropertyLabel from './PropertyLabel.svelte';
  import ColorPicker from './components/color-picker/ColorPicker.svelte';

  $: ({
    type,
    propertyName,
    label,
    mapValue,
    mapDisplayValue,
    selectedFrame,
    className = '',
    ...restProps
  } = $$props as PropertyConfig<Key, Type, _Frame>)

  $: value = mapDisplayValue(selectedFrame[propertyName]);

  const handlePropertyUpdate: ChangeEventHandler<HTMLInputElement> = e => {
    if (!selectedFrame) return;
    framesStore.updateFrame(selectedFrame.id, { [propertyName]: mapValue(e.currentTarget.value) })
  }

  const handleColorChange = (e: CustomEvent<{ hex?: string }>) => {
    if (!selectedFrame) return;
    framesStore.updateFrame(selectedFrame.id, { [propertyName]: e.detail.hex });
  }

  const handleFocus: FocusEventHandler<HTMLInputElement> = e => e.currentTarget.select();
</script>

{#if type === 'color' && typeof label === 'string'}
  <div class="basis-full mt-2">
    <ColorPicker {value} {label} {propertyName} {handleColorChange} />
  </div>
{:else}
  <PropertyLabel {label}>
    <div class={`${propertyName} wrapper inline-block`}>
      <input
        {type}
        {value}
        {...restProps}
        id={propertyName}
        name={propertyName}
        on:change={handlePropertyUpdate}
        on:focus={handleFocus}
        step="any"
        class={`bg-transparent focus:ring-0 focus:border-none border-none ${className}`}
      />
    </div>
  </PropertyLabel>
{/if}



<style>
  .wrapper {
    position: relative;
  }
  .wrapper::after {
    user-select: none;
    position: absolute;
  }
  .wrapper.rotation::after {
    top: 4px;
    right: 4px;
    content: '°';
  }
  .wrapper.borderRadius::after {
    bottom: 8px;
    right: -8px;
    content: 'px';
  }
</style>
