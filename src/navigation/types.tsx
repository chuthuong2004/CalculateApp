import {
  NavigatorScreenParams,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {AppStackParamList} from './app/types';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  App?: NavigatorScreenParams<AppStackParamList>;
  Onboarding: undefined;
  ChooseLanguage: undefined;
  ChooseTheme: undefined;
  Acl: undefined;
};
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type StackScreen<T extends ParamListBase> = {
  name: keyof T;
  component: ScreenComponentType<T, keyof T>;
  options?: object;
};

export type ScreenComponentType<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList,
> =
  | React.ComponentType<{
      route: RouteProp<ParamList, RouteName>;
      navigation: any;
    }>
  | React.ComponentType<{}>;
