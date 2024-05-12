import {StyleSheetProps} from '@/types/commons';
import {useTheme} from '@react-navigation/native';
import {APP_HEIGHT, APP_WIDTH} from '@utils/constants';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {SafeAreaComponent} from '../safe-area-view';
interface BackgroundProps {
  children: React.ReactNode;
  bottom?: boolean;
}

type StyleProps = StyleSheetProps & {
  bottom?: boolean;
};
const Background = (props: BackgroundProps) => {
  const {children, bottom} = props;
  const {colors, dark} = useTheme();
  const styles = styling({bottom, colors, dark});
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@assets/images/bg3.png')}
        resizeMode="cover"
        style={[styles.img]}>
        <SafeAreaComponent />
        {children}
      </ImageBackground>
    </View>
  );
};

const styling = (props: StyleProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      width: APP_WIDTH,
      height: APP_HEIGHT,
      justifyContent: props?.bottom ? 'flex-end' : 'center',
    },
    img: {
      flex: 1,

      justifyContent: props?.bottom ? 'flex-end' : 'center',
    },
  });

export default React.memo(Background);
