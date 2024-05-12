import {Pressable, View} from 'react-native';
import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';

// ** Global styles
import {flex} from '@styles';

// ** Types
import {StoreBaseUser} from '@/types/entities';
import {StaffStackScreenProps} from '@navigation/app/staff-management/types';

// ** Animated
import Animated, {FadeIn} from 'react-native-reanimated';
import {
  AvatarComponent,
  BadgeComponent,
  CardComponent,
  TextNormalComponent,
} from '@components/shares';
import {hp} from '@utils/helpers';
import {BASE_URL} from '@config/baseUrl';
import {getFirstLetter} from '@utils/utilities';

type StaffItemProps = {
  data: StoreBaseUser;
  onPress?: (data: StoreBaseUser) => void;
  showDetails?: boolean;
  shadow?: boolean;
  checked?: boolean;
};
const PressableAnimated = Animated.createAnimatedComponent(Pressable);
const StaffItemComponent = ({
  data,
  onPress,
  showDetails = true,
  shadow = true,
  checked,
}: StaffItemProps) => {
  const navigation =
    useNavigation<StaffStackScreenProps<'Staff'>['navigation']>();
  return (
    <PressableAnimated
      entering={FadeIn.duration(300)}
      onPress={() =>
        onPress
          ? onPress(data)
          : navigation.push('StaffDetails', {
              userId: data?._id,
            })
      }>
      <CardComponent
        shadow={shadow}
        style={[flex.row, flex.gap10, flex.alignItemsCenter]}
        primary={checked}>
        <AvatarComponent
          source={
            data?.account_id?.avatar
              ? {
                  uri: BASE_URL + data?.account_id?.avatar?.path,
                }
              : undefined
          }
          size={hp(6)}
          rounded
          fallback_color={data.account_id.fallback_color}
          title={
            data?.account_id?.avatar
              ? undefined
              : getFirstLetter(data?.account_id?.full_name)
          }
        />
        <View style={[flex.gap4, flex.flex1]}>
          <View style={[flex.row]}>
            <View style={[flex.flex1, flex.gap4]}>
              <TextNormalComponent fontWeight="500">
                {data?.account_id?.full_name?.first +
                  ' ' +
                  data?.account_id?.full_name?.last}
              </TextNormalComponent>
              <TextNormalComponent size="xs" variant="secondary">
                {data?.account_id?.email}
              </TextNormalComponent>
              <View style={[flex.row, flex.wrap, flex.gap4]}>
                {data?.roles?.map(role => (
                  <BadgeComponent
                    text={role.name}
                    key={role._id}
                    variant="info"
                    size="sm"
                  />
                ))}
              </View>
            </View>
            {data?.account_id?.is_block && (
              <View>
                <BadgeComponent text="Blocked" variant="danger" size="sm" />
              </View>
            )}
          </View>
          {showDetails && (
            <TextNormalComponent size="sm">
              Managing 3 employees
            </TextNormalComponent>
          )}
        </View>
      </CardComponent>
    </PressableAnimated>
  );
};

export default memo(StaffItemComponent);
