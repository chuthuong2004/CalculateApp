import {View} from 'react-native';

import React, {memo} from 'react';

// ** Global Styles
import {flex} from '@styles';

// ** Share components
import {CardComponent, SkeletonComponent} from '@components/shares';
import {hp} from '@utils/helpers';

const RoleItemSkeleton = () => {
  return (
    <CardComponent style={[flex.row, flex.gap8, flex.alignItemsCenter]}>
      <View>
        <SkeletonComponent width={hp(6)} height={hp(6)} radius={hp(0.6)} />
      </View>
      <View style={[flex.gap8, flex.flex1]}>
        <SkeletonComponent width={hp(20)} height={hp(1.5)} />
        <SkeletonComponent width={hp(12)} height={hp(1.5)} />
      </View>
    </CardComponent>
  );
};

export default memo(RoleItemSkeleton);
