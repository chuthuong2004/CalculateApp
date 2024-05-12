import {ColorType} from '@/types/unions';
import {
  AppVectorIcons,
  BadgeComponent,
  CardComponent,
  TextNormalComponent,
} from '@components/shares';
import {flex} from '@styles/flex.style';
import {
  APP_WIDTH,
  BREAK_POINT_TABLET,
  COLORS_APP,
  ICON,
} from '@utils/constants';
import {getSizeItemWithGridLayout} from '@utils/utilities';
import React, {memo} from 'react';
import {View} from 'react-native';

type OrderStatsItemProps = {
  title: string;
  quantity: number;
  status: ColorType;
  isIncrease: boolean;
  percent: number;
};
const MedicationStatsItemComponent = ({
  title,
  quantity,
  status,
  isIncrease,
  percent,
}: OrderStatsItemProps) => {
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
      <TextNormalComponent variant="primary" size="sm">
        View details
      </TextNormalComponent>
    </CardComponent>
  );
};

export default memo(MedicationStatsItemComponent);
