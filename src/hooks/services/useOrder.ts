import {StoreOrder} from '@/types/entities';
import {ErrCallbackType} from '@hooks/types';
import orderService from '@services/medical/order.service';
import {ParamCreateOrder, ParamImportMedicine} from '@services/types';
import {handleErrorHooks} from '@utils/utilities';
import {useCallback, useState} from 'react';

export function useOrder() {
  const [loading, setLoading] = useState(false);
  const handleCreateOrder = useCallback(
    async (
      param: ParamCreateOrder,
      successCallback: (order: StoreOrder) => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const ordered = await orderService.create(param);
        console.log(ordered);
        if (ordered) {
          successCallback(ordered);
        }
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleRenameOrder = useCallback(
    async (
      id: string,
      name: string,
      successCallback: (order: StoreOrder) => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const ordered = await orderService.renameOrder(id, name);
        console.log(ordered);
        if (ordered) {
          successCallback(ordered);
        }
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleCancelOrder = useCallback(
    async (
      id: string,
      reason: string,
      successCallback: (order: StoreOrder) => void,
      errCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const canceled = await orderService.cancelOrder(id, reason);
        console.log(canceled);
        successCallback(canceled);
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleUpdateStatusOrder = useCallback(
    async (
      id: string,
      successCallback: (order: StoreOrder) => void,
      errCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const updated = await orderService.updateStatus(id);
        console.log(updated);
        successCallback(updated);
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  const handleReceiveOrder = useCallback(
    async (
      id: string,
      successCallback: (order: StoreOrder) => void,
      errCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const updated = await orderService.receiveOrder(id);
        console.log(updated);
        successCallback(updated);
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleImportMedicine = useCallback(
    async (
      id: string,
      params: ParamImportMedicine,
      successCallback: () => void,
      errCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const imported = await orderService.importMedicine(id, params);
        console.log(imported);
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
    onCreateOrder: handleCreateOrder,
    onRenameOrder: handleRenameOrder,
    onCancelOrder: handleCancelOrder,
    onUpdateOrderStatus: handleUpdateStatusOrder,
    onReceiveOrder: handleReceiveOrder,
    onImportMedicine: handleImportMedicine,
  };
}
