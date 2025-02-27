import { isValidChain } from '@lombard.finance/sdk';
import { Alert, Button, Card, CardContent, Stack } from '@mui/material';
import { BtcAmountField } from 'modules/common/components/BtcAmountField';
import { DEFAULT_CHAIN_ID } from 'modules/common/const';
import { FormProvider } from 'react-hook-form';
import { useNetworkFeeSignature } from '../../hooks/useNetworkFeeSignature';
import { useStakeForm } from '../../hooks/useStakeForm';
import { isEthereumChain } from '../../utils/isEthereumChain';
import { BtcDepositAddress } from './components/BtcDepositAddress';
import { ConfirmationTime } from './components/ConfirmationTime';
import { FormConnectionGuard } from './components/FormConnectionGuard';
import { MintingFee } from './components/MintingFee';
import { StakingSummary } from './components/StakingSummary';
import { useLBTCMintingFee } from 'modules/stake/hooks/useLBTCMintingFee';
import { SUPPORTED_CHAINS } from 'modules/stake/const';

export const StakeForm = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    amount,
    minAmount,
    chainId = DEFAULT_CHAIN_ID,
    hasAddress,
  } = useStakeForm();

  const { hasSignature, isExpired, expirationDate } = useNetworkFeeSignature();

  const isEthereum =
    chainId && isValidChain(chainId) && isEthereumChain(chainId);

  const needsAuthorization = isEthereum && (!hasSignature || isExpired);

  const showGenerateButton = !hasAddress || needsAuthorization;

  const isDisabled = !amount || !chainId;

  const { networkFee, isLoading } = useLBTCMintingFee(chainId);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          sx={{
            background: 'white',
          }}
        >
          <CardContent
            sx={{
              border: '1px solid',
              borderColor: '#E2E9E9',
              m: 1,
            }}
          >
            <Stack gap={3}>
              <FormConnectionGuard
                methods={methods}
                supportedChains={SUPPORTED_CHAINS}
              >
                <BtcAmountField
                  control={methods.control}
                  minAmount={minAmount}
                />

                <MintingFee chainId={chainId || DEFAULT_CHAIN_ID} />

                <StakingSummary
                  chainId={chainId || DEFAULT_CHAIN_ID}
                  amount={amount}
                  isLoading={isLoading}
                  fee={networkFee}
                />

                <ConfirmationTime />

                {isEthereum && hasSignature && !isExpired && expirationDate && (
                  <Alert severity="success">
                    Deposit window open until {expirationDate.toLocaleString()}
                  </Alert>
                )}

                {showGenerateButton && (
                  <>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isDisabled}
                    >
                      {hasAddress && needsAuthorization
                        ? 'Authorize'
                        : 'Generate BTC address'}
                    </Button>
                  </>
                )}

                <BtcDepositAddress />
              </FormConnectionGuard>
            </Stack>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};
