import { get, writable } from 'svelte/store';
import { framesStore } from './frames';

const { subscribe: isLoadingSubscribe, set: setIsLoading } = writable(false);
const { subscribe: isResponseSuccessSubscribe, set: setIsResponseSuccess } = writable(null as boolean | null);

const save = async () => {
  const isLoading = get({ subscribe: isLoadingSubscribe });
  const isResponseSuccess = get({ subscribe: isResponseSuccessSubscribe });
  if (isLoading || isResponseSuccess !== null) return;

  try {
    setIsLoading(true);
    const response = await fetch(import.meta.env.VITE_APP_API_ORIGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        frames: get(framesStore),
        hierarchy: get(framesStore.hierarchy),
        templateId: 1,
      })
    })

    const json = await response.json();

    setIsResponseSuccess(true);
  } catch (error) {
    setIsResponseSuccess(false);
  } finally {
    setIsLoading(false);
    setTimeout(() => {
      setIsResponseSuccess(null)
    }, 2000);
  }
}

export const saveStore = {
  isLoading: { subscribe: isLoadingSubscribe},
  isResponseSuccess: { subscribe: isResponseSuccessSubscribe},
  save,
};
