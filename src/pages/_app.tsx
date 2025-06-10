import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import nextI18NextConfig from '../../next-i18next.config.js';
import { appWithTranslation } from 'next-i18next';
import { LocaleSwitcher } from '@/pages/localeSwitcher.tsx';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="font-pre">
        <Component {...pageProps} />
        <div className="fixed bottom-10 right-10">
          <LocaleSwitcher />
        </div>
      </main>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
