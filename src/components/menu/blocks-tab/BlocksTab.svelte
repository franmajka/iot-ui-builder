<script>
  import { blocksTabConfig } from 'src/constants/blocks-tab-config';
  import Block from './Block.svelte';
</script>

<div class="p-4 gap-x-4 gap-y-8 flex justify-between flex-wrap">
  {#each blocksTabConfig as block}
    <Block {...block} />
  {/each}
</div>
