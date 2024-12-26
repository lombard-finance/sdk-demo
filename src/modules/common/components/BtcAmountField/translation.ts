import { Locale } from 'modules/i18n';

export const translation = {
  [Locale.en]: {
    amountLabel: 'You stake',
    lockedBalance: 'Locked balance: {value} BTC',
    lockedBalanceDescr:
      'This balance is temporarily locked and will be available after the transaction is confirmed on the blockchain.',
    insufficientBalance: 'Insufficient balance',
    insufficientBalanceDescr:
      'A minimum deposit of {minimumStake} BTC is required to stake. Add funds or use a different wallet to continue.',
    stakeDirectly: 'Stake directly',
    changeWallet: 'Change wallet',
    maxStakeAmountInfo:
      'Max amount adjusted for gas fees, the balance shown may be higher than the staked amount.',
  },
};
