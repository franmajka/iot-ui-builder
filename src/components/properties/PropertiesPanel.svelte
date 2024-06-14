<script lang="ts">
  import { framesStore } from 'src/stores/frames';
  import Property from './Property.svelte';
  import { sceneStore } from 'src/stores/scene';
  import { baseProperties } from './properties-config/base-properties';
  import { typeSpecificProperties } from './properties-config/type-specific-properties';

  let { selectedFrameId } = sceneStore;

  $: selectedFrame = $selectedFrameId ? $framesStore[$selectedFrameId] : null;

  $: properties = [
    ...baseProperties,
    ...(selectedFrame ? typeSpecificProperties[selectedFrame.type] : [])
  ].sort((a, b) => {
      const aOrder = ('order' in a && a.order) || 0;
      const bOrder = ('order' in b && b.order) || 0;

      return aOrder - bOrder;
    })
    .map((row) => row.properties);
</script>

{#if selectedFrame}
  <div class="absolute top-0 bottom-0 right-0 w-96 p-8 shadow-center-2xl bg-white">
    <h4 class="text-lg font-bold text-center mb-4">Properties</h4>

    {#each properties as row}
      {#if Array.isArray(row)}
        <div class="flex justify-between items-center">
          {#each row as property (property.propertyName)}
            <Property {...property} />
          {/each}
        </div>
      {/if}
    {/each}
  </div>
{/if}
