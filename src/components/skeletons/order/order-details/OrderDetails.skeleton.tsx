import {View, StyleSheet} from 'react-native';
import React from 'react';

// ** Share components
import {CardBottomComponent, SkeletonComponent} from '@components/shares';

// ** Global styles
import {spacing, flex} from '@styles';

// ** Constants
import {SIZE_APP} from '@utils/constants';

// ** Types
import {StyleSheetProps} from '@/types/commons';

// ** Navigation
import {useTheme} from '@react-navigation/native';

const OrderDetailsSkeleton = () => {
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <View style={[flex.widthFull, flex.flex1]}>
      <View style={[flex.flex1, flex.gap10, spacing('padding').around]}>
        <SkeletonComponent height={20} />
        <SkeletonComponent height={120} />
        <SkeletonComponent height={20} width={150} />
        <View style={[flex.row, flex.justifyContentBetween]}>
          <SkeletonComponent height={15} width={70} />
          <SkeletonComponent height={15} width={120} />
        </View>
        <SkeletonComponent width={200} height={20} />
        <View style={[flex.row, flex.gap10]}>
          <SkeletonComponent width={25} height={25} radius={50} />
          <View style={[flex.gap4]}>
            <SkeletonComponent width={200} height={20} />
            <View style={[flex.row, flex.gap10]}>
              <SkeletonComponent width={120} height={20} />
              <SkeletonComponent width={120} height={20} />
            </View>
          </View>
        </View>
        <View style={[flex.row, flex.gap10]}>
          <SkeletonComponent width={25} height={25} radius={50} />
          <View style={[flex.gap4]}>
            <SkeletonComponent width={200} height={20} />
            <View style={[flex.row, flex.gap10]}>
              <SkeletonComponent width={120} height={20} />
              <SkeletonComponent width={120} height={20} />
            </View>
          </View>
        </View>
        <View style={[flex.row, flex.gap10]}>
          <SkeletonComponent width={25} height={25} radius={50} />
          <View style={[flex.gap4]}>
            <SkeletonComponent width={200} height={20} />
            <View style={[flex.row, flex.gap10]}>
              <SkeletonComponent width={120} height={20} />
              <SkeletonComponent width={120} height={20} />
            </View>
          </View>
        </View>
      </View>
      <CardBottomComponent style={[flex.row, flex.gap10, styles.bottom]}>
        <SkeletonComponent style={[flex.flex1]} height={50} radius={50} />
        <SkeletonComponent style={[flex.flex1]} height={50} radius={50} />
      </CardBottomComponent>
    </View>
  );
};

export default OrderDetailsSkeleton;

const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    bottom: {
      position: 'absolute',
      bottom: 0,
      backgroundColor: colors.card,
      width: '100%',
      borderTopLeftRadius: SIZE_APP.sm,
      borderTopRightRadius: SIZE_APP.sm,
      height: 100,
    },
  });
