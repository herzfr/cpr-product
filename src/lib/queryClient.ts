import { QueryClient, type DefaultOptions } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes memastikan data masih fresh
      gcTime: 1000 * 60 * 5, // 10 minutes durasi penyimpanman cache
      retry: (failureCount, error) => {
        if (error instanceof Error && 'status' in error) {
          const status = (error as { status?: number }).status;
          if (status === 404 || status === 403 || status === 401) {
            return false;
          }
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: false,
    },
  } as DefaultOptions,
});
