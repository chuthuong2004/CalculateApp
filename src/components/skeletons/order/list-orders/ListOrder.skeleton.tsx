import {View} from 'react-native';
import React from 'react';

// ** Share components
import {CardComponent, SkeletonComponent} from '@components/shares';

// ** Constants
import {APP_WIDTH} from '@utils/constants';

// ** Global styles
import {spacing, flex} from '@styles';

// ** Navigation hooks
import {useTheme} from '@react-navigation/native';

const ListOrderSkeleton = () => {
  const {colors} = useTheme();
  return (
    <View style={[flex.flex1, flex.widthFull]}>
      <View style={[spacing('padding').around, flex.gap10]}>
        <SkeletonComponent height={50} radius={50} />
        <View style={[flex.row, flex.gap10, spacing('padding').vertical]}>
          <SkeletonComponent height={20} width={APP_WIDTH / 5} rounded />
          <SkeletonComponent height={20} width={APP_WIDTH / 5} rounded />
          <SkeletonComponent height={20} width={APP_WIDTH / 5} rounded />
          <SkeletonComponent height={20} width={APP_WIDTH / 5} rounded />
          <SkeletonComponent height={20} width={APP_WIDTH / 5} rounded />
        </View>
      </View>
      <View style={[flex.gap10]}>
        <CardComponent corner={false} style={[flex.gap10]}>
          <View style={[flex.row, flex.justifyContentBetween]}>
            <SkeletonComponent width={200} height={15} />
            <SkeletonComponent width={90} height={15} />
          </View>
          <View style={[flex.row, flex.gap10]}>
            <SkeletonComponent width={130} height={15} />
            <SkeletonComponent width={60} height={15} />
          </View>
          <View style={[flex.row, flex.gap10]}>
            <SkeletonComponent width={70} height={70} radius={8} />
            <View style={[flex.gap4, flex.flex1]}>
              <SkeletonComponent height={30} />
              <SkeletonComponent height={15} width={120} />
              <View style={[flex.row, flex.justifyContentBetween]}>
                <SkeletonComponent height={15} width={120} />
                <SkeletonComponent height={15} width={60} />
              </View>
            </View>
          </View>
          <View style={{height: 1, backgroundColor: colors.border}} />
          <View style={[flex.row, flex.justifyContentEnd]}>
            <SkeletonComponent height={40} width={100} radius={50} />
          </View>
        </CardComponent>
        <CardComponent corner={false} style={[flex.gap10]}>
          <View style={[flex.row, flex.justifyContentBetween]}>
            <SkeletonComponent width={200} height={15} />
            <SkeletonComponent width={90} height={15} />
          </View>
          <View style={[flex.row, flex.gap10]}>
            <SkeletonComponent width={130} height={15} />
            <SkeletonComponent width={60} height={15} />
          </View>
          <View style={[flex.row, flex.gap10]}>
            <SkeletonComponent width={70} height={70} radius={8} />
            <View style={[flex.gap4, flex.flex1]}>
              <SkeletonComponent height={30} />
              <SkeletonComponent height={15} width={120} />
              <View style={[flex.row, flex.justifyContentBetween]}>
                <SkeletonComponent height={15} width={120} />
                <SkeletonComponent height={15} width={60} />
              </View>
            </View>
          </View>
          <View style={{height: 1, backgroundColor: colors.border}} />
          <View style={[flex.row, flex.justifyContentEnd]}>
            <SkeletonComponent height={40} width={100} radius={50} />
          </View>
        </CardComponent>
      </View>
    </View>
  );
};

export default ListOrderSkeleton;
