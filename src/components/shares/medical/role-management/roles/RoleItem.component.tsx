import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import React, {memo} from 'react';

// ** Navigation hooks
import {useTheme} from '@react-navigation/native';

// ** Global Styles
import {flex, spacing} from '@styles';

// ** Share components
import {
  AnimatedIcon,
  CardComponent,
  CollapsibleComponent,
  TextNormalComponent,
} from '@components/shares';

// ** Types
import {StyleSheetProps} from '@/types/commons';
import {StoreRole} from '@/types/entities';
import {BASE_URL} from '@config/baseUrl';
import {useToggle} from '@hooks/utils';
import {ICON} from '@utils/constants';
import {useTranslation} from 'react-i18next';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {hp} from '@utils/helpers';

type RoleItemProps = {
  role: StoreRole;
  onSelectItem?: (role: StoreRole) => void;
  onPress?: () => void;
  type?: 'tree' | 'default';
  style?: StyleProp<ViewStyle>;
  showImage?: boolean;
  checked?: boolean;
};
const PressableAnimated = Animated.createAnimatedComponent(Pressable);
const RoleItemComponent = ({
  role,
  onSelectItem,
  onPress,
  type = 'default',
  showImage = true,
  checked,
  style,
}: RoleItemProps) => {
  const {isOpen, toggle} = useToggle(false);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: withTiming(isOpen ? '-90deg' : '0deg')}],
  }));

  const {t} = useTranslation();
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <View style={[]}>
      <PressableAnimated
        entering={FadeIn.duration(300)}
        onPress={
          onPress
            ? onPress
            : onSelectItem
            ? () => onSelectItem(role)
            : undefined
        }>
        <CardComponent
          shadow
          style={[flex.column, flex.gap10, style]}
          primary={checked}>
          <View style={[flex.row, flex.alignItemsCenter, flex.gap10]}>
            {showImage && (
              <View>
                <Image
                  source={{
                    uri: role.image
                      ? BASE_URL + role?.image?.path
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPO4z52WCf171RkbFgBVEot8QKn2Px3LL_gwi-LJ8&s',
                  }}
                  resizeMode="cover"
                  style={styles.image}
                />
              </View>
            )}

            <View style={[flex.gap2, flex.flex1]}>
              <TextNormalComponent fontWeight="500" translate={false}>
                {role.name}
              </TextNormalComponent>
              <TextNormalComponent size="xs">
                {t('Have [count] permissions', {
                  permission: role.permissions?.length,
                })}
              </TextNormalComponent>
            </View>
            {type === 'tree' && role.sub_roles?.length > 0 && (
              <Pressable onPress={toggle}>
                <AnimatedIcon
                  type="EvilIcons"
                  name={ICON.EvilIcons.arrowLeft}
                  style={[animatedStyle]}
                  size={hp(3)}
                />
              </Pressable>
            )}
          </View>
        </CardComponent>
      </PressableAnimated>
      {role.sub_roles?.length > 0 && type === 'tree' && (
        <CollapsibleComponent expanded={isOpen}>
          {role.sub_roles.map(item => (
            <View key={item._id} style={[spacing('margin', 0, 10).top]}>
              <RoleItemComponent
                role={item}
                onSelectItem={onSelectItem}
                type="tree"
              />
            </View>
          ))}
        </CollapsibleComponent>
      )}
    </View>
  );
};

export default memo(RoleItemComponent);

const styling = ({}: StyleSheetProps) =>
  StyleSheet.create({
    image: {
      width: hp(6),
      height: hp(6),
      borderRadius: hp(0.6),
    },
  });
