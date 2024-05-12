import React, {memo, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Swipeable} from 'react-native-gesture-handler';

// ** Share components
import {
  MedicineItemManagementComponent,
  RightActionComponent,
} from '@components/shares';

// ** Types
import {StoreMedicine} from '@/types/entities';
import {MedicalStackScreenProps} from '@navigation/app/medical/types';

type MedicineItemProps = {
  medicine: StoreMedicine;
  onSelectItemToDelete: (medicine: Pick<StoreMedicine, '_id' | 'name'>) => void;
};
const SwipeableMedicineItemManagementComponent = ({
  medicine,
  onSelectItemToDelete,
}: MedicineItemProps) => {
  const navigation =
    useNavigation<MedicalStackScreenProps<'Medicine'>['navigation']>();

  const swipeableRef = useRef<Swipeable | null>(null);
  const handleSelectItem = (item: StoreMedicine, type: 'Edit' | 'Delete') => {
    type === 'Delete'
      ? onSelectItemToDelete({
          _id: item._id,
          name: item.name,
        })
      : navigation.navigate('FormMedicine', {data: medicine});
    swipeableRef.current?.close();
  };
  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={() => (
        <RightActionComponent
          subject="Medical"
          onPressDelete={() => handleSelectItem(medicine, 'Delete')}
          onPressEdit={() => handleSelectItem(medicine, 'Edit')}
        />
      )}>
      <MedicineItemManagementComponent medicine={medicine} />
    </Swipeable>
  );
};

export default memo(SwipeableMedicineItemManagementComponent);
