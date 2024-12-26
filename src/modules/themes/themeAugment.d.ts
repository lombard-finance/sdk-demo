import {
  Palette as MuiPalette,
  PaletteOptions as MuiPaletteOptions,
} from '@mui/material';
import type {} from '@mui/x-data-grid/themeAugmentation';

export interface ICustomMainColor {
  100: string;
  200: string;
  300?: string;
  350?: string;
  400?: string;
  500: string;
  550?: string;
  600?: string;
  700: string;
  800: string;
  900: string;
  1000: string;
  light?: string;
}

export interface ICustomBrandColor {
  dark: string;
  main: string;
  light: string;
  // lombardGreen: string;
}

declare module '@mui/material' {
  interface Palette extends MuiPalette {
    customMain: ICustomMainColor;
    brand: ICustomBrandColor;
  }

  interface PaletteOptions extends MuiPaletteOptions {
    customMain: ICustomMainColor;
    brand: ICustomBrandColor;
  }

  interface Color extends ICustomMainColor {}
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    label: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    label?: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    label: true;
  }
}
