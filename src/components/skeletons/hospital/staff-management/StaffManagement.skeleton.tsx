import {Platform, View} from 'react-native';
import React from 'react';
import {SkeletonComponent} from '@components/shares';
import {POSITION_STYLE, flex, spacing} from '@styles';
import {APP_WIDTH} from '@utils/constants';
import {Can} from '@/acl/index';
import {StaffItemSkeleton} from './components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const StaffManagementSkeleton = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        flex.flex1,
        flex.widthFull,
        spacing('padding').around,
        flex.gap10,
      ]}>
      <SkeletonComponent height={50} radius={50} />
      <View
        style={[flex.row, flex.alignItemsCenter, flex.justifyContentBetween]}>
        <SkeletonComponent width={200} height={20} />
        <SkeletonComponent width={70} height={20} />
      </View>
      <StaffItemSkeleton />
      <StaffItemSkeleton />
      <StaffItemSkeleton />
      <Can I="create" a="User">
        <View
          style={[
            POSITION_STYLE({
              position: 'bottom-right',
              distance: {
                bottom: Platform.OS ? insets.bottom : APP_WIDTH / 30,
                right: APP_WIDTH / 30,
              },
            }).absolute,
          ]}>
          <SkeletonComponent width={50} height={50} radius={50} />
        </View>
      </Can>
    </View>
  );
};

export default StaffManagementSkeleton;
