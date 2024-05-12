import {selectUser} from '@/store/selectors';
import {useAppSelector} from '../../store';

export function useTypeService(): ReturnTypeService {
  const {user} = useAppSelector(selectUser);
  if (user) {
    return {
      typeService: user.account_id.type_service.split(
        '_',
      )[0] as ReturnTypeService['typeService'],
      typeAccount: user.account_id.type_service.split(
        '_',
      )[1] as ReturnTypeService['typeAccount'],
    };
  }
  return {
    typeAccount: '',
    typeService: '',
  };
}
export type ReturnTypeService = {
  typeService: 'DOCTOR' | 'HOSPITAL' | 'PROVIDER' | 'SGOD' | '';
  typeAccount: 'MANAGER' | 'USER' | 'ADMIN' | '';
};
