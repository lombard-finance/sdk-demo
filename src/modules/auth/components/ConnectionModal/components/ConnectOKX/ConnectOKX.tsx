import {
  ConnectButton,
  IConnectButtonProps,
} from 'modules/auth/components/ConnectButton';
import { OKX_CONNECTOR_ID } from 'modules/auth/const';
import { useTranslation } from 'modules/i18n';
import { useConnect } from 'wagmi';

import { Box } from '@mui/material';
import { translation } from './translation';

export function ConnectOKX({
  isDisabled,
  onSuccess,
}: Pick<IConnectButtonProps, 'isDisabled' | 'onSuccess'>) {
  const { connectors, connect } = useConnect();
  const { t, keys } = useTranslation(translation);

  const okxConnector = connectors.find(
    connector => connector.id === OKX_CONNECTOR_ID,
  );

  if (!okxConnector) {
    return null;
  }

  const handleConnect = () => {
    connect(
      {
        connector: okxConnector,
      },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      },
    );
  };

  return (
    <ConnectButton
      isDisabled={isDisabled}
      title={t(keys.title)}
      iconSlot={
        <Box component="img" src={okxConnector.icon} height={24} width={24} />
      }
      onClick={handleConnect}
    />
  );
}
