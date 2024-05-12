import React, {memo} from 'react';
import {Image, StyleSheet, View, ViewProps} from 'react-native';

// ** Global Styles
import {flex} from '@styles/flex.style';

// ** Share Component
import {StyleSheetProps} from '@/types/commons';
import {MedicalItem} from '@/types/entities';
import {TextNormalComponent} from '@components/shares';
import {BASE_URL} from '@config/baseUrl';
import {useTheme} from '@react-navigation/native';
import {TRANSFORM_LABEL_UNITS} from '@utils/constants';
import {getMinUnit, hp} from '@utils/helpers';

interface MedicineItemProps extends ViewProps {
  medicine: MedicalItem;
}
const MedicineItem = ({medicine, ...passProps}: MedicineItemProps) => {
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <View
      {...passProps}
      style={[flex.row, flex.gap8, flex.alignItemsCenter, passProps.style]}>
      <View style={styles.imageContainer}>
        <Image
          style={[styles.image]}
          source={{
            uri: BASE_URL + medicine?.medical_id?.images[0]?.path,
          }}
        />
      </View>
      <View style={[flex.gap4]}>
        <TextNormalComponent fontWeight="500">
          {medicine?.medical_id?.name}
        </TextNormalComponent>
        <View style={[flex.row]}>
          <TextNormalComponent size="sm">SL: </TextNormalComponent>
          <TextNormalComponent size="sm">
            {`${medicine?.quantity} `}
            {medicine?.medical_id?.units &&
              TRANSFORM_LABEL_UNITS[getMinUnit(medicine?.medical_id?.units)]}
          </TextNormalComponent>
        </View>
      </View>
    </View>
  );
};

export default memo(MedicineItem);
const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    medicine: {
      flexDirection: 'row',
    },
    imageContainer: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: colors.border,
    },
    image: {
      width: hp(4),
      height: hp(4),
      borderRadius: 5,
    },
  });
