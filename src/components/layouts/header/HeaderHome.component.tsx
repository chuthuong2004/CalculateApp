import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// ** Share Components
import {
  AppVectorIcons,
  AvatarComponent,
  BadgeCartComponent,
  TextNormalComponent,
} from '@components/shares';

// ** Global Styles
import {SHADOW_STYLE, flex, spacing} from '@styles';

// ** Hooks
import {useNavigation, useTheme} from '@react-navigation/native';

// ** Types
import {StyleSheetProps} from '@/types/commons';
import {MedicalStackScreenPropsComposite} from '@navigation/app/medical/types';

// ** Redux
import {selectUser} from '@/store/selectors';
import {hp} from '@utils/helpers';
// ** Constants
import {useAppSelector} from '@/store';
import {BASE_URL} from '@config';
import {APP_COLORS_DARK, ICON} from '@utils/constants';
import {getFirstLetter, isCustomer} from '@utils/utilities';
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  ZoomIn,
} from 'react-native-reanimated';

const PressableAnimated = Animated.createAnimatedComponent(Pressable);
const TouchableAnimated = Animated.createAnimatedComponent(TouchableOpacity);
const HeaderHomeComponent = () => {
  const navigation =
    useNavigation<MedicalStackScreenPropsComposite<'Medical'>['navigation']>();
  const {user} = useAppSelector(selectUser);
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <View
      style={[
        spacing('padding').around,
        flex.gap10,
        flex.justifyContentBetween,
        styles.container,
      ]}>
      {/* ** Header logo */}
      <View
        style={[flex.row, flex.alignItemsCenter, flex.justifyContentBetween]}>
        <PressableAnimated
          entering={FadeInUp.duration(300).delay(200)}
          onPress={() => navigation.navigate('HomeStack' as any)}>
          <Image
            source={require('@assets/images/logo/small/LogoFull.png')}
            style={{resizeMode: 'cover', width: 200, height: 80}}
          />
        </PressableAnimated>

        <View style={[flex.row, flex.gap15]}>
          <TouchableAnimated
            entering={FadeIn.duration(600).delay(200)}
            onPress={() => navigation.navigate('Notification')}>
            <AppVectorIcons
              type="Octicons"
              name="bell"
              color={APP_COLORS_DARK.colors.text}
              size={hp(2.5)}
            />
            <View style={[styles.badge]}>
              <TextNormalComponent size="xs">2</TextNormalComponent>
            </View>
          </TouchableAnimated>
          {isCustomer(user) && (
            <Animated.View entering={FadeIn.duration(600).delay(200)}>
              <BadgeCartComponent
                onPress={() =>
                  navigation.navigate('CartStack', {
                    screen: 'Cart',
                  })
                }
                color="dark"
              />
            </Animated.View>
          )}
        </View>
      </View>

      {/* ** Header account */}
      <View
        style={[flex.row, flex.alignItemsCenter, flex.justifyContentBetween]}>
        <TouchableAnimated
          entering={FadeInLeft.duration(300).delay(200)}
          onPress={() =>
            navigation.navigate('QRCodeStack', {screen: 'MyQRCode'})
          }
          style={[
            flex.row,
            flex.alignItemsCenter,
            flex.gap5,
            SHADOW_STYLE.shadowCard,
            styles.qrCode,
          ]}>
          <AppVectorIcons
            name={ICON.Ionicons.qrCode}
            color={APP_COLORS_DARK.colors.text}
            size={hp(2)}
            type="Ionicons"
          />
          <TextNormalComponent color={APP_COLORS_DARK.colors.text} size="sm">
            QR Code
          </TextNormalComponent>
        </TouchableAnimated>
        <Animated.View style={[flex.row, flex.alignItemsCenter, flex.gap10]}>
          <Animated.View entering={FadeInRight.duration(300).delay(200)}>
            <TextNormalComponent
              color={APP_COLORS_DARK.colors.text}
              align="right"
              size="sm">
              Xin chào,
            </TextNormalComponent>
            <TextNormalComponent
              color={APP_COLORS_DARK.colors.text}
              size="md"
              align="right"
              fontWeight="500">
              {user?.account_id?.full_name?.first +
                ' ' +
                user?.account_id?.full_name?.last}
            </TextNormalComponent>
          </Animated.View>
          <PressableAnimated
            entering={ZoomIn.duration(300).delay(200)}
            onPress={() =>
              navigation.navigate('AccountStack', {
                screen: 'PersonalInformation',
              })
            }>
            <AvatarComponent
              source={
                user?.account_id?.avatar
                  ? {
                      uri: BASE_URL + user?.account_id?.avatar.path,
                    }
                  : undefined
              }
              rounded
              fallback_color={user?.account_id.fallback_color}
              title={
                !user?.account_id?.avatar
                  ? getFirstLetter(user?.account_id?.full_name || '')
                  : undefined
              }
              size={hp(6)}
              border
            />
          </PressableAnimated>
        </Animated.View>
      </View>
    </View>
  );
};

export default HeaderHomeComponent;
const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    container: {
      // backgroundColor: 'red',
    },
    badge: {
      position: 'absolute',
      top: -10,
      right: -5,
      backgroundColor: colors.notification,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      minWidth: 20,
      minHeight: 20,
      padding: 4,
    },
    qrCode: {
      backgroundColor: '#1062e6',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
    },
  });
