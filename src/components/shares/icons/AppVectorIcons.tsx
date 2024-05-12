import React, {forwardRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {IconProps} from 'react-native-vector-icons/Icon';
import {useTheme} from '@react-navigation/native';
import {COLORS_APP} from '@utils/constants';
import {IconType} from '@/types/unions';
import Animated from 'react-native-reanimated';

type TypeOfIcon = typeof AntDesign | typeof FontAwesome5;

const icons: Record<IconType, TypeOfIcon> = {
  AntDesign: AntDesign,
  Entypo: Entypo,
  EvilIcons: EvilIcons,
  Feather: Feather,
  FontAwesome: FontAwesome,
  FontAwesome5: FontAwesome5,
  // FontAwesome5Pro: FontAwesome5Pro,
  Fontisto: Fontisto,
  Foundation: Foundation,
  Ionicons: Ionicons,
  MaterialCommunityIcons: MaterialCommunityIcons,
  MaterialIcons: MaterialIcons,
  Octicons: Octicons,
  SimpleLineIcons: SimpleLineIcons,
};
interface AppIconProps extends IconProps {
  type: IconType;
  primary?: boolean;
}
const AppVectorIcons = forwardRef<TypeOfIcon, AppIconProps>(
  ({type, primary, ...passProps}, ref) => {
    const {colors} = useTheme();
    const Element = icons[type];
    return (
      <Element
        ref={ref}
        {...passProps}
        color={
          primary
            ? COLORS_APP.dark
            : passProps.color
            ? passProps.color
            : colors.text
        }
      />
    );
  },
);

export const AnimatedIcon = Animated.createAnimatedComponent(AppVectorIcons);
export default AppVectorIcons;
