import { InputAdornment, Stack, Typography } from '@mui/material';
import { default as BtcIcon } from 'modules/common/assets/bitcoin.svg?react';
import { AmountInput } from 'modules/common/components/AmountInput';
import {
  BTC_DECIMALS,
  DECIMAL_PLACES_BTC,
  ONativeToken,
} from 'modules/common/const';
import { useValidateAmount } from 'modules/common/hooks/useValidateAmount';
import { useTranslation } from 'modules/i18n';
import { Control, Controller } from 'react-hook-form';
import { ErrorAlert } from './ErrorAlert';
import { translation } from './translation';
import { IDepositFormValues } from './types';

interface IBtcAmountFieldProps {
  control: Control<IDepositFormValues>;
  minAmount?: number;
}

export function BtcAmountField({
  control,
  minAmount,
}: IBtcAmountFieldProps): JSX.Element {
  const { keys, t } = useTranslation(translation);

  const validateAmount = useValidateAmount({
    balance: undefined,
    minAmount,
  });

  return (
    <Controller
      control={control}
      name="amount"
      rules={{
        validate: validateAmount,
      }}
      render={({ field, fieldState: { error } }) => (
        <AmountInput
          {...field}
          labelText={
            <Typography fontWeight={500}>{t(keys.amountLabel)}</Typography>
          }
          helperAlert={error && <ErrorAlert errorMessage={error?.message} />}
          error={!!error}
          token={ONativeToken.BTC}
          decimalPlaces={DECIMAL_PLACES_BTC}
          maxDecimalsLen={BTC_DECIMALS}
          InputProps={{
            sx: {
              height: '80px',
              fontSize: '24px',
              px: 2,
            },
            startAdornment: (
              <InputAdornment position="start" sx={{ height: '100%' }}>
                <Stack direction="row" gap={1}>
                  <BtcIcon height={24} width={24} />
                  <Typography color="text.primary" fontWeight="500">
                    BTC
                  </Typography>
                </Stack>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
