/* eslint-disable react/no-unstable-nested-components */
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import React from 'react';
import {StyleSheet} from 'react-native';

// ** Hooks
import {getFocusedRouteNameFromRoute, useTheme} from '@react-navigation/native';

// ** Constants
import {COLORS_APP} from '@utils/constants';
import {hp} from '@utils/helpers';
// ** Stacks
import {HomeStack} from './home';

// ** lottie
import Lottie from 'lottie-react-native';

// ** Types
import {StyleSheetProps} from '@/types/commons';
import {AppStackParamList} from './types';

import {AnimatedTabBar} from '@components/shares';
import {excludedHome} from './excluded-route';

const RootStack = createBottomTabNavigator<AppStackParamList>();
const AppNavigation = () => {
  // useFetchCart();
  // useSocketConnection();

  // ** Foreground services
  // useForeground();
  const options: BottomTabNavigationOptions = {
    tabBarHideOnKeyboard: true,
    headerShown: false,
    unmountOnBlur: true,
    tabBarActiveTintColor: COLORS_APP.primary,
    tabBarInactiveTintColor: COLORS_APP.success,
    tabBarShowLabel: false,
  };
  // useEffect(() => {
  //     const initialFirebaseCloud = async () => {
  //         let remoteMessage = await get<DataRemoteMessage>(
  //             STORAGE_KEY.remoteMessageFirebase,
  //         );
  //         console.log('Remove message: ', remoteMessage);

  //         if (remoteMessage) {
  //             console.log('Có remote', typeof remoteMessage.data);
  //             const data = JSON.parse(remoteMessage.data);

  //             const conversationId = data.conversation_id._id;
  //             console.log('URL: ', conversationId);
  //             const url = getConversationUrl(conversationId);

  //             setTimeout(() => {
  //                 linkTo(url);
  //             }, 300);
  //         }
  //         await remove(STORAGE_KEY.remoteMessageFirebase);
  //     };
  //     initialFirebaseCloud();
  // }, [linkTo]);

  const {dark, colors} = useTheme();
  const styles = styling({colors, dark});
  return (
    <RootStack.Navigator
      initialRouteName="HomeStack"
      screenOptions={options}
      tabBar={props => <AnimatedTabBar {...props} />}>
      <RootStack.Screen
        name="HomeStack"
        component={HomeStack}
        options={({route, navigation}) => ({
          // @ts-ignore
          tabBarIcon: ({ref}) => (
            <Lottie
              ref={ref}
              loop={false}
              autoPlay={false}
              source={require('@assets/lottie/home.icon.json')}
              style={styles.icon}
            />
          ),
          // ** handle display bottom bar
          tabBarStyle: (() => {
            const routeName = getFocusedRouteNameFromRoute(route);

            if (excludedHome.find(item => item === routeName)) {
              return {display: 'none'};
            }
            if (navigation.isFocused()) {
              return {
                display: 'flex',
              };
            }
            return undefined;
          })(),
        })}
      />
      {/* <RootStack.Screen
        name="AccountStack"
        component={AccountStack}
        options={({route, navigation}) => ({
          // @ts-ignore
          tabBarIcon: ({ref}) => (
            <Lottie
              ref={ref}
              autoPlay={false}
              loop={false}
              source={require('@assets/lottie/settings.icon.json')}
              style={styles.icon}
            />
          ),
          tabBarStyle: (() => {
            const routeName = getFocusedRouteNameFromRoute(route);
            if (excludedSetting.find(item => item === routeName)) {
              return {display: 'none'};
            }
            if (navigation.isFocused()) {
              return {display: 'flex'};
            }
            return undefined;
          })(),
        })}
      /> */}
    </RootStack.Navigator>
  );
};

export default AppNavigation;

const styling = ({}: StyleSheetProps) =>
  StyleSheet.create({
    icon: {
      height: hp(3.5),
      width: hp(3.5),
    },
  });
