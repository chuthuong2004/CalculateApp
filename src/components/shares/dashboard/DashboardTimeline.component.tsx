import {Timeline} from '@/types/commons';
import {InputComponent, TextNormalComponent} from '@components/shares';
import {useTheme} from '@react-navigation/native';
import {flex} from '@styles/flex.style';
import {spacing} from '@styles/spacing.style';
import {ICON} from '@utils/constants';
import {hp} from '@utils/helpers';
import React, {memo} from 'react';
import {View} from 'react-native';

type DashboardTimelineProps = {
  timeline: Timeline;
  onOpenSheet: (type: 'timeline' | 'drug') => void;
};
const DashboardTimelineComponent = ({
  onOpenSheet,
  timeline,
}: DashboardTimelineProps) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        flex.row,
        flex.alignItemsCenter,
        flex.gap10,
        flex.justifyContentBetween,
        spacing('padding').top,
        spacing('padding').horizontal,
      ]}>
      <TextNormalComponent>Chọn mốc thời gian</TextNormalComponent>
      <InputComponent
        inputStyle={{width: 'auto'}}
        value={
          timeline.startDate
            ? `${timeline.startDate} đến ${timeline.endDate}`
            : 'This month'
        }
        iconRight={{
          type: 'EvilIcons',
          name: ICON.EvilIcons.arrowDown,
          size: hp(3),
          color: colors.text,
        }}
        onPressRight={() => onOpenSheet('timeline')}
        onPressIn={() => onOpenSheet('timeline')}
        editable={false}
      />
    </View>
  );
};

export default memo(DashboardTimelineComponent);
