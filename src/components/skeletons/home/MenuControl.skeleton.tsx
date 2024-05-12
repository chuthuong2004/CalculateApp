import {View} from 'react-native';
import React from 'react';
import {spacing, flex} from '@styles';
import {SkeletonComponent} from '@components/shares';
import {getSizeItemWithGridLayout} from '@utils';

const MenuControlSkeleton = () => {
  return (
    <View
      style={[
        flex.row,
        flex.gap10,
        spacing('padding').horizontal,
        spacing('padding').vertical,
      ]}>
      <SkeletonComponent
        width={getSizeItemWithGridLayout(10, 4)}
        height={100}
        radius={8}
      />
      <SkeletonComponent
        width={getSizeItemWithGridLayout(10, 4)}
        height={100}
        radius={8}
      />
      <SkeletonComponent
        width={getSizeItemWithGridLayout(10, 4)}
        height={100}
        radius={8}
      />
      <SkeletonComponent
        width={getSizeItemWithGridLayout(10, 4)}
        height={100}
        radius={8}
      />
    </View>
  );
};

export default MenuControlSkeleton;
