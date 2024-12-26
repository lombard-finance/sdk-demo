import { makeStyles } from 'tss-react/mui';

interface IUseAmountInputStylesProps {
  withMaxButton: boolean;
}

export const useAmountInputStyles = makeStyles<IUseAmountInputStylesProps>()(
  (theme, { withMaxButton }) => ({
    // added to support classes property in the component
    root: {},

    labelBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(1.5),
    },

    label: {
      display: 'flex',
      alignItems: 'center',
    },

    balance: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(14),
    },

    balanceSkeleton: {
      display: 'inline-block',
      marginRight: theme.spacing(1),
    },

    inputBox: {
      position: 'relative',
    },

    input: {
      height: 60,
      paddingRight: withMaxButton ? theme.spacing(12) : undefined,
      fontSize: theme.typography.pxToRem(18),
      fontWeight: 500,
    },

    maxButton: {
      position: 'absolute',
      right: theme.spacing(2),
      top: '50%',
      transform: 'translateY(-50%)',
      textTransform: 'uppercase',
      borderRadius: 0,
      minWidth: 0,
      height: 25,
      lineHeight: 1,
      backgroundColor: theme.palette.primary.main,
      fontSize: theme.typography.pxToRem(13),

      '&:active': {
        transform: 'translateY(calc(-50% + 1px))',
      },

      '&:disabled': {
        opacity: 0.6,
      },
    },

    // added to support classes property in the component
    errorText: {},
  }),
);
