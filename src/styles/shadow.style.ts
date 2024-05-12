import {Platform, StyleSheet} from 'react-native';

export const SHADOW_STYLE = StyleSheet.create({
  shadowCard: {
    shadowColor: Platform.OS === 'ios' ? '#000000cc' : '#00000030',
    shadowOffset: {
      width: -3,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 5.05,
    elevation: 12,
  },
  shadowTop: {
    // shadowColor: Platform.OS === 'ios' ? '#b0b0b068' : '#000000',
    // shadowColor: Platform.OS === 'ios' ? '#524c4c68' : '#000000',

    // // ** Only IOS
    // shadowOffset: {
    //   // width: 0,
    //   // height: 3,
    //   width: 0,
    //   height: -6,
    // },
    // shadowOpacity: 0.47,

    // shadowRadius: 16.05,
    // elevation: 20,

    // shadowColor: '#000',
    shadowColor: Platform.OS === 'ios' ? '#524c4c68' : '#000000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 30,
  },
});
