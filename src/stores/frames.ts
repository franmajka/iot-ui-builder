import { get, writable } from 'svelte/store';
import { defaultFrameMap } from 'src/constants/default-frame';
import { getIdGenerator } from 'src/utils/get-id-generator';
import type { FrameByType, FrameHierarchy, FrameT } from 'src/types/frame';
import { FrameType } from 'src/enums/frame-type';
import { round } from 'lodash';

const createFramesStore = () => {
  const { subscribe, update } = writable<Record<number, FrameT>>({});
  const { subscribe: subscribeHierarchy, update: updateHierarchy } = writable<FrameHierarchy>({});

  const idGenerator = getIdGenerator();

  const getParentHierarchy = ({ id, hierarchy, frames }: {
    id: number;
    hierarchy: FrameHierarchy;
    frames: Record<number, FrameT>;
  }) => {
    const parents: number[] = [];
    let currentParent = frames[id].parent;
    while (currentParent) {
      parents.push(currentParent);
      currentParent = frames[currentParent].parent;
    }

    return parents.reduceRight(
      (currentHierarchy, parent) => currentHierarchy[parent],
      hierarchy
    );
  }

  const addFrame = <Type extends FrameType = FrameType>(frame: Partial<FrameByType<Type>> = {}) => {
    const id = idGenerator.next().value!;

    update((frames) => {
      frames[id] = {
        ...defaultFrameMap[frame.type || FrameType.Rectangle],
        ...frame,
        id
      };

      updateHierarchy((hierarchy) => {
        const parentHierarchy = getParentHierarchy({ id, hierarchy, frames });
        parentHierarchy[id] = {};

        return hierarchy;
      });

      return frames;
    });

    return id;
  };

  const updateFrame = <Type extends FrameType = FrameType>(
    id: number,
    frame: Partial<FrameByType<Type>>
  ) => {
    for (const key in frame) {
      if (typeof frame[key] === 'number') {
        frame[key] = round(frame[key] as number, 2) as typeof frame[typeof key];
      }
    }

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

  const removeFrame = (id: number) => {
    const framesToBeRemoved: number[] = [id];

    const parentHierarchy = getParentHierarchy({
      id,
      hierarchy: get({ subscribe: subscribeHierarchy }),
      frames: get({ subscribe })
    });

    const hierarchiesToTraverse = [parentHierarchy[id]];

    while (hierarchiesToTraverse.length) {
      const currentHierarchy = hierarchiesToTraverse.pop()!;

      for (const key in currentHierarchy) {
        framesToBeRemoved.push(+key);
        hierarchiesToTraverse.push(currentHierarchy[+key]);
      }
    }

    updateHierarchy((hierarchy) => {
      delete parentHierarchy[id];
      return hierarchy;
    });

    update((frames) => {
      framesToBeRemoved.forEach((frameId) => {
        delete frames[frameId];
      });
      return frames;
    });
  }

  return {
    subscribe,
    addFrame,
    updateFrame,
    removeFrame,
    hierarchy: { subscribe: subscribeHierarchy }
  };
};

export const framesStore = createFramesStore();
