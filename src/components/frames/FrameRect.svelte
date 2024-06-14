<script lang="ts">
  import { Group, Rect, Text, type KonvaDragTransformEvent } from 'svelte-konva';
  import type { FrameType } from 'src/enums/frame-type';
  import type { Frame } from 'src/types/frame';
  import { sceneStore } from 'src/stores/scene';
  import { tick } from 'svelte';

  export let frame: Omit<Frame<FrameType.Rectangle>, 'type'>;

  export let handleDrag: (e: KonvaDragTransformEvent) => void;
  export let handleTransform: (e: KonvaDragTransformEvent) => void;

  let { moveSelectedFrameToFront, updateTransformer } = sceneStore;
  let prevTextContent = frame.textContent;

  $: if (!prevTextContent != !frame.textContent) {
    prevTextContent = frame.textContent;

    tick().then(() => {
      moveSelectedFrameToFront();
      updateTransformer();
    });
  }
</script>

{#if frame.textContent}
  <Group
    config={{
      id: frame.id.toString(),
      x: frame.x,
      y: frame.y,
      width: frame.width,
      height: frame.height,
      rotation: frame.rotation,
      draggable: true
    }}
    on:dragmove={handleDrag}
    on:dragend={handleDrag}
    on:transform={handleTransform}
    on:transformend={handleTransform}
  >
    <Rect
      config={{
        x: 0,
        y: 0,
        width: frame.width,
        height: frame.height,
        fill: frame.backgroundColor,
        cornerRadius: frame.borderRadius
      }}
    />
    <Text
      config={{
        x: frame.padding,
        y: frame.padding,
        text: frame.textContent,
        fontSize: frame.fontSize,
        fill: frame.textColor,
        width: frame.width - frame.padding * 2,
        height: frame.height - frame.padding * 2,
        align: frame.textAlignment,
        verticalAlign: frame.textVerticalAlignment,
        fontStyle: frame.textStyle.filter((style) => ['italic', 'bold'].includes(style)).join(' '),
        textDecoration:
          frame.textStyle
            .filter((style) => ['underline', 'line-through'].includes(style))
            .join(' ') || 'none'
      }}
    />
  </Group>
{:else}
  <Rect
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
    on:dragmove={handleDrag}
    on:dragend={handleDrag}
    on:transform={handleTransform}
    on:transformend={handleTransform}
  />
{/if}
