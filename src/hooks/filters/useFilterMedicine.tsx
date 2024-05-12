import {FilterMedicineType} from '@/types/commons';
import {
  MAX_PRICE_FILTER,
  MIN_PRICE_FILTER,
  PRICE_FILTER_FIVE,
  PRICE_FILTER_ONE,
} from '@utils/constants';
import {useMemo} from 'react';

export function useFilterMedicine(filter: FilterMedicineType) {
  const listItemSelected = useMemo<
    {
      field: keyof FilterMedicineType;
      value: string;
      _id: string;
    }[]
  >(() => {
    const {quantity, expiry, producer, price, ...rest} = filter;
    let result: {
      field: keyof FilterMedicineType;
      value: string;
      _id: string;
    }[] = [];
    Object.entries(rest).forEach(([key, value]) => {
      const items = value.map(item => ({
        field: key as keyof FilterMedicineType,
        value: item.name,
        _id: item._id,
      }));
      result = [...result, ...items];
    });
    if (quantity) {
      result = [
        ...result,
        {
          field: 'quantity',
          value: quantity,
          _id: quantity,
        },
      ];
    }
    if (expiry) {
      result = [
        ...result,
        {
          field: 'expiry',
          value: expiry,
          _id: quantity,
        },
      ];
    }
    if (producer._id) {
      result = [
        ...result,
        {
          field: 'producer',
          value: producer.name,
          _id: producer._id,
        },
      ];
    }
    console.log('price: ', price);

    if (
      (price.from >= MIN_PRICE_FILTER && price.to <= MAX_PRICE_FILTER) ||
      price.from === MAX_PRICE_FILTER
    ) {
      console.log('vô');

      result = [
        ...result,
        {
          field: 'price',
          value:
            price.to === PRICE_FILTER_ONE
              ? `Dưới ${PRICE_FILTER_ONE.toLocaleString('vi')}đ`
              : price.to === PRICE_FILTER_FIVE
              ? `${PRICE_FILTER_ONE.toLocaleString(
                  'vi',
                )}đ - ${PRICE_FILTER_FIVE.toLocaleString('vi')}đ`
              : price.from === PRICE_FILTER_FIVE
              ? `${PRICE_FILTER_FIVE.toLocaleString(
                  'vi',
                )}đ - ${MAX_PRICE_FILTER.toLocaleString('vi')}đ`
              : `Trên ${MAX_PRICE_FILTER.toLocaleString('vi')}đ`,
          _id: JSON.stringify(price),
        },
      ];
    }
    return result;
  }, [filter]);

  // ** get total quantity filter
  const totalQuantityFilter = useMemo(() => {
    let total =
      filter.category_id.length +
      filter.store_id.length +
      filter.country.length +
      filter.provider_id.length;
    if (filter.expiry) {
      total += 1;
    }
    if (filter.producer._id) {
      total += 1;
    }
    if (filter.quantity) {
      total += 1;
    }
    if (
      (filter.price.from >= MIN_PRICE_FILTER &&
        filter.price.to <= MAX_PRICE_FILTER) ||
      filter.price.from === MAX_PRICE_FILTER
    ) {
      total += 1;
    }
    return total;
  }, [filter]);
  return {listItemSelected, totalQuantityFilter};
}
