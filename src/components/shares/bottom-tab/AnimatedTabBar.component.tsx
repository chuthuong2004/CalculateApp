// ** React imports
import React, {useReducer, useMemo, useEffect, memo, useRef} from 'react';

import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';

// ** Reanimated
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {useTheme} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {hp} from '@utils';
// ** Selectors
import {selectScroll} from '@/store/selectors';

// ** Constants
import {HEIGHT_BOTTOM_TAB} from '@utils/constants';

// ** React native imports
import {
  LayoutChangeEvent,
  ViewStyle,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

// ** React native svg
import {Path, Svg} from 'react-native-svg';

// ** Types
import {StyleSheetProps} from '@/types/commons';
import {TextNormalComponent} from '../text';

// ** Custom hooks
import {useHideKeyboard} from '@hooks';
import {useAppSelector} from '@/store';

const MARGIN_TOP_ICON_ACTIVE = -5;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const result = () => {
  if (wp(100) > 1000) {
    return (wp(100) / 430) * 25 + hp(6) / 6 + wp(100) / 100 + 3;
  }
  if (wp(100) > 700) {
    return (wp(100) / 430) * 25 + hp(6) / 6 + wp(100) / 100 - 1;
  }
  return (wp(100) / 430) * 25;
};
const HZ = result();
const AnimatedTabBar = ({
  state: {index: activeIndex, routes},
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  const {bottom} = useSafeAreaInsets();
  const {scroll} = useAppSelector(selectScroll);
  // get information about the components position on the screen -----

  const reducer = (state: any, action: {x: number; index: number}) => {
    // Add the new value to the state

    return [
      ...state?.filter(
        (item: {x: number; index: number}) => item.index !== action.index,
      ),
      {x: action.x, index: action.index},
    ];
  };

  const [layout, dispatch] = useReducer(reducer, []);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({x: event.nativeEvent.layout.x, index});
  };

  // animations ------------------------------------------------------

  const xOffset = useDerivedValue(() => {
    // Our code hasn't finished rendering yet, so we can't use the layout values
    if (layout.length !== routes.length) {
      return 0;
    }
    // We can use the layout values
    // Copy layout to avoid errors between different threads
    // We subtract 25 so the active background is centered behind our TabBar Components
    // 20 pixels is the width of the left part of the svg (the quarter circle outwards)
    // 5 pixels come from the little gap between the active background and the circle of the TabBar Components
    console.log('X: ', [...layout].find(({index}) => index === activeIndex)!.x);

    return [...layout].find(({index}) => index === activeIndex)!.x - HZ - 1; // ** 25
    // Calculate the offset new if the activeIndex changes (e.g. when a new tab is selected)
    // or the layout changes (e.g. when the components haven't finished rendering yet)
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // translateX to the calculated offset with a smooth transition
      transform: [{translateX: withTiming(xOffset.value, {duration: 250})}],
    };
  });
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});

  const findToHiddenTabBar = useMemo(() => {
    // ** find tabBarStyle to see if it has any style for it, specifically display "none"
    const routeNameDisplayNone = routes.find(
      route => descriptors[route.key].options.tabBarStyle,
    );
    if (!routeNameDisplayNone) {
      return false;
    }
    return (
      (descriptors[routeNameDisplayNone.key].options.tabBarStyle as ViewStyle)
        ?.display === 'none'
    );
  }, [routes, descriptors]);
  const {sharedValue: translateY} = useHideKeyboard(
    HEIGHT_BOTTOM_TAB - MARGIN_TOP_ICON_ACTIVE,
    true,
    findToHiddenTabBar,
  );

  useEffect(() => {
    translateY.value = withTiming(
      findToHiddenTabBar || activeIndex === 2 || scroll === 'down'
        ? HEIGHT_BOTTOM_TAB - MARGIN_TOP_ICON_ACTIVE
        : 0,
    );
  }, [findToHiddenTabBar, activeIndex, translateY, scroll]);
  const animatedTabBarHidden = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));
  return (
    <Animated.View
      style={[
        styles.tabBar,
        {
          paddingBottom: bottom,
        },
        animatedTabBarHidden,
      ]}>
      <AnimatedSvg
        width={wp(25)}
        height={hp(6)}
        viewBox={'0 0 110 60'}
        style={[styles.activeBackground, animatedStyles]}>
        <Path
          fill={colors.background}
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const {options} = descriptors[route.key];
          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={e => handleLayout(e, index)}
              onPress={() => {
                navigation.navigate(route.name);
              }}
            />
          );
        })}
      </View>
    </Animated.View>
  );
};

export default memo(AnimatedTabBar);

type TabBarComponentProps = {
  active?: boolean;
  options: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
};
const TabBarComponent = ({
  active,
  options,
  onLayout,
  onPress,
}: TabBarComponentProps) => {
  const {colors, dark} = useTheme();

  // handle lottie animation -----------------------------------------
  const ref = useRef(null);

  useEffect(() => {
    if (active && ref?.current) {
      // @ts-ignore
      ref.current.play();
    }
  }, [active]);

  // animations ------------------------------------------------------

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, {duration: 250}),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, {duration: 250}),
    };
  });
  const styles = styling({colors, dark});
  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={[styles.component]}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View
        style={[styles.iconContainer, animatedIconContainerStyles]}>
        {/* @ts-ignore */}
        {options.tabBarIcon ? (
          options.tabBarIcon({ref})
        ) : (
          <TextNormalComponent>?</TextNormalComponent>
        )}
      </Animated.View>
    </Pressable>
  );
};

const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    // ** Animated tab
    tabBar: {
      // backgroundColor: COLORS.card[dark ? 'dark' : 'light'],
      backgroundColor: colors.card,
      height: HEIGHT_BOTTOM_TAB, // or delete
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
    },
    activeBackground: {
      position: 'absolute',
    },
    tabBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },

    // ** Tab bar
    component: {
      height: hp(6),
      width: hp(6),
      marginTop: MARGIN_TOP_ICON_ACTIVE,
      // backgroundColor: 'red',
    },
    componentCircle: {
      flex: 1,
      borderRadius: 100,
      backgroundColor: colors.card,
      top: -0,
    },
    iconContainer: {
      position: 'absolute',
      top: -0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
