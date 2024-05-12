import {View} from 'react-native';
import React from 'react';
import {CardComponent, SkeletonComponent} from '@components/shares';
import {flex} from '@styles';

const DiscountItemSkeleton = () => {
  return (
    <CardComponent style={[flex.row, flex.gap10]}>
      <SkeletonComponent width={70} height={50} radius={8} />
      <View style={[flex.gap10, flex.flex1]}>
        <SkeletonComponent height={20} radius={4} />
        <SkeletonComponent width={70} height={15} radius={4} />
        <SkeletonComponent width={130} height={15} radius={4} />
        <SkeletonComponent width={170} height={10} radius={4} />
        <SkeletonComponent width={160} height={15} radius={4} />
      </View>
    </CardComponent>
  );
};

export default DiscountItemSkeleton;
