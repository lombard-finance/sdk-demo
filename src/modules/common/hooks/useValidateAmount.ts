import BigNumber from 'bignumber.js';
import { ReactText, useCallback, useMemo } from 'react';

import { t } from 'modules/i18n';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

export type TUseValidateAmount = (value?: ReactText) => string | undefined;

export interface IValidationMessage {
  noValue?: string;
  isNaN?: string;
  isZero?: string;
  isLessThanMinAmount?: string;
  isGreaterMax?: string;
  isLowBalance?: string;
}

interface IUseValidationAmount {
  balance?: BigNumber.Value;
  maxAmount?: BigNumber.Value;
  minAmount?: BigNumber.Value;
  validationMessages?: IValidationMessage;
  token?: string;
}

export const useValidateAmount = ({
  balance: rawBalance,
  maxAmount: rawMaxAmount = rawBalance,
  minAmount: rawAmount = new BigNumber(0),
  token,
  validationMessages,
}: IUseValidationAmount): TUseValidateAmount => {
  const balance = useMemo(
    () => (rawBalance ? new BigNumber(rawBalance) : undefined),
    [rawBalance],
  );
  const maxAmount = useMemo(
    () => (rawMaxAmount ? new BigNumber(rawMaxAmount) : undefined),
    [rawMaxAmount],
  );
  const minAmount = useMemo(() => new BigNumber(rawAmount), [rawAmount]);

  const validationTexts = useLocaleMemo<IValidationMessage>(
    () => ({
      noValue: t('validation.required'),
      isNaN: t('validation.numberOnly'),
      isZero: t('validation.required'),
      isLessThanMinAmount: t('validation.min', { value: minAmount.toFormat() }),
      isGreaterMax: maxAmount
        ? t('validation.max', { value: maxAmount.toFormat() })
        : undefined,
      isLowBalance: token
        ? t('validation.notEnoughToken', { token })
        : t('validation.lowBalance'),
      ...validationMessages,
    }),
    [minAmount, maxAmount, validationMessages],
  );

  return useCallback(
    (value?: ReactText) => {
      if (!value) {
        return validationTexts.noValue;
      }

      const currentAmount = new BigNumber(value);

      if (currentAmount.isNaN()) {
        return validationTexts.isNaN;
      }

      if (currentAmount.isZero()) {
        return validationTexts.isZero;
      }

      if (currentAmount.isLessThan(minAmount)) {
        return validationTexts.isLessThanMinAmount;
      }

      const withBalance = !!balance;
      const isZeroBalance = withBalance && balance?.isEqualTo(0);
      const isGraterThanBalance =
        withBalance && currentAmount.isGreaterThan(balance);

      if (isZeroBalance || isGraterThanBalance) {
        return validationTexts.isLowBalance;
      }

      if (maxAmount && currentAmount.isGreaterThan(maxAmount)) {
        return validationTexts.isGreaterMax;
      }

      return undefined;
    },
    [balance, validationTexts, maxAmount, minAmount],
  );
};

export const isErrorLowBalance = (errorMessage?: string) => {
  const lowBalanceMessage = t('validation.lowBalance');
  return errorMessage === lowBalanceMessage;
};
