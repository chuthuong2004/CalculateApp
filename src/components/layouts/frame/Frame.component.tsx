import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';

// ** Hooks
import {useTheme} from '@react-navigation/native';

import {StyleSheetProps} from '@/types/commons';
import {flex} from '@styles';
import {SIZE_APP} from '@utils/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface FrameProps extends ViewProps {
  width?: number;
  height?: number;
  radiusTop?: boolean;
  hidden?: boolean;
}

type StyleSheetPropsFrame = FrameProps & Pick<StyleSheetProps, 'colors'>;

const Frame = ({
  children,
  width,
  height,
  radiusTop,
  hidden = true,
  ...passProps
}: FrameProps) => {
  const {colors} = useTheme();
  const styles = styling({colors, width, height, radiusTop, ...passProps});
  return (
    <View
      style={[
        flex.alignItemsCenter,
        styles.container,
        hidden && {overflow: 'hidden'},
        passProps.style,
      ]}>
      <KeyboardAvoidingView
        style={[flex.flex1, flex.widthFull]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        contentContainerStyle={[flex.gap10]}
        keyboardVerticalOffset={100}>
        {children}
      </KeyboardAvoidingView>
    </View>
  );
};

const styling = ({colors, width, radiusTop}: StyleSheetPropsFrame) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
      width,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: radiusTop ? SIZE_APP.lg : 0,
      borderTopRightRadius: radiusTop ? SIZE_APP.lg : 0,
      // paddingBottom: 65,
    },
  });
export default React.memo(Frame);
