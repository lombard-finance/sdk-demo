import { Alert, Button, Stack } from '@mui/material';
import { useConnection } from 'modules/auth';
import { PropsWithChildren } from 'react';
import { useSwitchChain } from 'wagmi';

interface INetworkGuardProps extends PropsWithChildren {
  supportedChains: Record<number, string>;
}

export const NetworkGuard = ({ children, supportedChains }: INetworkGuardProps) => {
  const { chainId, isConnected } = useConnection();
  const { switchChain, isPending } = useSwitchChain();

  // If not connected, just render children
  if (!isConnected) {
    return children;
  }

  // Check if current chainId is in supported chains
  const isSupportedNetwork =
    chainId &&
    Object.keys(supportedChains).some(chain => Number(chain) === chainId);

  if (!isSupportedNetwork) {
    return (
      <Stack gap={2}>
        <Alert severity="error">
          Please switch to a supported network. Supported networks are:{' '}
          {Object.values(supportedChains)
            .map(chain => chain)
            .join(', ')}
        </Alert>

        <Stack alignItems="center" gap={1}>
          {Object.entries(supportedChains).map(chain => (
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
