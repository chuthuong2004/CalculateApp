import {
  CardBottomComponent,
  CardComponent,
  SkeletonComponent,
} from '@components/shares';
import {useTheme} from '@react-navigation/native';
import {flex} from '@styles/flex.style';
import {spacing} from '@styles/spacing.style';
import {hp} from '@utils/helpers';
import React from 'react';
import {View} from 'react-native';

const DiscountDetailsSkeleton = () => {
  const {colors} = useTheme();
  return (
    <View style={[flex.widthFull, flex.flex1]}>
      <View style={[flex.flex1]}>
        <SkeletonComponent height={hp(20)} />

        <View
          style={[
            spacing('padding').around,
            flex.gap10,
            {
              top: -100,
            },
          ]}>
          <CardComponent shadow style={[flex.gap10]}>
            <SkeletonComponent height={hp(2)} />
            <CardComponent transparent style={[flex.gap10]}>
              <SkeletonComponent height={hp(1.5)} />
              <View style={{height: 1, backgroundColor: colors.border}} />
              <SkeletonComponent height={hp(1.5)} />
            </CardComponent>
          </CardComponent>
          <SkeletonComponent width={200} height={hp(2)} />
          <CardComponent
            shadow
            style={[flex.gap10, flex.row, flex.alignItemsCenter]}>
            <SkeletonComponent height={hp(2.5)} width={hp(2.5)} circle />
            <View style={[flex.gap10, flex.flex1]}>
              <SkeletonComponent height={hp(1.5)} />
              <SkeletonComponent height={hp(1)} width={160} />
            </View>
            <SkeletonComponent height={hp(2.5)} width={hp(2.5)} />
          </CardComponent>
          <CardComponent
            shadow
            style={[flex.gap10, flex.row, flex.alignItemsCenter]}>
            <SkeletonComponent height={hp(2.5)} width={hp(2.5)} circle />
            <View style={[flex.gap10, flex.flex1]}>
              <SkeletonComponent height={hp(1.5)} />
              <SkeletonComponent height={hp(1)} width={160} />
            </View>
            <SkeletonComponent height={hp(2.5)} width={hp(2.5)} />
          </CardComponent>
        </View>
      </View>
      <CardBottomComponent style={[flex.row, flex.gap10]}>
        <View style={[flex.flex1]}>
          <SkeletonComponent height={hp(5)} circle />
        </View>
        <View style={[flex.flex1]}>
          <SkeletonComponent height={hp(5)} circle />
        </View>
      </CardBottomComponent>
    </View>
  );
};

export default DiscountDetailsSkeleton;
