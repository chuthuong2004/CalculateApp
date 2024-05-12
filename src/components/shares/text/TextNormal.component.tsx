import {useTheme} from '@react-navigation/native';
import React, {forwardRef} from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {Translations} from '../translations';

// ** Types
import {ColorType, SizeText} from '@/types/unions';
import {StyleSheetProps} from '@/types/commons';

// ** Constant
import {COLORS_APP, FONT_SIZE} from '@utils/constants';

export interface TextCustomProps extends TextProps {
  align?: TextStyle['textAlign'];
  size?: SizeText;
  bold?: boolean;
  variant?: ColorType;
  color?: TextStyle['color'];
  textTransform?: TextStyle['textTransform'];
  fontWeight?: TextStyle['fontWeight'];
  fontStyle?: TextStyle['fontStyle'];
  error?: boolean;
  translate?: boolean;
  text?: string;
}
const TextNormal = forwardRef<Text, TextCustomProps>(
  ({children, error, translate = true, text, ...passProps}, ref) => {
    const {colors, dark} = useTheme();
    const styles = styling({colors, dark, ...passProps});
    return (
      <Text
        ref={ref}
        {...passProps}
        style={[
          styles.text,
          passProps.style,
          error && {color: COLORS_APP.danger},
        ]}>
        {translate ? (
          typeof children === 'string' ? (
            <Translations text={text ? text : children} />
          ) : text ? (
            text
          ) : (
            children
          )
        ) : text ? (
          text
        ) : (
          children
        )}
      </Text>
    );
  },
);

export default React.memo(TextNormal);

const styling = ({
  colors,
  color,
  variant,
  align = 'left',
  size = 'md',
  fontWeight = 'normal',
  textTransform = 'none',
  fontStyle = 'normal',
}: StyleSheetProps & TextCustomProps) =>
  StyleSheet.create({
    text: {
      color: variant ? COLORS_APP[variant] : color ? color : colors.text,
      textAlign: align,
      fontSize: FONT_SIZE[size],
      textTransform,
      fontWeight,
      fontStyle,
    },
  });
