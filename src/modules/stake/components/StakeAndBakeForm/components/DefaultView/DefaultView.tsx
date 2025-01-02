import { Button, Stack } from '@mui/material';
import { BtcAmountField } from 'modules/common/components/BtcAmountField';
import { MintingFee } from 'modules/stake/components/StakeForm/components/MintingFee';
import { IStakeAndBakeFormValues } from 'modules/stake/hooks/useStakeAndBakeForm';
import { UseFormReturn } from 'react-hook-form';
import { CustomProtocolForm } from '../CustomProtocolForm';
import { ProtocolSelector } from '../ProtocolSelector';

interface IDefaultViewProps {
  methods: UseFormReturn<IStakeAndBakeFormValues>;
  chain: number;
  minAmount: number;
  selectedProtocol: string;
  isCustomProtocol: boolean;
}

export const DefaultView = ({
  methods,
  chain,
  minAmount,
  selectedProtocol,
  isCustomProtocol,
}: IDefaultViewProps) => {
  const showCustomForm = isCustomProtocol && selectedProtocol === 'custom';

  return (
    <>
      <BtcAmountField control={methods.control} minAmount={minAmount} />

      <ProtocolSelector />

      {showCustomForm && <CustomProtocolForm />}

      <MintingFee chainId={chain} />

      <Stack direction="row" alignItems="center">
        <Button variant="contained" fullWidth type="submit">
          Continue
        </Button>
      </Stack>
    </>
  );
};
