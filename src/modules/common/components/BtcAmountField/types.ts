import { TChainId } from '@lombard.finance/sdk';

export interface IStakeFormValues {
  amount: string | number;
  chain: TChainId;
  stakedTxId?: string;
  captchaToken?: string;
}
