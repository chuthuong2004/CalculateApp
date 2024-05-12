import {View, Pressable} from 'react-native';
import React, {memo, useMemo} from 'react';
import {flex} from '@styles';
import {useNavigation} from '@react-navigation/native';

// ** Share components
import {
  AvatarComponent,
  BadgeComponent,
  CardComponent,
  CopyComponent,
  TextNormalComponent,
} from '@components/shares';

// ** Types
import {StoreMedicine} from '@/types/entities';
import {MedicalStackScreenProps} from '@navigation/app/medical/types';

// ** Reanimated
import Animated, {FadeIn, ZoomIn} from 'react-native-reanimated';
import {BASE_URL} from '@config/baseUrl';
import {
  getFirstLetter,
  isAlmostExpired,
  isExpired,
  getMinUnit,
  getTotalQuantityUnit,
} from '@utils';
import {TRANSFORM_LABEL_UNITS} from '@utils/constants';
import {hp} from '@utils/helpers';

type MedicineItemProps = {
  medicine: StoreMedicine;
};
const PressableAnimated = Animated.createAnimatedComponent(Pressable);
const MedicineItemManagementComponent = ({medicine}: MedicineItemProps) => {
  const navigation =
    useNavigation<MedicalStackScreenProps<'Medicine'>['navigation']>();

  const renderTotalQuantity = useMemo(
    () => getTotalQuantityUnit(medicine.units),
    [medicine],
  );
  const valueMinUnit = useMemo(() => getMinUnit(medicine.units), [medicine]);
  const totalInventoryQuantity = useMemo(() => {
    const minUnits = medicine.units.find(unit => unit.unit === valueMinUnit);
    return minUnits?.total_quantity || 0;
  }, [medicine, valueMinUnit]);
  return (
    <PressableAnimated
      entering={FadeIn.duration(600)}
      onPress={() => navigation.navigate('FormMedicine', {data: medicine})}>
      <CardComponent shadow style={[flex.row, flex.gap10]}>
        <Animated.Image
          entering={ZoomIn}
          source={{
            uri: BASE_URL + medicine.images[0]?.path,
            // uri: 'https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09465_05d161a1c1.jpg',
          }}
          width={hp(8)}
          height={hp(10)}
          style={{
            borderRadius: 6,
          }}
        />
        <View style={[flex.flex1, flex.gap4]}>
          <View style={[flex.row, flex.justifyContentBetween]}>
            <View style={[flex.row, flex.gap4, flex.alignItemsCenter]}>
              <TextNormalComponent fontWeight="500" textTransform="uppercase">
                #{medicine.medical_code}
              </TextNormalComponent>
              <CopyComponent code={medicine.medical_code} />
            </View>
            <View style={[flex.row, flex.gap4]}>
              {isExpired(new Date(medicine.exp)) ? (
                <BadgeComponent
                  rounded={false}
                  variant="danger"
                  size="sm"
                  text="Đã hết hạn"
                />
              ) : (
                isAlmostExpired(new Date(medicine.exp)) && (
                  <BadgeComponent
                    rounded={false}
                    variant="warning"
                    size="sm"
                    text="Sắp hết hạn"
                  />
                )
              )}

              <AvatarComponent
                rounded
                size={hp(2.4)}
                title={
                  !medicine.created_by.avatar
                    ? getFirstLetter(medicine.created_by?.full_name || '')
                    : undefined
                }
                source={
                  medicine.created_by.avatar
                    ? {
                        uri: BASE_URL + medicine.created_by.avatar.path,
                      }
                    : undefined
                }
              />
            </View>
          </View>

          <TextNormalComponent
            variant="primary"
            numberOfLines={1}
            ellipsizeMode="tail">
            {medicine.name}
          </TextNormalComponent>
          <View style={[flex.row, flex.alignItemsStart, flex.gap4]}>
            <TextNormalComponent size="sm">Tồn kho:</TextNormalComponent>
            <TextNormalComponent size="sm" style={[flex.flex1]}>
              {renderTotalQuantity} (
              {totalInventoryQuantity.toLocaleString('vi')}{' '}
              {TRANSFORM_LABEL_UNITS[valueMinUnit]})
            </TextNormalComponent>
          </View>
          <View style={[flex.row, flex.alignItemsCenter, flex.gap4]}>
            <TextNormalComponent size="sm">Category</TextNormalComponent>
            <TextNormalComponent variant="primary">
              {medicine.category_id?.name}
            </TextNormalComponent>
          </View>
          <View style={[flex.row]}>
            <TextNormalComponent size="sm">Xuất xứ: </TextNormalComponent>
            <TextNormalComponent size="sm" variant="primary">
              {medicine.country}
            </TextNormalComponent>
          </View>
        </View>
      </CardComponent>
    </PressableAnimated>
  );
};

export default memo(MedicineItemManagementComponent);
