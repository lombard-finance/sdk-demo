import { alpha, Theme, ThemeOptions } from '@mui/material';
import { gridClasses } from '@mui/x-data-grid';

import { errorPalette, greenPalette, greyPalette } from './colors';
import { PLAYFAIR_DISPLAY_FONT_FAMILY, SECOND_FONT_FAMILY } from './const';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    h7: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    h7?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h7: true;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides {
    large: true;
  }
}

export const getMainThemeOptions = (theme: Theme): ThemeOptions => ({
  palette: theme.palette,
  shape: theme.shape,
  typography: {
    fontFamily: SECOND_FONT_FAMILY,

    h1: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(64),
      fontFamily: PLAYFAIR_DISPLAY_FONT_FAMILY,

      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.pxToRem(80),
      },
    },

    h2: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(60),
      fontFamily: PLAYFAIR_DISPLAY_FONT_FAMILY,

      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.pxToRem(72),
      },
    },

    h3: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(52),
      fontFamily: PLAYFAIR_DISPLAY_FONT_FAMILY,

      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.pxToRem(64),
      },
    },

    h4: {
      fontWeight: 500,
      fontFamily: PLAYFAIR_DISPLAY_FONT_FAMILY,
      fontSize: theme.typography.pxToRem(40),

      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.pxToRem(48),
      },
    },

    h5: {
      fontWeight: 500,
      fontFamily: PLAYFAIR_DISPLAY_FONT_FAMILY,
      fontSize: theme.typography.pxToRem(40),
    },

    h6: {
      fontWeight: 500,
      fontFamily: PLAYFAIR_DISPLAY_FONT_FAMILY,
      fontSize: theme.typography.pxToRem(32),
      lineHeight: 1.25,
    },

    h7: {
      fontWeight: 500,
      fontFamily: PLAYFAIR_DISPLAY_FONT_FAMILY,
      fontSize: theme.typography.pxToRem(24),
      lineHeight: 1.25,
    },

    label: {
      fontWeight: 500,
    },
    body1: {
      fontSize: theme.typography.pxToRem(16),
    },
    body2: {
      fontSize: theme.typography.pxToRem(14),
    },
    caption: {
      fontSize: theme.typography.pxToRem(12),
    },
    subtitle1: {
      fontSize: theme.typography.pxToRem(24),
    },
    subtitle2: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
          background: theme.palette.background.default,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          [theme.breakpoints.up('md')]: {
            paddingLeft: theme.spacing(3.5),
            paddingRight: theme.spacing(3.5),
          },
        },

        maxWidthSm: {
          [theme.breakpoints.up('sm')]: {
            maxWidth: 776,
          },
        },

        maxWidthXl: {
          [theme.breakpoints.up('xl')]: {
            maxWidth: 1588,
          },
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(2),
          background: theme.palette.background.paper,
        },

        elevation1: {
          boxShadow:
            'box-shadow: 0px 2px 4px -2px #1018280F; box-shadow: 0px 4px 8px -2px #1018281A;',
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.common.white, 0.5),
        },
      },
    },

    MuiAlert: {
      defaultProps: {
        variant: 'filled',
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: theme.shape.borderRadius,
          border: 'none',
          padding: theme.spacing(1, 2),
          fontWeight: 400,

          // Hide icon by default
          '& .MuiAlert-icon': {
            display: ownerState.iconMapping ? 'flex' : 'none',
            alignItems: 'center',
          },
        }),

        filledError: {
          background: errorPalette[50],
          color: errorPalette[600],
        },

        filledSuccess: {
          background: greenPalette[300],
          color: greenPalette[700],
        },

        filledWarning: {
          background: '#FFF3E7',
          color: '#C05C00',
        },

        filledInfo: {
          background: greyPalette[100],
          color: greyPalette.dark,
        },
      },
    },

    MuiAlertTitle: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          marginBottom: theme.spacing(0.5),
        },
      },
    },

    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },

      styleOverrides: {
        root: {
          '&:active': {
            transform: 'translateY(1px)',
          },

          '&.Mui-disabled': {
            '&:active': {
              transform: 'none',
            },

            svg: {
              color: theme.palette.text.disabled,
            },
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 100,
          fontFamily: SECOND_FONT_FAMILY,

          '&:hover': {
            boxShadow: 'none',
          },
        },

        sizeSmall: {
          fontSize: theme.typography.pxToRem(14),
          padding: theme.spacing(1.125, 2),
          lineHeight: 1,
        },
        sizeMedium: {
          fontSize: theme.typography.pxToRem(16),
          padding: theme.spacing(1.5, 2),
          lineHeight: 1,
        },
        sizeLarge: {
          fontSize: theme.typography.pxToRem(16),
          padding: theme.spacing(1.25, 4),
        },

        textPrimary: {
          color: greenPalette[700],
        },

        containedPrimary: {
          backgroundColor: greenPalette[800],
          color: theme.palette.common.white,

          '&:hover': {
            backgroundColor: greenPalette[700],
          },
        },

        containedSecondary: {
          backgroundColor: greenPalette[700],
          color: theme.palette.common.white,

          '&:hover': {
            backgroundColor: greenPalette[800],
          },
        },

        containedInfo: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,

          '&:hover': {
            backgroundColor: theme.palette.customMain[200],
          },
        },

        outlined: {
          borderRadius: 100,
        },

        text: {
          textDecoration: 'underline',

          '&:hover': {
            backgroundColor: 'transparent',
            textDecoration: 'underline',
            opacity: 0.8,
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#E2E9E9',
          borderRadius: 12,
          padding: 0,
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          background: theme.palette.common.white,
          padding: 16,

          [theme.breakpoints.up('md')]: {
            padding: 16,
          },

          [theme.breakpoints.up('lg')]: {
            padding: 24,
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },

        sizeSmall: {
          height: 20,
          fontSize: theme.typography.pxToRem(12),
        },

        sizeMedium: {
          height: 28,
          fontSize: theme.typography.pxToRem(14),
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          fontWeight: 700,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.grey[200],
          borderRadius: theme.shape.borderRadius,
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[200],
          },

          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.grey[200],
            },
          },

          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': {
              borderWidth: 1,
              borderColor: theme.palette.customMain[550],
            },
          },
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          '&.MuiTextField-root .MuiOutlinedInput-root': {
            borderRadius: theme.shape.borderRadius,
            fontSize: theme.typography.pxToRem(16),
          },

          '& .MuiOutlinedInput-input': {
            height: theme.spacing(6),
            padding: theme.spacing(0, 1.5),
          },

          '& .MuiInputBase-sizeSmall': {
            '& .MuiOutlinedInput-input': {
              height: theme.spacing(5),
              fontSize: theme.typography.pxToRem(14),
            },
          },

          '& .MuiInputBase-sizeLarge': {
            '& .MuiOutlinedInput-input': {
              height: theme.spacing(10),
              fontSize: theme.typography.pxToRem(24),
            },
          },

          '&.MuiTextField-root .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: theme.palette.customMain[550],
          },

          '&.MuiTextField-root .MuiOutlinedInput-root.Mui-error fieldset': {
            borderColor: theme.palette.error.main,
          },
        },
      },
    },

    MuiSelect: {
      defaultProps: {
        variant: 'outlined',
      },

      styleOverrides: {
        select: {
          padding: theme.spacing(1.5, 2),
          '&.MuiOutlinedInput-root': {
            borderColor: theme.palette.grey[200],
          },
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: theme.shape.borderRadius,
          border: '1px solid',
          borderColor: greyPalette[200],
          background: theme.palette.common.white,
          boxShadow:
            'box-shadow: 0px 4px 6px -2px #10182808; box-shadow: 0px 12px 16px -4px #10182814;',
          padding: 8,
          marginTop: '4px',
        },

        list: {
          padding: 0,
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: theme.typography.pxToRem(14),
          borderRadius: theme.shape.borderRadius,
          fontWeight: 400,
          padding: theme.spacing(0.5, 2),
          marginBottom: theme.spacing(0.5),
          color: greyPalette.dark,
          height: 40,
          minHeight: 40,
          '&:hover': {
            backgroundColor: theme.palette.customMain[300],
          },
          '&:focus': {
            backgroundColor: theme.palette.customMain[300],
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.customMain[300],
            '&:hover': {
              backgroundColor: theme.palette.customMain[300],
            },
            '&:focus': {
              backgroundColor: theme.palette.customMain[300],
            },
          },
        },
      },
    },

    MuiPopover: {
      styleOverrides: {
        root: {
          // Disable backdrop for popover since we don't want the blurred green that modal backdrops have
          '.MuiBackdrop-root': {
            backgroundColor: 'transparent',
            backdropFilter: 'none',
          },
        },
      },
    },

    MuiModal: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
        },
        backdrop: {
          backgroundColor: alpha(theme.palette.customMain[900], 0.8),
          backdropFilter: 'blur(20px)',
        },
      },
    },

    MuiDialog: {
      defaultProps: {
        PaperProps: {
          elevation: 0,
        },
      },
      styleOverrides: {
        paper: {
          borderRadius: theme.spacing(1.5),
          boxShadow: '0px 4px 4px 0px #00000040',
        },

        container: {
          backgroundColor: alpha(theme.palette.customMain[900], 0.8),
          backdropFilter: 'blur(20px)',
        },
      },
    },

    MuiTooltip: {
      defaultProps: {
        enterTouchDelay: 0,
        leaveTouchDelay: 10_000,
      },

      styleOverrides: {
        tooltip: {
          border: '1px solid',
          borderColor: greyPalette[300],
          borderRadius: 12,
          padding: theme.spacing(1, 1.5),
          backgroundColor: theme.palette.common.white,
          color: theme.palette.grey[900],
          fontSize: theme.typography.pxToRem(14),
          boxShadow: `box-shadow: 0px 2px 4px -2px #1018280F; box-shadow: 0px 4px 8px -2px #1018281A;`,
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',

          [`& .${gridClasses.footerContainer}`]: {
            display: 'none',
          },

          [`& .${gridClasses.columnSeparator}`]: {
            [`&:not(.${gridClasses['columnSeparator--resizable']})`]: {
              display: 'none',
            },
          },
        },

        cell: {
          [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(16),
          },

          '&:focus, &:focus-within': {
            outline: 'none',
          },
        },

        columnHeader: {
          fontWeight: 600,
          color: theme.palette.text.secondary,

          [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(16),
          },

          '&:focus, &:focus-within': {
            outline: 'none',
          },
        },
      },
    },

    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: `1px solid`,
          borderColor: greyPalette[300],
          borderRadius: theme.shape.borderRadius,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          marginRight: 2,
          color: greenPalette[700],
          fontWeight: 500,
          borderRadius: 100,
          fontSize: theme.typography.pxToRem(16),
          '&:hover': {
            color: greenPalette[700],
            backgroundColor: '#E2E9E9',
          },
          '&.Mui-selected': {
            color: greenPalette[700],
            backgroundColor: '#E2E9E9',
          },
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          display: 'none',
        },
        flexContainer: {
          gap: 2,
        },
      },
    },

    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            svg: {
              borderRadius: 4,
            },
          },
          '&.MuiCheckbox-sizeSmall': {
            svg: {
              fontSize: 16,
            },
          },
        },
      },
    },

    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          gap: theme.spacing(1),
          borderRadius: 100,
          border: '1px solid',
          borderColor: theme.palette.grey[200],
          padding: theme.spacing(0.25),
        },
        lastButton: {
          borderRadius: 100,
        },
        firstButton: {
          borderRadius: 100,
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: 0,
          minWidth: 44,
          color: theme.palette.customMain[700],
          '&:hover': {
            backgroundColor: theme.palette.background.default,
          },

          '&.Mui-selected': {
            backgroundColor: theme.palette.background.default,
            '&:hover': {
              backgroundColor: theme.palette.background.default,
            },
          },
        },
      },
    },
  },
  mixins: {
    MuiDataGrid: {
      containerBackground: theme.palette.background.paper,
    },
  },
});
