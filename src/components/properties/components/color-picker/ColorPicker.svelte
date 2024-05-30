<script lang="ts">
	import type { FrameKeys } from 'src/types/frame';
	import { type ComponentEvents } from 'svelte';
	import ColorPicker from 'svelte-awesome-color-picker';
	import ColorPickerWrapper from './ColorPickerWrapper.svelte';
	import ColorPickerInput from './ColorPickerInput.svelte';

  export let value: string;
  export let label: string;
  export let propertyName: FrameKeys;
  export let handleColorChange: (e: ComponentEvents<ColorPicker>['input']) => void;
</script>

<ColorPicker
  components={{ wrapper: ColorPickerWrapper, input: ColorPickerInput }}
  hex={value}
  label={label}
  name={propertyName}
  on:input={handleColorChange}
/>
