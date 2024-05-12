import {View} from 'react-native';
import React from 'react';
import {CardComponent, SkeletonComponent} from '@components/shares';
import {flex} from '@styles';

const CustomerItemSkeleton = () => {
  return (
    <CardComponent style={[flex.row, flex.gap10]}>
      <SkeletonComponent width={50} height={50} radius={50} />
      <View style={[flex.flex1, flex.gap10]}>
        <View style={[flex.row, flex.justifyContentBetween]}>
          <SkeletonComponent width={150} height={15} radius={4} />
          <SkeletonComponent width={70} height={15} radius={4} />
        </View>
        <SkeletonComponent width={200} height={15} radius={4} />
        <View style={[flex.row, flex.justifyContentBetween]}>
          <SkeletonComponent width={80} height={15} radius={4} />
          <SkeletonComponent width={130} height={15} radius={4} />
        </View>
      </View>
    </CardComponent>
  );
};

export default CustomerItemSkeleton;
