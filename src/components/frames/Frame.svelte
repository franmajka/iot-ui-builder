<script lang="ts" generics="Type extends FrameType">
  import { debounce } from 'lodash';
  import { type KonvaDragTransformEvent } from 'svelte-konva';
  import { FrameType } from 'src/enums/frame-type';
  import type { FrameByType, FrameKonvaMap } from 'src/types/frame';
  import { framesStore } from 'src/stores/frames';
  import FrameRect from './FrameRect.svelte';
  import FrameImage from './FrameImage.svelte';

  export let frame: FrameByType<Type>;

  let handle: FrameKonvaMap[Type];

  const handleDragStart = () => {
    handle.moveToTop();
    handle.getStage()!.findOne('#transformer')!.moveToTop();
  }

  const handleDrag = debounce(({ detail: e }: KonvaDragTransformEvent) => {
    framesStore.updateFrame(frame.id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  }, 0);

  const handleTransform = debounce(({ detail: e }: KonvaDragTransformEvent) => {
    framesStore.updateFrame(frame.id, {
      x: e.target.x(),
      y: e.target.y(),
      width: e.target.width() * e.target.scaleX(),
      height: e.target.height() * e.target.scaleY(),
      rotation: e.target.rotation(),
    });

    e.target.scaleX(1);
    e.target.scaleY(1);
  }, 0);

  const handleGuard = <T extends FrameType>(_: T, handle: FrameKonvaMap[FrameType]): handle is FrameKonvaMap[T] => true;
</script>

{#if frame.type === FrameType.Rectangle && handleGuard(frame.type, handle)}
  <FrameRect
    bind:handle={handle}
    frame={frame}
    handleDragStart={handleDragStart}
    handleDrag={handleDrag}
    handleTransform={handleTransform}
  />
{:else if frame.type === FrameType.Image && handleGuard(frame.type, handle)}
  <FrameImage
    bind:handle={handle}
    frame={frame}
    handleDragStart={handleDragStart}
    handleDrag={handleDrag}
    handleTransform={handleTransform}
  />
{/if}
