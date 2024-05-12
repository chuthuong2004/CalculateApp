import {CardBottomComponent, SkeletonComponent} from '@components/shares';
import {MedicalStackScreenProps} from '@navigation/app/medical/types';
import {useRoute} from '@react-navigation/native';
import {flex, spacing} from '@styles';
import {APP_HEIGHT, SIZE_APP} from '@utils/constants';
import React from 'react';
import {View} from 'react-native';
import {hp} from '@utils/helpers';

const FormMedicineSkeleton = () => {
  const route = useRoute<MedicalStackScreenProps<'FormMedicine'>['route']>();
  return (
    <View
      style={[flex.flex1, flex.widthFull, spacing('padding').top, flex.gap10]}>
      <View style={[flex.row, flex.gap10, spacing('padding').horizontal]}>
        <SkeletonComponent height={hp(5)} radius={10} style={[flex.flex1]} />
      </View>
      {/* Form */}
      <View style={[flex.flex1, flex.gap10, spacing('padding').horizontal]}>
        {/* ** Images */}
        <View style={[flex.gap10]}>
          {route.params.data && (
            <>
              <SkeletonComponent height={APP_HEIGHT / 7} radius={SIZE_APP.lg} />
              <View style={[flex.row, flex.gap10]}>
                <SkeletonComponent width={hp(10)} height={hp(6)} radius={8} />
                <SkeletonComponent width={hp(10)} height={hp(6)} radius={8} />
                <SkeletonComponent width={hp(10)} height={hp(6)} radius={8} />
                <SkeletonComponent width={hp(10)} height={hp(6)} radius={8} />
              </View>
            </>
          )}

          <SkeletonComponent height={hp(4)} width={hp(15)} radius={50} />
        </View>
        {/* ** Inputs */}
        <View style={[flex.gap8]}>
          <SkeletonComponent width={hp(12)} height={hp(2)} />
          <SkeletonComponent height={hp(4)} radius={8} />
        </View>
        <View style={[flex.gap8]}>
          <SkeletonComponent width={hp(12)} height={hp(2)} />
          <SkeletonComponent height={hp(4)} radius={8} />
        </View>
        <View style={[flex.gap8]}>
          <SkeletonComponent width={hp(12)} height={hp(2)} />
          <SkeletonComponent height={hp(4)} radius={8} />
        </View>
        <View style={[flex.gap8]}>
          <SkeletonComponent width={hp(12)} height={hp(2)} />
          <SkeletonComponent height={hp(4)} radius={8} />
        </View>
        <View style={[flex.gap8]}>
          <SkeletonComponent width={hp(12)} height={hp(2)} />
          <SkeletonComponent height={hp(4)} radius={8} />
        </View>
        <View style={[flex.gap8]}>
          <SkeletonComponent width={hp(12)} height={hp(2)} />
          <SkeletonComponent height={hp(4)} radius={8} />
        </View>
        <View style={[flex.gap8]}>
          <SkeletonComponent width={hp(12)} height={hp(2)} />
          <SkeletonComponent height={hp(4)} radius={8} />
        </View>
      </View>

      <CardBottomComponent style={[flex.row, flex.gap10]}>
        <SkeletonComponent style={[flex.flex1]} radius={hp(5)} height={hp(5)} />
      </CardBottomComponent>
    </View>
  );
};

export default FormMedicineSkeleton;
