import {StyleSheet, View} from 'react-native';
import React, {memo, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';

// ** Share components

// ** Global styles
import {SHADOW_STYLE, flex, spacing} from '@styles';

// ** Types
import {StyleSheetProps} from '@/types/commons';

// ** Constant
import {HEIGHT_MESSAGE_LOADING} from '@utils/constants';

// ** Loading Dots
import LoadingDots from '@apolloeagle/loading-dots';

// ** Reanimated
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AvatarComponent} from '@components/shares/avatar';
import {StoreAccount} from '@/types/entities';
import {getFirstLetter} from '@utils/utilities';
import {hp} from '@utils/helpers';
import {BASE_URL} from '@config/baseUrl';

type LoadingMessageProps = {
  loading: boolean;
  user: StoreAccount;
};
const LoadingMessageComponent = ({loading, user}: LoadingMessageProps) => {
  const heightLoading = useSharedValue(HEIGHT_MESSAGE_LOADING);

  // ** Loading changed => animated height value
  useEffect(() => {
    heightLoading.value = withTiming(loading ? HEIGHT_MESSAGE_LOADING : 0);
  }, [loading, heightLoading]);

  // ** Animated style
  const animatedStylesLoading = useAnimatedStyle(() => ({
    height: heightLoading.value,
    transform: [
      {
        scaleY: withTiming(loading ? 1 : 0),
      },
    ],
    marginTop: withTiming(loading ? 15 : 0),
    opacity: withTiming(loading ? 1 : 0),
  }));

  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <Animated.View
      style={[
        flex.row,
        flex.gap10,
        spacing('margin').horizontal,
        animatedStylesLoading,
      ]}>
      <AvatarComponent
        source={
          user.avatar
            ? {
                uri: BASE_URL + user.avatar.path,
              }
            : undefined
        }
        size={hp(4)}
        title={!user.avatar ? getFirstLetter(user.full_name) : undefined}
        rounded
        fallback_color={user.fallback_color}
      />
      <View style={[styles.loadingMessage, SHADOW_STYLE.shadowCard]}>
        <LoadingDots animation="pulse" dots={3} color={colors.text} size={15} />
      </View>
    </Animated.View>
  );
};

export default memo(LoadingMessageComponent);
const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    wrapper: {
      width: '100%',
      alignItems: 'flex-start',
    },
    swipeContainer: {},
    loadingMessage: {
      width: 100,
      backgroundColor: colors.card,
      borderRadius: 15,
      borderTopLeftRadius: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
