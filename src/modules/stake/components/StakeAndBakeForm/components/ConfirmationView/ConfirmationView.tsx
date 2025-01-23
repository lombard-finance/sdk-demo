import { IStakeAndBakeVault } from '@lombard.finance/sdk';
import {
  Box,
  Button,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';
import { getChainIcon } from 'modules/auth/utils/getChainIcon';
import { BackBtn } from 'modules/common/components/BackBtn';
import { Checkbox } from 'modules/common/components/Checkbox';
import { CopyButton } from 'modules/common/components/CopyButton';
import { SummaryItem } from 'modules/stake/components/SummaryItem';
import { SUPPORTED_CHAINS } from 'modules/stake/const';
import { useDepositBtcAddress } from 'modules/stake/hooks/useDepositBtcAddress';

interface IConfirmationViewProps {
  onBackClick: () => void;
  chain: number;
  selectedVault: IStakeAndBakeVault;
  isAccepted: boolean;
  setIsAccepted: (isAccepted: boolean) => void;
}

export const ConfirmationView = ({
  onBackClick,
  chain,
  selectedVault,
  isAccepted,
  setIsAccepted,
}: IConfirmationViewProps) => {
  const { depositAddress } = useDepositBtcAddress();

  const supportedChain = SUPPORTED_CHAINS[chain];
  const ChainIcon = getChainIcon(chain);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAccepted(event.target.checked);
  };

  return (
    <Stack gap={3}>
      <Stack direction="row" justifyContent="flex-start" width="100%">
        <BackBtn onClick={onBackClick} size="small" />
      </Stack>

      <Typography variant="h6">Confirm LBTC destination</Typography>

      <Stack gap={2}>
        {depositAddress && (
          <SummaryItem
            label="Mint address"
            value={
              <>
                <Typography
                  sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                  fontSize={14}
                  title={depositAddress}
                >
                  {depositAddress}
                </Typography>
                <CopyButton text={depositAddress} />
              </>
            }
          />
        )}

        <SummaryItem
          label="Defi address"
          value={
            <>
              <Typography
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
                title={selectedVault.address}
                fontSize={14}
              >
                {selectedVault.address}
              </Typography>
              <CopyButton text={selectedVault.address} />
            </>
          }
        />

        <SummaryItem
          label="Network"
          value={
            <Stack direction="row" alignItems="center" gap={1}>
              {ChainIcon && (
                <Box component={ChainIcon} sx={{ width: 20, height: 20 }} />
              )}
              <Typography>{supportedChain}</Typography>
            </Stack>
          }
        />

        <FormControlLabel
          sx={{
            backgroundColor: '#F6F7F6',
            borderRadius: 1,
            p: 2,
            pl: 1,
            m: 0,
            wordBreak: 'break-word',
            alignItems: 'flex-start',
            '& b': {
              fontWeight: 500,
            },
          }}
          label={
            'I confirm all BTC deposited will be bridged to LBTC and owned by the above minting address on the specific network, and that the corresponding LBTC will be moved from the mint address to the defi address upon the mint. Errors in the mint address, network, or defi address cannot be corrected later.'
          }
          control={<Checkbox checked={isAccepted} onChange={handleChange} />}
        />

        <Stack direction="row" alignItems="center">
          <Button
            variant="contained"
            size="large"
            fullWidth
            disabled={!isAccepted}
            type="submit"
          >
            Confirm
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
