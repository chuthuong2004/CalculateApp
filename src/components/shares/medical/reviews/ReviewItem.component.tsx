import {View} from 'react-native';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';

// ** Hooks
import {useTheme} from '@react-navigation/native';

// ** Type

// ** Share Components
import {
  AppVectorIcons,
  AvatarComponent,
  TextNormalComponent,
  Translations,
} from '@components/shares';
import {APP_WIDTH, COLORS} from '@utils/constants';
import {SHADOW_STYLE} from '@styles/shadow.style';
import {StyleSheetProps} from '@/types/commons';

const ReviewItem = () => {
  const {colors, dark} = useTheme();
  const styles = styling({dark});
  return (
    <View style={[styles.container, SHADOW_STYLE.shadowCard]}>
      <View style={styles.heading}>
        <View style={[styles.row, styles.wrapper]}>
          <AvatarComponent
            title="DT"
            rounded
            size={APP_WIDTH / 10}
            border
            containerStyle={{backgroundColor: colors.primary}}
          />
          <View style={styles.info}>
            <TextNormalComponent>Lê Minh Thanh</TextNormalComponent>
            <View style={[styles.row]}>
              <TextNormalComponent size="sm">Dược sĩ - </TextNormalComponent>
              <TextNormalComponent size="sm">
                5 <Translations text="reviews" />
              </TextNormalComponent>
            </View>
          </View>
        </View>
        <View>
          <AppVectorIcons
            type="Entypo"
            color={colors.text}
            size={15}
            name="dots-three-vertical"
          />
        </View>
      </View>
      <TextNormalComponent size="sm">Đây là review của tôi</TextNormalComponent>
    </View>
  );
};

export default memo(ReviewItem);

const styling = ({dark}: Pick<StyleSheetProps, 'dark'>) =>
  StyleSheet.create({
    container: {
      padding: 10,
      flex: 1,
      backgroundColor: COLORS.card[dark ? 'dark' : 'light'],
      borderRadius: 5,
    },
    heading: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
    },
    row: {
      flexDirection: 'row',
    },
    wrapper: {
      gap: 2,
      alignItems: 'center',
    },
    info: {},
  });
