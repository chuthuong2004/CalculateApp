import {View} from 'react-native';
import React from 'react';
import {flex} from '@styles';
import {CardComponent, SkeletonComponent} from '@components/shares';

const StaffItemSkeleton = () => {
  return (
    <CardComponent style={[flex.row, flex.gap10]}>
      <SkeletonComponent width={60} height={60} radius={50} />
      <View style={[flex.gap4, flex.flex1]}>
        <View style={[flex.row, flex.gap10]}>
          <View style={[flex.gap4, flex.flex1]}>
            <SkeletonComponent width={250} height={20} radius={10} />
            <SkeletonComponent width={120} height={20} radius={10} />
          </View>
          <SkeletonComponent width={60} height={20} radius={10} />
        </View>
        <SkeletonComponent width={150} height={20} radius={10} />
      </View>
    </CardComponent>
  );
};

export default StaffItemSkeleton;
