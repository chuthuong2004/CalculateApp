import React, {memo} from 'react';
import {Button, ButtonProps} from '@rneui/themed';
import {useTheme} from '@react-navigation/native';
import {View} from 'react-native';
import {FlexAlignType} from 'react-native';

interface ButtonLoadingProps extends ButtonProps {
  align: FlexAlignType;
}
const ButtonExport = ({
  align = 'flex-start',
  color,
  children,
  ...passProps
}: ButtonLoadingProps) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        alignItems: align,
      }}>
      <Button
        color={color ? color : colors.text}
        {...passProps}
        style={[passProps.style]}>
        {children}
      </Button>
    </View>
  );
};

export default memo(ButtonExport);
