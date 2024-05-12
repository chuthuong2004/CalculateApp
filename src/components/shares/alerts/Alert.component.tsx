import {useTheme} from '@react-navigation/native';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

// ** React native alerts
import AwesomeAlert, {AwesomeAlertProps} from 'react-native-awesome-alerts';

// ** Types
import {StyleSheetProps} from '@/types/commons';

// ** Lottie Files
import AnimatedLottieView, {AnimationObject} from 'lottie-react-native';

// ** Components
import {TextNormalComponent} from '../text';

// ** Global styles
import {flex, spacing} from '@styles';

// ** Constant
import {COLORS_APP, FONT_SIZE} from '@utils/constants';
import {ButtonComponent} from '../button';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type IconName = 'success' | 'error' | 'logout';

const dataSource: Record<IconName, AnimationObject> = {
  success: require('@assets/lottie/success/success.icon.json'),
  error: require('@assets/lottie/error/error.icon.json'),
  logout: require('@assets/lottie/auth/logout.icon.json'),
};
interface AlertComponentProps extends AwesomeAlertProps {
  icon?: IconName;
  loopIcon?: boolean;
  autoplay?: boolean;
}
const AlertComponent = ({
  showCancelButton = true,
  showConfirmButton = true,
  closeOnTouchOutside = true,
  closeOnHardwareBackPress = true,
  showProgress = false,
  icon,
  loopIcon = true,
  autoplay = true,
  ...passProps
}: AlertComponentProps) => {
  const {t} = useTranslation();
  const {colors, dark} = useTheme();
  const styles = styling({
    colors,
    dark,
    showCancelButton,
    showConfirmButton,
    closeOnTouchOutside,
    closeOnHardwareBackPress,
    showProgress,
    ...passProps,
  });
  return (
    <AwesomeAlert
      {...passProps}
      //   ** show
      show={passProps.show}
      //   ** progress
      showProgress={showProgress}
      progressColor={colors.primary}
      //   ** title
      title={t(passProps?.title || '') || passProps?.title}
      titleStyle={[styles.titleStyle, passProps.titleStyle]}
      // ** Message
      message={t(passProps?.message || '') || passProps?.message}
      messageStyle={[styles.messageStyle, passProps.messageStyle]}
      closeOnTouchOutside={closeOnTouchOutside}
      closeOnHardwareBackPress={closeOnHardwareBackPress}
      // ** Custom view
      customView={
        passProps.customView ? (
          passProps.customView
        ) : (
          <View style={{width: widthPercentageToDP(80)}}>
            <View
              style={[
                flex.alignItemsCenter,
                flex.gap10,
                spacing('padding').around,
              ]}>
              {icon && (
                <View>
                  <AnimatedLottieView
                    source={dataSource[icon]}
                    autoPlay={autoplay}
                    // loop={true}
                    loop={loopIcon}
                    resizeMode="cover"
                    style={{width: 100, height: 100}}
                  />
                </View>
              )}
              <TextNormalComponent align="center">
                {passProps.title}
              </TextNormalComponent>
              <TextNormalComponent size="sm" align="center">
                {passProps.message}
              </TextNormalComponent>
              <View
                style={[
                  flex.row,
                  flex.widthFull,
                  flex.gap10,
                  spacing('padding', 0, 10).top,
                ]}>
                {showCancelButton && (
                  <View style={[flex.flex1]}>
                    <ButtonComponent
                      onPress={passProps.onCancelPressed}
                      rounded
                      color="info">
                      {passProps.cancelText ? passProps.cancelText : 'Cancel'}
                    </ButtonComponent>
                  </View>
                )}
                {showConfirmButton && (
                  <View style={[flex.flex1]}>
                    <ButtonComponent
                      onPress={passProps.onConfirmPressed}
                      rounded>
                      {passProps.confirmText
                        ? passProps.confirmText
                        : 'Confirm'}
                    </ButtonComponent>
                  </View>
                )}
              </View>
            </View>
          </View>
        )
      }
      //   ** Cancel Button
      showCancelButton={false} // ** hide default button -> custom view
      cancelText={passProps.cancelText}
      //   cancelButtonColor="red"
      cancelButtonStyle={[
        styles.cancelButtonStyle,
        passProps.cancelButtonStyle,
      ]}
      cancelButtonTextStyle={[
        styles.cancelButtonTextStyle,
        passProps.cancelButtonTextStyle,
      ]}
      //   ** Confirm button
      showConfirmButton={false} // ** Hide confirm button to custom view
      confirmText={t(passProps.confirmText || '') || passProps.confirmText}
      //   confirmButtonColor="#DD6B55"
      confirmButtonStyle={[
        styles.confirmButtonStyle,
        passProps.confirmButtonStyle,
      ]}
      confirmButtonTextStyle={[
        styles.confirmButtonTextStyle,
        passProps.confirmButtonTextStyle,
      ]}
      //   ** Container styles
      contentContainerStyle={[
        styles.contentContainerStyle,
        passProps.contentContainerStyle,
      ]}
      contentStyle={[styles.contentStyle, passProps.contentStyle]}
      actionContainerStyle={[
        styles.actionContainerStyle,
        passProps.actionContainerStyle,
      ]}
      alertContainerStyle={[
        styles.alertContainerStyle,
        passProps.alertContainerStyle,
      ]}
      overlayStyle={[styles.overlayStyle, passProps.overlayStyle]}
      useNativeDriver={passProps.useNativeDriver}
      //   ** callback
      onCancelPressed={passProps.onCancelPressed}
      onConfirmPressed={passProps.onConfirmPressed}
      onDismiss={passProps.onDismiss}
    />
  );
};

export default memo(AlertComponent);
const styling = ({
  colors,
  showCancelButton,
  showConfirmButton,
}: StyleSheetProps & AlertComponentProps) =>
  StyleSheet.create({
    titleStyle: {
      color: colors.text,
      fontSize: FONT_SIZE.md,
      fontWeight: '500',
      display: 'none',
    },

    messageStyle: {
      color: colors.text,
      textAlign: 'center',
      fontSize: FONT_SIZE.sm,
      display: 'none',
    },

    cancelButtonStyle: {
      backgroundColor: colors.card,
      borderRadius: 0,
      flex: 1,
      // margin: 0,
    },
    cancelButtonTextStyle: {
      textAlign: 'center',
      color: COLORS_APP.danger,
      fontSize: FONT_SIZE.md,
      padding: 5,
    },

    confirmButtonStyle: {
      backgroundColor: colors.card,
      borderRadius: 0,
      flex: 1,
      borderLeftWidth: !showConfirmButton || !showCancelButton ? 0 : 0.5,
      borderLeftColor: colors.border,
      // margin: 0,
      borderBottomWidth: 0,
    },
    buttonComponent: {
      backgroundColor: colors.primary,
      borderRadius: 50,
    },
    confirmButtonTextStyle: {
      textAlign: 'center',
      color: colors.primary,
      fontSize: FONT_SIZE.md,
      padding: 5,
    },

    contentContainerStyle: {
      backgroundColor: colors.card,
      borderRadius: 15,
    },
    contentStyle: {
      //   backgroundColor: 'red',
    },
    actionContainerStyle: {
      display: 'none',
      // borderTopWidth: !showConfirmButton || !showCancelButton ? 0 : 0.5,
      // borderColor: colors.border,
    },
    alertContainerStyle: {},
    overlayStyle: {
      width: wp(100),
      height: hp(100),
    },
  });
