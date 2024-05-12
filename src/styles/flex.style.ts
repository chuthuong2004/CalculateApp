import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const flex = StyleSheet.create({
  zIndex: {
    zIndex: 1,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex5: {
    flex: 5,
  },
  itemsStretch: {
    alignItems: 'stretch',
  },
  widthFull: {
    width: '100%',
  },
  'h-screen': {
    height: hp(100),
  },
  'w-screen': {
    width: wp(100),
  },
  full: {
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  reverse: {
    flexDirection: 'row-reverse',
  },
  column: {
    flexDirection: 'column',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsEnd: {
    alignItems: 'flex-end',
  },
  alignItemsStart: {
    alignItems: 'flex-start',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  justifyContentBetween: {
    justifyContent: 'space-between',
  },
  justifyContentAround: {
    justifyContent: 'space-around',
  },
  justifyContentEnd: {
    justifyContent: 'flex-end',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  gap2: {
    gap: 2,
  },
  gap4: {
    gap: 4,
  },
  gap5: {
    gap: 5,
  },
  gap8: {
    gap: 8,
  },
  gap10: {
    gap: 10,
  },
  gap15: {
    gap: 15,
  },
  gap20: {
    gap: 20,
  },
});
