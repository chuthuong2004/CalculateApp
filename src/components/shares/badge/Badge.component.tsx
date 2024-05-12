import {ColorType, SizeText} from '@/types/unions';
import {TextNormalComponent} from '@components/shares';
import {useTheme} from '@react-navigation/native';
import {flex} from '@styles/flex.style';
import {getStyleColorButton} from '@utils';
import {SIZE_APP} from '@utils/constants';
import React from 'react';
import {View, ViewProps} from 'react-native';

type BadgeProps = {
  text?: string;
  variant: ColorType;
  size?: SizeText;
  checked?: boolean;
  rounded?: boolean;
  square?: boolean;
  border?: boolean;
  style?: ViewProps['style'];
  children?: React.ReactNode;
};
const BadgeComponent = ({
  text,
  variant,
  rounded = true,
  border,
  size = 'md',
  style,
  children,
  square,
}: BadgeProps) => {
  const {colors, dark} = useTheme();
  const styles = getStyleColorButton({colors, dark});

  return (
    <View
      style={[
        {
          borderRadius: rounded ? 50 : 2,
        },
        styles[variant].button,
        border && {
          borderWidth: 2,
          borderColor: colors.card,
        },
        square
          ? {
              width: SIZE_APP[size],
              height: SIZE_APP[size],
              justifyContent: 'center',
              alignItems: 'center',
            }
          : {
              paddingHorizontal: 10,
              paddingVertical: 4,
            },
        style,
      ]}>
      {children ? (
        children
      ) : text ? (
        <TextNormalComponent
          size={size}
          style={[styles[variant].title, flex.flex1, flex.widthFull]}>
          {text}
        </TextNormalComponent>
      ) : null}
    </View>
  );
};

export default BadgeComponent;
