<script lang="ts">
  import { onMount, tick } from 'svelte';
  import type Konva from 'konva';
  import {
    Layer,
    Stage,
    Transformer,
    type KonvaMouseEvent,
    type KonvaWheelEvent
  } from 'svelte-konva';
  import { omit } from 'lodash';
  import { framesStore } from 'src/stores/frames';
  import { sceneStore } from 'src/stores/scene';
  import { KEYBOARD_SENSITIVITY } from 'src/constants/keyboard-sensitivity';
  import Frame from './frames/Frame.svelte';
  import PropertiesPanel from './properties/PropertiesPanel.svelte';
  import MenuPanel from './menu/MenuPanel.svelte';
  import type { DragEventHandler } from 'svelte/elements';
  import type { FrameT } from 'src/types/frame';
  import { defaultFrameMap } from 'src/constants/default-frame';
  import SceneActions from './actions/SceneActions.svelte';
  import { saveStore } from 'src/stores/save';

  $: frames = Object.values($framesStore);

  let internalClipboard: (typeof frames)[number] | null = null;

  let { stage, transformer, selectedFrameId, moveSelectedFrameToFront } = sceneStore;

  const handleStageClick = ({ detail: e }: KonvaMouseEvent) => {
    if (e.target === e.target.getStage()) {
      $selectedFrameId = null;
      return;
    }

    let clickableTarget = e.target as Konva.Container | null;

    while (clickableTarget && !clickableTarget.id()) {
      clickableTarget = clickableTarget.getParent();
    }

    if (!clickableTarget || clickableTarget.id() === '#transformer') return;

    const id = +clickableTarget.id();
    $selectedFrameId = $framesStore[id] ? id : null;
  };

  const handleStageResize = ({ detail: e }: KonvaWheelEvent) => {
    const oldScale = $stage!.scaleX();

    const pointer = $stage!.getPointerPosition()!;
    const mousePointTo = {
      x: (pointer.x - $stage!.x()) / oldScale,
      y: (pointer.y - $stage!.y()) / oldScale
    };

    const newScale = $stage!.scaleX() * (e.evt.deltaY > 0 ? 0.9 : 1.1);
    $stage!.scale({ x: newScale, y: newScale });

    $stage!.position({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale
    });

    $stage!.batchDraw();
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = e => {
    const data = e.dataTransfer?.getData('text/plain');
    if (!data) return;

    const bareFrame = JSON.parse(data) as Partial<FrameT> & Required<Pick<FrameT, 'type'>>;

    const frame = {
      ...defaultFrameMap[bareFrame.type],
      ...bareFrame
    };

    const { left, top } = e.currentTarget.getBoundingClientRect();

    const newFrameId = framesStore.addFrame({
      ...frame,
      x: e.clientX - left - $stage!.x() - frame.width / 2,
      y: e.clientY - top - $stage!.y() - frame.height / 2
    });

    tick().then(() => {
      $selectedFrameId = newFrameId;
    });
  }

  const handleDeleteFrame = () => {
    if (!$selectedFrameId) return;

    framesStore.removeFrame($selectedFrameId);
    $selectedFrameId = null;
  };

  const handleMoveFrame = (dx: number, dy: number) => () => {
    if (!$selectedFrameId) return;

    moveSelectedFrameToFront();

    framesStore.updateFrame($selectedFrameId, {
      x: $framesStore[$selectedFrameId].x + dx * KEYBOARD_SENSITIVITY.frame,
      y: $framesStore[$selectedFrameId].y + dy * KEYBOARD_SENSITIVITY.frame
    });
  };

  const handleMoveScene = (dx: number, dy: number) => () => {
    $stage!.position({
      x: $stage!.x() + dx * KEYBOARD_SENSITIVITY.scene,
      y: $stage!.y() + dy * KEYBOARD_SENSITIVITY.scene
    });
  };

  const handleCopyFrame = () => {
    if (!$selectedFrameId) return;

    internalClipboard = $framesStore[$selectedFrameId];
  };

  const handlePasteFrame = () => {
    if (!internalClipboard) return;

    const position = $stage!.getRelativePointerPosition()!;
    const newFrame = {
      ...omit(internalClipboard, 'id'),
      x: position.x - internalClipboard.width / 2,
      y: position.y - internalClipboard.height / 2
    };

    const newFrameId = framesStore.addFrame(newFrame);
    tick().then(() => {
      $selectedFrameId = newFrameId;
    });
  };

  const handleSaveScene = (e: KeyboardEvent) => {
    e.preventDefault();
    saveStore.save();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (document.activeElement !== document.body) return;

    const keyHandlers: Record<string, (e: KeyboardEvent) => void> = e.ctrlKey
      ? {
          c: handleCopyFrame,
          v: handlePasteFrame,
          s: handleSaveScene,
        }
      : {
          Delete: handleDeleteFrame,
          ArrowUp: handleMoveFrame(0, -1),
          ArrowDown: handleMoveFrame(0, 1),
          ArrowLeft: handleMoveFrame(-1, 0),
          ArrowRight: handleMoveFrame(1, 0),
          w: handleMoveScene(0, 1),
          s: handleMoveScene(0, -1),
          a: handleMoveScene(1, 0),
          d: handleMoveScene(-1, 0)
        };

    keyHandlers[e.key]?.(e);
  };

  onMount(() => {
    document.addEventListener('keydown', handleKeyDown);

    framesStore.addFrame();
    tick().then(() => {
      framesStore.addFrame({ parent: 1, width: 50, height: 25, backgroundColor: '#00ff00' });
      tick().then(() => {
        framesStore.addFrame({ parent: 2, width: 25, height: 12.5, backgroundColor: '#0000ff' });
      });
    });

    return () => document.removeEventListener('keydown', handleKeyDown);
  });
</script>

<MenuPanel />

<div on:drop={handleDrop} on:dragover|preventDefault>
  <Stage
    bind:handle={$stage}
    config={{
      width: window.innerWidth - 256,
      height: window.innerHeight,
      draggable: true
    }}
    on:click={handleStageClick}
    on:wheel={handleStageResize}
  >
    <Layer>
      {#each frames as frame (frame.id)}
        <Frame {frame} />
      {/each}

      <Transformer bind:handle={$transformer} config={{ id: 'transformer' }} />
    </Layer>
  </Stage>
</div>

<PropertiesPanel />

<SceneActions />
