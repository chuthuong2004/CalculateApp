import React from 'react';
import {Shadow, ShadowProps} from 'react-native-shadow-2';

interface ShadowNormalProps extends ShadowProps {
  children: React.ReactNode;
}

const ShadowNormal = (props: ShadowNormalProps) => {
  const {children, ...rest} = props;
  return (
    <Shadow
      distance={8}
      startColor={'#8dbcd8a8'}
      endColor={'#ffffffd1'}
      offset={[1, 1]}
      paintInside={true}
      {...rest}>
      {children}
    </Shadow>
  );
};

export default ShadowNormal;
