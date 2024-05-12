import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {CardComponent, TextNormalComponent} from '@components/shares';
import {flex} from '@styles';
import {REACTION_ICONS} from '../data';
import {useAppSelector} from '@/store/index';
import {selectUser} from '@/store/selectors';
import {useTheme} from '@react-navigation/native';
import {StoreMessage} from '@/types/entities';

type ListReactionIconProps = {
  onPressReaction: (icon: string) => void;
  svReactMessage: SharedValue<number>;
  message: StoreMessage;
};
const ListReactionIconComponent = ({
  onPressReaction,
  svReactMessage,
  message,
}: ListReactionIconProps) => {
  const {user} = useAppSelector(selectUser);

  // Animated style for react message
  const animatedReactMessage = useAnimatedStyle(() => {
    return {
      opacity: interpolate(svReactMessage.value, [0, 1], [0, 1]),
      zIndex: interpolate(svReactMessage.value, [0, 1], [-1, 1]),
      transform: [
        {
          translateY: interpolate(svReactMessage.value, [0, 1], [0, -50]),
        },
      ],
    };
  });

  const {colors} = useTheme();
  return (
    <Animated.View
      style={[
        animatedReactMessage,
        flex.row,
        flex.alignItemsCenter,
        flex.justifyContentCenter,
        styles.listIcons,
      ]}>
      <CardComponent style={[flex.row, flex.gap2]}>
        {REACTION_ICONS.map(icon => (
          <Pressable
            key={icon.id}
            onPress={() => onPressReaction(icon.icon)}
            style={[
              {
                backgroundColor: message.reactions.find(
                  item =>
                    item.type === icon.icon && user?._id === item?.user_id?._id,
                )
                  ? colors.border
                  : colors.card,
              },
              styles.iconReaction,
            ]}>
            <TextNormalComponent>{icon.icon}</TextNormalComponent>
          </Pressable>
        ))}
      </CardComponent>
    </Animated.View>
  );
};

export default ListReactionIconComponent;

const styles = StyleSheet.create({
  listIcons: {
    position: 'absolute',
    padding: 10,
    left: 0,
    bottom: 0,
    width: '100%',
  },

  iconReaction: {
    padding: 4,
    borderRadius: 8,
  },
});
