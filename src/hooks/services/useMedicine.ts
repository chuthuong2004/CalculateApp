import {useCallback, useState} from 'react';

// ** Types
import {ErrCallbackType} from '../types';
import {StoreMedicine} from '@/types/entities';

// ** Utilities
import {handleErrorHooks} from '@utils';

// ** Medical services
import {medicineService} from '@services/medical';
import {ParamCreateMedicine} from '@services/types';

export function useMedicine() {
  //   ** States
  const [loading, setLoading] = useState<boolean>(false);

  //   ** Handle create medicine
  const handleCreateMedicine = useCallback(
    async (
      params: Partial<ParamCreateMedicine>,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const response = await medicineService.create(params);
        if (response) {
          successCallback();
        }
        setLoading(false);
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errorCallback);
        setLoading(false);
      }
    },
    [],
  );

  // ** Handle update medicine
  const handleUpdateMedicine = useCallback(
    async (
      id: StoreMedicine['_id'],
      params: Partial<ParamCreateMedicine>,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const updated = await medicineService.update(id, params);
        if (updated) {
          console.log('DATATAATATATTATATA: ', updated.units);

          successCallback();
        }
        setLoading(false);
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errorCallback);
        setLoading(false);
      }
    },
    [],
  );
  // ** Handle delete medicine
  const handleDeleteMedicine = useCallback(
    async (
      id: StoreMedicine['_id'],
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        await medicineService.delete(id);
        successCallback();
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errorCallback);
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  // ** Handle update medicine
  const handleDeleteManyMedicine = useCallback(
    async (
      listMedicalId: Array<StoreMedicine['_id']>,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        await medicineService.deleteMany(listMedicalId);
        successCallback();
        setLoading(false);
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errorCallback);
        setLoading(false);
      }
    },
    [],
  );
  return {
    loading,
    handleCreateMedicine,
    handleUpdateMedicine,
    handleDeleteMedicine,
    handleDeleteManyMedicine,
  };
}
