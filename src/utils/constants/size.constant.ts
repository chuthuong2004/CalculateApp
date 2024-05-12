import {SizeText} from '@/types/unions';
import {hp} from '@utils/helpers';
export const FONT_SIZE: Partial<Record<SizeText, number>> = {
  xs: hp(1.2),
  sm: hp(1.4),
  md: hp(1.6),
  lg: hp(1.8),
  xl: hp(2.2),
  xxl: hp(2.4),
  '3xl': hp(2.8),
  '4xl': hp(3.2),
  '5xl': hp(3.8),
  '6xl': hp(4.8),
};

export const SIZE_APP: Record<SizeText, number> = {
  xs: hp(1.2),
  sm: hp(1.6),
  md: hp(2),
  lg: hp(2.4),
  xl: hp(2.8),
  xxl: 32,
  '3xl': 36,
  '4xl': 40,
  '5xl': 44,
  '6xl': 48,
};
