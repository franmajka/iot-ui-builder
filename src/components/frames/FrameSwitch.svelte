<script lang="ts">
  import { Group, Rect, type KonvaDragTransformEvent } from 'svelte-konva';
  import type { FrameType } from 'src/enums/frame-type';
  import type { Frame } from 'src/types/frame';

  export let frame: Frame<FrameType.Switch>;

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
      width: frame.width,
      height: frame.height,
      fill: frame.trackInactiveColor,
      cornerRadius: frame.borderRadius,
    }}
  />
  <Rect
    config={{
      x: frame.padding,
      y: frame.padding,
      width: frame.height - 2 * frame.padding,
      height: frame.height - 2 * frame.padding,
      fill: frame.thumbInactiveColor,
      cornerRadius: frame.borderRadius,
    }}
  />
</Group>
