import React from 'react';
import {Platform, View} from 'react-native';

// ** Global styles
import {POSITION_STYLE, flex, spacing} from '@styles';

// ** Share components
import {SkeletonComponent} from '@components/shares';

// ** Constants
import {APP_WIDTH} from '@utils/constants';

// ** Navigation hooks
import PrescriptionItemSkeleton from './PrescriptionItem.skeleton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {hp} from '@utils/helpers';

const ListPrescriptionsSkeleton = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        spacing('padding').around,
        flex.gap10,
        flex.flex1,
        flex.widthFull,
      ]}>
      <SkeletonComponent radius={hp(5)} height={hp(4.5)} />
      <View style={[flex.row, flex.gap10]}>
        <SkeletonComponent
          radius={hp(5)}
          height={hp(3)}
          width={APP_WIDTH / 4.5}
        />
        <SkeletonComponent
          radius={hp(5)}
          height={hp(3)}
          width={APP_WIDTH / 4.5}
        />
        <SkeletonComponent
          radius={hp(5)}
          height={hp(3)}
          width={APP_WIDTH / 4.5}
        />
        <SkeletonComponent
          radius={hp(5)}
          height={hp(3)}
          width={APP_WIDTH / 4.5}
        />
      </View>
      <PrescriptionItemSkeleton />
      <PrescriptionItemSkeleton />
      <PrescriptionItemSkeleton />
      <View
        style={[
          POSITION_STYLE({
            position: 'bottom-right',
            distance: {
              right: APP_WIDTH / 30,
              bottom: Platform.OS === 'ios' ? insets.bottom : APP_WIDTH / 30,
            },
          }).absolute,
        ]}>
        <SkeletonComponent width={50} height={50} radius={50} />
      </View>
    </View>
  );
};

export default ListPrescriptionsSkeleton;
