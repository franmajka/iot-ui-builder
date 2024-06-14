import { writable } from 'svelte/store';

const createCustomCssStore = () => {
  const { subscribe, set } = writable<string>('');

  return {
    subscribe,
    set,
  };
};

export const customCssStore = createCustomCssStore();
