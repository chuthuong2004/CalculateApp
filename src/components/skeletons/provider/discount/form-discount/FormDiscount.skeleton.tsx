import {CardBottomComponent, SkeletonComponent} from '@components/shares';
import {flex} from '@styles/flex.style';
import {spacing} from '@styles/spacing.style';
import {hp} from '@utils/helpers';
import React from 'react';
import {View} from 'react-native';

const FormDiscountSkeleton = () => {
  return (
    <View style={[flex.flex1, flex.widthFull]}>
      <View style={[spacing('padding').around, flex.gap10, flex.flex1]}>
        <SkeletonComponent height={hp(10)} width={hp(10)} radius={hp(0.8)} />
        <View style={[flex.row, flex.alignItemsCenter, flex.gap4]}>
          <SkeletonComponent height={hp(4)} width={hp(12)} />
          <SkeletonComponent height={hp(1.5)} width={hp(5)} />
          <SkeletonComponent height={hp(4)} width={hp(11)} />
        </View>
        <SkeletonComponent height={hp(1.5)} width={hp(20)} />

        <SkeletonComponent height={hp(1.5)} width={hp(12)} />
        <SkeletonComponent height={hp(5)} radius={hp(0.8)} />

        <View style={[flex.gap10, flex.row]}>
          <View style={[flex.flex1, flex.gap10]}>
            <SkeletonComponent height={hp(1.5)} width={hp(12)} />
            <SkeletonComponent height={hp(5)} radius={hp(0.8)} />
          </View>
          <View style={[flex.flex1, flex.gap10]}>
            <SkeletonComponent height={hp(1.5)} width={hp(12)} />
            <SkeletonComponent height={hp(5)} radius={hp(0.8)} />
          </View>
        </View>
        <SkeletonComponent height={hp(1.5)} width={hp(12)} />
        <SkeletonComponent height={hp(5)} radius={hp(0.8)} />
      </View>
      <CardBottomComponent>
        <SkeletonComponent height={hp(5)} />
      </CardBottomComponent>
    </View>
  );
};

export default FormDiscountSkeleton;
