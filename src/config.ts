import { createConfig, http } from 'wagmi';
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

export const config = createConfig({
  chains: [holesky, baseSepolia, bscTestnetFixed],
  transports: {
    [holesky.id]: http(),
    [baseSepolia.id]: http(),
    [bscTestnetFixed.id]: http(),
    [bsc.id]: http(),
  },
  connectors: [injected(), metaMask()],
});
