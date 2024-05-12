import {Dimensions, Platform} from 'react-native';
import {hp} from '@utils/helpers';
const APP_WIDTH = Dimensions.get('window').width;
const APP_HEIGHT = Dimensions.get('window').height;
const HEIGHT_BOTTOM_TAB = Platform.OS === 'ios' ? hp(7.5) : hp(6.5);
const HEIGHT_MESSAGE_LOADING = 50;
export {APP_WIDTH, APP_HEIGHT, HEIGHT_BOTTOM_TAB, HEIGHT_MESSAGE_LOADING};
