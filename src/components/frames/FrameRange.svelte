<script lang="ts">
  import { Circle, Group, Rect, type KonvaDragTransformEvent } from 'svelte-konva';
  import type { FrameType } from 'src/enums/frame-type';
  import type { Frame } from 'src/types/frame';

  export let frame: Frame<FrameType.Range>;

  export let handleDrag: (e: KonvaDragTransformEvent) => void;
  export let handleTransform: (e: KonvaDragTransformEvent) => void;
</script>

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
      width: frame.width / 2,
      height: frame.height,
      fill: frame.thumbColor,
      cornerRadius: [frame.borderRadius, 0, 0, frame.borderRadius],
    }}
  />
  <Rect
    config={{
      x: frame.width / 2,
      y: 0,
      width: frame.width / 2,
      height: frame.height,
      fill: frame.trackColor,
      cornerRadius: [0, frame.borderRadius, frame.borderRadius, 0],
    }}
  />
  <Circle
    config={{
      x: frame.width / 2,
      y: frame.height / 2,
      radius: frame.thumbSize,
      fill: frame.thumbColor,
    }}
  />
</Group>
