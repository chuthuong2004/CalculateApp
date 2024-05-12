import {View} from 'react-native';
import React from 'react';
import {flex, spacing} from '@styles';
import {SkeletonComponent} from '@components/shares';
import ProductItemSkeleton from '../ProductItem.skeleton';
import {getSizeItemWithGridLayout} from '@utils/utilities';
import {CategoryItemSkeleton} from '@components/skeletons/category';

const ProductOfCategorySkeleton = () => {
  return (
    <View style={[flex.flex1, flex.gap10]}>
      <View
        style={[spacing('padding').around, flex.row, flex.gap10, flex.wrap]}>
        {[1, 2, 3, 4, 5, 6].map(item => (
          <CategoryItemSkeleton
            key={item}
            width={getSizeItemWithGridLayout(10, 3)}
            height={50}
            orientation="horizontal"
          />
        ))}
      </View>
      <View style={[spacing('padding').horizontal, flex.gap10]}>
        <SkeletonComponent height={50} rounded />
        <SkeletonComponent height={20} width={180} radius={8} />
        <View style={[flex.gap10]}>
          <View style={[flex.row, flex.gap4]}>
            <SkeletonComponent width={60} height={25} rounded />
            <SkeletonComponent width={60} height={25} rounded />
            <SkeletonComponent width={60} height={25} rounded />
            <SkeletonComponent width={60} height={25} rounded />
          </View>
        </View>
      </View>
      <View
        style={[
          flex.row,
          flex.alignItemsCenter,
          flex.justifyContentCenter,
          flex.gap10,
          flex.wrap,
          spacing('padding').horizontal,
        ]}>
        <ProductItemSkeleton
          style={{width: getSizeItemWithGridLayout(10, 2)}}
        />
        <ProductItemSkeleton
          style={{width: getSizeItemWithGridLayout(10, 2)}}
        />
        <ProductItemSkeleton
          style={{width: getSizeItemWithGridLayout(10, 2)}}
        />
        <ProductItemSkeleton
          style={{width: getSizeItemWithGridLayout(10, 2)}}
        />
      </View>
    </View>
  );
};

export default ProductOfCategorySkeleton;
