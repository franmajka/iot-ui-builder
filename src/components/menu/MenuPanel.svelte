<script lang="ts">
  import { TabItem, Tabs, Tooltip } from 'flowbite-svelte';
  import BlocksTab from './blocks-tab/BlocksTab.svelte';
  import HierarchyTab from './hierarchy-tab/HierarchyTab.svelte';
  import CssTab from './css-tab/CssTab.svelte';
  import Fa from 'svelte-fa';
  import { faSitemap } from '@fortawesome/free-solid-svg-icons';
  import { faCss3, faHive } from '@fortawesome/free-brands-svg-icons';

  const tabsConfig = [
    {
      title: 'Blocks',
      icon: faHive,
      content: BlocksTab,
      open: true,
    },
    {
      title: 'Hierarchy',
      icon: faSitemap,
      content: HierarchyTab
    },
    {
      title: 'CSS',
      icon: faCss3,
      content: CssTab
    }
  ];

</script>

<div class="w-64 h-screen shadow-center-2xl bg-white">
  <Tabs
    tabStyle="none"
    contentClass="bg-transparent"
    defaultClass="flex text-sm font-medium divide-x shadow-md"
    inactiveClasses="w-full p-4 text-gray-500 bg-white hover:text-gray-700 hover:bg-gray-50 focus:bg-gray-100"
    activeClasses="w-full p-4 text-gray-900 bg-gray-200 focus:bg-gray-300"
    divider={false}
  >
    {#each tabsConfig as tab }
      <TabItem class='w-full' open={tab.open}>
        <div slot="title">
          <Fa icon={tab.icon} class="block w-full" />
        </div>
        <svelte:component this={tab.content} />
      </TabItem>
      <Tooltip>{tab.title}</Tooltip>
    {/each}
  </Tabs>
</div>
