import { writable } from 'svelte/store';
import { DEFAULT_FRAME } from 'src/constants/default-frame';
import { getIdGenerator } from 'src/utils/get-id-generator';
import type { Frame } from 'src/types/frame';

const { subscribe, update } = writable<Record<number, Frame>>({});

const idGenerator = getIdGenerator();

const addFrame = (frame: Partial<Frame> = {}) => update(scene => {
  const id = idGenerator.next().value!;
  scene[id] = {
    ...DEFAULT_FRAME,
    ...frame,
    id,
  };

  return scene;
});

const updateFrame = (id: number, frame: Partial<Frame>) => {
  update(scene => {
    if (!scene[id]) {
      return scene;
    }

    scene[id] = {
      ...scene[id],
      ...frame
    };

    return scene;
  });
}


export { subscribe, addFrame, updateFrame };
