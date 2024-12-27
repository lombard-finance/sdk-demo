import { IDeposit } from '@lombard.finance/sdk';
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import BigNumber from 'bignumber.js';
import { BTCIcon, ExternalIcon, LBTCIcon } from 'modules/common/icons';
import { globalTranslation, useTranslation } from 'modules/i18n';
import { useState } from 'react';

const formatBTCAmount = (value: BigNumber) => {
  return value.toString();
};

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString();
};

const BITCOIN_EXPLORER = {
  stage: 'https://mempool.space/signet',
  prod: 'https://mempool.space',
};

interface DepositCardProps {
  deposit: IDeposit;
}

export const DepositCard = ({ deposit }: DepositCardProps) => {
  const { keys, t } = useTranslation(globalTranslation);
  const [showRaw, setShowRaw] = useState(false);

  const explorerBaseUrl = BITCOIN_EXPLORER.stage;
  const chainName = deposit.chainId ? t(keys.chain[deposit.chainId]) : 'Unknown Chain';

  return (
    <Card
      sx={{
        backgroundColor: 'grey.light',
        p: 1,
      }}
    >
      <CardContent>
        <Stack gap={1}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography>Deposited:</Typography>
              <Typography fontWeight={500}>
                {formatBTCAmount(deposit.value)} BTC
              </Typography>
              <BTCIcon width={16} height={16} />
            </Stack>

            <Stack direction="row" alignItems="center" gap={1}>
              <Typography>Receiving:</Typography>
              <Typography fontWeight={500}>
                {formatBTCAmount(deposit.value)} LBTC
              </Typography>
              <LBTCIcon width={16} height={16} />
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack gap={0.5}>
              <Typography variant="caption" color="text.secondary">
                Destination Chain: {chainName}
              </Typography>
              {deposit.blockTime && (
                <Typography variant="caption" color="text.secondary">
                  Time: {formatDate(deposit.blockTime)}
                </Typography>
              )}
            </Stack>

            {deposit.txid && (
              <Stack alignItems="flex-end" gap={0.5}>
                <Link
                  href={`${explorerBaseUrl}/tx/${deposit.txid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  <Typography variant="caption">View Transaction</Typography>
                  <ExternalIcon width={12} height={12} />
                </Link>
                {deposit.blockHeight && (
                  <Link
                    href={`${explorerBaseUrl}/block/${deposit.blockHeight}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    <Typography variant="caption">View Block</Typography>
                    <ExternalIcon width={12} height={12} />
                  </Link>
                )}
              </Stack>
            )}
          </Stack>

          {deposit.notarizationWaitDur && (
            <Typography variant="caption" color="text.secondary">
              Confirmation time: ~{Math.ceil(deposit.notarizationWaitDur / 60)}{' '}
              minutes ({Math.ceil(deposit.notarizationWaitDur / 600)} blocks)
            </Typography>
          )}

          <Button
            size="small"
            onClick={() => setShowRaw(!showRaw)}
            sx={{ alignSelf: 'flex-start', px: 0 }}
          >
            {showRaw ? 'Hide' : 'View'} raw JSON
          </Button>

          {showRaw && (
            <Box
              component="pre"
              color="text.secondary"
              sx={{
                mt: 1,
                fontSize: 12,
                overflowX: 'auto',
              }}
            >
              {JSON.stringify(deposit, null, 2)}
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
