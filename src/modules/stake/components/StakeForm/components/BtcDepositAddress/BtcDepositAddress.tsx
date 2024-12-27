import { isValidChain } from '@lombard.finance/sdk';
import { Alert, IconButton, Stack, Typography } from '@mui/material';
import { useConnection } from 'modules/auth';
import { CheckIcon, CopyIcon } from 'modules/common/icons';
import { globalTranslation, useTranslation } from 'modules/i18n';
import { useState } from 'react';
import { useDepositBtcAddress } from '../../../../hooks/useDepositBtcAddress';

export const BtcDepositAddress = () => {
  const { keys, t } = useTranslation(globalTranslation);
  const { depositAddress, isLoading } = useDepositBtcAddress();
  const { address, chainId } = useConnection();
  const [isCopied, setIsCopied] = useState(false);

  if (isLoading || !depositAddress) return null;

  const handleCopy = () => {
    if (depositAddress) {
      navigator.clipboard.writeText(depositAddress);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  const chainText =
    chainId && isValidChain(chainId) ? t(keys.chain[chainId]) : 'this chain';

  return (
    <Stack gap={1}>
      <Typography fontWeight="500">Deposit BTC to:</Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          border: '1px solid',
          borderColor: 'grey.200',
          borderRadius: 1,
          p: theme => theme.spacing(1.5, 2),
        }}
      >
        <Typography
          sx={{
            wordBreak: 'break-all',
          }}
        >
          {depositAddress}
        </Typography>
        <IconButton onClick={handleCopy} size="small">
          {isCopied ? (
            <CheckIcon width={16} height={16} />
          ) : (
            <CopyIcon width={16} height={16} />
          )}
        </IconButton>
      </Stack>

      <Alert severity="success">
        This Segwit address is unique to you. BTC sent here is mintable as LBTC
        to <b>{address}</b> on {chainText} only.
      </Alert>
    </Stack>
  );
};
