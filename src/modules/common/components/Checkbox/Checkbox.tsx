import {
  Box,
  Checkbox as CheckboxComponent,
  CheckboxProps,
  SxProps,
  Theme,
} from '@mui/material';

import { default as CheckedIcon } from './assets/checked.svg?react';
import { default as UncheckedIcon } from './assets/unchecked.svg?react';

export interface ICheckboxProps extends CheckboxProps {}

const checkboxSx: SxProps<Theme> = {
  width: 32,
  height: 32,
  fontSize: theme => theme.typography.pxToRem(22),
};

export const Checkbox = ({
  disabled,
  classes: classesProp,
  ...rest
}: ICheckboxProps): JSX.Element => {
  const icon = <Box component={UncheckedIcon} sx={checkboxSx} />;
  const checkedIcon = <Box component={CheckedIcon} sx={checkboxSx} />;

  return (
    <CheckboxComponent
      {...rest}
      checkedIcon={checkedIcon}
      sx={checkboxSx}
      disabled={disabled}
      icon={icon}
    />
  );
};
