import { Checkbox as CheckboxComponent, CheckboxProps } from '@mui/material';

import { default as CheckedIcon } from './assets/checked.svg?react';
import { default as UncheckedIcon } from './assets/unchecked.svg?react';
import { useCheckboxStyles } from './useCheckboxStyles';

export interface ICheckboxProps extends CheckboxProps {}

export const Checkbox = ({
  disabled,
  classes: classesProp,
  ...rest
}: ICheckboxProps): JSX.Element => {
  const { classes } = useCheckboxStyles();

  const iconClassName = classes.icon;

  const icon = <UncheckedIcon className={iconClassName} />;
  const checkedIcon = <CheckedIcon className={iconClassName} />;

  return (
    <CheckboxComponent
      {...rest}
      checkedIcon={checkedIcon}
      classes={classesProp}
      disabled={disabled}
      icon={icon}
    />
  );
};
