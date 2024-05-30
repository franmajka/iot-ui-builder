<script lang="ts">
	import { onMount } from 'svelte';
	import type Konva from 'konva';
	import { Layer, Stage, Text, Transformer, type KonvaMouseEvent, type KonvaWheelEvent } from 'svelte-konva';
	import { omit } from 'lodash';
  import { framesStore } from "src/stores/frames";
	import { KEYBOARD_SENSITIVITY } from 'src/constants/keyboard-sensitivity';
	import Frame from './frames/Frame.svelte';
	import PropertiesPanel from './properties/PropertiesPanel.svelte';
	import { FrameType } from 'src/enums/frame-type';

  $: frames = Object.values($framesStore);
  let selectedFrameId: number | null = null;
  let internalClipboard: (typeof frames)[number] | null = null;

  let stage: Konva.Stage;
  let transformer: Konva.Transformer;

  const handleAddFrameClick = () => {
    framesStore.addFrame();
  }

  const handleAddImageClick = () => {
    framesStore.addFrame({ type: FrameType.Image });
  }

  const moveSelectedFrameToFront = () => {
    stage.findOne(`#${selectedFrameId}`)?.moveToTop();
    transformer.moveToTop();
  };

  const updateTransformer = () => {
    if (!transformer) return;

    const selectedNode = stage.findOne(`#${selectedFrameId}`);

    if (selectedNode) {
      transformer.nodes([selectedNode]);
    } else {
      transformer.nodes([]);
    }
  }

  const handleStageClick = ({ detail: e }: KonvaMouseEvent) => {
    if (e.target === e.target.getStage()) {
      selectedFrameId = null;
      updateTransformer();
      return;
    }

    if (e.target.getParent()?.id() === '#transformer') return;

    const id = +e.target.id();
    selectedFrameId = $framesStore[id] ? id : null;
    moveSelectedFrameToFront();
    updateTransformer();
  }

  const handleStageResize = ({ detail: e }: KonvaWheelEvent) => {
    const oldScale = stage.scaleX();

    const pointer = stage.getPointerPosition()!;
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = stage.scaleX() * (e.evt.deltaY > 0 ? 0.9 : 1.1);
    stage.scale({ x: newScale, y: newScale });

    stage.position({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });

    stage.batchDraw();
  }

  const handleDeleteFrame = () => {
    if (!selectedFrameId) return;

    framesStore.removeFrame(selectedFrameId);
    selectedFrameId = null;
    updateTransformer();
  }

  const handleMoveFrame = (dx: number, dy: number) => () => {
    if (!selectedFrameId) return;

    moveSelectedFrameToFront();

    framesStore.updateFrame(selectedFrameId, {
      x: $framesStore[selectedFrameId].x + (dx * KEYBOARD_SENSITIVITY.frame),
      y: $framesStore[selectedFrameId].y + (dy * KEYBOARD_SENSITIVITY.frame),
    });
  }

  const handleMoveScene = (dx: number, dy: number) => () => {
    stage.position({
      x: stage.x() + dx * KEYBOARD_SENSITIVITY.scene,
      y: stage.y() + dy * KEYBOARD_SENSITIVITY.scene,
    });
  }

  const handleCopyFrame = () => {
    if (!selectedFrameId) return;

    internalClipboard = $framesStore[selectedFrameId];
  }

  const handlePasteFrame = () => {
    if (!internalClipboard) return;

    const newFrame = { ...omit(internalClipboard, 'id'), ...stage.getRelativePointerPosition()! };
    selectedFrameId = framesStore.addFrame(newFrame);
    setTimeout(() => {

      moveSelectedFrameToFront();
      updateTransformer();
    });
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (document.activeElement !== document.body) return;

    const keyHandlers: Record<string, (e: KeyboardEvent) => void> = e.ctrlKey
      ? ({
        'c': handleCopyFrame,
        'v': handlePasteFrame,
      })
      : ({
        'Delete': handleDeleteFrame,
        'ArrowUp': handleMoveFrame(0, -1),
        'ArrowDown': handleMoveFrame(0, 1),
        'ArrowLeft': handleMoveFrame(-1, 0),
        'ArrowRight': handleMoveFrame(1, 0),
        'w': handleMoveScene(0, 1),
        's': handleMoveScene(0, -1),
        'a': handleMoveScene(1, 0),
        'd': handleMoveScene(-1, 0),
      });

    keyHandlers[e.key]?.(e);
  };

  onMount(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  });
</script>

<Stage
  bind:handle={stage}
  config={{
    width: window.innerWidth,
    height: window.innerHeight,
    draggable: true,
  }}
  on:click={handleStageClick}
  on:wheel={handleStageResize}
>
  <Layer>
    {#each frames as frame (frame.id)}
      <Frame {frame} />
    {/each}

    <Text
      config={{
        x: 100,
        y: 100,
        text: 'Add Frame!',
        fontSize: 30,
        fill: 'black',
      }}
      on:click={handleAddFrameClick}
    />
    <Text
      config={{
        x: 100,
        y: 200,
        text: 'Add Image!',
        fontSize: 30,
        fill: 'black',
      }}
      on:click={handleAddImageClick}
    />
    <Transformer bind:handle={transformer} config={{ id: 'transformer' }} />
  </Layer>
</Stage>

<PropertiesPanel {selectedFrameId} />
