import { IStakeAndBakeVault } from '@lombard.finance/sdk';
import { Button, Stack } from '@mui/material';
import { BtcAmountField } from 'modules/common/components/BtcAmountField';
import { IStakeAndBakeFormValues } from 'modules/stake/hooks/useStakeAndBakeForm';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { ProtocolSelector } from '../ProtocolSelector';
import { StakeAndBakeMintingFee } from '../StakeAndBakeMintingFee';

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
  const { watch } = useFormContext();
  const vaultKey = watch('vaultKey');

  return (
    <>
      <BtcAmountField control={methods.control} minAmount={minAmount} />

      <ProtocolSelector vaults={vaults} />

      <StakeAndBakeMintingFee chainId={chain} vaultKey={vaultKey}/>

      <Stack direction="row" alignItems="center">
        <Button variant="contained" fullWidth type="submit">
          Continue
        </Button>
      </Stack>
    </>
  );
};
