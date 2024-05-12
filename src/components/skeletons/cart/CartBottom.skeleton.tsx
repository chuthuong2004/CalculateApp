import {View, StyleSheet} from 'react-native';
import React, {memo} from 'react';

// ** Types

// ** Share Components
import {CardBottomComponent, SkeletonComponent} from '@components/shares';

// ** Global Styles
import {flex, spacing} from '@styles';

// ** Hooks
import {useTheme} from '@react-navigation/native';
import {StyleSheetProps} from '@/types/commons';

const CartBottomSkeleton = () => {
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <CardBottomComponent style={[flex.column]}>
      <View
        style={[flex.row, flex.alignItemsCenter, flex.justifyContentBetween]}>
        <SkeletonComponent width={60} height={20} radius={4} />
        <SkeletonComponent width={60} height={20} radius={4} />
      </View>
      <View style={[spacing('margin', 30, 5).vertical, styles.divide]} />
      <View
        style={[flex.row, flex.alignItemsCenter, flex.justifyContentBetween]}>
        <View style={[flex.row, flex.gap8, flex.alignItemsCenter]}>
          <SkeletonComponent width={60} height={20} radius={4} />
          <SkeletonComponent width={80} height={20} radius={4} />
        </View>
        <SkeletonComponent rounded width={100} height={50} />
      </View>
    </CardBottomComponent>
  );
};

export default memo(CartBottomSkeleton);

const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    divide: {
      width: '100%',
      backgroundColor: colors.border,
      height: 1,
    },
  });
