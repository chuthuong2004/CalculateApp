import {View} from 'react-native';
import React from 'react';
import {SkeletonComponent} from '@components/shares';
import {flex} from '@styles/flex.style';
import {spacing} from '@styles/spacing.style';
import ConversationItemSkeleton from './ConversationItem.skeleton';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const ConversationSkeleton = () => {
  return (
    <View
      style={[
        flex.flex1,
        flex.widthFull,
        spacing('padding').around,
        flex.gap10,
      ]}>
      <SkeletonComponent height={50} radius={50} />
      <View style={[flex.row, flex.alignItemsCenter, flex.gap10]}>
        <SkeletonComponent width={wp(8)} height={wp(8)} circle />
        <SkeletonComponent width={wp(8)} height={wp(8)} circle />
        <SkeletonComponent width={wp(8)} height={wp(8)} circle />
        <SkeletonComponent width={wp(8)} height={wp(8)} circle />
        <SkeletonComponent width={wp(8)} height={wp(8)} circle />
      </View>
      <ConversationItemSkeleton />
      <ConversationItemSkeleton />
      <ConversationItemSkeleton />
      <ConversationItemSkeleton />
    </View>
  );
};

export default ConversationSkeleton;
