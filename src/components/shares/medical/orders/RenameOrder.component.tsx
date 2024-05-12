import {useAppDispatch, useAppSelector} from '@/store';
import {setSelectedOrder} from '@/store/actions';
import {selectOrder} from '@/store/selectors';
import {
  BottomSheetComponent,
  ButtonComponent,
  CardBottomComponent,
  HeadingSheetComponent,
  InputComponent,
  TextNormalComponent,
} from '@components/shares';
import {useOrder} from '@hooks/services';
import {flex} from '@styles';
import moment from 'moment';
import React, {memo, useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View} from 'react-native';
import {useSWRConfig} from 'swr';

type FormRenameOrder = {
  name: string;
};
const RenameOrderComponent = () => {
  const {mutate} = useSWRConfig();
  const dispatch = useAppDispatch();
  const {selectedOrder} = useAppSelector(selectOrder);
  const {loading, onRenameOrder} = useOrder();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<FormRenameOrder>({
    defaultValues: {
      name: '',
    },
  });
  useEffect(() => {
    if (selectedOrder) {
      setValue(
        'name',
        selectedOrder.name ||
          `Đơn hàng ${moment(new Date(selectedOrder.createdAt)).format(
            'DD/MM/YYYY',
          )}`,
      );
    }
  }, [selectedOrder, setValue]);
  const toggleSheet = () => {
    dispatch(setSelectedOrder(null));
  };

  const onSubmit = (data: FormRenameOrder) => {
    selectedOrder &&
      data.name &&
      onRenameOrder(
        selectedOrder?._id,
        data.name,
        order => {
          mutate(`OrderDetails${order._id}`);
          mutate('ListOrder');
          toggleSheet();
        },
        ({message}) => {
          console.log(message);
        },
      );
  };

  return selectedOrder ? (
    <BottomSheetComponent toggleSheet={toggleSheet}>
      <View>
        <HeadingSheetComponent
          onCloseSheet={toggleSheet}
          title="Rename order"
        />
        <CardBottomComponent corner={false} transparent style={[flex.column]}>
          <View>
            <Controller
              control={control}
              name="name"
              rules={{
                validate: val => {
                  return val.trim().length > 40
                    ? 'Max length is 40 characters !'
                    : true;
                },
              }}
              render={({field}) => (
                <View style={[flex.gap4]}>
                  <InputComponent
                    placeholder="Rename the order"
                    value={field.value}
                    multiline
                    onChangeText={(text: string) =>
                      text.length <= 40 ? field.onChange(text) : undefined
                    }
                    error={errors.name ? errors.name.message : ''}
                  />
                  <View
                    style={[
                      flex.row,
                      flex.alignItemsCenter,
                      flex.justifyContentEnd,
                    ]}>
                    <TextNormalComponent size="xs">
                      {field.value.length}
                    </TextNormalComponent>
                    <TextNormalComponent size="xs">/40</TextNormalComponent>
                  </View>
                </View>
              )}
            />
          </View>
          <View>
            <ButtonComponent
              onPress={handleSubmit(onSubmit)}
              rounded
              disabled={loading}
              loading={loading}>
              Save
            </ButtonComponent>
          </View>
        </CardBottomComponent>
      </View>
    </BottomSheetComponent>
  ) : null;
};

export default memo(RenameOrderComponent);
