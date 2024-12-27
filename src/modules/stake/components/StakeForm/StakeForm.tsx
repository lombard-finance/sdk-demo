import { Card, CardContent, Stack } from '@mui/material';
import { useConnection } from 'modules/auth';
import { BtcAmountField } from 'modules/common/components/BtcAmountField';
import { IDepositFormValues } from 'modules/common/components/BtcAmountField/types';
import { Connect } from 'modules/common/components/Connect';
import { DEFAULT_CHAIN_ID } from 'modules/common/const';
import { useForm } from 'react-hook-form';
import { MintingFee } from './components/MintingFee';

export const StakeForm = () => {
  const { isConnected, chainId } = useConnection();
  const { control, handleSubmit } = useForm<IDepositFormValues>({
    defaultValues: {
      amount: '',
      chain: DEFAULT_CHAIN_ID,
    },
    mode: 'onChange',
  });

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
          <Stack gap={2}>
            <BtcAmountField control={control} />
            {isConnected ? (
              <MintingFee chainId={chainId || DEFAULT_CHAIN_ID} />
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
