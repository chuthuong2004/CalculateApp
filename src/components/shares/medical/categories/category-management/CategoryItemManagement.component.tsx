import {View, Pressable, Image} from 'react-native';

import React, {memo} from 'react';

// ** Types
import {StoreCategory, StoreIconMedical} from '@/types/entities';
import {MedicalStackScreenProps} from '@navigation/app/medical/types';

// ** Navigation hooks
import {useNavigation} from '@react-navigation/native';

// ** Constants
import {COLORS_APP, ICON} from '@utils/constants';

// ** Global Styles
import {flex, spacing} from '@styles';

// ** Share components
import {
  AnimatedIcon,
  CardComponent,
  CollapsibleComponent,
  TextNormalComponent,
  Translations,
} from '@components/shares';

// ** Svg Components
import {SvgIcon} from '@components/global-icons';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useToggle} from '@hooks/utils';
import {hp} from '@utils/helpers';
import {BASE_URL} from '@config/baseUrl';
type CategoryItemManagementProps = {
  category: StoreCategory;
  onPress?: (item: StoreCategory) => void;
  checked?: boolean;
  type?: 'tree' | 'default';
};
const PressableAnimated = Animated.createAnimatedComponent(Pressable);

const CategoryItemManagementComponent = ({
  category,
  onPress,
  checked,
  type = 'default',
}: CategoryItemManagementProps) => {
  const navigation =
    useNavigation<
      MedicalStackScreenProps<'CategoryManagement'>['navigation']
    >();
  const {isOpen, toggle} = useToggle(false);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: withTiming(isOpen ? '-90deg' : '0deg')}],
  }));

  return (
    <View>
      <PressableAnimated
        entering={FadeIn.duration(300)}
        onPress={
          onPress
            ? () => onPress(category)
            : () =>
                navigation.push('CategoryDetails', {
                  name: category.name,
                  _id: category._id,
                })
        }>
        <CardComponent
          style={[flex.row, flex.gap10, flex.alignItemsCenter]}
          primary={checked}>
          <View style={[flex.flex1, flex.row, flex.gap8]}>
            <View>
              {category.image ? (
                <Image
                  source={{uri: BASE_URL + category.image.path}}
                  style={{width: hp(4.8), height: hp(4.8)}}
                />
              ) : (
                category.icon && (
                  <SvgIcon
                    width={hp(4.8)}
                    height={hp(4.8)}
                    d={(category.icon as StoreIconMedical).d}
                    fill={COLORS_APP[category.color_icon]}
                  />
                )
              )}
            </View>
            <View style={[flex.gap2, flex.flex1]}>
              <TextNormalComponent fontWeight="500">
                {category.name}
              </TextNormalComponent>
              <TextNormalComponent size="sm">
                Văn Thương Đào
              </TextNormalComponent>
              <TextNormalComponent size="xs">
                <Translations
                  text={'Have [count] category'}
                  options={{
                    count: category.children.length,
                  }}
                />
              </TextNormalComponent>
            </View>
          </View>

          {type === 'tree' && category.children?.length > 0 && (
            <Pressable onPress={toggle}>
              <AnimatedIcon
                type="EvilIcons"
                name={ICON.EvilIcons.arrowLeft}
                style={[animatedStyle]}
                size={hp(3)}
              />
            </Pressable>
          )}
        </CardComponent>
      </PressableAnimated>
      {category.children?.length > 0 && type === 'tree' && (
        <CollapsibleComponent expanded={isOpen}>
          {category.children.map(item =>
            typeof item !== 'string' ? (
              <View key={item._id} style={[spacing('margin', 0, hp(1)).top]}>
                <CategoryItemManagementComponent
                  type="tree"
                  category={item}
                  onPress={onPress}
                  checked={checked}
                />
              </View>
            ) : null,
          )}
        </CollapsibleComponent>
      )}
    </View>
  );
};

export default memo(CategoryItemManagementComponent);
