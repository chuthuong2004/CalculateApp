import {View, Text} from 'react-native';
import React from 'react';
import {TextNormalComponent} from '../text';
import {ButtonComponent} from '../button';
import {Image} from 'react-native';
import {flex, spacing} from '@styles';

type NotFoundProps = {
  goBack: () => void;
};
const NotFoundComponent = ({goBack}: NotFoundProps) => {
  return (
    <View
      style={[
        flex.flex1,
        spacing('padding').around,
        spacing('padding', 0, 100).top,
        flex.alignItemsCenter,
        flex.gap10,
      ]}>
      <Image source={require('@assets/images/not-found.png')} />
      <TextNormalComponent>Your page didn't respond.</TextNormalComponent>
      <TextNormalComponent>
        This page doesn't exist or maybe fall asleep!
      </TextNormalComponent>
      <TextNormalComponent>
        We suggest you go back to home page.
      </TextNormalComponent>
      <ButtonComponent onPress={goBack} spacingHorizontal={40} rounded>
        Go Back
      </ButtonComponent>
    </View>
  );
};

export default NotFoundComponent;
