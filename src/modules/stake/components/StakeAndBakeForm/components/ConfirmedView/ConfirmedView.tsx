import { Alert, Button, Stack } from '@mui/material';
import { BackBtn } from 'modules/common/components/BackBtn';
import { BtcDepositAddress } from 'modules/stake/components/StakeForm/components/BtcDepositAddress';
import { ConfirmationTime } from 'modules/stake/components/StakeForm/components/ConfirmationTime';
import { MintingFee } from 'modules/stake/components/StakeForm/components/MintingFee';
import { StakingSummary } from 'modules/stake/components/StakeForm/components/StakingSummary';
import { useLBTCMintingFee } from 'modules/stake/hooks/useLBTCMintingFee';

interface IConfirmedViewProps {
  onBackClick: () => void;
  amount: string | number;
  chain: number;
  stakeAndBakeSignature: any;
  captchaToken?: string;
}

export const ConfirmedView = ({
  onBackClick,
  amount,
  chain,
  captchaToken,
  stakeAndBakeSignature,
}: IConfirmedViewProps) => {
  const { networkFee, isLoading } = useLBTCMintingFee(chain);

  return (
    <>
      <Stack direction="row" alignItems="center">
        <BackBtn onClick={onBackClick} />
      </Stack>

      <BtcDepositAddress />

      {stakeAndBakeSignature?.expirationDate && (
        <Alert severity="success">
          Protocol approval valid until{' '}
          {stakeAndBakeSignature.expirationDate.toLocaleString()}
        </Alert>
      )}

      <MintingFee chainId={chain} />

      <StakingSummary
        chainId={chain}
        amount={amount}
        fee={networkFee}
        isLoading={isLoading}
      />

      <ConfirmationTime />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!captchaToken}
      >
        Authorize
      </Button>
    </>
  );
};
