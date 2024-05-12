import React from 'react';
import ButtonLoading, {ButtonLoadingProps} from './ButtonLoading.component';
import LinearGradient from 'react-native-linear-gradient';
import {Platform} from 'react-native';
import {COLORS, SIZE_APP} from '@utils/constants';

interface ButtonOutlineProps extends ButtonLoadingProps {
  content: string;
  handleSubmit: () => void;
}

const ButtonOutline = (props: ButtonOutlineProps) => {
  const {content, handleSubmit} = props;
  return (
    <ButtonLoading
      content={content}
      isLoading={props.isLoading}
      onPress={handleSubmit}
      radius={32}
      type="solid"
      raised={true}
      buttonStyle={{
        paddingHorizontal: SIZE_APP.sm,
        paddingVertical: 8,
      }}
      containerStyle={{
        // width: 140,
        borderColor: 'none',
      }}
      titleStyle={{
        color: COLORS.text.primary,
        fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
      }}
      ViewComponent={LinearGradient} // Don't forget this!
      linearGradientProps={{
        colors: ['white', 'white'],
        start: {x: 0.5, y: 0.5},
        end: {x: 0, y: 0},
      }}
    />
  );
};

export default React.memo(ButtonOutline);
