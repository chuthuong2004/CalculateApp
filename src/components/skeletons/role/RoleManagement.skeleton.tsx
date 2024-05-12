import {Platform, View} from 'react-native';
import React from 'react';
import {SkeletonComponent} from '@components/shares';
import {POSITION_STYLE, flex, spacing} from '@styles';
import {APP_WIDTH} from '@utils/constants';
import RoleItemSkeleton from './RoleItem.skeleton';
import {Can} from '@/acl/index';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const RoleManagementSkeleton = () => {
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
      <RoleItemSkeleton />
      <RoleItemSkeleton />
      <RoleItemSkeleton />
      <Can I="create" a="Role">
        <View
          style={[
            POSITION_STYLE({
              position: 'bottom-right',
              distance: {
                right: APP_WIDTH / 30,
                bottom: Platform.OS === 'ios' ? insets.bottom : APP_WIDTH / 30,
              },
            }).absolute,
          ]}>
          <SkeletonComponent width={50} height={50} radius={50} />
        </View>
      </Can>
    </View>
  );
};

export default RoleManagementSkeleton;
