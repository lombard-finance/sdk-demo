import { Alert, Button, Stack } from '@mui/material';
import { config } from 'config';
import { useConnection } from 'modules/auth';
import { PropsWithChildren } from 'react';
import { useSwitchChain } from 'wagmi';

export const NetworkGuard = ({ children }: PropsWithChildren) => {
  const { chainId, isConnected } = useConnection();
  const { switchChain, isPending } = useSwitchChain();

  // If not connected, just render children
  if (!isConnected) {
    return children;
  }

  // Check if current chainId is in supported chains
  const isSupportedNetwork =
    chainId && config.chains.some(chain => chain.id === chainId);

  if (!isSupportedNetwork) {
    return (
      <Stack gap={2}>
        <Alert severity="error">
          Please switch to a supported network. Supported networks are:{' '}
          {config.chains.map(chain => chain.name).join(', ')}
        </Alert>

        <Stack alignItems="center" gap={1}>
          {config.chains.map(chain => (
            <Button
              key={chain.id}
              size="small"
              variant="outlined"
              onClick={() => switchChain({ chainId: chain.id })}
              disabled={isPending}
              sx={{
                width: '100%',
              }}
            >
              Switch to {chain.name}
            </Button>
          ))}
        </Stack>
      </Stack>
    );
  }

  return children;
};
