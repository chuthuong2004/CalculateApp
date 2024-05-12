import {useAbility} from '@casl/react';
import {CardBottomComponent, SkeletonComponent} from '@components/shares';
import {flex, spacing} from '@styles';
import {AbilityContext, Can} from 'acl/components';
import React from 'react';
import {View} from 'react-native';
import {hp} from '@utils/helpers';
import RoleItemSkeleton from './RoleItem.skeleton';

const RoleDetailsSkeleton = () => {
  const ability = useAbility(AbilityContext);
  return (
    <View
      style={[flex.flex1, flex.widthFull, spacing('padding').top, flex.gap10]}>
      <View style={[flex.flex1, flex.gap10, spacing('padding').horizontal]}>
        <SkeletonComponent height={hp(5)} radius={hp(5)} />
        <SkeletonComponent width={hp(15)} height={hp(1.5)} />
        <RoleItemSkeleton />
        <RoleItemSkeleton />
        <RoleItemSkeleton />
      </View>

      <CardBottomComponent style={[flex.row, flex.gap10]}>
        {(ability.can('delete', 'Role') || ability.can('update', 'Role')) && (
          <View style={[flex.flex1, flex.row, flex.gap10]}>
            <Can I="delete" a="Role">
              <SkeletonComponent
                style={[flex.flex1]}
                height={hp(5)}
                radius={hp(5)}
              />
            </Can>
            <Can I="update" a="Role">
              <SkeletonComponent
                style={[flex.flex1]}
                height={hp(5)}
                radius={hp(5)}
              />
            </Can>
          </View>
        )}
      </CardBottomComponent>
    </View>
  );
};

export default RoleDetailsSkeleton;
