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
  import { sceneStore } from 'src/stores/scene';
  import { framesStore } from 'src/stores/frames';
  import type { PropertyConfig, SupportedTypes } from 'src/types/property-config';
  import PropertyLabel from './PropertyLabel.svelte';
  import ColorPicker from './components/color-picker/ColorPicker.svelte';
  import SegmentedControl from './components/segmented-control/SegmentedControl.svelte';

  let { selectedFrameId } = sceneStore;

  $: ({
    type,
    propertyName,
    label,
    options,
    mapValue,
    mapDisplayValue = (value: _Frame[Key]) => value && value.toString(),
    className = '',
    ...restProps
  } = $$props as PropertyConfig<Key, Type, _Frame>);

  $: rawValue = ($framesStore[$selectedFrameId!] as _Frame)?.[propertyName];
  $: value = mapDisplayValue(rawValue);

  const setValue = (value: _Frame[Key]) => {
    if (!$selectedFrameId) return;
    framesStore.updateFrame($selectedFrameId, { [propertyName]: value });
  };

  const handlePropertyUpdate: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setValue(mapValue(e.currentTarget.value));
  };

  const handleColorChange = (e: CustomEvent<{ hex?: string }>) => {
    if (!$selectedFrameId) return;
    framesStore.updateFrame($selectedFrameId, { [propertyName]: e.detail.hex });
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => e.currentTarget.select();
</script>

{#if type === 'color' && typeof label === 'string'}
  <div class="basis-full mt-2">
    <ColorPicker {value} {label} {propertyName} {handleColorChange} />
  </div>
{:else if type === 'textarea'}
  <PropertyLabel {label} isVertical>
    <textarea
      {value}
      {...restProps}
      id={propertyName}
      placeholder="Type here..."
      name={propertyName}
      on:change={handlePropertyUpdate}
      class={`bg-transparent focus:ring-0 focus:border-none border-none overflow-hidden ${className}`}
    />
  </PropertyLabel>
{:else if type === 'segmented-control' && options}
  <SegmentedControl {options} value={rawValue} {setValue} {className} />
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
</style>
