import { default as MetamaskIcon } from '../components/ConnectionModal/components/ConnectMetamask/assets/metamask.svg?react';
import { METAMASK_CONNECTOR_ID, OKX_CONNECTOR_ID } from '../const';

export const getWalletIcon = (connectorId: string) => {
  switch (connectorId) {
    case METAMASK_CONNECTOR_ID:
      return MetamaskIcon;
    case OKX_CONNECTOR_ID:
      // OKX icon is loaded dynamically from the connector
      return null;
    default:
      return null;
  }
};