import React, {forwardRef, memo} from 'react';
import {RichEditor, RichEditorProps} from 'react-native-pell-rich-editor';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {APP_HEIGHT, COLORS_APP, FONT_SIZE} from '@utils/constants';
import {flex} from '@styles/flex.style';
import {useTranslation} from 'react-i18next';

interface RichEditorCustomProps extends RichEditorProps {
  error?: boolean;
  transparent?: boolean;
}
const RichEditorComponent = forwardRef<any, RichEditorCustomProps>(
  (props, ref) => {
    const {colors, dark} = useTheme();
    const {t} = useTranslation();
    return (
      <View style={[flex.row]}>
        <RichEditor
          ref={ref}
          initialHeight={250}
          autoCapitalize="on"
          pasteAsPlainText
          defaultParagraphSeparator="div"
          editorStyle={{
            color: colors.text,
            placeholderColor: dark ? '#f7f8f95a' : '#414b5a8e',
            caretColor: colors.primary,
            backgroundColor: props.transparent
              ? colors.background
              : colors.card,
            contentCSSText: `font-size: ${FONT_SIZE.md}px;`,
          }}
          styleWithCSS
          scrollEnabled
          {...props}
          placeholder={
            t(props.placeholder || 'Please enter your content') || ''
          }
          containerStyle={[{maxHeight: APP_HEIGHT / 5}, props.containerStyle]}
          style={[
            styles.container,
            {
              backgroundColor: colors.card,
              borderColor: props.error ? COLORS_APP.danger : colors.card,
              maxHeight: APP_HEIGHT / 5,
            },
            props.style,
            flex.flex1,
          ]}
        />
      </View>
    );
  },
);

export default memo(RichEditorComponent);

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    fontSize: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    // paddingTop: Platform.OS === 'ios' ? 15 : 10,
    // paddingBottom: Platform.OS === 'ios' ? 15 : 10,
  },
});
