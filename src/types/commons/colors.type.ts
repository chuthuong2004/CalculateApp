export type ThemeModeType = 'light' | 'dark' | 'default';

export type COLORS = {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
};

export type StyleSheetProps = {
  colors: COLORS;
  dark: boolean;
};

export type ColorButton =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';
