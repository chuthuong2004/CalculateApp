import {View} from 'react-native';
import React from 'react';
import {CardComponent, SkeletonComponent} from '@components/shares';
import {flex} from '@styles';

const MedicineItemSkeleton = () => {
  return (
    <CardComponent style={[flex.row, flex.gap10]}>
      <SkeletonComponent width={80} height={100} />

      <View style={[flex.flex1, flex.gap4]}>
        <View style={[flex.row, flex.justifyContentBetween]}>
          <SkeletonComponent width={120} height={15} />
          <SkeletonComponent width={70} height={15} />
        </View>

        <SkeletonComponent height={20} />
        <View style={[flex.row, flex.gap10, flex.alignItemsCenter]}>
          <View style={[flex.row, flex.alignItemsCenter, flex.wrap, flex.gap4]}>
            <SkeletonComponent width={80} height={15} />
          </View>
          <View style={[flex.row, flex.alignItemsCenter, flex.gap4]}>
            <SkeletonComponent width={80} height={15} />
          </View>

          <SkeletonComponent width={80} height={15} />
        </View>
        <View style={[flex.row, flex.justifyContentBetween]}>
          <SkeletonComponent width={120} height={15} />

          <SkeletonComponent width={90} height={15} />
        </View>
        <View style={[flex.row]}>
          <SkeletonComponent width={100} height={15} />
        </View>
      </View>
    </CardComponent>
  );
};

export default MedicineItemSkeleton;
