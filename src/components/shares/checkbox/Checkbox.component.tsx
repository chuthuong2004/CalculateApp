import {useTheme} from '@react-navigation/native';
import {CheckBox, CheckBoxProps} from '@rneui/themed';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TextNormalComponent} from '../text';

// ** Global Styles
import {spacing} from '@styles';

// ** Constants
import {FONT_SIZE, ICON, SIZE_APP} from '@utils/constants';

// ** Types
import {StyleSheetProps} from '@/types/commons';
import {hp} from '@utils/helpers';

interface CheckboxComponentProps extends CheckBoxProps {
  iconShape: 'circle' | 'square';
}

const CheckboxComponent = ({
  iconShape = 'square',
  checked,
  title,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  ...passProps
}: CheckboxComponentProps) => {
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});

  let checkedIcon: string | React.ReactElement<{}> =
    iconShape === 'circle'
      ? ICON.Ionicons.checkmarkCircle
      : ICON.MaterialCommunityIcons.checkboxMarked;
  let uncheckedIcon: string | React.ReactElement<{}> =
    iconShape === 'circle'
      ? ICON.Ionicons.radioButton
      : ICON.MaterialCommunityIcons.checkboxOutline;
  if (passProps.checkedIcon) {
    checkedIcon = passProps.checkedIcon;
  }
  if (passProps.uncheckedIcon) {
    uncheckedIcon = passProps.uncheckedIcon;
  }
  return (
    <CheckBox
      title={
        typeof title === 'string' ? (
          <TextNormalComponent style={spacing('margin', 0, 8).left} size="md">
            {title || ''}
          </TextNormalComponent>
        ) : (
          title
        )
      }
      textStyle={styles.text}
      containerStyle={[styles.container, passProps.containerStyle]}
      size={hp(2.4)}
      checkedColor={colors.primary}
      iconType={iconShape === 'circle' ? 'ionicon' : 'material-community'}
      checkedIcon={checkedIcon}
      uncheckedIcon={uncheckedIcon}
      uncheckedColor={colors.border}
      checked={checked ? true : false}
      {...passProps}
    />
  );
};

const styling = (props: StyleSheetProps) =>
  StyleSheet.create({
    text: {
      marginLeft: SIZE_APP.sm,
      fontWeight: 'normal',
      color: props.colors.text,
      fontSize: FONT_SIZE.md,
    },
    container: {
      marginLeft: 0,
      padding: 0,
      backgroundColor: 'transparent',
    },
  });

export default React.memo(CheckboxComponent);
