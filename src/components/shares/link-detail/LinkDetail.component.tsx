import {useTheme} from '@react-navigation/native';
import {flex} from '@styles/flex.style';
import {ICON} from '@utils/constants';
import {hp} from '@utils/helpers';
import React, {memo} from 'react';
import {Pressable, View} from 'react-native';
import {AppVectorIcons} from '../icons';
import {TextNormalComponent} from '../text';

type LinkDetailProps = {
  onPress: () => void;
  title: string;
};
const LinkDetailComponent = ({onPress, title}: LinkDetailProps) => {
  const {colors} = useTheme();
  return (
    <Pressable
      style={[flex.row, flex.alignItemsCenter, flex.gap2]}
      onPress={onPress}>
      <TextNormalComponent size="sm" variant="primary">
        {title}
      </TextNormalComponent>
      <View>
        <AppVectorIcons
          type="MaterialIcons"
          size={hp(2)}
          color={colors.primary}
          name={ICON.MaterialIcons.arrowRight}
        />
      </View>
    </Pressable>
  );
};

export default memo(LinkDetailComponent);
