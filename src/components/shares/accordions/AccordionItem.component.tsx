import {Pressable, StyleSheet, View} from 'react-native';
import React, {memo, useState} from 'react';
import {AppVectorIcons, TextNormalComponent} from '@components/shares';
import {APP_WIDTH, COLORS_APP, ICON} from '@utils/constants';
import {flex} from '@styles';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';
import CollapsibleComponent from './Collapsible.component';
import RenderHTML from 'react-native-render-html';
import {hp} from '@utils/helpers';

type AccordionItemProps = {
  title: string;
  description: string;
  type?: 'html';
};
const AccordionItemComponent = ({
  title,
  description,
  type,
}: AccordionItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const rotateValue = useSharedValue(0);
  const toggleContent = () => {
    rotateValue.value = withTiming(expanded ? 0 : 1);
    setExpanded(prev => !prev);
  };
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${interpolate(rotateValue.value, [0, 1], [0, 90])}deg`,
        },
      ],
    };
  });
  const {colors} = useTheme();
  return (
    <View
      style={[
        flex.gap4,
        {
          borderBottomWidth: StyleSheet.hairlineWidth,
          paddingBottom: 4,
          borderBottomColor: colors.border,
        },
      ]}>
      <Pressable
        onPress={toggleContent}
        style={[flex.row, flex.alignItemsCenter, flex.gap8]}>
        <AppVectorIcons
          type="AntDesign"
          name={ICON.AntDesign.questionCircle}
          size={hp(2)}
          color={COLORS_APP.secondary}
        />
        <TextNormalComponent style={[flex.flex1]}>{title}</TextNormalComponent>
        <Animated.View style={animatedStyles}>
          <AppVectorIcons
            type="EvilIcons"
            name={ICON.EvilIcons.arrowRight}
            size={hp(2.4)}
            color={COLORS_APP.secondary}
          />
        </Animated.View>
      </Pressable>
      <CollapsibleComponent expanded={expanded}>
        {type === 'html' ? (
          <RenderHTML
            contentWidth={APP_WIDTH}
            source={{html: description || ''}}
            baseStyle={{color: colors.text}}
          />
        ) : (
          <TextNormalComponent>{description}</TextNormalComponent>
        )}
      </CollapsibleComponent>
    </View>
  );
};

export default memo(AccordionItemComponent);
