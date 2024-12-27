import { Button, Card, CardContent, Stack } from '@mui/material';
import { useConnection } from 'modules/auth';
import { BtcAmountField } from 'modules/common/components/BtcAmountField';
import { IDepositFormValues } from 'modules/common/components/BtcAmountField/types';
import { DEFAULT_CHAIN_ID, SATOSHI_SCALE } from 'modules/common/const';
import { useLBTCExchangeRate } from 'modules/stake/hooks/useLBTCExchangeRate';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ConfirmationTime } from './components/ConfirmationTime';
import { FormConnectionGuard } from './components/FormConnectionGuard';
import { MintingFee } from './components/MintingFee';
import { StakingSummary } from './components/StakingSummary';

export const StakeForm = () => {
  const { chainId } = useConnection();
  const { minAmount: minAmountSats } = useLBTCExchangeRate(
    chainId || DEFAULT_CHAIN_ID,
  );

  const minAmount = useMemo(() => {
    if (!minAmountSats) return 0;

    return minAmountSats / SATOSHI_SCALE;
  }, [minAmountSats]);

  const { control, handleSubmit, watch } = useForm<IDepositFormValues>({
    defaultValues: {
      amount: '',
      chain: DEFAULT_CHAIN_ID,
    },
    mode: 'onChange',
  });

  const amount = watch('amount');

  const onSubmit = (data: IDepositFormValues) => {
    console.log(data);
  };

  const isDisabled = !amount || !chainId;

  return (
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
            <BtcAmountField control={control} minAmount={minAmount} />

            <FormConnectionGuard>
              <MintingFee chainId={chainId || DEFAULT_CHAIN_ID} />
              <StakingSummary
                chainId={chainId || DEFAULT_CHAIN_ID}
                amount={amount}
              />
              <ConfirmationTime />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isDisabled}
              >
                Generate BTC address
              </Button>
            </FormConnectionGuard>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
};
