import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import {TextProps} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextNormalComponent from './TextNormal.component';

interface GradientTextProps extends TextProps {
  colors: Array<string>;
  start: {
    x: number;
    y: number;
  };
  end: {
    x: number;
    y: number;
  };
}
const GradientText = (props: GradientTextProps) => {
  const {colors, start, end, ...rest} = props;
  return (
    <MaskedView maskElement={<TextNormalComponent {...rest} />}>
      <LinearGradient colors={colors} start={start} end={end}>
        <TextNormalComponent {...rest} style={[rest.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default React.memo(GradientText);
