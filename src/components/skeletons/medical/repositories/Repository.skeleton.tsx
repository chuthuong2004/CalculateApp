import {View} from 'react-native';
import React from 'react';
import {SkeletonComponent} from '@components/shares';
import {POSITION_STYLE, flex, spacing} from '@styles';
import {APP_WIDTH, HEIGHT_BOTTOM_TAB} from '@utils/constants';
import RepositoryItemSkeleton from './RepositoryItem.skeleton';

const RepositorySkeleton = () => {
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
      <RepositoryItemSkeleton />
      <RepositoryItemSkeleton />
      <RepositoryItemSkeleton />
      <View
        style={[
          POSITION_STYLE({
            position: 'bottom-right',
            distance: APP_WIDTH / 30,
          }).absolute,
        ]}>
        <SkeletonComponent width={50} height={50} radius={50} />
      </View>
    </View>
  );
};

export default RepositorySkeleton;
