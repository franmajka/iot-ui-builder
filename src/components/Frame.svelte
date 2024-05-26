<script lang="ts">
  import { Rect, type KonvaDragTransformEvent } from 'svelte-konva';
	import { FrameType } from 'src/enums/frame-type';
  import type { Frame } from 'src/types/frame';
	import { updateFrame } from 'src/stores/frames';

  export let frame: Frame;

  const handleDragEnd = ({ detail: e }: KonvaDragTransformEvent) => {
    updateFrame(frame.id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  }
</script>

{#if frame.type === FrameType.Rectangle }
  <Rect
    config={{
      id: frame.id.toString(),
      x: frame.x,
      y: frame.y,
      width: frame.width,
      height: frame.height,
      fill: frame.backgroundColor,
      draggable: true,
    }}
    on:dragend={handleDragEnd}
  />
{/if}
