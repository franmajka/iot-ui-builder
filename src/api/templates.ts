import { customCssStore } from 'src/stores/custom-css';
import { framesStore } from 'src/stores/frames';
import { currentRoute } from 'src/stores/router';
import { get } from 'svelte/store';

export const getTemplateRequest = async () => {
  const response = await fetch(import.meta.env.VITE_APP_API_ORIGIN + '/' + get(currentRoute).split('/')[2]);
  const data = await response.json();

  framesStore.set(data.frames ?? {});
  framesStore.hierarchy.set(data.hierarchy ?? {});
  customCssStore.set(data.customCss ?? '');
};

export const getTemplatesRequest = async () => {
  const response = await fetch(import.meta.env.VITE_APP_API_ORIGIN);
  return response.json() as Promise<Array<{ preview: string, id: string }>>;
}
