import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { getProtocolsForChain } from '../../../../const';

interface IProtocolSelectorProps {
  isDisabled?: boolean;
}

const ALLOW_CUSTOM_PROTOCOL = false;

export const ProtocolSelector = ({ isDisabled }: IProtocolSelectorProps) => {
  const { watch, setValue } = useFormContext();
  const protocol = watch('protocol');
  const chain = watch('chain');

  const protocols = useMemo(() => {
    return getProtocolsForChain(chain);
  }, [chain, protocol]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue('protocol', event.target.value);
  };

  return (
    <Stack gap={1}>
      <Typography component="label" fontWeight={500}>
        Choose protocol
      </Typography>

      <Select
        value={protocol || ''}
        onChange={handleChange}
        disabled={isDisabled}
      >
        {Object.entries(protocols).map(([key, { name }]) => (
          <MenuItem key={key} value={key}>
            {name}
          </MenuItem>
        ))}

        {ALLOW_CUSTOM_PROTOCOL && (
          <MenuItem value="custom">Custom network</MenuItem>
        )}
      </Select>
    </Stack>
  );
};
