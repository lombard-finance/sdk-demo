import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  InputAdornment,
  Skeleton,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import BigNumber from 'bignumber.js';
import { ReactNode, forwardRef, useMemo } from 'react';

import { DECIMAL_PLACES } from 'modules/common/const';
import { useTranslation } from 'modules/i18n';
import { IInputNumberProps, InputNumber } from '../InputNumber';

import { getUniqueId } from 'modules/common/utils/getUniqueId';
import { InfoIconWithTooltip } from '../InfoIconWithTooltip';
import { translation } from './translation';
import { useAmountInputStyles } from './useAmountInputStyles';

const defaultInputId = `amount-input-${getUniqueId()}`;

type InputProps = Pick<
  IInputNumberProps,
  | 'onChange'
  | 'onBlur'
  | 'value'
  | 'name'
  | 'isIntegerOnly'
  | 'maxDecimalsLen'
  | 'InputProps'
>;

export interface IAmountInputProps extends InputProps {
  balance?: BigNumber;
  balanceText?: ReactNode;
  balanceTooltip?: ReactNode;
  helperText?: string;
  helperAlert?: ReactNode;
  error?: boolean;
  id?: string;
  sx?: SxProps;
  token?: string;
  isDisabled?: boolean;
  isBalanceLoading?: boolean;
  labelTooltip?: ReactNode;
  labelText?: ReactNode;
  decimalPlaces?: number;
  onMaxClick?: VoidFunction;
  isMaxLoading?: boolean;
  showEmptyBalance?: boolean;
  hideArrows?: boolean;
}

export const AmountInput = forwardRef<HTMLInputElement, IAmountInputProps>(
  (
    {
      balance,
      balanceText,
      balanceTooltip,
      helperText,
      helperAlert,
      error,
      id = defaultInputId,
      sx,
      token,
      isDisabled,
      isBalanceLoading,
      labelTooltip,
      labelText,
      decimalPlaces = DECIMAL_PLACES,
      onMaxClick,
      isMaxLoading,
      showEmptyBalance,
      hideArrows = true,
      ...inputProps
    },
    ref,
  ) => {
    const withMaxButton = !!onMaxClick;
    const { classes } = useAmountInputStyles({ withMaxButton });
    const { t, keys } = useTranslation(translation);

    const withBalance = showEmptyBalance || !!balance;

    const balanceValue = useMemo(() => {
      if (!balance) {
        return '-';
      }

      return t('unit.tokenValue', {
        token,
        value: balance
          ?.decimalPlaces(decimalPlaces, BigNumber.ROUND_DOWN)
          .toFormat(),
      });
    }, [balance, decimalPlaces, token, t]);

    const balanceLabel = useMemo(() => {
      if (typeof balanceText === 'string') {
        return (
          <Typography color="text.secondary" variant="body2">
            {balanceText}
          </Typography>
        );
      }

      return balanceText;
    }, [balanceText, t]);

    return (
      <Stack sx={sx} gap={1}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            component="label"
            htmlFor={id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 500,
            }}
          >
            {labelText || t(keys.amount)}

            {labelTooltip && (
              <InfoIconWithTooltip
                sx={{ ml: 0.5, fontSize: 20, color: 'text.secondary' }}
              >
                {labelTooltip}
              </InfoIconWithTooltip>
            )}
          </Box>

          {withBalance && (
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                textWrap: 'nowrap',
              }}
              title={balanceTooltip ? undefined : balance?.toFormat()}
              gap={0.5}
            >
              {isBalanceLoading ? (
                <>
                  <Skeleton
                    className={classes.balanceSkeleton}
                    variant="text"
                    width={30}
                  />

                  {token}
                </>
              ) : (
                <>
                  {balanceLabel ?? (
                    <Typography color="text.secondary" variant="body2">
                      {t(keys.defaultBalanceText)}
                    </Typography>
                  )}
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={!balance ? 'text.secondary' : undefined}
                  >
                    {balanceValue}
                  </Typography>
                </>
              )}

              {balanceTooltip && (
                <InfoIconWithTooltip>{balanceTooltip}</InfoIconWithTooltip>
              )}
            </Stack>
          )}
        </Stack>

        {helperAlert}

        <div className={classes.inputBox}>
          <InputNumber
            ref={ref}
            fullWidth
            disabled={isDisabled}
            id={id}
            error={error}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: theme => theme.shape.borderRadius,
                '& fieldset': {
                  borderColor: theme => theme.palette.grey[200],
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme => theme.palette.grey[200],
                },
              },
            }}
            placeholder="0"
            {...inputProps}
            InputProps={{
              ...inputProps.InputProps,
              endAdornment:
                inputProps.InputProps?.endAdornment ||
                (onMaxClick && (
                  <InputAdornment position="end">
                    <Button
                      disabled={isDisabled}
                      size="small"
                      color="secondary"
                      variant="contained"
                      onClick={onMaxClick}
                    >
                      {isMaxLoading ? (
                        <CircularProgress size={16} />
                      ) : (
                        t(keys.max)
                      )}
                    </Button>
                  </InputAdornment>
                )),
            }}
            hideArrows={hideArrows}
          />
        </div>

        {helperText && (
          <FormHelperText error={!!error}>{helperText}</FormHelperText>
        )}
      </Stack>
    );
  },
);

AmountInput.displayName = 'AmountInput';
