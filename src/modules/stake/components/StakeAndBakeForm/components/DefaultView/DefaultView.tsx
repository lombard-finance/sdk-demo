import { IStakeAndBakeVault } from '@lombard.finance/sdk';
import { Button, Stack } from '@mui/material';
import { BtcAmountField } from 'modules/common/components/BtcAmountField';
import { MintingFee } from 'modules/stake/components/StakeForm/components/MintingFee';
import { IStakeAndBakeFormValues } from 'modules/stake/hooks/useStakeAndBakeForm';
import { UseFormReturn } from 'react-hook-form';
import { ProtocolSelector } from '../ProtocolSelector';

interface IDefaultViewProps {
  methods: UseFormReturn<IStakeAndBakeFormValues>;
  chain: number;
  minAmount: number;
  vaults: IStakeAndBakeVault[];
}

export const DefaultView = ({
  methods,
  chain,
  minAmount,
  vaults,
}: IDefaultViewProps) => {
  return (
    <>
      <BtcAmountField control={methods.control} minAmount={minAmount} />

      <ProtocolSelector vaults={vaults} />

      <MintingFee chainId={chain} />

      <Stack direction="row" alignItems="center">
        <Button variant="contained" fullWidth type="submit">
          Continue
        </Button>
      </Stack>
    </>
  );
};
