import {FilterMedicine, FilterMedicineType} from '@/types/commons';
import {ESortMedicine} from '@/types/enums';
import {useCallback, useState} from 'react';

export function useFilterWithSort() {
  const [filter, setFilter] = useState<FilterMedicine>({
    sort: ESortMedicine.NEWEST,
    filter: {
      category_id: [],
      store_id: [],
      provider_id: [],
      price: {
        from: 0,
        to: 99999999,
      },
      producer: {
        _id: '',
        name: '',
      },
      country: [],
      expiry: '',
      quantity: '',
    },
  });
  const handleFilter = useCallback((value: FilterMedicineType) => {
    setFilter(prev => ({
      ...prev,
      filter: value,
    }));
  }, []);
  const handleRemoveItemFilter = useCallback(
    (key: keyof FilterMedicineType, value: string) => {
      setFilter(prev => {
        switch (key) {
          case 'category_id':
          case 'store_id':
          case 'provider_id':
          case 'country':
            return {
              ...prev,
              filter: {
                ...prev.filter,
                [key]: prev.filter[key].filter(item => item._id !== value),
              },
            };
          case 'producer':
            return {
              ...prev,
              filter: {
                ...prev.filter,
                [key]: {
                  _id: '',
                  name: '',
                },
              },
            };
          case 'price':
            return {
              ...prev,
              filter: {
                ...prev.filter,
                price: {
                  from: 0,
                  to: 99999999,
                },
              },
            };
          default:
            return prev;
        }
      });
    },
    [],
  );
  const handleSort = useCallback((value: ESortMedicine) => {
    setFilter(prev => ({
      ...prev,
      sort: prev.sort === value ? '' : value,
    }));
  }, []);
  return {
    filter,
    onFilter: handleFilter,
    onSort: handleSort,
    onRemoveItemFilter: handleRemoveItemFilter,
  };
}
