import {
  CardBottomComponent,
  CardComponent,
  SkeletonComponent,
} from '@components/shares';
import {useTheme} from '@react-navigation/native';
import {flex} from '@styles/flex.style';
import {spacing} from '@styles/spacing.style';
import {hp} from '@utils/helpers';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const PrescriptionDetailsSkeleton = () => {
  const {colors} = useTheme();
  return (
    <View style={[flex.flex1, flex.widthFull]}>
      <View style={[flex.flex1, flex.gap10, spacing('padding').around]}>
        {/* Patient */}
        <CardComponent shadow>
          <View style={[flex.gap10]}>
            <View style={[flex.alignItemsCenter]}>
              <SkeletonComponent
                width={hp(20)}
                height={hp(2.5)}
                radius={hp(0.6)}
              />
            </View>
            <View style={[flex.row, flex.gap10]}>
              <SkeletonComponent width={hp(7)} height={hp(7)} circle />
              <View style={[flex.gap10, flex.flex1]}>
                <SkeletonComponent height={hp(1.5)} />
                <View
                  style={[
                    flex.row,
                    flex.alignItemsCenter,
                    flex.justifyContentBetween,
                  ]}>
                  <SkeletonComponent width={hp(8)} height={hp(1.5)} />

                  <SkeletonComponent width={hp(6)} height={hp(1.5)} />
                </View>
                <View
                  style={[
                    flex.row,
                    flex.alignItemsCenter,
                    flex.justifyContentBetween,
                  ]}>
                  <SkeletonComponent width={hp(7)} height={hp(1.5)} />

                  <SkeletonComponent width={hp(15)} height={hp(1.5)} />
                </View>
                <View
                  style={[
                    flex.row,
                    flex.alignItemsCenter,
                    flex.justifyContentBetween,
                  ]}>
                  <SkeletonComponent width={hp(10)} height={hp(1.5)} />

                  <SkeletonComponent width={hp(5)} height={hp(1.5)} />
                </View>
              </View>
            </View>
          </View>
        </CardComponent>
        {/* Prescription */}
        <CardComponent shadow>
          <View style={[flex.gap10]}>
            <View style={[flex.alignItemsCenter]}>
              <SkeletonComponent
                width={hp(20)}
                height={hp(2.5)}
                radius={hp(0.6)}
              />
            </View>
            <View style={[flex.row, flex.gap10]}>
              <View style={[flex.gap10, flex.flex1]}>
                <View
                  style={[
                    flex.row,
                    flex.alignItemsCenter,
                    flex.justifyContentBetween,
                  ]}>
                  <SkeletonComponent width={hp(8)} height={hp(1.5)} />

                  <SkeletonComponent width={hp(6)} height={hp(1.5)} />
                </View>
                <View
                  style={[
                    flex.row,
                    flex.alignItemsCenter,
                    flex.justifyContentBetween,
                  ]}>
                  <SkeletonComponent width={hp(7)} height={hp(1.5)} />

                  <SkeletonComponent width={hp(15)} height={hp(1.5)} />
                </View>
                <View
                  style={[
                    flex.row,
                    flex.alignItemsCenter,
                    flex.justifyContentBetween,
                  ]}>
                  <SkeletonComponent width={hp(10)} height={hp(1.5)} />

                  <SkeletonComponent width={hp(5)} height={hp(1.5)} />
                </View>
                <View style={[flex.row, flex.gap10]}>
                  <SkeletonComponent width={hp(6)} height={hp(6)} />
                  <View style={[flex.gap4, flex.flex1]}>
                    <SkeletonComponent height={hp(1.5)} />
                    <SkeletonComponent width={hp(10)} height={hp(1.5)} />
                  </View>
                </View>
                <View
                  style={{
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderTopColor: colors.border,
                  }}
                />
                <View style={[flex.row, flex.justifyContentBetween]}>
                  <SkeletonComponent width={hp(9)} height={hp(1.5)} />
                  <SkeletonComponent width={hp(7)} height={hp(2)} />
                </View>
              </View>
            </View>
          </View>
        </CardComponent>
        {/* Doctor */}
        <CardComponent shadow>
          <View style={[flex.gap10]}>
            <View style={[flex.alignItemsCenter]}>
              <SkeletonComponent width={hp(20)} height={hp(2.5)} radius={0.6} />
            </View>
            <View style={[flex.row, flex.gap10]}>
              <SkeletonComponent width={hp(10)} height={hp(10)} circle />
              <View style={[flex.gap10, flex.flex1]}>
                <View
                  style={[
                    flex.row,
                    flex.alignItemsCenter,
                    flex.justifyContentBetween,
                  ]}>
                  <SkeletonComponent width={hp(8)} height={hp(1.5)} />

                  <SkeletonComponent width={hp(6)} height={hp(1.5)} />
                </View>
                <View
                  style={[
                    flex.row,
                    flex.alignItemsCenter,
                    flex.justifyContentBetween,
                  ]}>
                  <SkeletonComponent width={hp(7)} height={hp(1.5)} />

                  <SkeletonComponent width={hp(15)} height={hp(1.5)} />
                </View>
                <View
                  style={[
                    flex.row,
                    flex.alignItemsCenter,
                    flex.justifyContentBetween,
                  ]}>
                  <SkeletonComponent width={hp(10)} height={hp(1.5)} />

                  <SkeletonComponent width={hp(5)} height={hp(1.5)} />
                </View>
                <View
                  style={[
                    flex.row,
                    flex.alignItemsCenter,
                    flex.justifyContentBetween,
                  ]}>
                  <SkeletonComponent width={hp(8)} height={hp(1.5)} />

                  <SkeletonComponent width={hp(6)} height={hp(1.5)} />
                </View>
                <View
                  style={[
                    flex.row,
                    flex.alignItemsCenter,
                    flex.justifyContentBetween,
                  ]}>
                  <SkeletonComponent width={hp(7)} height={hp(1.5)} />

                  <SkeletonComponent width={hp(15)} height={hp(1.5)} />
                </View>
                <View
                  style={[
                    flex.row,
                    flex.alignItemsCenter,
                    flex.justifyContentBetween,
                  ]}>
                  <SkeletonComponent width={hp(10)} height={hp(1.5)} />

                  <SkeletonComponent width={hp(5)} height={hp(1.5)} />
                </View>
              </View>
            </View>
          </View>
        </CardComponent>
      </View>
      <CardBottomComponent style={[flex.row, flex.gap10]}>
        <View style={[flex.flex1]}>
          <SkeletonComponent height={hp(5)} circle />
        </View>
        <View style={[flex.flex1]}>
          <SkeletonComponent height={hp(5)} circle />
        </View>
      </CardBottomComponent>
    </View>
  );
};

export default PrescriptionDetailsSkeleton;
