import { Button, ButtonProps, Stack } from '@mui/material';
import { ConnectionModal } from 'modules/auth/components/ConnectionModal';
import { useConnection } from 'modules/auth/hooks/useConnection';
import { useState } from 'react';
import { ConnectedButton } from './components/ConnectedButton';
import { NetworkButton } from './components/NetworkButton';
import { WalletPopover } from './components/WalletPopover';

interface Props extends ButtonProps {
  children?: React.ReactNode;
}

export const Connect = ({ children, ...props }: Props) => {
  const { address, isConnected, connectedWallet, disconnect } = useConnection();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => setAnchorEl(null);

  const handleDisconnect = () => {
    disconnect();
    handleClosePopover();
  };

  if (isConnected) {
    return (
      <>
        <Stack direction="row" alignItems="center" gap={1}>
          <NetworkButton isConnected={isConnected} />

          <ConnectedButton
            address={address}
            connectorId={connectedWallet.connector.id}
            onClick={handleOpenPopover}
            {...props}
          />
        </Stack>
        <WalletPopover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          address={address}
          onClose={handleClosePopover}
          onDisconnect={handleDisconnect}
        />
      </>
    );
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        size="small"
        {...props}
      >
        {children || 'Connect'}
      </Button>

      <ConnectionModal isOpened={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};
