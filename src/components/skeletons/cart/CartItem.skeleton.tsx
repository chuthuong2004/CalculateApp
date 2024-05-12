import {View} from 'react-native';
import React, {memo} from 'react';

// ** Constants
import {APP_WIDTH} from '@utils/constants';

// ** Share Components
import {CardComponent, SkeletonComponent} from '@components/shares';

// ** Global Styles
import {flex} from '@styles';

const CartItemSkeleton = () => {
  return (
    <CardComponent style={[flex.row, flex.gap10]}>
      <SkeletonComponent circle width={20} height={20} />
      <View style={[flex.row, flex.flex1, flex.gap10]}>
        <SkeletonComponent
          width={APP_WIDTH / 6}
          height={((APP_WIDTH / 6) * 4) / 4}
          radius={10}
        />
        <View style={[flex.gap4, flex.flex1]}>
          <SkeletonComponent height={25} />
          <View style={[flex.row, flex.gap4, flex.alignItemsCenter]}>
            <SkeletonComponent height={10} width={50} />
            <SkeletonComponent height={10} width={40} />
          </View>
          <View style={[flex.row, flex.alignItemsCenter, flex.gap4]}>
            <SkeletonComponent height={15} width={60} />
            <SkeletonComponent height={15} width={30} />
          </View>
        </View>
      </View>
    </CardComponent>
  );
};

export default memo(CartItemSkeleton);
