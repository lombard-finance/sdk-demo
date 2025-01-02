import { TChainId } from '@lombard.finance/sdk';
import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';
import { BackBtn } from 'modules/common/components/BackBtn';
import { LBTCIcon } from 'modules/common/icons';
import { SUPPORTED_CHAINS } from 'modules/stake/const';
import { useLBTCMintingFee } from 'modules/stake/hooks/useLBTCMintingFee';
import { default as AuthorizeFee } from './assets/authorize-fee.svg?react';

interface NetworkFeeViewProps {
  onBackClick: () => void;
  chain: TChainId;
}

export const NetworkFeeView = ({ onBackClick, chain }: NetworkFeeViewProps) => {
  const { networkFee, isLoading } = useLBTCMintingFee(chain);
  const chainName = SUPPORTED_CHAINS[chain];

  const lbtcAmount = networkFee?.decimalPlaces(8).toFormat() || '...';

  return (
    <Stack alignItems="center" justifyContent="center" gap={3}>
      <Stack direction="row" justifyContent="flex-start" width="100%">
        <BackBtn onClick={onBackClick} />
      </Stack>

      <Stack py={4}>
        <AuthorizeFee />
      </Stack>

      <Stack gap={3} px={2}>
        <Typography variant="h6">Authorize network Fee</Typography>

        <Typography color="text.secondary">
          To stake on {chainName}, you need to authorize a network fee that will
          be valid for 24 hours
        </Typography>

        <Stack
          gap={1}
          sx={{
            backgroundColor: theme => theme.palette.background.default,
            p: 2,
            borderRadius: 1,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography color="customMain.700">Network Fee</Typography>

            <Stack direction="row" alignItems="center" gap={1}>
              <Typography fontWeight="500">{lbtcAmount} LBTC</Typography>
              <LBTCIcon height={20} />
            </Stack>
          </Stack>
        </Stack>

        <Alert severity="success">
          <AlertTitle>What is being authorized?</AlertTitle>
          This covers Lombard Protocol’s costs for minting your LBTC on the
          destination network.
        </Alert>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          disabled={isLoading}
        >
          Authorize
        </Button>
      </Stack>
    </Stack>
  );
};
