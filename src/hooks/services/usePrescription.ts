import {StorePrescription} from '@/types/entities';
import {ErrCallbackType} from '@hooks/types';
import {prescriptionService} from '@services/medical';
import {ParamCreatePrescription} from '@services/types';
import {handleErrorHooks} from '@utils/utilities';
import {useCallback, useState} from 'react';

export function usePrescription() {
  const [loading, setLoading] = useState(false);
  const handleCreatePrescription = useCallback(
    async (
      params: ParamCreatePrescription,
      successCallback: (prescription: StorePrescription) => void,
      errCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const created = await prescriptionService.create(params);
        successCallback(created);
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  const handleUpdatePrescription = useCallback(
    async (
      id: string,
      params: Partial<ParamCreatePrescription>,
      successCallback: (prescription: StorePrescription) => void,
      errCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const updated = await prescriptionService.update(id, params);
        successCallback(updated);
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  const handleDeletePrescription = useCallback(
    async (
      id: string,
      successCallback: () => void,
      errCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        await prescriptionService.delete(id);
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
    onCreatePrescription: handleCreatePrescription,
    onUpdatePrescription: handleUpdatePrescription,
    onDeletePrescription: handleDeletePrescription,
  };
}
