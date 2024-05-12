import {TypeService} from '@/types/unions';
import {StoreBaseUser} from '../accounts';
import {StorePermission} from './permission.entity';

export type StoreRole = {
  _id: string;
  image?: {
    _id: string;
    path: string;
  };
  permissions: Array<StorePermission | string>;
  name: string;
  sub_roles: Array<StoreRole>;
  is_manager: boolean;
  default: boolean;
  owner_id: StoreBaseUser;
  created_by: StoreBaseUser;
  createdAt: string;
  updatedAt: string;
  upper_bound: StoreRole;
  lower_bound: StoreRole;
  type_service: TypeService;
};
