import { TChainId } from '@lombard.finance/sdk';
import { Button, Stack, Typography } from '@mui/material';
import { BackBtn } from 'modules/common/components/BackBtn';
import { ConfirmationTime } from 'modules/stake/components/StakeForm/components/ConfirmationTime';
import { StakingSummary } from 'modules/stake/components/StakeForm/components/StakingSummary';

interface AuthorizationViewProps {
  onBackClick: () => void;
  amount: string | number;
  chain: TChainId;
  captchaToken?: string;
  stakeAndBakeSignature?: {
    signature?: string;
    expirationDate?: Date;
  };
}

export const AuthorizationView = ({
  onBackClick,
  amount,
  chain,
  stakeAndBakeSignature,
}: AuthorizationViewProps) => {
  return (
    <Stack gap={3}>
      <Stack direction="row" alignItems="center">
        <BackBtn onClick={onBackClick} />
      </Stack>

      <Typography variant="h6">Sign Stake & Bake Authorization</Typography>

      <StakingSummary chainId={chain} amount={amount} />

      <ConfirmationTime />

      {stakeAndBakeSignature && stakeAndBakeSignature.expirationDate ? (
        <Typography color="success.main" sx={{ mt: 1 }}>
          Authorization valid until{' '}
          {stakeAndBakeSignature.expirationDate.toLocaleString()}
        </Typography>
      ) : (
        <Stack gap={2}>
          <Stack direction="row" gap={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!!stakeAndBakeSignature?.signature}
            >
              Authorize Stake & Bake
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
