import {View} from 'react-native';
import React from 'react';
import {spacing} from '@styles/spacing.style';
import {SkeletonComponent} from '@components/shares';
import {APP_HEIGHT, SIZE_APP} from '@utils/constants';

const IntroduceSkeleton = () => {
  return (
    <View style={[spacing('margin').around]}>
      <SkeletonComponent height={APP_HEIGHT / 5} radius={SIZE_APP.sm} />
    </View>
  );
};

export default IntroduceSkeleton;
