<script lang="ts">
  export let wrapper: HTMLElement;
  export let isOpen: boolean;
  export let isDialog: boolean;

</script>
<div
	bind:this={wrapper}
	class="
    shadow-center-2xl
    shadow-black/50
    bg-white
    p-2
    mx-2
    rounded-lg
    hidden
    w-content
  "
	class:is-open={isOpen}
	role={isDialog ? 'dialog' : undefined}
	aria-label="color picker"
>
	<slot />
</div>

<style>
	.is-open {
		display: inline-block;
	}
	[role='dialog'] {
		position: absolute;
		left: -3.5rem;
    top: 50%;
    transform: translate(-100%, -50%);
		z-index: var(--picker-z-index, 2);
	}
</style>
