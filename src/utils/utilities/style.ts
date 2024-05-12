import {APP_WIDTH, APP_COLORS_DARK, COLORS_APP} from '@utils/constants';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {StyleSheetProps} from '@/types/commons';
import {ColorType} from '@/types/unions';

export function getSizeItemWithGridLayout(
  gap: number,
  itemPerRow: number,
  spacing = 0,
): number {
  const PADDING = APP_WIDTH / 30;
  const WIDTH_PRODUCT_CONTAINER =
    APP_WIDTH - PADDING * 2 - gap * (itemPerRow - 1) - spacing * 2;
  return WIDTH_PRODUCT_CONTAINER / itemPerRow;
}

export function getStyleColorButton({
  colors,
}: StyleSheetProps): Record<ColorType, {title: TextStyle; button: ViewStyle}> {
  return {
    primary: {
      title: {
        color: APP_COLORS_DARK.colors.text,
      },
      button: {
        backgroundColor: APP_COLORS_DARK.colors.primary,
      },
    },
    secondary: {
      title: {
        color: colors.text,
      },
      button: {
        backgroundColor: 'transparent',
        borderColor: colors.border,
        borderWidth: StyleSheet.hairlineWidth,
      },
    },
    success: {
      title: {
        color: COLORS_APP.success,
      },
      button: {
        backgroundColor: '#28c76f1d',
      },
    },
    danger: {
      title: {
        color: COLORS_APP.danger,
      },
      button: {
        backgroundColor: '#ea545520',
      },
    },
    warning: {
      title: {
        color: COLORS_APP.warning,
      },
      button: {
        backgroundColor: '#f7e3a867',
      },
    },
    info: {
      title: {
        color: colors.primary,
      },
      button: {
        backgroundColor: '#87affa46',
      },
    },
    dark: {
      button: {
        backgroundColor: COLORS_APP.dark,
      },
      title: {
        color: COLORS_APP.light,
      },
    },
    light: {
      button: {
        backgroundColor: COLORS_APP.dark,
      },
      title: {
        color: COLORS_APP.light,
      },
    },
  };
}
