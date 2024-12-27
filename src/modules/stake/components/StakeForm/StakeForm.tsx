import { Card, CardContent, Stack } from '@mui/material';
import { useConnection } from 'modules/auth';
import { BtcAmountField } from 'modules/common/components/BtcAmountField';
import { IDepositFormValues } from 'modules/common/components/BtcAmountField/types';
import { Connect } from 'modules/common/components/Connect';
import { DEFAULT_CHAIN_ID, SATOSHI_SCALE } from 'modules/common/const';
import { useLBTCExchangeRate } from 'modules/stake/hooks/useLBTCExchangeRate';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { MintingFee } from './components/MintingFee';
import { StakingSummary } from './components/StakingSummary';

export const StakeForm = () => {
  const { isConnected, chainId } = useConnection();
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
            {isConnected ? (
              <>
                <MintingFee chainId={chainId || DEFAULT_CHAIN_ID} />
                <StakingSummary
                  chainId={chainId || DEFAULT_CHAIN_ID}
                  amount={amount}
                />
              </>
            ) : (
              <Stack direction="row" alignItems="center">
                <Connect size="large" sx={{ width: '100%' }}>
                  Connect wallet
                </Connect>
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
};
