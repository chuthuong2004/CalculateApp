import {View} from 'react-native';
import React from 'react';
import {SkeletonComponent} from '@components/shares';
import {flex} from '@styles/flex.style';
import {spacing} from '@styles/spacing.style';
import {APP_HEIGHT, APP_WIDTH} from '@utils/constants';

const BuyBackOrderSkeleton = () => {
  return (
    <View style={[flex.gap10, spacing('padding').horizontal]}>
      <View style={[flex.row, flex.justifyContentBetween]}>
        <SkeletonComponent width={200} height={15} />
        <SkeletonComponent width={100} height={15} />
      </View>
      <View style={[flex.row, flex.gap10]}>
        <SkeletonComponent
          height={APP_HEIGHT / 5}
          width={APP_WIDTH / 3}
          radius={8}
        />
        <SkeletonComponent
          height={APP_HEIGHT / 5}
          width={APP_WIDTH / 3}
          radius={8}
        />
        <SkeletonComponent
          height={APP_HEIGHT / 5}
          width={APP_WIDTH / 3}
          radius={8}
        />
      </View>
    </View>
  );
};

export default BuyBackOrderSkeleton;
