import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import {SkeletonComponent} from '@components/shares';
import {SHADOW_STYLE, flex, spacing} from '@styles';
import {useTheme} from '@react-navigation/native';
import {StyleSheetProps} from '@/types/commons';
import {ViewProps} from 'react-native';

interface ProductItemSkeletonProps extends ViewProps {}
const ProductItemSkeleton = (props: ProductItemSkeletonProps) => {
  const styles = styling(useTheme());
  return (
    <View
      {...props}
      style={[styles.container, SHADOW_STYLE.shadowCard, props.style]}>
      <SkeletonComponent style={styles.image} height={120} />
      <View style={[spacing('padding', 0, 10).around, flex.gap4]}>
        <SkeletonComponent height={40} />
        <SkeletonComponent height={15} width={100} />
        <SkeletonComponent height={15} width={100} />
        <SkeletonComponent height={15} width={100} />
      </View>
    </View>
  );
};

export default memo(ProductItemSkeleton);

const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 8,
      gap: 4,
    },
    image: {
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
    },
  });
