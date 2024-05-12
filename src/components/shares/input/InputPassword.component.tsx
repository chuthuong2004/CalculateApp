import React from 'react';
import InputComponent, {InputComponentProps} from './Input.component';
import {useTheme} from '@react-navigation/native';
import {useToggle} from '@hooks';
import {ICON} from '@utils/constants';
import {hp} from '@utils/helpers';

interface InputPasswordProps extends InputComponentProps {}

const InputPassword = ({
  onBlur,
  onChangeText,
  value,
  placeholder,
  ...passProps
}: InputPasswordProps) => {
  const {isOpen: showPassword, toggle: togglePassword} = useToggle(false);
  const {colors} = useTheme();
  return (
    <InputComponent
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      secureTextEntry={!showPassword}
      iconLeft={{
        color: colors.text,
        name: ICON.Ionicons.password,
        size: hp(2),
      }}
      iconRight={{
        name: ICON.Ionicons[showPassword ? 'eye' : 'eyeOff'],
        color: colors.text,
      }}
      onPressRight={togglePassword}
      placeholder={placeholder}
      {...passProps}
    />
  );
};

export default React.memo(InputPassword);
