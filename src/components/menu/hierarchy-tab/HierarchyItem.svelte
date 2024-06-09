<script lang="ts">
  import { capitalize } from 'lodash';
  import { framesStore } from 'src/stores/frames';
  import type { FrameHierarchy } from 'src/types/frame';
  import HierarchyList from './HierarchyList.svelte';
  import { sceneStore } from 'src/stores/scene';

  export let hierarchyItemId: number;
  export let children: FrameHierarchy;
  export let indent = 0;

  let { selectedFrameId } = sceneStore;

  $: currentFrame = $framesStore[hierarchyItemId]

  const activeClasses = 'bg-gray-700 text-white hover:bg-gray-800 focus:bg-gray-900';
  const inactiveClasses = 'bg-gray-100 text-gray-700 hover:bg-gray-500 hover:text-white focus:bg-gray-600 focus:text-white'

  const handleClick = () => {
    $selectedFrameId = hierarchyItemId;
  }
</script>

<li class="ml-3 mt-2">
  <button
    class={
      `inline-block px-4 py-1 rounded-full select-none cursor-pointer transition-colors outline-none ${
        $selectedFrameId === hierarchyItemId ? activeClasses : inactiveClasses
      }`
    }
    on:click={handleClick}
  >
    {capitalize(currentFrame?.type)} {currentFrame?.id}
  </button>

  <HierarchyList hierarchy={children} indent={indent + 1} />
</li>
