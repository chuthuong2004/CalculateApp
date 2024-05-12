import {APP_WIDTH} from '@utils/constants';
import {StyleSheet} from 'react-native';
type SpacingType = 'margin' | 'padding';
export const spacing = (type: SpacingType, percent = 30, quantity?: number) =>
  StyleSheet.create({
    // ** margin | padding
    around: {
      [type]: quantity ? quantity : APP_WIDTH / percent,
    },
    left: {
      [type + 'Left']: quantity ? quantity : APP_WIDTH / percent,
    },
    top: {
      [type + 'Top']: quantity ? quantity : APP_WIDTH / percent,
    },
    right: {
      [type + 'Right']: quantity ? quantity : APP_WIDTH / percent,
    },
    bottom: {
      [type + 'Bottom']: quantity ? quantity : APP_WIDTH / percent,
    },
    vertical: {
      [type + 'Vertical']: quantity ? quantity : APP_WIDTH / percent,
    },
    horizontal: {
      [type + 'Horizontal']: quantity ? quantity : APP_WIDTH / percent,
    },
  });
