import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRoutes } from 'Routes';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from 'config';
import { QueryLoading } from 'modules/common/components/QueryLoading';
import { SnackbarProvider } from 'modules/common/providers/SnackbarProvider';
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
            <SnackbarProvider>
              <CssBaseline />

              {isInitialized ? <AppRoutes /> : <QueryLoading isAbsolute />}
            </SnackbarProvider>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
