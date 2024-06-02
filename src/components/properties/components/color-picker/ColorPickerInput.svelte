<script lang="ts">
  import type { FocusEventHandler } from 'svelte/elements';

  export let labelElement: HTMLLabelElement;

  export let hex: string;

  export let label: string;

  export let name: string | undefined = undefined;

  export let isOpen: boolean;

  function noop() {
    /* prevent browser color picker from opening unless javascript is broken */
  }

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => e.currentTarget.select();
</script>

<label
  bind:this={labelElement}
  on:click|preventDefault={noop}
  on:mousedown|preventDefault={noop}
  class="
    flex
    flex-col
    py-2
    px-4
    my-2
    font-medium
    text-gray-700
    focus-within:shadow-center-lg
    focus-within:!shadow-blue-500
    hover:shadow-center-lg
    hover:shadow-blue-300
    rounded-xl
    w-content
  "
>
  <div>{label}</div>

  <div class="flex items-center">
    <div class="container">
      <input
        type="color"
        id={name}
        {name}
        value={hex}
        on:click|preventDefault={noop}
        on:mousedown|preventDefault={noop}
        aria-haspopup="dialog"
      />
      <div class="alpha" />
      <div class="color shadow-center-lg shadow-black/30" style:background={hex} />
    </div>

    <input
      type="text"
      value={hex}
      readonly
      class="max-w-28 border-none focus:ring-0"
      on:click={handleFocus}
    />
  </div>
</label>

<style>
  .container {
    position: relative;
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--input-size, 25px);
  }

  input[type='text'] {
    font-family: monospace;
    line-height: var(--input-size, 25px);
  }

  input[type='color'] {
    margin: 0;
    padding: 0;
    border: none;
    width: 1px;
    height: 1px;
    flex-shrink: 0;
    opacity: 0;
  }

  .alpha {
    clip-path: circle(50%);
    background: var(--alpha-grid-bg);
  }

  .alpha,
  .color {
    position: absolute;
    width: var(--input-size, 25px);
    height: var(--input-size, 25px);
    border-radius: 50%;
    user-select: none;
  }

  input[type='color']:focus-visible ~ .color {
    outline: 2px solid var(--focus-color, red);
    outline-offset: 2px;
  }
</style>
