<script lang="ts">
  import { Image, type KonvaDragTransformEvent } from 'svelte-konva';
  import type { FrameType } from 'src/enums/frame-type';
  import type { Frame } from 'src/types/frame';
  import errorImage from 'src/assets/error-image.svg';
  import { framesStore } from 'src/stores/frames';

  export let frame: Frame<FrameType.Image>;

  export let handleDrag: (e: KonvaDragTransformEvent) => void;
  export let handleTransform: (e: KonvaDragTransformEvent) => void;

  let loadedSrc: string;
  let image = document.createElement('img');

  const loadImage = (src: string) => {
    if (loadedSrc === src) return Promise.resolve(image);
    return new Promise<HTMLImageElement>((resolve) => {
      loadedSrc = src;
      image.src = src;
      image.onload = () => {
        framesStore.updateFrame(frame.id, { width: image.width, height: image.height });
        resolve(image);
      };
      image.onerror = () => (image.src = errorImage);
    });
  };

  $: loadImage(frame.src);
</script>

<Image
  config={{
    id: frame.id.toString(),
    x: frame.x,
    y: frame.y,
    width: frame.width,
    height: frame.height,
    rotation: frame.rotation,
    cornerRadius: frame.borderRadius,
    image,
    draggable: true
  }}
  on:dragmove={handleDrag}
  on:dragend={handleDrag}
  on:transform={handleTransform}
  on:transformend={handleTransform}
/>
