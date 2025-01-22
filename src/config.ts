import { createConfig, createStorage, http, noopStorage } from 'wagmi';
import { baseSepolia, bsc, bscTestnet, holesky } from 'wagmi/chains';
import { injected, metaMask } from 'wagmi/connectors';

// Wagmi is returning tBNB as the nativeCurrency.symbol for bscTestnet and MetaMask is complaining about it
// MetaMask - RPC Error: nativeCurrency.symbol does not match
// currency symbol for a network the user already has added with
// the same chainId. Received: tBNB, expected: BNB
const bscTestnetFixed = {
  ...bscTestnet,
  nativeCurrency: {
    ...bscTestnet.nativeCurrency,
    symbol: 'BNB',
  },
};

const bscFixed = {
  ...bsc,
  nativeCurrency: {
    ...bsc.nativeCurrency,
    symbol: 'BNB',
  },
};

export const config = createConfig({
  chains: [holesky, baseSepolia, bscTestnetFixed, bscFixed],
  transports: {
    [holesky.id]: http(),
    [baseSepolia.id]: http(),
    [bscTestnetFixed.id]: http(),
    [bsc.id]: http(),
  },
  storage: createStorage({
    storage:
      typeof window !== 'undefined' && window.localStorage
        ? window.localStorage
        : noopStorage,
  }),
  connectors: [injected(), metaMask()],
});
