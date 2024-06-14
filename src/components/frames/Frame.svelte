<script lang="ts" generics="Type extends FrameType">
  import { debounce } from 'lodash';
  import { type KonvaDragTransformEvent } from 'svelte-konva';
  import { FrameType } from 'src/enums/frame-type';
  import type { FrameByType } from 'src/types/frame';
  import { framesStore } from 'src/stores/frames';
  import FrameRect from './FrameRect.svelte';
  import FrameImage from './FrameImage.svelte';
  import FrameRange from './FrameRange.svelte';

  export let frame: FrameByType<Type>;

  const handleDrag = debounce(({ detail: e }: KonvaDragTransformEvent) => {
    framesStore.updateFrame(frame.id, {
      x: e.target.x(),
      y: e.target.y()
    });
  }, 0);

  const handleTransform = debounce(({ detail: e }: KonvaDragTransformEvent) => {
    framesStore.updateFrame(frame.id, {
      x: e.target.x(),
      y: e.target.y(),
      width: e.target.width() * e.target.scaleX(),
      height: e.target.height() * e.target.scaleY(),
      rotation: e.target.rotation()
    });

    e.target.scaleX(1);
    e.target.scaleY(1);
  }, 0);
</script>

{#if frame.type === FrameType.Rectangle || frame.type === FrameType.Button}
  <FrameRect {frame} {handleDrag} {handleTransform} />
{:else if frame.type === FrameType.Image}
  <FrameImage {frame} {handleDrag} {handleTransform} />
{:else if frame.type === FrameType.Range}
  <FrameRange {frame} {handleDrag} {handleTransform} />
{/if}
