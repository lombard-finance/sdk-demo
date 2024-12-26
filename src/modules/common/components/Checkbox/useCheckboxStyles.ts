import { makeStyles } from 'tss-react/mui';

export const useCheckboxStyles = makeStyles()(theme => ({
  icon: {
    width: '1em',
    height: '1em',
    fontSize: theme.typography.pxToRem(22),
  },
}));
