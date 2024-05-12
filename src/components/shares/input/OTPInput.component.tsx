import React, {forwardRef, memo} from 'react';
import {OtpInput, OtpInputProps, OtpInputRef} from 'react-native-otp-entry';
import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {StyleSheetProps} from '@/types/commons';
import {FONT_SIZE} from '@utils/constants';

interface OTPInputComponentProps extends OtpInputProps {
  error?: boolean;
}
const OTPInputComponent = forwardRef<OtpInputRef, OTPInputComponentProps>(
  (
    {
      numberOfDigits = 6,
      focusColor,
      focusStickBlinkingDuration = 500,
      onTextChange,
      error,
      ...passProps
    },
    ref,
  ) => {
    const {colors, dark} = useTheme();
    const styles = styling({colors, dark, error});
    return (
      <OtpInput
        numberOfDigits={numberOfDigits}
        focusColor={focusColor ? focusColor : colors.primary}
        onTextChange={onTextChange}
        theme={{
          containerStyle: styles.container,
          inputsContainerStyle: styles.inputsContainer,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
          focusStickStyle: styles.focusStick,
        }}
        secureTextEntry
        hideStick
        focusStickBlinkingDuration={focusStickBlinkingDuration}
        {...passProps}
        ref={ref}
      />
    );
  },
);

export default memo(OTPInputComponent);

const styling = ({
  colors,
  error,
}: StyleSheetProps & Pick<OTPInputComponentProps, 'error'>) =>
  StyleSheet.create({
    container: {
      padding: 0,
      margin: 0,
      gap: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    inputsContainer: {
      //   backgroundColor: 'red',
    },
    pinCodeContainer: {
      //   backgroundColor: 'blue',
      borderRadius: 8,
      borderColor: error ? 'red' : '#e4e4e4',
    },
    pinCodeText: {
      // backgroundColor: 'green',
      fontSize: FONT_SIZE.xl,
      color: colors.text,
      padding: 10,
    },
    focusStick: {
      backgroundColor: colors.primary,
    },
  });
