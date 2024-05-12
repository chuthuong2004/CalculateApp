import {StyleSheetProps} from '@/types/commons';
import {useTheme} from '@react-navigation/native';
import {COLORS_APP} from '@utils/constants';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {
  RichToolbar,
  RichToolbarProps,
  actions,
} from 'react-native-pell-rich-editor';

interface RichToolbarCustomProps extends RichToolbarProps<actions> {
  error?: boolean;
  transparent?: boolean;
}
const RichEditorComponent = (props: RichToolbarCustomProps) => {
  const propsAction = props.actions ? props.actions : [];
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <RichToolbar
      editor={props.editor}
      selectedIconTint={colors.primary}
      iconTint={colors.text}
      {...props}
      actions={[
        actions.insertImage,
        actions.setBold,
        actions.setItalic,
        actions.insertBulletsList,
        actions.insertOrderedList,
        actions.insertLink,
        actions.setStrikethrough,
        actions.setUnderline,
        actions.removeFormat,
        actions.checkboxList,
        actions.undo,
        actions.redo,
        ...propsAction,
      ]}
      style={[
        styles.container,
        {
          borderColor: props.error ? COLORS_APP.danger : colors.card,
        },
        props.transparent ? {backgroundColor: colors.background} : {},
      ]}
    />
  );
};

export default memo(RichEditorComponent);

const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
      borderWidth: 1,
    },
  });
