import {flex} from '@styles/flex.style';
import {COLORS_APP, FONT_SIZE} from '@utils/constants';
import React from 'react';
import {View} from 'react-native';
import {AppVectorIcons} from '../icons';
import TextNormalComponent, {TextCustomProps} from './TextNormal.component';

type TakeNoteProps = TextCustomProps;
const TakeNoteComponent = ({
  size = 'sm',
  variant = 'info',
  ...passProps
}: TakeNoteProps) => {
  return (
    <View style={[flex.row, flex.alignItemsCenter, flex.gap4]}>
      <AppVectorIcons
        type="AntDesign"
        name="exclamationcircleo"
        size={FONT_SIZE[size]}
        color={COLORS_APP[variant]}
      />
      <TextNormalComponent variant={variant} size={size} {...passProps}>
        {passProps.children}
      </TextNormalComponent>
    </View>
  );
};

export default TakeNoteComponent;
