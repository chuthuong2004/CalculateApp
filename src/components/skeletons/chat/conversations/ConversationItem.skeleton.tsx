import {View} from 'react-native';
import React from 'react';

// ** Share components
import {CardComponent, SkeletonComponent} from '@components/shares';

// ** Global Styles
import {flex} from '@styles';

// ** Types
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const ConversationItemComponent = () => {
  return (
    <CardComponent style={[flex.row, flex.alignItemsCenter, flex.gap10]}>
      <SkeletonComponent width={wp(8)} height={wp(8)} circle />
      <View style={[flex.flex1, flex.gap8]}>
        <View style={[flex.gap8]}>
          <SkeletonComponent height={20} />
          <SkeletonComponent width={100} height={10} />
        </View>
        <SkeletonComponent height={15} />
      </View>
    </CardComponent>
  );
};

export default ConversationItemComponent;
