import {
  ConnectButton,
  IConnectButtonProps,
} from 'modules/auth/components/ConnectButton';
import { METAMASK_CONNECTOR_ID } from 'modules/auth/const';
import { useTranslation } from 'modules/i18n';
import { useConnect } from 'wagmi';
import { default as MetamaskIcon } from './assets/metamask.svg?react';

import { Box } from '@mui/material';
import { translation } from './translation';

export function ConnectMetamask({
  isDisabled,
  onSuccess,
}: Pick<IConnectButtonProps, 'isDisabled' | 'onSuccess'>) {
  const { connectors, connect } = useConnect();
  const { t, keys } = useTranslation(translation);

  const metamaskConnector = connectors.find(
    connector => connector.id === METAMASK_CONNECTOR_ID,
  );

  if (!metamaskConnector) {
    return null;
  }

  const handleConnect = () => {
    connect(
      {
        connector: metamaskConnector,
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
      iconSlot={<Box component={MetamaskIcon} height={24} width={24} />}
      onClick={handleConnect}
    />
  );
}
