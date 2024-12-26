import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRoutes } from 'Routes';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from 'config';
import { QueryLoading } from 'modules/common/components/QueryLoading';
import { useInitializeLocale } from 'modules/i18n';
import { lightTheme } from 'modules/themes';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

export function App() {
  const { isInitialized } = useInitializeLocale();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />

            {isInitialized ? <AppRoutes /> : <QueryLoading isAbsolute />}
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
