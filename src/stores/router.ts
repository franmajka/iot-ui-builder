import { writable } from 'svelte/store';

export const currentRoute = writable(window.location.pathname);

export const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  currentRoute.set(path);
}

window.addEventListener('popstate', () => {
  currentRoute.set(window.location.pathname);
});
