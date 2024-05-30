import { writable } from 'svelte/store';
import { defaultFrameMap } from 'src/constants/default-frame';
import { getIdGenerator } from 'src/utils/get-id-generator';
import type { FrameByType, FrameT } from 'src/types/frame';
import { FrameType } from 'src/enums/frame-type';

const createFramesStore = () => {
  const { subscribe, update } = writable<Record<number, FrameT>>({});

  const idGenerator = getIdGenerator();

  const addFrame = <Type extends FrameType = FrameType>(frame: Partial<FrameByType<Type>> = {}) => {
    const id = idGenerator.next().value!;

    update((frames) => {
      frames[id] = {
        ...defaultFrameMap[frame.type || FrameType.Rectangle],
        ...frame,
        id
      };

      return frames;
    });

    return id;
  };

  const updateFrame = <Type extends FrameType = FrameType>(
    id: number,
    frame: Partial<FrameByType<Type>>
  ) => {
    update((frames) => {
      if (!frames[id]) {
        return frames;
      }

      frames[id] = {
        ...frames[id],
        ...frame
      };

      return frames;
    });
  };

  const removeFrame = (id: number) =>
    update((frames) => {
      delete frames[id];
      return frames;
    });

  return {
    subscribe,
    addFrame,
    updateFrame,
    removeFrame
  };
};

export const framesStore = createFramesStore();
