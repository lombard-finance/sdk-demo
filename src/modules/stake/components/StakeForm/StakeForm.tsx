import { Alert, Button, Card, CardContent, Stack } from '@mui/material';
import { BtcAmountField } from 'modules/common/components/BtcAmountField';
import { RecaptchaField } from 'modules/common/components/RecaptchaField';
import { DEFAULT_CHAIN_ID } from 'modules/common/const';
import { FormProvider } from 'react-hook-form';
import { useNetworkFeeSignature } from '../../hooks/useNetworkFeeSignature';
import { useStakeForm } from '../../hooks/useStakeForm';
import { BtcDepositAddress } from './components/BtcDepositAddress';
import { ConfirmationTime } from './components/ConfirmationTime';
import { FormConnectionGuard } from './components/FormConnectionGuard';
import { MintingFee } from './components/MintingFee';
import { StakingSummary } from './components/StakingSummary';

export const StakeForm = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    amount,
    minAmount,
    chainId,
    hasAddress,
    isDisabled,
  } = useStakeForm();

  const { hasSignature, isExpired, expirationDate } = useNetworkFeeSignature();

  const showGenerateButton = !hasAddress || (hasSignature && isExpired);

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
              <BtcAmountField control={methods.control} minAmount={minAmount} />

              <FormConnectionGuard>
                <MintingFee chainId={chainId || DEFAULT_CHAIN_ID} />

                <StakingSummary
                  chainId={chainId || DEFAULT_CHAIN_ID}
                  amount={amount}
                />

                <ConfirmationTime />

                {hasSignature && !isExpired && expirationDate && (
                  <Alert severity="info">
                    Deposit window open until {expirationDate.toLocaleString()}
                  </Alert>
                )}

                {showGenerateButton && (
                  <>
                    <RecaptchaField />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isDisabled}
                    >
                      Generate BTC address
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
