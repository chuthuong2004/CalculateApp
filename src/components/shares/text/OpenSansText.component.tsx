import React from 'react';
import {StyleSheet, Text} from 'react-native';

const OpenSansFont = {
  normal: 'Regular',
  bold: 'Bold',
  '300': 'Light',
  '400': 'Regular',
  '500': 'Medium',
  '600': 'SemiBold',
  '700': 'Bold',
  '800': 'ExtraBold',
};

type TextProps = Text['props'];

const OpenSansText = (props: TextProps) => {
  const {fontWeight = '400', fontStyle} = StyleSheet.flatten(props.style || {});

  const fontFamily = `OpenSans-${OpenSansFont[fontWeight]}${
    fontStyle === 'italic' ? 'Italic' : ''
  }`;

  return <Text {...props} style={[props.style, {fontFamily}]} />;
};

export default React.memo(OpenSansText);
