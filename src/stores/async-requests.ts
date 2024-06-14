import { get, writable } from 'svelte/store';

type Options = {
  shouldResetResponseIn?: number;
};

export const createAsyncRequestStore =
<Args extends unknown[] = void[], T = void>
(request: (...args: Args) => Promise<T>, { shouldResetResponseIn }: Options = {}) => {
  const { subscribe: isLoadingSubscribe, set: setIsLoading } = writable(false);
  const { subscribe: isResponseSuccessSubscribe, set: setIsResponseSuccess } = writable(null as boolean | null);
  const { subscribe: responseSubscribe, set: setResponse } = writable<T | null>(null);

  const sendRequest = async (...args: Args) => {
    const isLoading = get({ subscribe: isLoadingSubscribe });
    const isResponseSuccess = get({ subscribe: isResponseSuccessSubscribe });
    if (isLoading || isResponseSuccess !== null) return;

    try {
      setIsLoading(true);

      const response = await request(...args);

      setIsResponseSuccess(true);
      setResponse(response);
    } catch (error) {
      setIsResponseSuccess(false);
    } finally {
      setIsLoading(false);
      if (shouldResetResponseIn) {
        setTimeout(() => {
          setIsResponseSuccess(null);
        }, shouldResetResponseIn);
      }
    }
  }

  return {
    isLoading: { subscribe: isLoadingSubscribe },
    isResponseSuccess: { subscribe: isResponseSuccessSubscribe },
    response: { subscribe: responseSubscribe },
    sendRequest,
  };
};
