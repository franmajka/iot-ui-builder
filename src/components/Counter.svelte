<script lang="ts">
  import Moveable, { type OnDrag, type OnDragStart } from "svelte-moveable";
	import type { MouseEventHandler } from 'svelte/elements';

  let frame = {
    translate: [0, 0],
  };

  let moveable: Moveable;
  let target: HTMLElement;

  const onMouseDown: MouseEventHandler<HTMLElement> = e => {
    target = e.currentTarget;

    setTimeout(() => {
      moveable.dragStart(e);
    });
  }

  const onDragStart = (e: OnDragStart) => {
    console.log("onDragStart", e);
    e.set(frame.translate);
  }

  const onDrag = (e: OnDrag) => {
    console.log("onDrag", e);
    frame.translate = e.beforeTranslate;
    e.target.style.transform = `translate3d(${frame.translate[0]}px, ${frame.translate[1]}px, 0)`
  }
</script>

<div class="relative w-100 h-100">
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
