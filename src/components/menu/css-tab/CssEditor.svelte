<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';
  import monacoPackage from 'src/packages/monaco';
  import { customCssStore } from 'src/stores/custom-css';
  import { debounce } from 'lodash';

  let editor: Monaco.editor.IStandaloneCodeEditor;
  let monaco: typeof Monaco;
  let editorContainer: HTMLElement;

  const handleChange = debounce(() => {
    $customCssStore = editor.getValue();
  }, 400)

  onMount(async () => {
    editor = monacoPackage.editor.create(editorContainer);
    const model = monacoPackage.editor.createModel($customCssStore, 'css');

    model.onDidChangeContent(handleChange);
    editor.setModel(model);
  });

  onDestroy(() => {
    monaco?.editor.getModels().forEach((model) => model.dispose());
    editor?.dispose();
  });
</script>

<div>
  <div class="container" bind:this={editorContainer} />
</div>

<style>
  .container {
    width: 100%;
    height: calc(100vh - 4rem);
  }
</style>
