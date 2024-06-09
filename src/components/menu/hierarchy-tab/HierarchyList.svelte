<script lang="ts">
  import type { FrameHierarchy } from 'src/types/frame';
  import HierarchyItem from './HierarchyItem.svelte';

  export let hierarchy: FrameHierarchy;
  export let indent = 0;
</script>

<ul>
  {#each Object.entries(hierarchy) as [hierarchyItemId, children]}
    <HierarchyItem hierarchyItemId={+hierarchyItemId} {children} {indent} />
  {/each}
</ul>
