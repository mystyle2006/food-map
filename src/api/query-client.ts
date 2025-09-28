import { QueryClient } from '@tanstack/react-query';
import { numbers } from '@app/constants/numbers';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: numbers.DEFAULT_QUERY_STALE_TIME,
      throwOnError: true,
    },
    mutations: {
      retry: false,
    },
  },
});
