import {View, StyleSheet} from 'react-native';
import React, {memo} from 'react';

// ** Share Components
import {SkeletonComponent} from '@components/shares';

// ** Hooks
import {useTheme} from '@react-navigation/native';

// ** Global Styles
import {flex, spacing} from '@styles';

// ** Types
import {StyleSheetProps} from '@/types/commons';

const NotificationItemSkeleton = () => {
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <View
      style={[
        flex.row,
        flex.alignItemsStart,
        flex.justifyContentBetween,
        flex.gap10,
        spacing('padding', 30).horizontal,
        spacing('padding', 40).vertical,
        styles.container,
      ]}>
      <SkeletonComponent width={50} height={50} radius={5} />
      <View style={[flex.gap2, flex.flex1, flex.gap5]}>
        <SkeletonComponent height={15} />
        <SkeletonComponent height={30} />
        <SkeletonComponent height={10} width={100} />
      </View>
    </View>
  );
};

export default memo(NotificationItemSkeleton);
const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    container: {
      borderRadius: 10,
      backgroundColor: colors.card,
    },
    image: {
      width: 50,
      height: 50,
      resizeMode: 'cover',
      borderRadius: 5,
    },
    unread: {
      // backgroundColor: '#d3cece54',
      backgroundColor: 'transparent',
      borderWidth: 0.2,
      borderColor: colors.border,
    },
  });
