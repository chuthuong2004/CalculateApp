import {View} from 'react-native';
import React from 'react';
import {SkeletonComponent} from '@components/shares';
import {POSITION_STYLE, flex, spacing} from '@styles';
import {APP_WIDTH, HEIGHT_BOTTOM_TAB} from '@utils/constants';
import {Can} from '@/acl/index';
import MedicineItemSkeleton from './MedicineItem.skeleton';
import {useAppSelector} from '@/store/index';
import {selectUser} from '@/store/selectors';
import {isProvider} from '@utils/utilities';

const MedicineManagementSkeleton = () => {
  const {user} = useAppSelector(selectUser);
  return (
    <View
      style={[
        flex.flex1,
        flex.widthFull,
        spacing('padding').around,
        flex.gap10,
        {
          marginBottom: HEIGHT_BOTTOM_TAB,
        },
      ]}>
      <SkeletonComponent height={50} radius={50} />
      <View
        style={[flex.row, flex.alignItemsCenter, flex.justifyContentBetween]}>
        <SkeletonComponent width={200} height={20} />
        <SkeletonComponent width={70} height={20} />
      </View>
      <MedicineItemSkeleton />
      <MedicineItemSkeleton />
      {isProvider(user) && (
        <Can I="create" a="Medical">
          <View
            style={[
              POSITION_STYLE({
                position: 'bottom-right',
                distance: APP_WIDTH / 30,
              }).absolute,
            ]}>
            <SkeletonComponent width={50} height={50} radius={50} />
          </View>
        </Can>
      )}
    </View>
  );
};

export default MedicineManagementSkeleton;
