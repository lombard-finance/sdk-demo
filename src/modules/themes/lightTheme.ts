import { alpha, createTheme } from '@mui/material';
import {
  brandPalette,
  errorPalette,
  grayNurseColor,
  greenPalette,
  greyPalette,
  successPalette,
  warningPalette,
} from './colors';
import { SECOND_FONT_FAMILY } from './const';
import { getMainThemeOptions } from './mainThemeOptions';

const lightThemeBase = createTheme({
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  palette: {
    action: {
      selected: alpha('#fff', 0.05),
    },
    customMain: greenPalette,
    primary: {
      main: greenPalette[900],
    },
    secondary: {
      main: greenPalette[400] ?? '#CEE3E4',
    },
    brand: brandPalette,
    background: {
      default: grayNurseColor,
      paper: '#FFFFFF',
    },
    text: {
      primary: greyPalette.dark,
      secondary: greyPalette[800],
    },
    grey: greyPalette,
    divider: greyPalette[50],
    success: {
      ...successPalette,
      main: successPalette[500],
      light: successPalette[400],
    },
    warning: {
      ...warningPalette,
      main: warningPalette[500],
      light: warningPalette[400],
    },
    error: {
      ...errorPalette,
      main: errorPalette[600],
      light: errorPalette[500],
    },
  },
});

const mainThemeOptions = getMainThemeOptions(lightThemeBase);

export const lightTheme = createTheme({
  ...mainThemeOptions,
  components: {
    ...mainThemeOptions.components,
    MuiTable: {
      styleOverrides: {
        ...mainThemeOptions.components?.MuiTable?.styleOverrides,
        root: {
          background: lightThemeBase.palette.background.default,
          borderRadius: '8px',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        ...mainThemeOptions.components?.MuiTableHead?.styleOverrides,
        root: {
          borderRadius: '8px',

          '& .MuiTableCell-root': {
            color: greenPalette[700],
            fontWeight: 400,
            padding: lightThemeBase.spacing(1, 3),
            fontSize: lightThemeBase.typography.pxToRem(14),
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        ...mainThemeOptions.components?.MuiTableBody?.styleOverrides,
        root: {
          padding: '1px',
          '& .MuiTableRow-root': {
            backgroundColor: lightThemeBase.palette.common.white,
            borderBottom: `1px solid ${greyPalette[200]}`,
            borderCollapse: 'collapse',
          },

          '& .MuiTableCell-root': {
            padding: lightThemeBase.spacing(1.5, 3),
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        ...mainThemeOptions.components?.MuiTableRow?.styleOverrides,
        root: {
          borderRadius: 0,
          position: 'relative',

          '&:not(:last-child)': {
            'td:after': {
              content: '""',
              display: 'block',
              height: 1,
              backgroundColor: greyPalette[200],
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            },
            'td:first-of-type:after': {
              left: 16,
            },
            'td:last-of-type:after': {
              right: 16,
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        ...mainThemeOptions.components?.MuiTableCell?.styleOverrides,
        root: {
          borderRadius: 0,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        ...mainThemeOptions.components?.MuiChip?.styleOverrides,
        root: {
          color: greenPalette[700],
          backgroundColor: '#E0F3F1',
        },

        colorPrimary: {
          backgroundColor: brandPalette.dark,
        },

        colorSecondary: {
          backgroundColor: brandPalette.main,
        },

        colorError: {
          backgroundColor: errorPalette[100],
          color: errorPalette[600],
        },

        colorWarning: {
          backgroundColor: warningPalette[50],
          color: warningPalette[600],
        },

        colorSuccess: {
          backgroundColor: brandPalette.main,
          color: greenPalette[700],
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        ...mainThemeOptions.components?.MuiButton?.styleOverrides,
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 60,
          fontFamily: SECOND_FONT_FAMILY,

          '&:hover': {
            boxShadow: 'none',
          },
        },

        containedPrimary: {
          backgroundColor: greenPalette[800],
          color: lightThemeBase.palette.common.white,

          '&:hover': {
            backgroundColor: greenPalette[700],
          },

          '&.Mui-disabled': {
            backgroundColor: greenPalette[300],
            color: lightThemeBase.palette.grey[500],
          },
        },

        containedSecondary: {
          color: greenPalette[800],
          backgroundColor: greenPalette[400],

          '&:hover': {
            backgroundColor: greenPalette[350],
          },

          '&.Mui-disabled': {
            backgroundColor: greenPalette[300],
            color: lightThemeBase.palette.grey[500],
          },
        },

        outlinedPrimary: {
          backgroundColor: 'transparent',
          color: greenPalette[800],

          '&:hover': {
            backgroundColor: greenPalette[800],
            color: lightThemeBase.palette.common.white,

            svg: {
              // filter: 'brightness(0) saturate(100%) invert(1)',
            },
          },

          '&.Mui-disabled': {
            backgroundColor: greenPalette[300],
            color: lightThemeBase.palette.grey[500],
          },
        },

        outlinedSecondary: {
          backgroundColor: 'transparent',
          color: greenPalette[800],
          borderColor: greenPalette[800],

          '&:hover': {
            backgroundColor: greenPalette[800],
            color: lightThemeBase.palette.common.white,

            svg: {
              // filter: 'brightness(0) saturate(100%) invert(1)',
            },
          },

          '&.Mui-disabled': {
            backgroundColor: greenPalette[300],
            color: lightThemeBase.palette.grey[500],
          },
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        ...mainThemeOptions.components?.MuiSwitch?.styleOverrides,
        root: {
          width: 40,
          height: 24,
          padding: 0,
          display: 'flex',
          overflow: 'visible',
        },

        switchBase: {
          padding: 1,
          top: 3,
          left: 3,
          '&.Mui-disabled': {
            '& + .MuiSwitch-track': {
              backgroundColor: lightThemeBase.palette.grey[700],
            },
            '& .MuiSwitch-thumb': {
              backgroundColor: lightThemeBase.palette.grey[300],
            },
          },

          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: lightThemeBase.palette.common.white,
            '& + .MuiSwitch-track': {
              backgroundColor: greenPalette[550],
              opacity: 1,
            },

            '&.Mui-disabled': {
              '& + .MuiSwitch-track': {
                backgroundColor: lightThemeBase.palette.customMain[550],
              },
              '& .MuiSwitch-thumb': {
                backgroundColor: lightThemeBase.palette.customMain[700],
              },
            },
          },
        },

        thumb: {
          width: 16,
          height: 16,
          boxShadow: 'none',
        },

        track: {
          borderRadius: 13,
          opacity: 1,
          backgroundColor: lightThemeBase.palette.grey[200],
          '&:hover': {
            backgroundColor: lightThemeBase.palette.grey[300],
          },
        },
      },
    },
  },
});
