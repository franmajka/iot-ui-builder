<script lang="ts">
  import { framesStore } from 'src/stores/frames';
  import HierarchyList from './HierarchyList.svelte';

  let { hierarchy } = framesStore;
</script>

<div class="p-4">
  <HierarchyList hierarchy={$hierarchy} />
</div>
