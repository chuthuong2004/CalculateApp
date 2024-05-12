import {View} from 'react-native';
import React, {memo, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

type CollapsibleProps = {
  expanded: boolean;
  children: React.ReactNode;
};
const CollapsibleComponent = ({expanded, children}: CollapsibleProps) => {
  const [height, setHeight] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const layoutHeight = event.nativeEvent.layout.height;
    if (layoutHeight > 0 && layoutHeight !== height) {
      setHeight(layoutHeight);
    }
  };
  const animatedStyles = useAnimatedStyle(() => {
    const animatedHeight = expanded ? withTiming(height) : withTiming(0);
    return {
      height: animatedHeight,
    };
  });
  return (
    <Animated.View style={[animatedStyles, {overflow: 'hidden'}]}>
      <View onLayout={onLayout} style={{position: 'absolute', width: '100%'}}>
        {children}
      </View>
    </Animated.View>
  );
};

export default memo(CollapsibleComponent);
