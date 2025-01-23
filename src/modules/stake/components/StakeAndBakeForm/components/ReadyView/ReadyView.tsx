import { IStakeAndBakeVault, TChainId } from '@lombard.finance/sdk';
import { Alert, Button, Stack } from '@mui/material';
import { BtcAmountField } from 'modules/common/components/BtcAmountField';
import { BtcDepositAddress } from 'modules/stake/components/StakeForm/components/BtcDepositAddress';
import { ConfirmationTime } from 'modules/stake/components/StakeForm/components/ConfirmationTime';
import { MintingFee } from 'modules/stake/components/StakeForm/components/MintingFee';
import { StakingSummary } from 'modules/stake/components/StakeForm/components/StakingSummary';
import { IStakeAndBakeFormValues } from 'modules/stake/hooks/useStakeAndBakeForm';
import { UseFormReturn } from 'react-hook-form';
import { ProtocolSelector } from '../ProtocolSelector';

interface ReadyViewProps {
  methods: UseFormReturn<IStakeAndBakeFormValues>;
  minAmount: number;
  networkFeeSignature?: {
    hasSignature?: boolean;
    expirationDate?: Date;
  };
  stakeAndBakeSignature: {
    signature?: string;
    expirationDate?: Date;
  };
  amount: string | number;
  chain: TChainId;
  vaults: IStakeAndBakeVault[];
  handleStakeAndBakeAuthorize: () => Promise<void>;
  hasAddress?: boolean;
}

export const ReadyView = ({
  handleStakeAndBakeAuthorize,
  methods,
  minAmount,
  stakeAndBakeSignature,
  amount,
  chain,
  vaults,
}: ReadyViewProps) => {
  const isStakeAndBakeExpired =
    !stakeAndBakeSignature?.expirationDate ||
    stakeAndBakeSignature.expirationDate < new Date();

  return (
    <Stack gap={3}>
      <BtcAmountField
        control={methods.control}
        minAmount={minAmount}
        isDisabled={Boolean(stakeAndBakeSignature && !isStakeAndBakeExpired)}
      />

      <ProtocolSelector vaults={vaults} />

      <MintingFee chainId={chain} />

      <StakingSummary chainId={chain} amount={amount} />

      <ConfirmationTime />

      {isStakeAndBakeExpired ? (
        <>
          <Button
            variant="contained"
            onClick={e => {
              e.preventDefault();
              handleStakeAndBakeAuthorize();
            }}
          >
            Authorize
          </Button>
        </>
      ) : (
        <Alert severity="info">
          Stake & Bake authorization valid until{' '}
          {stakeAndBakeSignature.expirationDate?.toLocaleString()}
        </Alert>
      )}

      <BtcDepositAddress />
    </Stack>
  );
};
