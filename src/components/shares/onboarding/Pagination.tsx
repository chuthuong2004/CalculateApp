import {View} from 'react-native';
import React from 'react';
import {OnboardingData} from './Onboarding.component';
import {SharedValue} from 'react-native-reanimated';
import {flex} from '@styles/flex.style';
import Dot from './Dot';
import {hp} from '@utils/helpers';
type Props = {
  data: OnboardingData[];
  x: SharedValue<number>;
};
const Pagination = ({data, x}: Props) => {
  return (
    <View
      style={[
        flex.row,
        flex.justifyContentCenter,
        flex.alignItemsCenter,
        {height: hp(10)},
      ]}>
      {data.map((_, index) => (
        <Dot key={index} index={index} x={x} />
      ))}
    </View>
  );
};

export default Pagination;
