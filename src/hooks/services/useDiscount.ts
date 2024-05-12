import {StoreDiscount} from '@/types/entities';
import {ErrCallbackType} from '@hooks/types';
import {discountService} from '@services/transactions';
import {ParamCreateDiscount, ParamUpdateDiscount} from '@services/types';
import {handleErrorHooks} from '@utils/utilities';
import {useCallback, useState} from 'react';

export function useDiscount() {
  const [loading, setLoading] = useState(false);
  const handleCreateDiscount = useCallback(
    async (
      params: ParamCreateDiscount,
      successCallback: (discount: StoreDiscount) => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const created = await discountService.create(params);
        successCallback(created);
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleUpdateDiscount = useCallback(
    async (
      id: string,
      params: ParamUpdateDiscount,
      successCallback: (discount: StoreDiscount) => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const updated = await discountService.update(id, params);
        successCallback(updated);
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  const handleDeleteDiscount = useCallback(
    async (
      id: string,
      successCallback: () => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        await discountService.delete(id);
        successCallback();
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  return {
    loading,
    onCreateDiscount: handleCreateDiscount,
    onUpdateDiscount: handleUpdateDiscount,
    onDeleteDiscount: handleDeleteDiscount,
  };
}
