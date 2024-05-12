import {NavigationContainer} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import React from 'react';

// ** Navigation
import {AppNavigation} from './app';

// ** Types
import {RootStackParamList} from './types';

// ** Constants
import {APP_COLORS_DARK, APP_COLORS_LIGHT} from '@utils/constants';

// ** Splash component
import {OnboardingComponent, SplashComponent} from '@components/shares';

// ** Redux
import {useAppSelector} from '@/store';

// ** Selectors
import {selectIsFirst, selectTheme, selectUser} from '@/store/selectors';

// ** Custom hooks
import {useAppLanguage, useAppTheme} from '@hooks';
import {linking} from './linking';

const RootStack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  // ** Selectors
  const {user, loadingApp} = useAppSelector(selectUser);
  const themeMode = useAppSelector(selectTheme);
  const isFirst = useAppSelector(selectIsFirst);

  // ** Hooks
  // * Listen app to change theme mode
  useAppTheme();

  // * Listen app to change language
  useAppLanguage();

  // ** Background services
  // useBackground();

  // ** Firebase cloud messaging
  // useFirebaseCloudMessaging();
  return (
    <NavigationContainer
      linking={linking}
      // ref={ref => NavigationService.setTopLevelNavigator(ref)}
      theme={themeMode === 'dark' ? APP_COLORS_DARK : APP_COLORS_LIGHT}>
      <RootStack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        {loadingApp && (
          <RootStack.Screen
            name="Splash"
            component={SplashComponent}
            options={{...TransitionPresets.SlideFromRightIOS}}
          />
        )}
        {!isFirst && (
          <>
            <RootStack.Screen
              name="Onboarding"
              component={OnboardingComponent}
              options={{...TransitionPresets.SlideFromRightIOS}}
            />
            {/* <RootStack.Screen
              name="ChooseLanguage"
              component={ChooseLanguageScreen}
              options={{...TransitionPresets.SlideFromRightIOS}}
            />
            <RootStack.Screen
              name="ChooseTheme"
              component={ChooseThemeScreen}
              options={{...TransitionPresets.SlideFromRightIOS}}
            /> */}
          </>
        )}
        <RootStack.Screen
          name="App"
          component={AppNavigation}
          options={{...TransitionPresets.SlideFromRightIOS}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
