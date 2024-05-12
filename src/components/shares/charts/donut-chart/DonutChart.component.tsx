import {useTheme} from '@react-navigation/native';
import {Canvas, Path, SkFont, Skia, Text} from '@shopify/react-native-skia';
import {flex} from '@styles/flex.style';
import React from 'react';
import {View} from 'react-native';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';
import DonutPath from './DonutPath';

type DonutChartProps = {
  n: number;
  gap: number;
  radius: number;
  strokeWidth: number;
  outerStrokeWidth: number;
  decimals: SharedValue<number[]>;
  colors: string[];
  totalValue: SharedValue<number>;
  font: SkFont;
  smallFont: SkFont;
  title: string;
};
const DonutChartComponent = ({
  radius,
  outerStrokeWidth,
  strokeWidth,
  totalValue,
  font,
  smallFont,
  n,
  gap,
  decimals,
  colors,
  title,
}: DonutChartProps) => {
  const array = Array.from({length: n});

  const innerRadius = radius - outerStrokeWidth / 2;
  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);
  const targetText = useDerivedValue(
    () => `${Math.round(totalValue.value)}`,
    [],
  );
  const fontSize = font.measureText('$00');
  const smallFontSize = smallFont.measureText('Total Spent');

  const textX = useDerivedValue(() => {
    const _fontSize = font.measureText(targetText.value);
    return radius - _fontSize.width / 2;
  });
  const {colors: colorsApp} = useTheme();
  return (
    <View style={[flex.flex1, {width: radius * 2, height: radius * 2}]}>
      <Canvas style={[flex.flex1]}>
        <Path
          path={path}
          color={colorsApp.card}
          strokeWidth={strokeWidth}
          style="stroke"
          strokeJoin={'round'}
          strokeCap={'round'}
          start={0}
          end={1}
        />
        {array.map((_, index) => (
          <DonutPath
            key={index}
            radius={radius}
            strokeWidth={strokeWidth}
            color={colors[index]}
            decimals={decimals}
            index={index}
            gap={gap}
            outerStrokeWidth={outerStrokeWidth}
          />
        ))}
        <Text
          x={radius - smallFontSize.width / 2}
          y={radius + smallFontSize.height / 2 - fontSize.height}
          text={title}
          font={smallFont}
          color={colorsApp.text}
        />
        <Text
          x={textX}
          y={radius + fontSize.height / 2}
          text={targetText}
          font={font}
          color={colorsApp.text}
        />
      </Canvas>
    </View>
  );
};

export default DonutChartComponent;
