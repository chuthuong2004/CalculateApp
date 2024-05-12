import {View, StyleSheet, Pressable} from 'react-native';
import React, {memo} from 'react';

// ** Hooks
import {useNavigation, useTheme} from '@react-navigation/native';

// ** Share Components
import {
  AppVectorIcons,
  AvatarComponent,
  CardComponent,
  TextNormalComponent,
  Translations,
} from '@components/shares';
import {MedicineItemComponent} from './components';

// ** Constants
import {COLORS, COLORS_APP, ICON} from '@utils/constants';

// ** Types
import {StyleSheetProps} from '@/types/commons';
import {PrescriptionStackScreenProps} from '@navigation/app/prescription/types';

// ** GLobal Styles
import {flex} from '@styles';
import Animated, {FadeIn} from 'react-native-reanimated';
import {hp, randomBgAvatar} from '@utils/helpers';
import {StorePrescription} from '@/types/entities';
import {getFirstLetter} from '@utils/utilities';
import moment from 'moment';

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

type PrescriptionItemProps = {
  prescription: StorePrescription;
};
const PrescriptionItemComponent = ({prescription}: PrescriptionItemProps) => {
  const navigation =
    useNavigation<PrescriptionStackScreenProps<'Prescription'>['navigation']>();
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <PressableAnimated
      entering={FadeIn.duration(300)}
      onPress={() =>
        navigation.navigate('PrescriptionDetails', {id: prescription._id})
      }>
      <CardComponent shadow style={[flex.gap10]}>
        <View
          style={[flex.row, flex.alignItemsCenter, flex.justifyContentBetween]}>
          <View style={[flex.row, flex.alignItemsCenter, flex.gap10]}>
            <AvatarComponent
              rounded
              containerStyle={{backgroundColor: randomBgAvatar()}}
              size={hp(4)}
              title={getFirstLetter(prescription.patient_id.full_name)}
            />
            <View style={styles.headingInfoName}>
              <TextNormalComponent>
                {prescription.patient_id.full_name}
              </TextNormalComponent>
              <TextNormalComponent size="sm">
                <Translations text="Year of birth" />:{' '}
                {moment(new Date(prescription.patient_id.birthday)).format(
                  'YYYY',
                )}
              </TextNormalComponent>
            </View>
          </View>
          <View style={styles.headingRight}>
            <View style={styles.textId}>
              <TextNormalComponent fontWeight="500">
                #{prescription.prescription_code}
              </TextNormalComponent>
              <AppVectorIcons
                type="Ionicons"
                color={colors.text}
                name={ICON.Ionicons.copyOutline}
                size={hp(1.5)}
              />
            </View>
            <TextNormalComponent size="sm" color={COLORS_APP.success}>
              Completed
            </TextNormalComponent>
          </View>
        </View>
        <MedicineItemComponent medicine={prescription.medicals[0]} />
        <View style={styles.bottom}>
          <TextNormalComponent size="sm">
            {prescription.medicals.length} <Translations text="product" />
          </TextNormalComponent>
          <TextNormalComponent size="sm" color={colors.primary}>
            View details
          </TextNormalComponent>
        </View>
      </CardComponent>
    </PressableAnimated>
  );
};

export default memo(PrescriptionItemComponent);

const styling = ({dark}: StyleSheetProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.card[dark ? 'dark' : 'light'],
      padding: hp(1),
      borderRadius: hp(0.8),
      gap: hp(1),
    },
    headingInfoName: {},
    headingRight: {
      alignItems: 'flex-end',
    },
    textId: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    bottom: {
      paddingTop: hp(0.6),
      borderTopColor: '#b6b8ba33',
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
