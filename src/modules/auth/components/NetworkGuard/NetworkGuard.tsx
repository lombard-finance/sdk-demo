import { Alert, Button, Stack } from '@mui/material';
import { useConnection } from 'modules/auth';
import { SUPPORTED_CHAINS } from 'modules/stake/const';
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
    chainId &&
    Object.keys(SUPPORTED_CHAINS).some(chain => Number(chain) === chainId);

  if (!isSupportedNetwork) {
    return (
      <Stack gap={2}>
        <Alert severity="error">
          Please switch to a supported network. Supported networks are:{' '}
          {Object.values(SUPPORTED_CHAINS)
            .map(chain => chain)
            .join(', ')}
        </Alert>

        <Stack alignItems="center" gap={1}>
          {Object.entries(SUPPORTED_CHAINS).map(chain => (
            <Button
              key={chain?.[0]}
              size="small"
              variant="outlined"
              onClick={() => switchChain({ chainId: Number(chain?.[0]) })}
              disabled={isPending}
              sx={{
                width: '100%',
              }}
            >
              Switch to {chain?.[1]}
            </Button>
          ))}
        </Stack>
      </Stack>
    );
  }

  return children;
};
