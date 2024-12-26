import {
  Box,
  Button,
  ButtonProps,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import { getChainIcon } from 'modules/auth/utils/getChainIcon';
import { SUPPORTED_CHAINS } from 'modules/stake/const';
import { useState } from 'react';
import { useChainId, useSwitchChain } from 'wagmi';

interface NetworkButtonProps extends ButtonProps {
  isConnected: boolean;
}

export const NetworkButton = ({
  isConnected,
  ...props
}: NetworkButtonProps) => {
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSwitchNetwork = (chainId: number) => {
    switchChain?.({ chainId });
    handleClose();
  };

  if (!isConnected) return null;

  const currentNetwork = chainId
    ? SUPPORTED_CHAINS[chainId]
    : 'Unsupported Network';
  const ChainIcon = chainId ? getChainIcon(chainId) : null;

  const chains = Object.entries(SUPPORTED_CHAINS).sort((a, b) => {
    if (Number(a[0]) === chainId) return -1;
    if (Number(b[0]) === chainId) return 1;
    return a[1].localeCompare(b[1]);
  });

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleClick}
        disabled={isPending}
        sx={{
          backgroundColor: '#EAECEA',
          ml: 1,
          gap: 1,
          maxWidth: 200,
        }}
        startIcon={
          ChainIcon && (
            <Box component={ChainIcon} sx={{ width: 20, height: 20 }} />
          )
        }
        {...props}
      >
        <Typography
          variant="body2"
          whiteSpace="nowrap"
          sx={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {currentNetwork}
        </Typography>
      </Button>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Stack p={1}>
          {chains.map(([id, name]) => {
            const NetworkIcon = getChainIcon(Number(id));
            return (
              <Button
                key={id}
                onClick={() => handleSwitchNetwork(Number(id))}
                disabled={chainId === Number(id)}
                sx={{
                  justifyContent: 'flex-start',
                  px: 2,
                  py: 1,
                  gap: 1,
                  minWidth: 200,
                  '&:hover': {
                    backgroundColor: 'customMain.200',
                  },
                  textDecoration: 'none',
                }}
              >
                {NetworkIcon && (
                  <Box component={NetworkIcon} sx={{ width: 20, height: 20 }} />
                )}
                <Typography variant="body2" whiteSpace="nowrap">
                  {name}
                </Typography>
              </Button>
            );
          })}
        </Stack>
      </Popover>
    </>
  );
};
