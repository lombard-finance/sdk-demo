import { IStakeAndBakeVault } from '@lombard.finance/sdk';
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';

interface IProtocolSelectorProps {
  isDisabled?: boolean;
  vaults: IStakeAndBakeVault[];
}

export const ProtocolSelector = ({
  isDisabled,
  vaults,
}: IProtocolSelectorProps) => {
  const { watch, setValue } = useFormContext();
  const vaultKey = watch('vaultKey');

  const handleChange = (event: SelectChangeEvent) => {
    setValue('vaultKey', event.target.value);
  };
  console.log({
    vaults,
  });

  return (
    <Stack gap={1}>
      <Typography component="label" fontWeight={500}>
        Choose vault
      </Typography>

      <Select
        value={vaultKey || ''}
        onChange={handleChange}
        disabled={isDisabled}
      >
        {vaults.map(vault => (
          <MenuItem key={vault.key} value={vault.key}>
            {vault.name}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};
