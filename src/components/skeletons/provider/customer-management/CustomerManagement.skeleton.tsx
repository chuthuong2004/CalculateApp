import {View} from 'react-native';
import React from 'react';
import {SkeletonComponent} from '@components/shares';
import {POSITION_STYLE, flex, spacing} from '@styles';
import {APP_WIDTH} from '@utils/constants';
import {Can} from '@/acl/index';
import {CustomerItemSkeleton} from './components';

const CustomerManagementSkeleton = () => {
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
        <View style={[flex.row, flex.gap10]}>
          <SkeletonComponent width={100} height={20} />
          <SkeletonComponent width={70} height={20} />
        </View>
      </View>
      <CustomerItemSkeleton />
      <CustomerItemSkeleton />
      <CustomerItemSkeleton />
      <Can I="create" a="Category">
        <View
          style={[
            POSITION_STYLE({
              position: 'bottom-right',
              distance: APP_WIDTH / 30,
            }).absolute,
          ]}>
          <SkeletonComponent width={50} height={50} radius={50} />
        </View>
      </Can>
    </View>
  );
};

export default CustomerManagementSkeleton;
