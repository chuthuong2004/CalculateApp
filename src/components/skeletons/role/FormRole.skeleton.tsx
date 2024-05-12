import {CardBottomComponent, SkeletonComponent} from '@components/shares';
import {flex} from '@styles/flex.style';
import {spacing} from '@styles/spacing.style';
import {hp} from '@utils/helpers';
import React from 'react';
import {View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const FormRoleSkeleton = () => {
  return (
    <View style={[flex.flex1]}>
      <View style={[flex.flex1, flex.gap10, spacing('padding').around]}>
        <SkeletonComponent
          width={widthPercentageToDP(30)}
          height={hp(5)}
          radius={hp(1)}
        />
        <View style={[flex.gap4]}>
          <SkeletonComponent height={hp(2)} width={widthPercentageToDP(20)} />
          <SkeletonComponent height={hp(4)} />
        </View>
        <View style={[flex.gap4]}>
          <SkeletonComponent height={hp(2)} width={widthPercentageToDP(30)} />
          <SkeletonComponent height={hp(4)} />
        </View>
        <View style={[flex.gap4]}>
          <SkeletonComponent height={hp(2)} width={widthPercentageToDP(25)} />
          <SkeletonComponent height={hp(4)} />
        </View>
      </View>
      <CardBottomComponent>
        <SkeletonComponent height={hp(5)} radius={hp(10)} />
      </CardBottomComponent>
    </View>
  );
};

export default FormRoleSkeleton;
