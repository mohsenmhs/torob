import { QueryClient } from "@tanstack/react-query";

// Create a shared QueryClient instance that all consumers will use
// This ensures we don't have multiple QueryClient instances causing context issues
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

