import { makeStyles } from 'tss-react/mui';

export const useFooterStyles = makeStyles()(theme => ({
  link: {
    fontSize: theme.typography.pxToRem(14),
    padding: 0,
    verticalAlign: 'baseline',

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
