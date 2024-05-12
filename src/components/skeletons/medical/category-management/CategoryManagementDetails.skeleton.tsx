import {Can} from '@/acl/components';
import {CardBottomComponent, SkeletonComponent} from '@components/shares';
import {POSITION_STYLE, flex, spacing} from '@styles';
import {APP_WIDTH} from '@utils/constants';
import React from 'react';
import {View} from 'react-native';
import CategoryManagementItemSkeleton from './CategoryManagementItem.skeleton';

const CategoryManagementDetailsSkeleton = () => {
  return (
    <View style={[flex.flex1, flex.widthFull]}>
      <View style={[flex.flex1, flex.gap10, spacing('padding').around]}>
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
      <CardBottomComponent
        style={[flex.row, flex.gap10, spacing('padding').horizontal]}>
        <View style={[flex.flex1, flex.row, flex.gap10]}>
          <SkeletonComponent style={[flex.flex1]} height={50} radius={50} />
        </View>
        <SkeletonComponent style={[flex.flex1]} height={50} radius={50} />
      </CardBottomComponent>
    </View>
  );
};

export default CategoryManagementDetailsSkeleton;
