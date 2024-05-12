import {View, StyleSheet} from 'react-native';
import React from 'react';

// ** Share components
import {SkeletonComponent} from '@components/shares';

// ** Global styles
import {spacing, flex, SHADOW_STYLE} from '@styles';

// ** Constants
import {APP_HEIGHT, SIZE_APP} from '@utils/constants';

// ** Navigation
import {useTheme} from '@react-navigation/native';

// ** Types
import {StyleSheetProps} from '@/types/commons';

const ProductDetailsSkeleton = () => {
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <View style={[flex.flex1]}>
      <View style={[spacing('padding').around, flex.flex1, flex.gap10]}>
        <SkeletonComponent height={APP_HEIGHT / 4} radius={20} />
        <SkeletonComponent height={25} />
        <View style={[flex.row, flex.gap10, flex.alignItemsCenter]}>
          <SkeletonComponent width={80} height={15} />
          <SkeletonComponent width={80} height={15} />
          <SkeletonComponent width={80} height={15} />
        </View>
        <SkeletonComponent width={120} height={35} />
        <View style={[flex.row, flex.gap10]}>
          <SkeletonComponent width={60} height={30} rounded />
          <SkeletonComponent width={60} height={30} rounded />
        </View>
        <SkeletonComponent width={200} height={35} />

        <SkeletonComponent width={200} height={35} />
        <SkeletonComponent width={200} height={35} />
      </View>
      <View
        style={[
          flex.row,
          flex.alignItemsCenter,
          flex.justifyContentCenter,
          flex.gap10,
          SHADOW_STYLE.shadowTop,
          spacing('padding').horizontal,
          styles.bottom,
        ]}>
        <SkeletonComponent width={50} height={50} radius={100} />
        <SkeletonComponent style={[flex.flex1]} height={50} radius={100} />
        <SkeletonComponent style={[flex.flex1]} height={50} radius={100} />
      </View>
    </View>
  );
};

export default ProductDetailsSkeleton;

const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    bottom: {
      backgroundColor: colors.background,
      borderTopLeftRadius: SIZE_APP.lg,
      borderTopRightRadius: SIZE_APP.lg,
      height: 100,
    },
  });
