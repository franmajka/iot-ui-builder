import { get } from 'svelte/store';
import { customCssStore } from 'src/stores/custom-css';
import { framesStore } from 'src/stores/frames';
import { currentRoute } from 'src/stores/router';

export const saveRequest = () => fetch(
  import.meta.env.VITE_APP_API_ORIGIN + '/' + get(currentRoute).split('/')[2],
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      frames: get(framesStore),
      hierarchy: get(framesStore.hierarchy),
      customCss: get(customCssStore),
    })
  },
);
