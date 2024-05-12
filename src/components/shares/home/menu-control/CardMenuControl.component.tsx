import {MenuControl} from '@/types/commons';
import {CardComponent, TextNormalComponent} from '@components/shares';
import {flex} from '@styles';
import {APP_WIDTH} from '@utils/constants';
import React from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import Animated, {ZoomIn} from 'react-native-reanimated';

import {hp} from '@utils/helpers';

interface CardMenuControlProps
  extends Pick<TouchableWithoutFeedbackProps, 'onPress'> {
  item: MenuControl;
  index: number;
}
const TouchableAnimated = Animated.createAnimatedComponent(
  TouchableWithoutFeedback,
);
const CardMenuControlComponent = ({
  item,
  onPress,
  index,
}: CardMenuControlProps) => {
  return (
    <TouchableAnimated
      entering={ZoomIn.duration(300).delay(100 * index)}
      onPress={onPress}>
      <CardComponent
        shadow
        style={[
          flex.alignItemsCenter,
          flex.gap4,
          {width: (APP_WIDTH - APP_WIDTH / 15 - 30) / 4},
        ]}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={{
            width: hp(5),
            height: hp(5),
          }}
        />
        <TextNormalComponent size="sm" align="center">
          {item.name}
        </TextNormalComponent>
      </CardComponent>
    </TouchableAnimated>
  );
};

export default CardMenuControlComponent;
