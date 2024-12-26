import {
  CircularProgress,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { ETH_DECIMALS } from 'modules/common/const';
import { forwardRef } from 'react';
import { InfoIconWithTooltip } from '../InfoIconWithTooltip';
import { IInputBaseProps } from '../InputBase';
import { useInputNumber } from './useInputNumber';

export interface IInputNumberProps extends Omit<TextFieldProps, 'onChange'> {
  isIntegerOnly?: boolean;
  maxDecimalsLen?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  tooltipContent?: React.ReactNode;
  value?: IInputBaseProps['value'];
  hideArrows?: boolean;
}

export const InputNumber = forwardRef<HTMLInputElement, IInputNumberProps>(
  (
    {
      isIntegerOnly,
      maxDecimalsLen = ETH_DECIMALS,
      onKeyDown,
      onChange,
      isLoading,
      tooltipContent,
      InputProps,
      hideArrows,
      ...restProps
    },
    ref,
  ) => {
    const {
      onKeyDown: handleKeyDown,
      onWheel: handleWheel,
      onChange: handleChange,
    } = useInputNumber({
      isIntegerOnly,
      maxDecimalsLen,
      onChange,
      onKeyDown,
    });

    const tooltipEndAdornment = (
      <InputAdornment position="end">
        {isLoading && <CircularProgress size={20} />}
        {tooltipContent && (
          <InfoIconWithTooltip>{tooltipContent}</InfoIconWithTooltip>
        )}
      </InputAdornment>
    );

    const endAdornment = InputProps?.endAdornment
      ? InputProps.endAdornment
      : tooltipEndAdornment;

    return (
      <TextField
        type="number"
        size="large"
        {...restProps}
        inputRef={ref}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        InputProps={{
          ...InputProps,
          endAdornment: endAdornment,
        }}
        sx={{
          '& input': {
            textAlign: 'right',
          },
          ...restProps.sx,
          ...(hideArrows && {
            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
              {
                display: 'none',
                '-webkit-appearance': 'none',
                margin: 0,
              },
            '& input[type=number]': {
              '-moz-appearance': 'textfield',
            },
          }),
        }}
      />
    );
  },
);

InputNumber.displayName = 'InputNumber';
