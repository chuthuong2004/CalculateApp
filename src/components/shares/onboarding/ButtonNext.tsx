import {RootStackScreenProps} from '@navigation/types';
import {useNavigation} from '@react-navigation/native';
import {APP_WIDTH} from '@utils/constants';
import React from 'react';
import {FlatList, TouchableWithoutFeedback} from 'react-native';
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {hp} from '@utils/helpers';
import AppVectorIcons from '../icons/AppVectorIcons';
import {TextNormalComponent} from '../text';
import {OnboardingData} from './Onboarding.component';

const WIDTH_BUTTON = hp(6);
const ACTIVE_BUTTON = hp(14);
const TRANSLATE_VALUE = hp(10);
type Props = {
  flatListRef: React.RefObject<FlatList<OnboardingData>>;
  dataLength: number;
  flatListIndex: SharedValue<number>;
  x: SharedValue<number>;
};
const ButtonNext = ({flatListIndex, dataLength, flatListRef, x}: Props) => {
  const navigation =
    useNavigation<RootStackScreenProps<'Onboarding'>['navigation']>();
  const animatedButton = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(ACTIVE_BUTTON)
          : withSpring(WIDTH_BUTTON),
      height: WIDTH_BUTTON,
    };
  });
  const animatedColor = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        x.value,
        [0, APP_WIDTH, 2 * APP_WIDTH],
        ['#005b4f', '#1e2169', '#f15937'],
      ),
    };
  });
  const arrowAnimated = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(TRANSLATE_VALUE)
              : withTiming(0),
        },
      ],
    };
  });
  const textAnimated = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-TRANSLATE_VALUE),
        },
      ],
    };
  });
  const onNextPage = () => {
    if (flatListIndex.value < dataLength - 1) {
      flatListRef.current?.scrollToIndex({index: flatListIndex.value + 1});
    } else {
      // dispatch(setIsFirst(true));
      // save<boolean>(STORAGE_KEY.isFirst, true);
      // navigation.navigate(user ? 'App' : 'Auth');
      navigation.navigate('ChooseLanguage');
    }
  };
  return (
    <TouchableWithoutFeedback onPress={onNextPage}>
      <Animated.View
        style={[
          {
            backgroundColor: 'red',
            padding: hp(1),
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          },
          animatedColor,
          animatedButton,
        ]}>
        <Animated.View style={[{position: 'absolute'}, textAnimated]}>
          <TextNormalComponent variant="dark">Get started</TextNormalComponent>
        </Animated.View>
        <Animated.View
          style={[
            {
              position: 'absolute',
            },
            arrowAnimated,
          ]}>
          <AppVectorIcons
            type="AntDesign"
            name="arrowright"
            size={hp(4)}
            primary
          />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonNext;
