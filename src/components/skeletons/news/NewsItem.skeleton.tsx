import {View} from 'react-native';
import React from 'react';
import {flex} from '@styles/flex.style';
import {SkeletonComponent} from '@components/shares';

type NewsItemSkeletonProps = {
  orientation?: 'vertical' | 'horizontal';
};
const NewsItemSkeleton = ({
  orientation = 'horizontal',
}: NewsItemSkeletonProps) => {
  return (
    <View
      style={[
        orientation === 'horizontal' && flex.row,
        flex.gap10,
        orientation === 'horizontal' && flex.alignItemsCenter,
      ]}>
      <SkeletonComponent
        width={orientation === 'horizontal' ? 100 : undefined}
        height={orientation === 'horizontal' ? 60 : 150}
      />
      <View style={[orientation === 'horizontal' && flex.flex1, flex.gap4]}>
        <SkeletonComponent height={15} width={100} />
        <SkeletonComponent height={25} />
      </View>
    </View>
  );
};

export default NewsItemSkeleton;
