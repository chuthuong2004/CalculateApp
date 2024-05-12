import React from 'react';
import {
  TransitionPresets,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

// ** Types
import {HomeStackParamList} from './types';
import {stacks} from './stacks';

const Stack = createStackNavigator<HomeStackParamList>();
const option: StackNavigationOptions = {
  headerShown: false,
};
const HomeStack = () => {
  console.log('render hôm');

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={option}>
      {stacks.map((stack, index) => (
        <Stack.Screen
          key={index}
          name={stack.name}
          component={stack.component}
          options={{...TransitionPresets.SlideFromRightIOS}}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;
