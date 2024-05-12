import {Image, Pressable, View} from 'react-native';

import React, {memo, useRef} from 'react';

// ** Types
import {StoreRepository} from '@/types/entities';
import {MedicalStackScreenProps} from '@navigation/app/medical/types';

// ** Navigation hooks
import {useNavigation, useTheme} from '@react-navigation/native';

// ** Share components
import {
  AvatarComponent,
  CardComponent,
  CopyComponent,
  TextNormalComponent,
} from '@components/shares';

// ** Global Styles
import {BASE_URL} from '@config/baseUrl';
import {SHADOW_STYLE, flex} from '@styles';
import {getFirstLetter} from '@utils/utilities';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface RepositoryItemProps {
  repository: StoreRepository;
  onPress?: (item: StoreRepository) => void;
  checked?: boolean;
}
const PressableAnimated = Animated.createAnimatedComponent(Pressable);
const RepositoryItemComponent = ({
  repository,
  onPress,
  checked,
}: RepositoryItemProps) => {
  // ** Navigation
  const navigation =
    useNavigation<MedicalStackScreenProps<'Repository'>['navigation']>();
  const sv = useSharedValue(0);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  console.log('render item: ', repository.code);
  const handleShowOwner = () => {
    if (timeOutRef.current !== null) {
      clearTimeout(timeOutRef.current);
    }
    sv.value = withTiming(1);
    timeOutRef.current = setTimeout(() => {
      sv.value = withTiming(0);
    }, 3000);
  };
  const {colors} = useTheme();
  const animatedFullName = useAnimatedStyle(() => ({
    opacity: sv.value,
  }));
  return (
    <PressableAnimated
      entering={FadeIn.duration(300)}
      onPress={() =>
        onPress
          ? onPress(repository)
          : navigation.push('RepositoryDetails', {
              _id: repository._id,
              name: repository.name,
              province: null,
            })
      }>
      <CardComponent
        style={[
          flex.row,
          flex.gap8,
          checked ? {borderWidth: 1, borderColor: colors.primary} : {},
        ]}>
        <View>
          <Image
            source={
              repository.images[0]?.path
                ? {
                    uri: BASE_URL + repository.images[0]?.path,
                  }
                : require('@assets/images/medical/warehouse.jpg')
            }
            onError={error => {
              console.log(error);
            }}
            style={{
              width: 70,
              height: 70,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: colors.border,
            }}
          />
        </View>
        <View style={[flex.gap2, flex.flex1]}>
          <View style={[flex.row]}>
            <View style={[flex.flex1]}>
              <View style={[flex.row, flex.gap4, flex.alignItemsCenter]}>
                <TextNormalComponent fontWeight="500">
                  #{repository.code}
                </TextNormalComponent>
                <CopyComponent code={repository.code} />
              </View>
              <TextNormalComponent fontWeight="500">
                {repository.name}
              </TextNormalComponent>
            </View>

            {typeof repository.owner_id === 'object' && (
              <>
                <AvatarComponent
                  size="small"
                  source={
                    repository.created_by.avatar
                      ? {
                          uri: BASE_URL + repository.created_by.avatar.path,
                        }
                      : undefined
                  }
                  rounded
                  title={
                    !repository.created_by.avatar
                      ? getFirstLetter(repository.created_by.full_name)
                      : undefined
                  }
                  onPress={handleShowOwner}
                />
              </>
            )}
          </View>
          <TextNormalComponent size="sm" variant="secondary">
            Có {repository?.children.length} kho con
          </TextNormalComponent>

          {repository.position_address && (
            <TextNormalComponent numberOfLines={2} size="sm">
              {`${repository.position_address?.specific}, ${repository.position_address?.ward}, ${repository.position_address?.district}, ${repository.position_address?.province}`}
            </TextNormalComponent>
          )}
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 40,
                backgroundColor: colors.card,
                right: 0,
                zIndex: 2,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 16,
              },
              SHADOW_STYLE.shadowCard,
              animatedFullName,
            ]}>
            <TextNormalComponent>Đào Văn Thương</TextNormalComponent>
          </Animated.View>
        </View>
      </CardComponent>
    </PressableAnimated>
  );
};

export default memo(RepositoryItemComponent);
