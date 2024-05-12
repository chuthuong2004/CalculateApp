import {View} from 'react-native';
import React from 'react';
import {CardComponent, SkeletonComponent} from '@components/shares';
import {flex} from '@styles';

const RepositoryItemSkeleton = () => {
  return (
    <CardComponent style={[flex.row, flex.gap10]}>
      <View>
        <SkeletonComponent width={50} height={50} radius={6} />
      </View>
      <View style={[flex.gap4, flex.flex1]}>
        <SkeletonComponent width={200} height={20} />
        <SkeletonComponent width={150} height={20} />
        <SkeletonComponent height={20} />
      </View>
    </CardComponent>
  );
};

export default RepositoryItemSkeleton;
