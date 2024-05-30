<script lang="ts">
  import type Konva from 'konva';
  import { Rect, Text, type KonvaDragTransformEvent } from 'svelte-konva';
  import type { FrameType } from 'src/enums/frame-type';
  import type { Frame } from 'src/types/frame';

  export let frame: Frame<FrameType.Rectangle>;
  export let handle: Konva.Rect;

  export let handleDragStart: (e: KonvaDragTransformEvent) => void;
  export let handleDrag: (e: KonvaDragTransformEvent) => void;
  export let handleTransform: (e: KonvaDragTransformEvent) => void;
</script>

<Rect
  bind:handle
  config={{
    id: frame.id.toString(),
    x: frame.x,
    y: frame.y,
    width: frame.width,
    height: frame.height,
    fill: frame.backgroundColor,
    rotation: frame.rotation,
    cornerRadius: frame.borderRadius,
    draggable: true
  }}
  on:dragstart={handleDragStart}
  on:dragmove={handleDrag}
  on:dragend={handleDrag}
  on:transform={handleTransform}
  on:transformend={handleTransform}
/>
{#if frame.textContent}
  <Text
    config={{
      x: frame.x,
      y: frame.y,
      text: frame.textContent,
      fontSize: 14,
      fill: '#00ff00',
      width: frame.width,
      height: frame.height,
      align: 'center',
      verticalAlign: 'middle'
    }}
  />
{/if}
