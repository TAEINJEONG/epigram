import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false },
      mutations: { retry: false },
    },
  });
}

export function render(ui: React.ReactElement) {
  const queryClient = createTestQueryClient();
  return rtlRender(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

export * from '@testing-library/react';
