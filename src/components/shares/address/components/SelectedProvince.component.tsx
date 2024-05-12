import {View, Pressable, StyleSheet} from 'react-native';
import React, {memo} from 'react';

// ** Share components
import {CheckboxComponent, TextNormalComponent} from '@components/shares';

// ** Global Styles
import {spacing, flex} from '@styles';

// **
import {defaultValues} from '@hooks';

// ** Types
import {KeyOfProvince} from '@/types/entities';
import {StyleSheetProps} from '@/types/commons';

// ** Navigation hooks
import {useTheme} from '@react-navigation/native';

// ** Constants
import {SIZE_APP} from '@utils/constants';

type SelectedProvinceProps = {
  selectType: KeyOfProvince;
  onSelectType: (type: KeyOfProvince) => void;
  valueSelected: Record<KeyOfProvince, string>;
};
const SelectedProvinceComponent = ({
  selectType,
  onSelectType,
  valueSelected,
}: SelectedProvinceProps) => {
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <View style={[spacing('padding').around, styles.top, flex.gap10]}>
      <TextNormalComponent>Address</TextNormalComponent>
      <View>
        <Pressable
          onPress={() => onSelectType('province')}
          style={[
            flex.row,
            flex.alignItemsCenter,
            flex.justifyContentBetween,
            styles.itemAddress,
            selectType === 'province' ? styles.borderActive : {},
          ]}>
          <CheckboxComponent
            checked={selectType === 'province'}
            title={valueSelected.province}
            iconShape="circle"
            onPress={() => onSelectType('province')}
          />
          {selectType !== 'province' && (
            <TextNormalComponent variant="primary">Change</TextNormalComponent>
          )}
        </Pressable>
        {valueSelected.province.length > 0 &&
          valueSelected.province !== defaultValues.province && (
            <Pressable
              onPress={() => onSelectType('district')}
              style={[
                flex.row,
                flex.alignItemsCenter,
                flex.justifyContentBetween,
                styles.itemAddress,
                selectType === 'district' ? styles.borderActive : {},
              ]}>
              <CheckboxComponent
                checked={selectType === 'district'}
                title={valueSelected.district}
                iconShape="circle"
                onPress={() => onSelectType('district')}
              />
              {selectType !== 'district' && (
                <TextNormalComponent variant="primary">
                  Change
                </TextNormalComponent>
              )}
            </Pressable>
          )}

        {valueSelected.district.length > 0 &&
          valueSelected.district !== defaultValues.district && (
            <Pressable
              onPress={() => onSelectType('ward')}
              style={[
                flex.row,
                flex.alignItemsCenter,
                flex.justifyContentBetween,
                styles.itemAddress,
                selectType === 'ward' ? styles.borderActive : {},
              ]}>
              <CheckboxComponent
                checked={selectType === 'ward'}
                title={valueSelected.ward}
                iconShape="circle"
                onPress={() => onSelectType('ward')}
              />
              {selectType !== 'ward' && (
                <TextNormalComponent variant="primary">
                  Change
                </TextNormalComponent>
              )}
            </Pressable>
          )}
      </View>
    </View>
  );
};

export default memo(SelectedProvinceComponent);
const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    top: {
      backgroundColor: colors.card,
      borderTopLeftRadius: SIZE_APP.lg,
      borderTopRightRadius: SIZE_APP.lg,
    },
    itemAddress: {
      padding: 8,
      borderRadius: 6,
    },
    borderActive: {
      borderWidth: 1,
      borderColor: colors.primary,
    },
  });
