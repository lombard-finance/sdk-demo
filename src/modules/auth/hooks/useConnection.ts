import { useAccount, useConnections, useDisconnect } from 'wagmi';

export function useConnection() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const connectors = useConnections();
  const isConnected = !!address;
  const connectedWallet = connectors[0];

  if (isConnected) {
    return {
      address: address as `0x${string}`,
      isConnected: true,
      connectedWallet,
      disconnect,
    } as const;
  }

  return {
    address: undefined,
    isConnected: false,
    connectedWallet,
    disconnect,
  } as const;
}
