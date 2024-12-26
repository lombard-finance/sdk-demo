import { makeStyles } from 'tss-react/mui';

export const useInputBaseStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(1, 2),
    fontFamily: theme.typography.fontFamily,
    height: 60,
    fontSize: theme.typography.pxToRem(16),
    caretColor: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    transition: theme.transitions.create(['border-color'], {
      duration: theme.transitions.duration.short,
    }),

    '&:hover, &:focus': {
      outline: 'none',
      borderColor: theme.palette.grey[900],
    },

    '&:disabled': {
      color: theme.palette.text.secondary,
    },

    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },

    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 1,
    },

    '&[type=number]': {
      MozAppearance: 'textfield',
    },
  },

  fullWidth: {
    width: '100%',
  },
}));
