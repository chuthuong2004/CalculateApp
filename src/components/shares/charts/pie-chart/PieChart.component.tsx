import React, {FC, memo, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {flex} from '@styles/flex.style';

export const generatePieChartData = () => {
  const itemsCount = Math.floor(Math.random() * 7) + 3;
  const value = [];
  for (let i = 0; i < itemsCount; i++) {
    value.push(Math.floor(Math.random() * 60) + 40);
  }

  const total = value.reduce((a, b) => a + b, 0);

  const data: PieChartData = [];
  for (let i = 0; i < itemsCount; i++) {
    const percent = value[i] / total;
    data.push({
      percent,
      color: getRandomColor(),
    });
  }

  return data;
};

const getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
type PieChartProps = {
  size?: number;
  strokeWidth?: number;
};

export type PieChartDataItem = {
  color: string;
  percent: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type PieChartData = PieChartDataItem[];

export const PieChartSegment: FC<{
  center: number;
  radius: number;
  strokeWidth: number;
  color: string;
  circumference: number;
  angle: number;
  percent: number;
  progress: Animated.SharedValue<number>;
}> = ({
  center,
  radius,
  strokeWidth,
  circumference,
  color,
  angle,
  percent,
  progress,
}) => {
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [circumference, circumference * (1 - percent)],
    );
    const rotateAngle = interpolate(progress.value, [0, 1], [0, angle]);

    return {
      strokeDashoffset,
      transform: [
        {translateX: center},
        {translateY: center},
        {rotate: `${rotateAngle}deg`},
        {translateX: -center},
        {translateY: -center},
      ],
    };
  });

  return (
    <AnimatedCircle
      cx={center}
      cy={center}
      r={radius}
      strokeWidth={strokeWidth}
      stroke={color}
      strokeDasharray={circumference}
      originX={center}
      originY={center}
      // @ts-ignore
      animatedProps={animatedProps}
    />
  );
};
const PieChartComponent = ({size = 1000, strokeWidth = 100}: PieChartProps) => {
  const progress = useSharedValue(0);
  const [data, setData] = React.useState<PieChartData>([]);
  const [startAngles, setStartAngles] = React.useState<number[]>([]);
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const refresh = () => {
    const generatedData = generatePieChartData();

    let angle = 0;
    const angles: number[] = [];
    generatedData.forEach(item => {
      angles.push(angle);
      angle += item.percent * 360;
    });

    setData(generatedData);
    setStartAngles(angles);

    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1000,
    });
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[flex.widthFull, {backgroundColor: 'red'}]}>
      <View style={[{width: size, height: size}, styles.rotate]}>
        <Svg viewBox={`0 0 ${size} ${size}`}>
          {data.map((item, index) => (
            <PieChartSegment
              key={`${item.color}-${index}`}
              center={center}
              radius={radius}
              circumference={circumference}
              angle={startAngles[index]}
              color={item.color}
              percent={item.percent}
              strokeWidth={strokeWidth}
              progress={progress}
            />
          ))}
        </Svg>
      </View>
    </View>
  );
};
export default memo(PieChartComponent);
const styles = StyleSheet.create({
  titleStyle: {
    alignSelf: 'center',
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: '700',
  },
  rotate: {
    transform: [{rotateZ: '-90deg'}],
  },
  buttonWrap: {marginTop: 20},
});
