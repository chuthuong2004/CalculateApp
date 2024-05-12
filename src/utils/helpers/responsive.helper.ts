import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
export function hp(heightPercent: string | number) {
  if (
    heightPercentageToDP(heightPercent) > widthPercentageToDP(heightPercent)
  ) {
    return heightPercentageToDP(heightPercent);
  }
  return widthPercentageToDP(heightPercent);
}
