import { ChangeEvent, KeyboardEvent, useCallback, WheelEvent } from 'react';

const integersRegExp = /^(\d*$)/;
const exponent = /[eE]/;

export interface IUseInputNumberArgs {
  isIntegerOnly?: boolean;
  maxDecimalsLen: number;
  disallowArrowKeys?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

interface IUseInputNumber {
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onWheel: (event: WheelEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const useInputNumber = ({
  isIntegerOnly,
  maxDecimalsLen,
  disallowArrowKeys,
  onChange,
  onKeyDown,
}: IUseInputNumberArgs): IUseInputNumber => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const isArrowKey = event.key === 'ArrowUp' || event.key === 'ArrowDown';

      const invalid =
        event.key === '-' ||
        event.key === '+' ||
        event.key === 'Enter' ||
        event.code === 'KeyE' ||
        (disallowArrowKeys && isArrowKey);

      if (invalid) {
        event.preventDefault();
      }

      onKeyDown?.(event);
    },
    [onKeyDown],
  );

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLInputElement>) => {
      event.currentTarget.blur();
    },
    [],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let { value } = event.target;
      const isInteger = integersRegExp.test(value);
      const indexOfDecimal = value.indexOf('.');
      const hasDecimal = indexOfDecimal !== -1;
      const [, decimals] = hasDecimal ? value.split('.') : ['', ''];
      const isTooManyDecimals = hasDecimal && decimals.length > maxDecimalsLen;
      const isExponent = exponent.test(value);

      if (isIntegerOnly && !isInteger) {
        // remove all non-digits
        value = value.replace(/\D/g, '');
      }

      if (!isIntegerOnly && isTooManyDecimals) {
        // remove all decimals after maxDecimalsLen
        value = value.slice(0, indexOfDecimal + maxDecimalsLen + 1);
      }

      if (isExponent) {
        // remove all exponents
        value = value.replace(/[eE]/gi, '');
      }

      onChange?.({ ...event, target: { ...event.target, value } });
    },
    [isIntegerOnly, maxDecimalsLen, onChange],
  );

  return {
    onKeyDown: handleKeyDown,
    onWheel: handleWheel,
    onChange: handleChange,
  };
};
