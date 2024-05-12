import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {
  BackgroundComponent,
  CommonHeader,
  FrameComponent,
} from '@components/layouts';
const HomeScreen = () => {
  return (
    <BackgroundComponent>
      <CommonHeader title="Home" />
      <FrameComponent>
        <HomeComponent />
      </FrameComponent>
    </BackgroundComponent>
  );
};

export default HomeScreen;
