import { TChainId } from '@lombard.finance/sdk';

export interface IDepositFormValues {
  amount: string | number;
  chain: TChainId;
  stakedTxId?: string;
}
