import {useTheme} from '@react-navigation/native';
import {spacing, flex} from '@styles';
import React from 'react';
import {View} from 'react-native';
import {CardComponent} from '../cards';
import {CheckCircleAnimatedComponent} from '../checkbox';
import {TextNormalComponent} from '../text';

export type StoreItemSteps = {
  title: string;
  description: string;
  disable?: boolean;
};
type StepsProps = {
  current: number;
  onChange: (value: number) => void;
  items: StoreItemSteps[];
};
const StepsComponent = ({current, onChange, items}: StepsProps) => {
  const {colors} = useTheme();
  return (
    <View style={[flex.gap10]}>
      <View style={[spacing('padding').horizontal, spacing('padding').top]}>
        <CardComponent shadow style={[flex.row, flex.justifyContentAround]}>
          {items.map((step, index) => {
            return (
              <View
                key={index}
                style={[flex.flex1, flex.row, flex.alignItemsCenter]}>
                <View
                  style={[
                    flex.flex1,
                    flex.widthFull,
                    {
                      height: 2,
                      backgroundColor:
                        index === 0 ? colors.card : colors.primary,
                    },
                  ]}
                />
                <CheckCircleAnimatedComponent
                  checked={!step.disable || current >= index}
                  onChecked={() => !step.disable && onChange(index)}
                />
                <View
                  style={[
                    flex.flex1,
                    flex.widthFull,
                    {
                      height: 2,
                      backgroundColor:
                        index === items.length - 1
                          ? colors.card
                          : colors.primary,
                    },
                  ]}
                />
              </View>
            );
          })}
        </CardComponent>
      </View>
      <View style={[spacing('padding').horizontal]}>
        <TextNormalComponent size="xs" variant="primary">
          Step {current + 1} of {items.length}
        </TextNormalComponent>
        <TextNormalComponent variant="secondary">
          {items.find((_, index) => index === current)?.title}
        </TextNormalComponent>
      </View>
    </View>
  );
};

export default StepsComponent;
