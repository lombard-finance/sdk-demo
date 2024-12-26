import { Box, Button, ButtonProps } from '@mui/material';
import { OKX_CONNECTOR_ID } from 'modules/auth/const';
import { getWalletIcon } from 'modules/auth/utils/getWalletIcon';
import { useConnect } from 'wagmi';

interface ConnectedButtonProps extends ButtonProps {
  address: string;
  connectorId: string;
}

export const ConnectedButton = ({
  address,
  connectorId,
  ...props
}: ConnectedButtonProps) => {
  const { connectors } = useConnect();

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const WalletIcon = getWalletIcon(connectorId);
  const okxConnector = connectors.find(c => c.id === OKX_CONNECTOR_ID);

  const getIconElement = () => {
    if (WalletIcon) {
      return <Box component={WalletIcon} height={24} width={24} />;
    }

    // For OKX, use the dynamic icon from the connector
    if (connectorId === OKX_CONNECTOR_ID && okxConnector?.icon) {
      return (
        <Box component="img" src={okxConnector.icon} height={24} width={24} />
      );
    }

    return null;
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      size="small"
      sx={{ backgroundColor: '#EAECEA' }}
      startIcon={getIconElement()}
      {...props}
    >
      {shortenAddress(address)}
    </Button>
  );
};
