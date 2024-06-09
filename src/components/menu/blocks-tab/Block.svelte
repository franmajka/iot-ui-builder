<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import type { FrameT } from 'src/types/frame';

  export let title: string;
  export let src: string;
  export let frame: Partial<FrameT>;

  let isDragged = false;

  const handleDragStart = (e: DragEvent) => {
    e.dataTransfer!.setData('text/plain', JSON.stringify(frame));
    isDragged = true;
  };

  const handleDragEnd = () => {
    isDragged = false;
  };
</script>

<div
  class="transition-transform cursor-move hover:-translate-y-1"
  draggable={true}
  on:dragstart={handleDragStart}
  on:dragend={handleDragEnd}
>
  <div class="w-24 h-12 flex justify-center rounded-lg">
    <img {src} alt={title} class="h-full object-cover" />
  </div>
</div>
{#if !isDragged}
  <Tooltip>{title}</Tooltip>
{/if}
