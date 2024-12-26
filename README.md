# Lombard SDK Demo

This is a demo application showcasing how to implement the [Lombard Staking SDK](https://docs.lombard.finance/developers/staking-sdk/staking-sdk-v2) to enable Bitcoin staking functionality in your application.

## Features

- Bitcoin to LBTC staking flow implementation
- Network fee authorization and signature handling
- BTC deposit address generation and management
- Deposit status tracking
- Exchange rate and fee calculations

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
src/
├── modules/
│   ├── stake/           # Staking implementation
│   │   ├── components/  # Staking UI components
│   │   └── hooks/      # Custom hooks for SDK integration
│   ├── auth/           # Wallet connection
│   └── common/         # Shared components
```

## SDK Integration

This demo implements the core staking flow from the Lombard SDK:

1. Network Fee Authorization
2. BTC Deposit Address Generation
3. Deposit Management
4. LBTC Minting

For detailed SDK documentation, please refer to the [Lombard Staking SDK package](https://docs.lombard.finance/developers/staking-sdk/staking-sdk-v2) and [Lombard SDK V2 documentation](https://docs.lombard.finance/developers/staking-sdk/staking-sdk-v2).

