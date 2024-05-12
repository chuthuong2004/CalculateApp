import {View, Text} from 'react-native';
import React from 'react';
import {CardComponent, SkeletonComponent} from '@components/shares';
import {flex} from '@styles/flex.style';
import {useTheme} from '@react-navigation/native';
import {hp} from '@utils/helpers';

const PrescriptionItemSkeleton = () => {
  const {colors} = useTheme();

  return (
    <CardComponent style={[flex.gap10]}>
      <View
        style={[flex.row, flex.justifyContentBetween, flex.alignItemsCenter]}>
        <View style={[flex.row, flex.gap10, flex.alignItemsCenter]}>
          <SkeletonComponent width={hp(5)} height={hp(5)} radius={hp(5)} />
          <View style={[flex.gap4]}>
            <SkeletonComponent width={hp(12)} height={hp(2)} />
            <SkeletonComponent width={hp(8)} height={hp(1.5)} />
          </View>
        </View>
        <View style={[flex.gap4, flex.alignItemsEnd]}>
          <SkeletonComponent height={hp(2)} rounded width={hp(10)} />
          <SkeletonComponent height={hp(1.5)} rounded width={hp(7)} />
        </View>
      </View>
      <View style={[flex.row, flex.gap10]}>
        <SkeletonComponent width={hp(6)} height={hp(6)} radius={8} />
        <View style={[flex.gap4]}>
          <SkeletonComponent width={hp(20)} height={hp(2)} />
          <SkeletonComponent width={hp(150)} height={hp(1.5)} />
        </View>
      </View>
      <View style={{height: 1, backgroundColor: colors.border}} />
      <View
        style={[flex.row, flex.justifyContentBetween, flex.alignItemsCenter]}>
        <SkeletonComponent width={hp(12)} height={hp(1.5)} />
        <SkeletonComponent width={hp(7)} height={hp(1.5)} />
      </View>
    </CardComponent>
  );
};

export default PrescriptionItemSkeleton;
