import { derived, writable } from 'svelte/store';
import type { Frame } from 'src/types/frame';

const scene = writable(new Map<HTMLElement, Frame>());

const { subscribe, update } = scene;

const addFrame = (element: HTMLElement, frame: Partial<Frame> = {}) => {
  update(scene => {
    if (scene.has(element)) {
      return scene;
    }

    return scene.set(element, {
      translate: [0, 0],
      width: 100,
      height: 50,
      parent: null,
      ...frame
    });
  });
};

const getFrame = (element?: HTMLElement) => derived(scene, $scene => {
  if (!element) {
    return null;
  }

  const frame = $scene.get(element);
  if (!frame) {
    addFrame(element);
  }

  return $scene.get(element);
});

const updateFrame = (element: HTMLElement, frame: Partial<Frame>) => {
  update(scene => {
    if (!scene.has(element)) {
      return scene;
    }

    return scene.set(element, {
      ...scene.get(element)!,
      ...frame
    });
  });
}


export { subscribe, addFrame, getFrame, updateFrame };
