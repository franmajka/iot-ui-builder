<script lang="ts">
  import Moveable, { type OnDrag, type OnDragStart } from "svelte-moveable";
	import type { MouseEventHandler } from 'svelte/elements';
  import * as scene from "src/stores/scene";

  let moveable: Moveable;
  let container: HTMLElement;
  let target: HTMLElement;

  let childrenCount = 2;
  $: frame = scene.getFrame(target);

  const onMouseDown: MouseEventHandler<HTMLElement> = e => {
    target = e.currentTarget;
    scene.addFrame(target);

    setTimeout(() => {
      moveable.dragStart(e);
    });
  }

  const onDragStart = (e: OnDragStart) => {
    console.log("onDragStart", e);
    e.set($frame?.translate || [0, 0]);
  }

  const onDrag = (e: OnDrag) => {
    console.log("onDrag", e);
    scene.updateFrame(target, {
      translate: e.beforeTranslate as [number, number],
    })
    e.target.style.transform = `translate3d(${$frame!.translate[0]}px, ${$frame!.translate[1]}px, 0)`
  }

  const onAddFrame = () => {
    const child = document.createElement("div");
    child.textContent = `Target ${++childrenCount}`;
    child.classList.add("p-4");
    child.addEventListener("mousedown", onMouseDown);
    container.appendChild(child);

    scene.addFrame(child);
    target = child;
  }
</script>

<div class="relative w-100 h-100" bind:this={container}>
  <div class="p-4" on:mousedown={onMouseDown}>Target 1</div>
  <div class="p-4" on:mousedown={onMouseDown}>Target 2</div>
</div>
<Moveable
  bind:this={moveable}
  target={target}

  draggable
  on:dragStart={({ detail }) => onDragStart(detail)}
  on:drag={({ detail }) => onDrag(detail)}
  resizable
/>

<button on:click={onAddFrame}>Add Frame</button>
