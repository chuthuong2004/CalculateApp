import {View} from 'react-native';
import React from 'react';
import {CardComponent, SkeletonComponent} from '@components/shares';
import {flex, spacing} from '@styles';
import {getSizeItemWithGridLayout} from '@utils/utilities';

const MedicalIconsSkeleton = () => {
  return (
    <View
      style={[
        flex.flex1,
        flex.widthFull,
        spacing('padding').around,
        flex.gap10,
      ]}>
      <SkeletonComponent height={50} radius={50} />
      <SkeletonComponent width={150} height={20} />
      <View style={[flex.row, flex.wrap, flex.gap10]}>
        <CardComponent
          style={[
            {width: getSizeItemWithGridLayout(10, 4)},
            flex.gap4,
            flex.alignItemsCenter,
          ]}>
          <SkeletonComponent width={50} height={50} radius={4} />
          <SkeletonComponent width={70} height={15} radius={4} />
        </CardComponent>
        <CardComponent
          style={[
            {width: getSizeItemWithGridLayout(10, 4)},
            flex.gap4,
            flex.alignItemsCenter,
          ]}>
          <SkeletonComponent width={50} height={50} radius={4} />
          <SkeletonComponent width={70} height={15} radius={4} />
        </CardComponent>
        <CardComponent
          style={[
            {width: getSizeItemWithGridLayout(10, 4)},
            flex.gap4,
            flex.alignItemsCenter,
          ]}>
          <SkeletonComponent width={50} height={50} radius={4} />
          <SkeletonComponent width={70} height={15} radius={4} />
        </CardComponent>
        <CardComponent
          style={[
            {width: getSizeItemWithGridLayout(10, 4)},
            flex.gap4,
            flex.alignItemsCenter,
          ]}>
          <SkeletonComponent width={50} height={50} radius={4} />
          <SkeletonComponent width={70} height={15} radius={4} />
        </CardComponent>
        <CardComponent
          style={[
            {width: getSizeItemWithGridLayout(10, 4)},
            flex.gap4,
            flex.alignItemsCenter,
          ]}>
          <SkeletonComponent width={50} height={50} radius={4} />
          <SkeletonComponent width={70} height={15} radius={4} />
        </CardComponent>
        <CardComponent
          style={[
            {width: getSizeItemWithGridLayout(10, 4)},
            flex.gap4,
            flex.alignItemsCenter,
          ]}>
          <SkeletonComponent width={50} height={50} radius={4} />
          <SkeletonComponent width={70} height={15} radius={4} />
        </CardComponent>
        <CardComponent
          style={[
            {width: getSizeItemWithGridLayout(10, 4)},
            flex.gap4,
            flex.alignItemsCenter,
          ]}>
          <SkeletonComponent width={50} height={50} radius={4} />
          <SkeletonComponent width={70} height={15} radius={4} />
        </CardComponent>
        <CardComponent
          style={[
            {width: getSizeItemWithGridLayout(10, 4)},
            flex.gap4,
            flex.alignItemsCenter,
          ]}>
          <SkeletonComponent width={50} height={50} radius={4} />
          <SkeletonComponent width={70} height={15} radius={4} />
        </CardComponent>
      </View>
    </View>
  );
};

export default MedicalIconsSkeleton;
