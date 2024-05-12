import {Button, ButtonProps, Icon} from '@rneui/themed';
import React from 'react';

export interface ButtonLoadingProps extends ButtonProps {
  isLoading: boolean;
  content: string;
  iconCustom?: {
    name: string;
    color: string;
  };
}

const ButtonLoading = (props: ButtonLoadingProps) => {
  const {isLoading, content, iconCustom, ...rest} = props;
  return (
    <Button loading={isLoading} {...rest}>
      {content}
      {iconCustom && <Icon name={iconCustom.name} color={iconCustom.color} />}
    </Button>
  );
};

export default React.memo(ButtonLoading);
