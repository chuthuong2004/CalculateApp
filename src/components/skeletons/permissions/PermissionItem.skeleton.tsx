import {View} from 'react-native';
import React from 'react';
import {flex} from '@styles';
import {SkeletonComponent} from '@components/shares';
import {useTheme} from '@react-navigation/native';

const PermissionItemSkeleton = () => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        flex.gap10,
        {
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          paddingBottom: 4,
        },
      ]}>
      <SkeletonComponent width={200} height={15} />
      <View style={[flex.row, flex.gap10, flex.wrap]}>
        <SkeletonComponent width={60} height={15} />

        <SkeletonComponent width={60} height={15} />

        <SkeletonComponent width={60} height={15} />

        <SkeletonComponent width={60} height={15} />
      </View>
    </View>
  );
};

export default PermissionItemSkeleton;
