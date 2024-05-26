<script lang="ts">
  import * as framesStore from "src/stores/frames";
	import { derived } from 'svelte/store';
	import { Layer, Stage, Text, Transformer } from 'svelte-konva';
	import type { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
	import Frame from './Frame.svelte';

  let frames = derived(framesStore, $frames => Object.values($frames));
  let selectedFrameId: number | null = null;

  let transformer: TransformerType;

  const handleAddFrameClick = () => {
    framesStore.addFrame();
    setTimeout(() => transformer?.moveToTop());
  }

  const updateTransformer = () => {
    if (!transformer) return;

    const stage = transformer.getStage()!;
    const selectedNode = stage.findOne(`#${selectedFrameId}`);

    if (selectedNode) {
      transformer.nodes([selectedNode]);
    } else {
      transformer.nodes([]);
    }
  }

  const handleStageClick = ({ detail: e }) => {
    if (e.target === e.target.getStage()) {
      selectedFrameId = null;
      updateTransformer();
      return;
    }

    if (e.target.getParent().className === "Transformer") return;

    const id = e.target.id();
    console.log(id);
    selectedFrameId = $framesStore[id] ? id : null;
    updateTransformer();
  }
</script>

<Stage
  config={{ width: window.innerWidth, height: window.innerHeight }}
  on:click={handleStageClick}
>
  <Layer>
    {#each $frames as frame (frame.id)}
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
    <Transformer bind:handle={transformer} />
  </Layer>
</Stage>
