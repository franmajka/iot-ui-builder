import type Konva from 'konva';
import { get, writable } from 'svelte/store';

const createSceneStore = () => {
  const selectedFrameId = writable<number | null>(null);
  const stage = writable<Konva.Stage | undefined>(undefined);
  const transformer = writable<Konva.Transformer | undefined>(undefined);

  const moveSelectedFrameToFront = () => {
    get(stage)
      ?.findOne(`#${get(selectedFrameId)}`)
      ?.moveToTop();
    get(transformer)?.moveToTop();
  };

  const updateTransformer = () => {
    const transformerValue = get(transformer);

    if (!transformerValue) return;

    const selectedNode = get(stage)?.findOne(`#${get(selectedFrameId)}`);

    if (selectedNode) {
      transformerValue.nodes([selectedNode]);
    } else {
      transformerValue.nodes([]);
    }
  };

  return {
    selectedFrameId: {
      subscribe: selectedFrameId.subscribe,
      set: (value: number | null) => {
        selectedFrameId.set(value);
        moveSelectedFrameToFront();
        updateTransformer();
      }
    },
    stage,
    transformer,
    moveSelectedFrameToFront,
    updateTransformer
  };
};

export const sceneStore = createSceneStore();
