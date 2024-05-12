import {ColorType} from '@/types/unions';
import {
  AppVectorIcons,
  BadgeComponent,
  CardComponent,
  TextNormalComponent,
} from '@components/shares';
import {Canvas, Text, useFont} from '@shopify/react-native-skia';
import {flex} from '@styles/flex.style';
import {
  APP_WIDTH,
  BREAK_POINT_TABLET,
  COLORS_APP,
  ICON,
} from '@utils/constants';
import {hp} from '@utils/helpers';
import {getSizeItemWithGridLayout} from '@utils/utilities';
import React, {memo, useEffect} from 'react';
import {View} from 'react-native';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type OrderStatsItemProps = {
  title: string;
  quantity: number;
  status: ColorType;
  isIncrease: boolean;
  percent: number;
};
const radius = hp(16);
const OrderStatsItemComponent = ({
  title,
  quantity,
  status,
  isIncrease,
  percent,
}: OrderStatsItemProps) => {
  const totalValue = useSharedValue(1000);
  useEffect(() => {
    totalValue.value = withTiming(1000, {
      duration: 3000,
    });
  }, [totalValue]);
  const targetText = useDerivedValue(
    () => `${Math.round(totalValue.value)}`,
    [],
  );

  const font = useFont(require('@assets/fonts/OpenSans-Bold.ttf'), hp(4));
  const fontSize = font?.measureText('$00');
  const textX = useDerivedValue(() => {
    const _fontSize = font?.measureText(targetText.value);
    return _fontSize ? 0 - _fontSize.width / 2 : 0;
  });
  return (
    <CardComponent
      shadow
      style={{
        width: getSizeItemWithGridLayout(
          10,
          APP_WIDTH > BREAK_POINT_TABLET ? 3 : 2,
        ),
      }}>
      <TextNormalComponent>{title}</TextNormalComponent>
      <View style={[flex.row, flex.alignItemsCenter, flex.gap4]}>
        <Canvas style={[]}>
          <Text
            x={textX}
            y={fontSize ? radius + fontSize?.height / 2 : radius}
            text={targetText}
            font={font}
            color={COLORS_APP.danger}
          />
        </Canvas>
        <TextNormalComponent size="4xl" fontWeight="700">
          {quantity}
        </TextNormalComponent>
        <View style={[flex.row, flex.gap2, flex.alignItemsCenter]}>
          <BadgeComponent square variant={status} size="md">
            <AppVectorIcons
              type="AntDesign"
              name={ICON.AntDesign[isIncrease ? 'arrowup' : 'arrowdown']}
              size={14}
              color={COLORS_APP[status]}
            />
          </BadgeComponent>
          <TextNormalComponent variant={status} size="sm">
            {isIncrease ? '+' : '-'}
            {percent}%
          </TextNormalComponent>
        </View>
      </View>
      <View style={[flex.row, flex.gap2, flex.alignItemsCenter]}>
        <TextNormalComponent size="sm" variant="secondary">
          so với tháng trước
        </TextNormalComponent>
      </View>
    </CardComponent>
  );
};

export default memo(OrderStatsItemComponent);
