import {View} from 'react-native';
import React from 'react';
import {SkeletonComponent} from '@components/shares';
import {POSITION_STYLE, flex, spacing} from '@styles';
import {APP_WIDTH, HEIGHT_BOTTOM_TAB} from '@utils/constants';
import CategoryManagementItemSkeleton from './CategoryManagementItem.skeleton';
import {Can} from '@/acl/index';

const CategoryManagementSkeleton = () => {
  return (
    <View
      style={[
        flex.flex1,
        flex.widthFull,
        spacing('padding').around,
        flex.gap10,
        {
          marginBottom: HEIGHT_BOTTOM_TAB,
        },
      ]}>
      <SkeletonComponent height={50} radius={50} />
      <View
        style={[flex.row, flex.alignItemsCenter, flex.justifyContentBetween]}>
        <SkeletonComponent width={200} height={20} />
        <SkeletonComponent width={70} height={20} />
      </View>
      <CategoryManagementItemSkeleton />
      <CategoryManagementItemSkeleton />
      <CategoryManagementItemSkeleton />
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

export default CategoryManagementSkeleton;
