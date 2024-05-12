import {View} from 'react-native';
import React from 'react';
import {TextNormalComponent} from '../text';

type EmptyProps = {
  title?: string;
};
const EmptyComponent = ({title = 'No data available !'}: EmptyProps) => {
  return (
    <View>
      <TextNormalComponent align="center" variant="info">
        {title}
      </TextNormalComponent>
    </View>
  );
};

export default EmptyComponent;
